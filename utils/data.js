const scripts = [
  {
    id: "bj-night",
    mode: "story",
    city: "北京",
    district: "东城区",
    title: "京城夜巡录",
    subtitle: "中轴线秘档追踪",
    tag: "热门剧本",
    cover: "https://images.unsplash.com/photo-1599571234909-29ed5d1321d6?auto=format&fit=crop&w=900&q=80",
    price: 49,
    distance: "北京·2.8km",
    theme: {
      primary: "#4f80ff",
      accent: "#9ce7ff",
      surface: "rgba(79, 128, 255, 0.18)"
    },
    worldIntro:
      "你将沿北京中轴线夜巡，逐章解锁历史信息。每读完一节剧情都会出现谜题，答对才可进入下一节。",
    chapters: [
      {
        id: 1,
        title: "第一节 · 午门暗号",
        checkpoint: { name: "午门", lat: 39.9152, lng: 116.3974, radius: 220 },
        context: "明清时期紫禁城中轴以礼制秩序为核心，门阙名称暗藏等级体系。",
        story:
          "夜色下，你在午门外接到第一份密报：失踪秘档与一枚刻有“中和”二字的铜章有关。引路人提醒你，答案就在中轴建筑命名逻辑里。你翻开旧档案，发现所有门阙名称都在强调“位序”和“节制”，这意味着案件并非盗窃那么简单，而是有人在重排整条中轴的叙事权。",
        question: "“中和”最可能对应哪类历史语义？",
        options: ["礼制平衡与秩序", "战场突袭战术", "民间行会口号"],
        answerIndex: 1,
        reveal: "你解读正确，拿到下一站坐标：景山南麓。"
      },
      {
        id: 2,
        title: "第二节 · 太和残页",
        checkpoint: { name: "太和门广场", lat: 39.9163, lng: 116.3972, radius: 220 },
        context: "太和殿所在轴线是国家礼仪核心舞台，空间层级体现政治秩序。",
        story:
          "你在太和门石阶下找到一页被雨水浸透的残卷，隐约可见“上观星，下观仪”六字。残卷背面是一张被折叠过数次的观礼图，标注了不同人群应当停留的位置。你意识到，秘档指向的不只是建筑，而是“谁可以站在哪里”的历史规则。",
        question: "这段线索最可能在强调哪种核心观念？",
        options: ["空间使用权与礼序分层", "建筑材料采购价格", "夜间巡逻人数"],
        answerIndex: 0,
        reveal: "你确认第二把钥匙，下一站指向景山。"
      },
      {
        id: 3,
        title: "第三节 · 景山回声",
        checkpoint: { name: "景山公园南门", lat: 39.9234, lng: 116.3978, radius: 220 },
        context: "景山是观察北京中轴线格局的关键点，城市规划与皇城礼序在此汇聚。",
        story:
          "你攀上景山，风中传来钟鼓楼方向的报时声。卷宗残页写着“看见中轴，才能看见全局”。你用手电沿轴线一一标记午门、景山、钟鼓楼，发现三点连线对应着秘档里的页码顺序。案件叙述者在故意引导你“按城市走读档案”。",
        question: "这段线索最强调哪种思维方式？",
        options: ["孤立看单个建筑", "从整体格局理解单点信息", "只看最新修缮记录"],
        answerIndex: 1,
        reveal: "你拼出第二层密码：终章在鼓楼附近展开。"
      },
      {
        id: 4,
        title: "第四节 · 万宁桥密语",
        checkpoint: { name: "万宁桥", lat: 39.9391, lng: 116.3923, radius: 230 },
        context: "万宁桥连接古代漕运与城市中枢，是“水陆转换”的重要节点。",
        story:
          "你在桥洞下听到两段互相矛盾的口述：一段说秘档被运往北仓，一段说它早已藏入钟楼夹层。你回看前面所有记载，发现每段证词都提到了“水陆交界”。这意味着线索并不在终点，而在路径转折。",
        question: "为什么“水陆交界”在这段推理中关键？",
        options: ["它决定了线索流转路径", "它决定了门票价格", "它代表随机噪声"],
        answerIndex: 0,
        reveal: "你锁定最后两节：钟楼与鼓楼。"
      },
      {
        id: 5,
        title: "第五节 · 钟楼静刻",
        checkpoint: { name: "钟楼", lat: 39.9417, lng: 116.3935, radius: 240 },
        context: "钟楼与鼓楼共同构成古都报时系统，承担城市节律管理功能。",
        story:
          "钟楼台阶阴影里，你摸到一块被反复刻划的木牌，上面写着“先定时，再定序”。这句话与你在午门拿到的铜章形成呼应：所有线索在告诉你，城市记忆不是静态文物，而是一套持续运转的制度。",
        question: "“先定时，再定序”更指向哪种认知？",
        options: ["秩序依赖统一节律", "秩序来源随机选择", "秩序只和商业折扣有关"],
        answerIndex: 0,
        reveal: "终章口令完整，前往鼓楼完成解锁。"
      },
      {
        id: 6,
        title: "第六节 · 鼓楼终章",
        checkpoint: { name: "鼓楼", lat: 39.9405, lng: 116.3937, radius: 240 },
        context: "钟鼓楼曾是古都报时系统核心节点，时间秩序即城市运行秩序。",
        story:
          "终局时刻，鼓楼下的档案盒需要最后一组口令。你回忆六节线索：礼制、位序、格局、水陆、报时，所有词都在指向同一主题。你将铜章嵌入锁芯，鼓声在夜里回荡，档案盒缓缓开启。盒中并非黄金，而是一份关于“中轴记忆保护”的倡议文。",
        question: "全篇最核心的主题应是？",
        options: ["随机冒险", "秩序中的城市记忆", "纯商业促销"],
        answerIndex: 1,
        reveal: "秘档成功解锁，京城夜巡录完成。"
      }
    ]
  },
  {
    id: "bj-river",
    mode: "story",
    city: "北京",
    district: "西城区",
    title: "京华河灯志",
    subtitle: "什刹海夜航文化谜局",
    tag: "口碑剧本",
    cover: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=900&q=80",
    price: 45,
    distance: "北京·3.1km",
    theme: {
      primary: "#4ac7a8",
      accent: "#9ff5df",
      surface: "rgba(74, 199, 168, 0.18)"
    },
    worldIntro: "围绕什刹海水系历史展开五章节剧情，需在实地节点完成文化问答。",
    chapters: [
      {
        id: 1,
        title: "第一节 · 荷灯旧闻",
        checkpoint: { name: "后海银锭桥", lat: 39.9396, lng: 116.3896, radius: 220 },
        context: "银锭桥是连接前后海的重要节点，曾是水运与市井文化交汇处。",
        story: "你在桥头收到一盏旧河灯，灯纸上写着“先识水脉，再识人心”。",
        question: "这句话更强调哪类观察？",
        options: ["建筑立面颜色", "水系与城市关系", "随机商铺折扣"],
        answerIndex: 1,
        reveal: "河灯底部出现暗纹，指向烟袋斜街。"
      },
      {
        id: 2,
        title: "第二节 · 斜街密信",
        checkpoint: { name: "烟袋斜街", lat: 39.9418, lng: 116.3976, radius: 220 },
        context: "烟袋斜街因形似烟袋得名，商贸文化积淀深厚。",
        story: "老铺掌柜递来信封，称真正线索藏在老街命名逻辑里。",
        question: "“斜街”命名最可能与什么有关？",
        options: ["地形道路走向", "皇帝诏书编号", "现代广告活动"],
        answerIndex: 0,
        reveal: "你获得第三节坐标：鼓楼下的报时石。"
      },
      {
        id: 3,
        title: "第三节 · 鼓声定序",
        checkpoint: { name: "鼓楼", lat: 39.9405, lng: 116.3937, radius: 240 },
        context: "鼓楼在古都中承担时间秩序播报职能。",
        story: "你听到鼓点节律和文书暗号完全吻合。",
        question: "报时系统在古都中的核心价值是？",
        options: ["装饰景观", "维护城市节律秩序", "增加夜游门票"],
        answerIndex: 1,
        reveal: "纸页边缘显出第四节线索：恭王府。"
      },
      {
        id: 4,
        title: "第四节 · 府邸回廊",
        checkpoint: { name: "恭王府", lat: 39.9355, lng: 116.3873, radius: 240 },
        context: "府邸园林强调轴线与借景，隐含身份礼序。",
        story: "回廊壁面刻有“轴、景、序”三字。",
        question: "三字组合最能对应何种传统空间理念？",
        options: ["随机堆叠", "秩序化布局", "完全对称复制"],
        answerIndex: 1,
        reveal: "最终谜门在德胜门。"
      },
      {
        id: 5,
        title: "第五节 · 德胜终钥",
        checkpoint: { name: "德胜门箭楼", lat: 39.9492, lng: 116.3793, radius: 260 },
        context: "城门体系与防御、交通、礼制共同构成古都秩序。",
        story: "终章密码浮现：城门不止守边，更守时与序。",
        question: "全剧本最终主题是？",
        options: ["城市秩序与文化记忆", "纯商业抽奖", "随机摄影挑战"],
        answerIndex: 0,
        reveal: "河灯谜局已破，获得限定徽章。"
      }
    ]
  },
  {
    id: "bj-tech",
    mode: "story",
    city: "北京",
    district: "海淀区",
    title: "海淀代码迷城",
    subtitle: "科技线索城市剧本",
    tag: "新作剧本",
    cover: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80",
    price: 52,
    distance: "北京·4.5km",
    theme: {
      primary: "#8f7bff",
      accent: "#d5ccff",
      surface: "rgba(143, 123, 255, 0.2)"
    },
    worldIntro: "从高校到创新园区的五章节推演，结合科技史与空间观察。",
    chapters: [
      {
        id: 1,
        title: "第一节 · 图书馆序章",
        checkpoint: { name: "清华大学二校门附近", lat: 40.0008, lng: 116.3269, radius: 260 },
        context: "高校空间里，图书馆往往是知识网络核心节点。",
        story: "你在旧借书卡中发现一行二进制编码。",
        question: "二进制最基础的表示单位是？",
        options: ["0 和 1", "A 和 B", "X 和 Y"],
        answerIndex: 0,
        reveal: "编码解出下一站：中关村大街。"
      },
      {
        id: 2,
        title: "第二节 · 芯片街口",
        checkpoint: { name: "中关村广场", lat: 39.9839, lng: 116.315, radius: 260 },
        context: "中关村承载着北京科技创业生态演进史。",
        story: "你拿到一张旧电路图，缺失关键模块。",
        question: "电路“闭环”最关键的条件是？",
        options: ["路径可导通", "颜色一致", "材质昂贵"],
        answerIndex: 0,
        reveal: "你补全了线路，获得第三站情报。"
      },
      {
        id: 3,
        title: "第三节 · 数据走廊",
        checkpoint: { name: "五道口地铁站", lat: 39.9928, lng: 116.3385, radius: 260 },
        context: "交通节点与商业节点耦合，形成高频数据流。",
        story: "终端屏幕显示异常波动，疑似数据被篡改。",
        question: "识别数据异常首先要做什么？",
        options: ["建立基线并对比", "直接删除数据", "关闭所有服务"],
        answerIndex: 0,
        reveal: "异常源指向软件园。"
      },
      {
        id: 4,
        title: "第四节 · 软件园密档",
        checkpoint: { name: "中关村软件园", lat: 40.0473, lng: 116.2915, radius: 300 },
        context: "园区协作体系强调研发、测试、部署闭环。",
        story: "你在会议白板上看到“版本回滚”字样。",
        question: "回滚机制的价值主要是？",
        options: ["快速恢复稳定状态", "增加新错误", "替代测试流程"],
        answerIndex: 0,
        reveal: "最后一节在奥森观景台。"
      },
      {
        id: 5,
        title: "第五节 · 奥森终局",
        checkpoint: { name: "奥林匹克森林公园南门", lat: 40.0185, lng: 116.3972, radius: 280 },
        context: "开放空间是科技与生活融合场景的重要实验场。",
        story: "所有线索合并后，你确认真正目标是“可持续创新”。",
        question: "全篇主旨更接近哪项？",
        options: ["技术与城市协同进化", "单点爆款营销", "孤立炫技展示"],
        answerIndex: 0,
        reveal: "科技迷城通关，解锁稀有道具。"
      }
    ]
  },
  {
    id: "city-walk",
    mode: "citywalk",
    city: "北京",
    district: "朝阳区",
    title: "City Walk·城芯漫游",
    subtitle: "主题宇宙收集任务",
    tag: "轻松路线",
    cover: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&q=80",
    price: 19,
    distance: "1.2km",
    theme: {
      primary: "#ff7d6d",
      accent: "#ffd6cf",
      surface: "rgba(255, 125, 109, 0.2)"
    },
    universes: [
      {
        key: "color",
        name: "颜色宇宙",
        desc: "通过 AR 实景拍照收集颜色线索",
        tasks: [
          {
            id: "color-red",
            title: "赤色档案",
            prompt: "在街区中收集 5 个红色物品并上传。",
            targetCount: 5,
            checkpoint: { name: "三里屯太古里", lat: 39.9364, lng: 116.4543, radius: 280 },
            question: "以下哪种色彩心理联想最接近“红色”？",
            options: ["冷静疏离", "热烈与警觉", "克制与中性"],
            answerIndex: 1
          },
          {
            id: "color-green",
            title: "青绿呼吸",
            prompt: "上传 2 张绿色场景照片（树叶/招牌均可）。",
            targetCount: 2,
            checkpoint: { name: "朝阳公园", lat: 39.9385, lng: 116.4747, radius: 320 },
            question: "绿色在城市导视中常见意义是？",
            options: ["紧急危险", "安全通行/生态", "禁止进入"],
            answerIndex: 1
          }
        ]
      },
      {
        key: "shape",
        name: "形状宇宙",
        desc: "捕捉城市几何语言并完成观察题",
        tasks: [
          {
            id: "shape-circle",
            title: "圆形收集令",
            prompt: "找到 3 个圆形元素（井盖、路牌、灯饰）并上传。",
            targetCount: 3,
            checkpoint: { name: "国贸地铁站", lat: 39.9084, lng: 116.4597, radius: 280 },
            question: "圆形在视觉上更容易传达哪种感受？",
            options: ["稳定完整", "尖锐冲突", "方向指令"],
            answerIndex: 0
          },
          {
            id: "shape-triangle",
            title: "三角警示",
            prompt: "拍 2 张三角结构或标识。",
            targetCount: 2,
            checkpoint: { name: "望京SOHO", lat: 39.9954, lng: 116.4738, radius: 320 },
            question: "交通标识里三角形常用于表达？",
            options: ["提示/警示", "无条件通过", "服务信息"],
            answerIndex: 0
          }
        ]
      },
      {
        key: "texture",
        name: "材质宇宙",
        desc: "发现城市表面的触感语言",
        tasks: [
          {
            id: "texture-metal",
            title: "金属光谱",
            prompt: "拍 3 张反光金属元素（栏杆/雕塑/门面）。",
            targetCount: 3,
            checkpoint: { name: "798艺术区", lat: 39.9841, lng: 116.4962, radius: 300 },
            question: "金属材质在视觉上常强调？",
            options: ["轻柔蓬松", "冷感与硬朗", "模糊边界"],
            answerIndex: 1
          },
          {
            id: "texture-wood",
            title: "木纹记忆",
            prompt: "上传 2 张木质元素照片（门窗/桌椅）。",
            targetCount: 2,
            checkpoint: { name: "南锣鼓巷", lat: 39.9378, lng: 116.4039, radius: 260 },
            question: "木质元素更容易传达什么感受？",
            options: ["温度与亲和", "机械与距离", "高频噪声"],
            answerIndex: 0
          }
        ]
      },
      {
        key: "sound",
        name: "声音宇宙",
        desc: "在环境声音中完成观察与归类",
        tasks: [
          {
            id: "sound-traffic",
            title: "交通频谱",
            prompt: "录制或拍摄 2 段交通流场景上传。",
            targetCount: 2,
            checkpoint: { name: "西直门桥", lat: 39.9408, lng: 116.3538, radius: 320 },
            question: "高峰交通声更接近哪类声音特征？",
            options: ["连续高密度", "间歇低频", "绝对静音"],
            answerIndex: 0
          },
          {
            id: "sound-market",
            title: "市集脉冲",
            prompt: "采集 2 处市集或店铺叫卖场景。",
            targetCount: 2,
            checkpoint: { name: "簋街", lat: 39.9409, lng: 116.4329, radius: 260 },
            question: "市集声音的功能更偏向？",
            options: ["信息聚合与引导", "单一警报", "无效噪音"],
            answerIndex: 0
          }
        ]
      }
    ]
  }
];

const merchants = [
  { id: "m1", name: "鼓楼胡同茶铺", promo: "到店解锁 8 折券 + 体力药水 x1" },
  { id: "m2", name: "中轴文创社", promo: "剧情完成赠限定徽章挂件兑换码" }
];

module.exports = {
  scripts,
  merchants
};
