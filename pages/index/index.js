const { scripts } = require("../../utils/data");

Page({
  data: {
    scripts,
    shortcuts: [
      { key: "script", title: "剧本探险", desc: "先选地点再选剧本", path: "/pages/script-hub/index?destination=北京" },
      { key: "walk", title: "City Walk", desc: "城市漫游轻任务", path: "/pages/script-detail/index?id=city-walk" },
      { key: "creator", title: "创作者中心", desc: "编辑剧本与地图点位", path: "/pages/creator/index" },
      { key: "profile", title: "个人成就", desc: "勋章墙与金币", path: "/pages/profile/index" }
    ]
  },

  onTapShortcut(event) {
    const { path } = event.currentTarget.dataset;
    wx.navigateTo({ url: path });
  },

  openScript(event) {
    const { city } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/script-hub/index?destination=${encodeURIComponent(city || "北京")}`
    });
  }
});
