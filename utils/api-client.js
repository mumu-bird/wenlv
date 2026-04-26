const API_CONFIG = require("../config/api.config");

function hasMapKey() {
  return Boolean(API_CONFIG.tencentMapKey && API_CONFIG.tencentMapKey.trim());
}

function reverseGeocode({ latitude, longitude }) {
  if (!hasMapKey()) {
    return Promise.resolve({
      enabled: false,
      address: "",
      message: "未配置腾讯地图 key"
    });
  }

  return new Promise((resolve) => {
    wx.request({
      url: `${API_CONFIG.baseUrl}/geocoder/v1`,
      method: "GET",
      data: {
        key: API_CONFIG.tencentMapKey,
        location: `${latitude},${longitude}`
      },
      success: (res) => {
        const ok = res.statusCode === 200 && res.data && res.data.status === 0;
        if (!ok) {
          resolve({
            enabled: true,
            address: "",
            message: "逆地理解析失败"
          });
          return;
        }

        resolve({
          enabled: true,
          address: res.data.result.address || "",
          message: ""
        });
      },
      fail: () => {
        resolve({
          enabled: true,
          address: "",
          message: "网络请求失败"
        });
      }
    });
  });
}

module.exports = {
  hasMapKey,
  reverseGeocode
};
