const { scripts } = require("../../utils/data");

const quiz = [
  { id: 1, title: "你更相信哪种线索来源？", options: ["直觉联想", "实证证据", "人物关系"] },
  { id: 2, title: "夜幕降临时，你会优先？", options: ["勘察地形", "召集队友", "单线潜入"] },
  { id: 3, title: "面对矛盾口供时，你倾向？", options: ["抓情绪漏洞", "交叉核对时间", "先记后判"] },
  { id: 4, title: "你对历史信息的处理方式是？", options: ["提炼关键词", "建立时间轴", "画关系图"] },
  { id: 5, title: "商家互动环节里你更看重？", options: ["剧情沉浸", "实用折扣", "隐藏彩蛋"] },
  { id: 6, title: "进入终局前你会选择？", options: ["复盘全部线索", "相信第一判断", "先探再决"] }
];

const roles = [
  { key: "seer", name: "雾隐占星师", skill: "可在关键节点获得一次提示" },
  { key: "tracker", name: "城影追踪者", skill: "地图显示更大范围的任务点" },
  { key: "broker", name: "夜市情报客", skill: "商家折扣额外 +5%" },
  { key: "scribe", name: "古籍译录官", skill: "文化背景问题可排除一个错误项" }
];

Page({
  data: {
    script: null,
    destination: "北京",
    isCityWalk: false,
    currentQuizIndex: 0,
    answeredCount: 0,
    quiz,
    answers: {},
    role: null,
    showRoleCard: false,
    universes: [],
    selectedUniverseKey: ""
  },

  onLoad(options) {
    const id = options.id || "bj-night";
    const script = scripts.find((item) => item.id === id) || scripts[0];
    this.setData({
      script,
      destination: options.destination ? decodeURIComponent(options.destination) : script.city || "北京",
      isCityWalk: script.mode === "citywalk",
      universes: script.universes || []
    });
  },

  chooseAnswer(event) {
    const { qid, idx } = event.currentTarget.dataset;
    const answers = { ...this.data.answers, [qid]: idx };
    this.setData({
      answers,
      answeredCount: Object.keys(answers).length
    });
  },

  nextQuiz() {
    const question = this.data.quiz[this.data.currentQuizIndex];
    if (this.data.answers[question.id] === undefined) {
      wx.showToast({ title: "请先选择一个答案", icon: "none" });
      return;
    }
    if (this.data.currentQuizIndex >= this.data.quiz.length - 1) {
      wx.showToast({ title: "已到最后一题，可分配角色", icon: "none" });
      return;
    }
    this.setData({
      currentQuizIndex: this.data.currentQuizIndex + 1
    });
  },

  prevQuiz() {
    if (this.data.currentQuizIndex <= 0) {
      return;
    }
    this.setData({
      currentQuizIndex: this.data.currentQuizIndex - 1
    });
  },

  assignRole() {
    if (Object.keys(this.data.answers).length < quiz.length) {
      wx.showToast({ title: "先完成性格测试", icon: "none" });
      return;
    }

    const score = Object.values(this.data.answers).reduce((sum, item) => sum + Number(item), 0);
    const role = roles[score % roles.length];
    this.setData({
      role,
      showRoleCard: true
    });
  },

  selectUniverse(event) {
    const { key } = event.currentTarget.dataset;
    this.setData({ selectedUniverseKey: key });
  },

  closeRole() {
    this.setData({ showRoleCard: false });
  },

  noop() {},

  startGame() {
    const { script, role, isCityWalk, selectedUniverseKey } = this.data;
    if (isCityWalk && !selectedUniverseKey) {
      wx.showToast({ title: "请先选择主题宇宙", icon: "none" });
      return;
    }
    const roleName = role ? role.name : "旅人";
    const universeQuery = isCityWalk ? `&universe=${selectedUniverseKey}` : "";
    wx.navigateTo({
      url: `/pages/game/index?scriptId=${script.id}&role=${encodeURIComponent(roleName)}&destination=${encodeURIComponent(this.data.destination)}${universeQuery}`
    });
  }
});
