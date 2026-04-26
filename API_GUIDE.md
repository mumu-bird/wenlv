# 幻境游踪 v3 API 与开通指引

## 1) 定位与地图能力

- API:
  - `wx.getLocation`：获取当前定位
  - `wx.chooseLocation`：允许用户手动选点（可选）
  - `map` 组件：地图展示与点位标注（可选）
- 用途:
  - 剧本章节到点解锁
  - City Walk 任务点范围校验
- 开通/配置:
  1. 微信公众平台 -> 小程序后台 -> 设置 -> 开发设置，确保基础库版本满足项目要求
  2. 在 `app.json` / 页面中使用地图组件时，真机需授权定位
  3. 在小程序后台 `设置 -> 隐私与接口调用` 补充定位用途说明
  4. 用户首次调用时会触发授权弹窗

## 2) 拍照与媒体上传

- API:
  - `wx.chooseImage`：拍照或从相册选图
  - `wx.cloud.uploadFile`（推荐）或自建后端上传接口
- 用途:
  - City Walk 的 AR 实景采集（当前版本为本地模拟上传）
- 开通/配置:
  1. 若使用云开发，先开通云环境
  2. 在云存储创建目录（如 `citywalk-uploads/`）
  3. 前端拿到 `tempFilePath` 后调用上传接口

## 3) 云数据库（推荐）

- API:
  - `wx.cloud.database()`
  - 集合读写：`collection("scripts").get/add/update`
- 用途:
  - 剧本数据、章节、任务、用户金币、勋章、商城订单持久化
- 开通/配置:
  1. 微信开发者工具 -> 云开发 -> 开通
  2. 建议集合:
     - `scripts`
     - `users`
     - `merchants`
     - `orders`
     - `uploads`
  3. 配置数据库权限（测试期可“仅创建者可写”，上线前收紧）

## 4) 用户登录标识

- API:
  - `wx.cloud.callFunction` + 云函数内 `wx-server-sdk` 获取 `openid`
  - 或 `wx.login` + 自建后端换取 `openid/session_key`
- 用途:
  - 绑定用户金币、购买记录、成就进度
- 开通/配置:
  1. 云函数中直接可取 `OPENID`
  2. 用户表以 `openid` 作为唯一主键

## 5) 支付能力（后续正式商城）

- API:
  - `wx.requestPayment`
- 用途:
  - 虚拟/实物商品支付（当前版本仅金币兑换）
- 开通/配置:
  1. 主体需企业并开通微信支付商户号
  2. 小程序后台绑定商户号
  3. 服务端生成预支付订单并返回支付参数

## 6) 你现在最小可用接入顺序

1. 开通云开发
2. 接 `wx.getLocation`（本项目已接）
3. 把 `scripts/users` 改为云数据库读写
4. 把 `wx.chooseImage` 接入云存储上传
5. 最后再接支付

## 7) 当前代码中已用 API（v3）

- `wx.getLocation`：定位用于章节与任务点距离判断
- `wx.chooseImage`：City Walk 实景采集
- `wx.getStorageSync` / `wx.setStorageSync`：金币与已购商品本地持久化
- `wx.navigateTo`、`wx.showToast`、`wx.showModal`：流程交互
