const COINS_KEY = "vibetrack_coins";
const ITEMS_KEY = "vibetrack_items";

function getCoins() {
  const value = wx.getStorageSync(COINS_KEY);
  return Number.isFinite(Number(value)) && Number(value) > 0 ? Number(value) : 120;
}

function setCoins(value) {
  wx.setStorageSync(COINS_KEY, Math.max(0, Number(value) || 0));
}

function addCoins(delta) {
  const next = getCoins() + Number(delta || 0);
  setCoins(next);
  return getCoins();
}

function getItems() {
  const list = wx.getStorageSync(ITEMS_KEY);
  return Array.isArray(list) ? list : [];
}

function addItem(item) {
  const items = getItems();
  items.push(item);
  wx.setStorageSync(ITEMS_KEY, items);
  return items;
}

module.exports = {
  getCoins,
  setCoins,
  addCoins,
  getItems,
  addItem
};
