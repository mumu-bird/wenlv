const { scripts } = require("../../utils/data");
const { getDistanceInMeters } = require("../../utils/location");
const apiClient = require("../../utils/api-client");

Page({
  data: {
    script: null,
    theme: null,
    destination: "北京",
    mode: "story",
    role: "旅人",
    chapterIndex: 0,
    storyStep: "read",
    storyAnswerIndex: -1,
    chapterProgressText: "",
    latitude: 39.915,
    longitude: 116.404,
    locationReady: false,
    locationDenied: false,
    locationText: "未定位",
    chapterDistanceText: "",
    isNearCheckpoint: false,
    universe: null,
    cityTasks: [],
    cityTaskState: {},
    earnedCoins: 0
  },

  onLoad(options) {
    const script = scripts.find((item) => item.id === options.scriptId) || scripts[0];
    const role = options.role ? decodeURIComponent(options.role) : "旅人";
    const destination = options.destination ? decodeURIComponent(options.destination) : script.city || "北京";
    const mode = script.mode || "story";
    if (mode === "citywalk") {
      const universes = script.universes || [];
      const universe = universes.find((item) => item.key === options.universe) || universes[0];
      const cityTaskState = {};
      (universe.tasks || []).forEach((task) => {
        cityTaskState[task.id] = {
          count: 0,
          optionIndex: -1,
          completed: false,
          near: false,
          distanceText: "请刷新定位后开始"
        };
      });
      this.setData({
        script,
        theme: script.theme || null,
        destination,
        role,
        mode,
        universe,
        cityTasks: universe.tasks || [],
        cityTaskState
      });
      this.refreshLocation();
      return;
    }

    const chapters = script.chapters || [];
    this.setData({
      script,
      theme: script.theme || null,
      destination,
      role,
      mode,
      chapterProgressText: `1/${chapters.length} 章节`
    });
    this.refreshLocation();
  },

  refreshLocation() {
    this.ensureLocationPermission(() => {
      wx.getLocation({
        type: "gcj02",
        success: (res) => {
          this.setData({
            latitude: res.latitude,
            longitude: res.longitude,
            locationReady: true,
            locationDenied: false,
            locationText: `已定位 ${res.latitude.toFixed(4)}, ${res.longitude.toFixed(4)}`
          });
          this.updateLocationStatus();
          this.updateAddressByApi(res.latitude, res.longitude);
        },
        fail: () => {
          this.setData({
            locationReady: false,
            locationDenied: true,
            locationText: "定位失败，请检查权限"
          });
          wx.showToast({ title: "定位失败，请授权地理位置", icon: "none" });
        }
      });
    });
  },

  ensureLocationPermission(onGranted) {
    wx.getSetting({
      success: (settingRes) => {
        const status = settingRes.authSetting["scope.userLocation"];
        if (status === true || status === undefined) {
          onGranted();
          return;
        }
        this.setData({
          locationDenied: true,
          locationText: "定位权限未开启，请先授权"
        });
      }
    });
  },

  requestLocationPermission() {
    wx.getSetting({
      success: (settingRes) => {
        const status = settingRes.authSetting["scope.userLocation"];
        if (status === false) {
          this.openLocationSettings();
          return;
        }
        wx.authorize({
          scope: "scope.userLocation",
          success: () => {
            this.setData({ locationDenied: false });
            this.refreshLocation();
          },
          fail: () => {
            this.setData({
              locationDenied: true,
              locationText: "授权被拒绝，请在设置中打开定位权限"
            });
          }
        });
      }
    });
  },

  openLocationSettings() {
    wx.openSetting({
      success: () => {
        this.refreshLocation();
      }
    });
  },

  updateAddressByApi(latitude, longitude) {
    apiClient.reverseGeocode({ latitude, longitude }).then((result) => {
      if (!result.enabled || !result.address) {
        return;
      }
      this.setData({
        locationText: `当前位置：${result.address}`
      });
    });
  },

  updateLocationStatus() {
    if (!this.data.locationReady) {
      return;
    }
    if (this.data.mode === "story") {
      const chapters = this.data.script.chapters || [];
      const chapter = chapters[this.data.chapterIndex];
      if (!chapter || !chapter.checkpoint) {
        return;
      }
      const distance = getDistanceInMeters(
        this.data.latitude,
        this.data.longitude,
        chapter.checkpoint.lat,
        chapter.checkpoint.lng
      );
      this.setData({
        chapterDistanceText: `距离本节点位 ${Math.round(distance)} 米（目标 ${chapter.checkpoint.name}）`,
        isNearCheckpoint: distance <= chapter.checkpoint.radius
      });
      return;
    }
    const cityTaskState = { ...this.data.cityTaskState };
    this.data.cityTasks.forEach((task) => {
      if (!task.checkpoint) {
        cityTaskState[task.id] = { ...cityTaskState[task.id], near: true, distanceText: "无需定位校验" };
        return;
      }
      const distance = getDistanceInMeters(
        this.data.latitude,
        this.data.longitude,
        task.checkpoint.lat,
        task.checkpoint.lng
      );
      cityTaskState[task.id] = {
        ...cityTaskState[task.id],
        near: distance <= task.checkpoint.radius,
        distanceText: `距${task.checkpoint.name}${Math.round(distance)}米`
      };
    });
    this.setData({ cityTaskState });
  },

  startPuzzle() {
    if (!this.data.locationReady) {
      wx.showToast({ title: "请先完成定位", icon: "none" });
      return;
    }
    if (!this.data.isNearCheckpoint) {
      wx.showToast({ title: "未到达本节任务点位", icon: "none" });
      return;
    }
    this.setData({
      storyStep: "quiz",
      storyAnswerIndex: -1
    });
  },

  backToStory() {
    this.setData({
      storyStep: "read"
    });
  },

  chooseStoryOption(event) {
    const { idx } = event.currentTarget.dataset;
    this.setData({ storyAnswerIndex: Number(idx) });
  },

  submitStoryAnswer() {
    const { script, chapterIndex, storyAnswerIndex, earnedCoins } = this.data;
    const chapters = script.chapters || [];
    const currentChapter = chapters[chapterIndex];
    if (!currentChapter) {
      return;
    }

    if (storyAnswerIndex === currentChapter.answerIndex) {
      const nextIndex = chapterIndex + 1;
      const allDone = nextIndex >= chapters.length;
      if (allDone) {
        this.setData({
          earnedCoins: earnedCoins + 50,
          chapterProgressText: `${chapters.length}/${chapters.length} 章节`,
          storyStep: "done"
        });
        wx.showToast({ title: "终章解谜成功 +50金币", icon: "success" });
        return;
      }
      this.setData({
        earnedCoins: earnedCoins + 30,
        chapterIndex: nextIndex,
        storyStep: "read",
        storyAnswerIndex: -1,
        chapterProgressText: `${nextIndex + 1}/${chapters.length} 章节`
      });
      this.updateLocationStatus();
      wx.showToast({ title: "解谜成功，进入下一节", icon: "success" });
    } else {
      wx.showToast({ title: "谜题错误，请回看本节故事", icon: "none" });
      this.setData({ storyStep: "read" });
    }
  },

  uploadCityPhoto(event) {
    const { taskid } = event.currentTarget.dataset;
    const task = this.data.cityTasks.find((item) => item.id === taskid);
    const state = this.data.cityTaskState[taskid];
    if (!task || !state || state.completed) {
      return;
    }
    if (!state.near) {
      wx.showToast({ title: "未到达该任务点附近", icon: "none" });
      return;
    }
    wx.chooseImage({
      count: 1,
      sourceType: ["camera", "album"],
      success: () => {
        const next = {
          ...this.data.cityTaskState,
          [taskid]: {
            ...state,
            count: Math.min(state.count + 1, task.targetCount)
          }
        };
        this.setData({ cityTaskState: next });
        wx.showToast({ title: "AR 实景上传成功", icon: "success" });
      }
    });
  },

  chooseCityOption(event) {
    const { taskid, idx } = event.currentTarget.dataset;
    const state = this.data.cityTaskState[taskid];
    if (!state || state.completed) {
      return;
    }
    this.setData({
      cityTaskState: {
        ...this.data.cityTaskState,
        [taskid]: {
          ...state,
          optionIndex: Number(idx)
        }
      }
    });
  },

  verifyCityTask(event) {
    const { taskid } = event.currentTarget.dataset;
    const task = this.data.cityTasks.find((item) => item.id === taskid);
    const state = this.data.cityTaskState[taskid];
    if (!task || !state || state.completed) {
      return;
    }
    if (state.count < task.targetCount) {
      wx.showToast({ title: "实景收集数量还不够", icon: "none" });
      return;
    }
    if (state.optionIndex !== task.answerIndex) {
      wx.showToast({ title: "观察题回答错误", icon: "none" });
      return;
    }
    this.setData({
      cityTaskState: {
        ...this.data.cityTaskState,
        [taskid]: {
          ...state,
          completed: true
        }
      },
      earnedCoins: this.data.earnedCoins + 25
    });
    wx.showToast({ title: "任务完成 +25金币", icon: "success" });
  },

  toReward() {
    const { earnedCoins } = this.data;
    const rewardName = this.data.mode === "story" ? "中轴秘档徽章" : "城市采集大师徽章";
    if (this.data.mode === "story" && this.data.storyStep !== "done") {
      wx.showToast({ title: "请先完成全部章节", icon: "none" });
      return;
    }
    wx.navigateTo({
      url: `/pages/reward/index?coins=${earnedCoins}&medal=${encodeURIComponent(rewardName)}`
    });
  }
});
