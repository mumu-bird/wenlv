App({
  onLaunch() {
    if (wx.cloud) {
      wx.cloud.init({
        env: "demo-vibetrack",
        traceUser: true
      });
    }
  }
});
