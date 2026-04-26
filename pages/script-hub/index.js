const { scripts } = require("../../utils/data");

Page({
  data: {
    destinationInput: "北京",
    allScripts: scripts,
    filteredScripts: scripts
  },

  onLoad(options) {
    const destination = options.destination ? decodeURIComponent(options.destination) : "北京";
    this.setData({ destinationInput: destination });
    this.filterScripts(destination);
  },

  onInputDestination(event) {
    this.setData({ destinationInput: event.detail.value });
  },

  searchScripts() {
    this.filterScripts(this.data.destinationInput);
  },

  filterScripts(keyword) {
    const text = (keyword || "").trim();
    const filtered = scripts.filter((item) => {
      const city = item.city || "";
      const district = item.district || "";
      return !text || city.includes(text) || district.includes(text) || item.title.includes(text);
    });
    this.setData({ filteredScripts: filtered });
    if (!filtered.length) {
      wx.showToast({ title: "该地点暂无剧本", icon: "none" });
    }
  },

  chooseScript(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/script-detail/index?id=${id}&destination=${encodeURIComponent(this.data.destinationInput)}`
    });
  }
});
