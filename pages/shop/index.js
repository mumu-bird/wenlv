const userState = require("../../utils/user-state");

const goods = [
  { id: "g1", name: "中轴线明信片套装", price: 60, desc: "6 张城市文化明信片" },
  { id: "g2", name: "限定徽章盲袋", price: 120, desc: "随机 1 枚金属徽章" },
  { id: "g3", name: "夜巡帆布袋", price: 180, desc: "文旅联名周边" },
  { id: "g4", name: "AR 探索扩展包", price: 240, desc: "解锁高级城市任务" }
];

Page({
  data: {
    coins: 0,
    goods,
    bag: []
  },

  onShow() {
    this.setData({
      coins: userState.getCoins(),
      bag: userState.getItems()
    });
  },

  buyItem(event) {
    const { id } = event.currentTarget.dataset;
    const item = goods.find((g) => g.id === id);
    if (!item) {
      return;
    }
    const coins = userState.getCoins();
    if (coins < item.price) {
      wx.showToast({ title: "金币不足", icon: "none" });
      return;
    }
    userState.setCoins(coins - item.price);
    userState.addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      boughtAt: Date.now()
    });
    this.setData({
      coins: userState.getCoins(),
      bag: userState.getItems()
    });
    wx.showToast({ title: "兑换成功", icon: "success" });
  }
});
