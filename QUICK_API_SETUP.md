# 一键接 API（最简版）

你只需要做 2 步：

1. 在腾讯位置服务申请一个 `key`
2. 把 key 填到 `config/api.config.js` 的 `tencentMapKey`

---

## 第一步：申请 key

1. 打开腾讯位置服务控制台（LBS）  
   [https://lbs.qq.com/](https://lbs.qq.com/)
2. 登录并创建应用
3. 创建 key（WebService API）
4. 拿到字符串形式的 key

---

## 第二步：填 key（唯一配置点）

编辑文件：`config/api.config.js`

```js
const API_CONFIG = {
  tencentMapKey: "你申请到的key",
  baseUrl: "https://apis.map.qq.com/ws"
};
```

保存后重新编译小程序即可。

---

## 当前已经自动接入的能力

- 定位后自动调用腾讯逆地理 API（`/geocoder/v1`）
- 在游览页显示更可读的“当前位置地址”
- 未配置 key 时自动降级，不会报错

---

## 你后续如果只把 key 发给我

我可以直接帮你把 key 写入 `config/api.config.js`，你无需再做其它改动。
