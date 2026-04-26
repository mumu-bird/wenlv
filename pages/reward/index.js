const userState = require("../../utils/user-state");

Page({
  data: {
    opened: false,
    rewardVisible: false,
    coins: 0,
    medal: "夜行侦探勋章"
  },

  onLoad(options) {
    const baseCoins = userState.getCoins();
    const gainCoins = Number(options.coins || 0);
    const total = baseCoins + gainCoins;
    userState.setCoins(total);
    this.setData({
      coins: total,
      medal: options.medal ? decodeURIComponent(options.medal) : "夜行侦探勋章"
    });
  },

  openBox() {
    if (this.data.opened) {
      return;
    }
    this.setData({ opened: true });
    setTimeout(() => {
      this.setData({ rewardVisible: true });
    }, 650);
  },

  toProfile() {
    wx.navigateTo({
      url: `/pages/profile/index?coins=${this.data.coins}&medal=${encodeURIComponent(this.data.medal)}`
    });
  }
});
