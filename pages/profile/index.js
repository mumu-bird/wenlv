const userState = require("../../utils/user-state");

Page({
  data: {
    coins: 120,
    itemsCount: 0,
    medals: ["初入幻境", "线索猎人"]
  },

  onShow() {
    const coins = userState.getCoins();
    const itemsCount = userState.getItems().length;
    this.setData({ coins, itemsCount });
  },

  onLoad(options) {
    const medal = options.medal ? decodeURIComponent(options.medal) : "";
    const medals = medal ? [...this.data.medals, medal] : this.data.medals;
    this.setData({ medals });
  },

  toShop() {
    wx.navigateTo({
      url: "/pages/shop/index"
    });
  }
});
