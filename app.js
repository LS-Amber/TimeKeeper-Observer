const STORAGE_KEY = "dimension-observer-github-pages-v1";
const MIN_COUNTABLE_HOURS = 1 / 3600;

const PLANET_OPTIONS = {
  rock: { name: "岩石行星", hint: "演化速度中等，文明诞生概率高" },
  gas: { name: "气态行星", hint: "前期缓慢，后期可能出现高空文明" },
  ice: { name: "冰巨星", hint: "环境恶劣但韧性强，适合高风险世界线" }
};

const SPECIES_OPTIONS = {
  carbon: { name: "碳基生物", hint: "贴近地球式文明演化" },
  silicon: { name: "硅基生物", hint: "晶体网络、机械文明更常见" },
  ocean: { name: "海洋生物", hint: "深海、潮汐与海盆文明更常见" }
};

const STAGES = [
  {
    id: "birth",
    name: "星球诞生",
    min: 0,
    max: 5,
    description: "无生命，仅地质活动、火山喷发与大气形成。",
    perTwoHoursYears: 100000000,
    ruleText: "现实 2h = 1 亿年",
    icon: "🪐"
  },
  {
    id: "life",
    name: "生命孕育",
    min: 5,
    max: 20,
    description: "单细胞生命出现，海洋与稳定气候窗口逐步形成。",
    perTwoHoursYears: 10000000,
    ruleText: "现实 2h = 1000 万年",
    icon: "🧫"
  },
  {
    id: "dawn",
    name: "文明萌芽",
    min: 20,
    max: 50,
    description: "多细胞扩张，原始部落、火与工具开始改变地表。",
    perTwoHoursYears: 1000000,
    ruleText: "现实 2h = 100 万年",
    icon: "🔥"
  },
  {
    id: "agriculture",
    name: "农业时代",
    min: 50,
    max: 100,
    description: "农业、城邦与文字出现，记忆开始长久保留。",
    perTwoHoursYears: 100000,
    ruleText: "现实 2h = 10 万年",
    icon: "🌾"
  },
  {
    id: "industry",
    name: "工业时代",
    min: 100,
    max: 200,
    description: "工业革命、城市化与大规模能源使用改变世界。",
    perTwoHoursYears: 100,
    ruleText: "现实 2h = 100 年",
    icon: "🏭"
  },
  {
    id: "information",
    name: "信息时代",
    min: 200,
    max: 500,
    description: "网络、人工智能与轨道设施正在重塑文明结构。",
    perTwoHoursYears: 10,
    ruleText: "现实 2h = 10 年",
    icon: "🛰️"
  },
  {
    id: "interstellar",
    name: "星际时代",
    min: 500,
    max: Infinity,
    description: "文明走向恒星际，开始面对更高维的回声。",
    perTwoHoursYears: 1,
    ruleText: "现实 2h = 1 年",
    icon: "🚀"
  }
];

const STAGE_EVENTS = {
  birth: [
    "全球火山链保持活跃，新的大气配方正在形成，雨带开始在高温地壳上循环。",
    "小行星携带矿物与水冰撞入海盆，年轻地表出现了第一批长期稳定的热液喷口。",
    "板块边界从混乱向稳定过渡，持续降雨把矿物盐分冲入原始海洋。",
    "年轻星球经历了漫长雷暴，闪电与高热环境让复杂化学链更频繁地诞生。",
    "整颗行星仍在冷却，但局部大陆边缘已出现能够长期维持液态水的窗口。"
  ],
  life: [
    "海洋中出现了更稳定的复制体系，单细胞生命开始缓慢改变大气成分。",
    "藻类与菌膜扩张到了浅海与温泉区，氧气含量出现了可测量的缓慢上升。",
    "潮汐与昼夜节律为生命提供了新的节奏，生态位开始细分。",
    "原始海盆里的多样性明显提升，部分生命体已经学会互利共生。",
    "深海热泉持续供能，生命从偶发事件逐渐变成全球性的长期趋势。"
  ],
  dawn: [
    "陆地与浅海边缘出现了更复杂的群落，工具、火种与记忆传统开始出现。",
    "原始部族在迁徙中建立了最早的合作秩序，语言雏形提升了生存效率。",
    "某些物种完成了从被动适应到主动改造环境的关键跃迁。",
    "早期猎手与采集者已经能跨越季节组织集体行动，社会结构开始分层。",
    "群体意识的稳定传承带来了神话、禁忌与最早的制度萌芽。"
  ],
  agriculture: [
    "农业扩散速度很快，定居点周围出现了灌溉、储粮与基础分工。",
    "城邦之间形成了贸易路线，文字第一次被用于跨代记录权力与收成。",
    "人口密度上升推动了组织效率，也让疾病与战争开始具备长期影响。",
    "季风与河流塑造了文明中心，贵族、神庙和工匠群体逐渐分化。",
    "技术与信仰共同巩固了秩序，历史叙事第一次从口耳相传走向制度化。"
  ],
  industry: [
    "蒸汽、燃烧与矿产资源把这颗星球推入了工业跃迁，城市光带开始出现。",
    "机器生产让财富与污染同时爆发，社会组织和阶层矛盾迅速加剧。",
    "远距离交通与工厂网络提升了文明效率，也扩大了战争与瘟疫的传播范围。",
    "工业基础设施铺开后，地表被重新切割，山脉、河流与海岸线都被纳入生产逻辑。",
    "能源革命重写了文明节奏，少数决定正在影响未来数个世纪的命运。"
  ],
  information: [
    "全球信息网络已经成形，知识扩散速度第一次超过地理扩张速度。",
    "算法与数据平台正在重新组织社会关系，现实与虚拟的边界逐渐变薄。",
    "人工智能加入决策链后，文明效率提升，但对失控风险的担忧也在加深。",
    "低轨道设施与深空探测相继出现，文明开始第一次抬头观察自己之外的黑暗。",
    "高密度协作让科技爆发式增长，旧制度却难以完全承载新的速度。"
  ],
  interstellar: [
    "轨道都市与深空航线变得常见，这个文明已经具备跨星系叙事的雏形。",
    "高能推进、长期休眠与异星生态改造技术正在同时发展。",
    "他们开始遇见比母星更残酷的宇宙尺度：沉默、距离、资源与未知的敌意。",
    "跨恒星通信暴露了文明内部的新裂痕：扩张、克制、交流还是征服。",
    "高维观测站注意到，他们终于拥有了与黑暗森林对视的能力。"
  ]
};

const PLANET_FRAGMENTS = {
  rock: [
    "岩石行星稳定的地表结构让山脉、海盆与大陆漂移成为文明演化的重要舞台。",
    "坚实地壳与板块活动为资源循环提供了长期支撑。",
    "大陆边缘的气候带差异催生了更加多样的生态区与文明节点。"
  ],
  gas: [
    "气态行星的高空层积云与漂浮结构让生命不得不依附风暴与浮岛求生。",
    "大气深层的压力梯度持续筛选生命，只有极端适应者才能留下。",
    "高空风暴带与电磁异常让文明的基础科学与飞行技术更早发达。"
  ],
  ice: [
    "冰壳之下的液态海洋与裂谷热源成为生命主要的温床。",
    "低温与长夜迫使生物把韧性与储能能力发展到惊人的程度。",
    "极地风暴和冻结周期频繁清洗生态系统，也让幸存者异常强悍。"
  ]
};

const SPECIES_FRAGMENTS = {
  carbon: [
    "碳基生命延续出清晰的生态链与社会分工，文明叙事格外完整。",
    "这些生命体对气候、食物链与群体协作十分敏感，社会演化路径清晰可读。",
    "血肉与繁殖压力共同推动了他们的技术、战争与伦理。"
  ],
  silicon: [
    "硅基生命的记忆结构更接近矿物纹路与晶体网络，演化路线异常独特。",
    "他们对高温、辐射和压力的承受能力明显更强，技术跃迁常带有机械美感。",
    "晶体神经与矿物共振让他们的文明像一座会思考的地层。"
  ],
  ocean: [
    "海洋生物文明受到潮汐、海流与海底火山的强烈支配，城市更像生态网络。",
    "深海环境让他们对声波、压力与群体协作有天然优势。",
    "文明中心往往不是大陆，而是海沟、珊瑚带与热泉链。"
  ]
};

const CRISIS_EVENTS = {
  dawn: [
    "局部火山冬天导致多个族群灭绝，幸存者被迫大规模迁徙。",
    "一次长季旱灾让原始部落间冲突加剧，资源掠夺成为新的生存法则。"
  ],
  agriculture: [
    "谷仓鼠疫在多座城邦间扩散，人口在一个周期内出现断崖式下滑。",
    "王权争夺触发持续内战，文字记录第一次系统性记载了大规模屠杀。"
  ],
  industry: [
    "煤烟与化工泄漏在多个工业中心叠加，引发生态链局部塌陷。",
    "战争机器开始脱离旧秩序控制，边境冲突正在向全面战争滑去。"
  ],
  information: [
    "算法极化和信息瘟疫让社会信任快速崩解，极端阵营不断扩张。",
    "实验室事故与高传染性病原体叠加，医疗系统接近失衡。"
  ],
  interstellar: [
    "殖民舰队带回了陌生病原和不可逆生态扰动，外围定居点大片失联。",
    "深空扩张派与母星守成派爆发严重分裂，文明统一叙事正在瓦解。"
  ]
};

const EXTINCTION_EVENTS = {
  early: [
    "超级撞击撕开了尚未稳定的地壳，整个样本世界陷入长期熔融与失联。",
    "大气层在连续高能事件中崩塌，液态水窗口彻底关闭，生命孕育链条被中断。",
    "磁场衰竭与辐射风暴同时出现，这颗星球再也没有形成复杂生命。"
  ],
  middle: [
    "持续多代的战争、饥荒与瘟疫最终切断了文明延续链，样本在沉默中衰亡。",
    "火山冬天与海洋酸化叠加，生态系统跨过恢复阈值，主导物种全部灭绝。",
    "极端王朝把资源耗尽后又引发全面冲突，文明中心在短时间内全部熄灭。"
  ],
  late: [
    "工业扩张、战争升级与生态崩坏共同触发不可逆坍塌，母星文明宣告终止。",
    "高技术系统失控后反过来摧毁基础设施，幸存者无法重建全球秩序。",
    "深空扩张引来的冲突与病原回流重创母星，文明在巅峰之后迅速黑暗化。",
    "他们终于抬头看见宇宙，但没来得及学会克制，文明在自毁中归于沉寂。"
  ]
};

const CHOICE_EVENTS = [
  {
    id: "birth-atmosphere",
    threshold: 3,
    stageId: "birth",
    prompt: "这颗年轻星球正在决定早期环境基调。你要把观测资源投向哪里？",
    options: [
      {
        label: "稳定磁场与大气层",
        effect: { ecology: 1, resilience: 1 },
        result: "磁层更早稳定下来，长期降雨与液态海洋窗口被成功保住。"
      },
      {
        label: "保留高能撞击环境",
        effect: { tech: 1, aggression: 1 },
        result: "极端环境加速了结构分化，但未来生命也更容易习惯竞争与暴烈。"
      }
    ]
  },
  {
    id: "life-cooperation",
    threshold: 12,
    stageId: "life",
    prompt: "最早生命突破自复制瓶颈后，你要重点追踪哪种生存策略？",
    options: [
      {
        label: "强化共生与合作生态",
        effect: { ecology: 2, aggression: -1 },
        result: "生态网的自愈能力明显提高，未来文明更倾向合作与稳定。"
      },
      {
        label: "偏向竞争与快速变异",
        effect: { tech: 1, aggression: 1 },
        result: "演化速度变快，但掠食与排斥机制也更强烈。"
      }
    ]
  },
  {
    id: "dawn-memory",
    threshold: 28,
    stageId: "dawn",
    prompt: "智慧群体开始形成神话与制度雏形。你希望他们优先发展什么？",
    options: [
      {
        label: "记忆、仪式与长期传承",
        effect: { resilience: 1, ecology: 1 },
        result: "这些群体更愿意保存知识与秩序，灾后恢复能力明显提升。"
      },
      {
        label: "扩张、狩猎与部族竞争",
        effect: { aggression: 2, tech: 1 },
        result: "扩张速度更快，冲突与英雄叙事成为文明底色。"
      }
    ]
  },
  {
    id: "agriculture-order",
    threshold: 72,
    stageId: "agriculture",
    prompt: "农业文明进入扩张期，你决定优先关注哪条发展支线？",
    options: [
      {
        label: "水利、储粮与公共秩序",
        effect: { ecology: 1, resilience: 2 },
        result: "大型水利和仓储体系提升了抗灾能力，文明更耐久。"
      },
      {
        label: "神权王朝与征服扩张",
        effect: { aggression: 2, tech: 1 },
        result: "统一推进更快，但战争与权力斗争会长期埋伏在制度之中。"
      }
    ]
  },
  {
    id: "industry-energy",
    threshold: 140,
    stageId: "industry",
    prompt: "工业革命全面爆发。观测站要求你确定他们的能源倾向。",
    options: [
      {
        label: "优先发展清洁能源",
        effect: { ecology: 2, resilience: 1, tech: 1 },
        result: "演化速度略慢，但生态代价更低，文明寿命更长。"
      },
      {
        label: "大力发展化石能源",
        effect: { tech: 2, ecology: -2, aggression: 1 },
        result: "工业效率暴涨，污染和资源掠夺也同步加剧。"
      }
    ]
  },
  {
    id: "information-governance",
    threshold: 260,
    stageId: "information",
    prompt: "信息时代来临，人工智能开始加入治理。你希望他们走向哪里？",
    options: [
      {
        label: "开放协作与透明技术",
        effect: { ecology: 1, resilience: 1, tech: 1, aggression: -1 },
        result: "知识更快流动，社会信任相对稳定，但扩张节奏更克制。"
      },
      {
        label: "全面监控与高压秩序",
        effect: { tech: 2, aggression: 2, ecology: -1 },
        result: "效率被迅速推高，但失控后的代价也将更可怕。"
      }
    ]
  },
  {
    id: "interstellar-contact",
    threshold: 620,
    stageId: "interstellar",
    prompt: "他们第一次面对真正的星际选择：交流、克制，还是武装扩张？",
    options: [
      {
        label: "谨慎外交，优先交流",
        effect: { resilience: 1, ecology: 1, aggression: -1 },
        result: "文明在接触未知时保持了罕见的克制，存活概率提高。"
      },
      {
        label: "军事扩张，先手威慑",
        effect: { tech: 1, aggression: 3 },
        result: "军备增长极快，但黑暗森林里的回声往往不止一种。"
      }
    ]
  }
];

let state = loadState();
let activeView = "main";
let timerId = null;

function getDefaultState() {
  return {
    observerSince: null,
    theme: "nebula",
    lifetimeHours: 0,
    lastExitAt: null,
    setupNotice: "",
    recentLogs: [],
    world: null
  };
}

function getWorldDefaults() {
  return {
    id: null,
    createdAt: null,
    planetType: "rock",
    speciesFocus: "carbon",
    totalHours: 0,
    pendingHours: 0,
    running: false,
    runningStartedAt: null,
    lastOfflineHours: 0,
    alive: true,
    extinctionReason: "",
    currentReport: null,
    completedChoices: [],
    choiceHistory: [],
    traits: {
      ecology: 0,
      tech: 0,
      resilience: 0,
      aggression: 0
    }
  };
}

function generateId() {
  return `world-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function createWorld(planetType, speciesFocus) {
  const traits = {
    ecology: 0,
    tech: 0,
    resilience: 0,
    aggression: 0
  };

  if (planetType === "rock") {
    traits.ecology += 1;
  }
  if (planetType === "gas") {
    traits.tech += 1;
    traits.resilience -= 1;
  }
  if (planetType === "ice") {
    traits.resilience += 2;
    traits.ecology -= 1;
  }
  if (speciesFocus === "carbon") {
    traits.ecology += 1;
  }
  if (speciesFocus === "silicon") {
    traits.tech += 2;
    traits.ecology -= 1;
  }
  if (speciesFocus === "ocean") {
    traits.ecology += 2;
    traits.aggression -= 1;
  }

  return {
    ...getWorldDefaults(),
    id: generateId(),
    createdAt: Date.now(),
    planetType,
    speciesFocus,
    traits
  };
}

function sanitizeWorld(world) {
  const base = getWorldDefaults();
  return {
    ...base,
    ...world,
    completedChoices: Array.isArray(world.completedChoices) ? world.completedChoices : [],
    choiceHistory: Array.isArray(world.choiceHistory) ? world.choiceHistory : [],
    traits: {
      ...base.traits,
      ...(world.traits || {})
    }
  };
}

function loadState() {
  const base = getDefaultState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return base;
    }

    const parsed = JSON.parse(raw);
    const merged = {
      ...base,
      ...parsed
    };

    merged.recentLogs = Array.isArray(merged.recentLogs) ? merged.recentLogs : [];
    merged.world = merged.world ? sanitizeWorld(merged.world) : null;
    merged.theme = merged.theme === "aurora" ? "aurora" : "nebula";

    return merged;
  } catch {
    return base;
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getCurrentWorld() {
  return state.world;
}

function addHoursToWorld(hours) {
  if (!state.world || !state.world.alive || hours <= 0) {
    return;
  }

  state.world.totalHours += hours;
  state.world.pendingHours += hours;
  state.lifetimeHours += hours;
}

function getRunningHoursDelta() {
  if (!state.world || !state.world.running || !state.world.runningStartedAt) {
    return 0;
  }

  return Math.max(0, (Date.now() - state.world.runningStartedAt) / 3600000);
}

function getDisplayedLifetimeHours() {
  return state.lifetimeHours + getRunningHoursDelta();
}

function getDisplayedWorldHours() {
  if (!state.world) {
    return 0;
  }
  return state.world.totalHours + getRunningHoursDelta();
}

function getDisplayedPendingHours() {
  if (!state.world) {
    return 0;
  }
  return state.world.pendingHours + getRunningHoursDelta();
}

function formatHourValue(hours) {
  return `${hours.toFixed(2)} 小时`;
}

function formatHumanHours(hours) {
  const totalMinutes = Math.floor(hours * 60);

  if (totalMinutes <= 0) {
    return "不到 1 分钟";
  }

  const days = Math.floor(totalMinutes / 1440);
  const remainingAfterDays = totalMinutes % 1440;
  const wholeHours = Math.floor(remainingAfterDays / 60);
  const minutes = remainingAfterDays % 60;

  const parts = [];
  if (days) parts.push(`${days}天`);
  if (wholeHours) parts.push(`${wholeHours}小时`);
  if (minutes) parts.push(`${minutes}分钟`);

  return parts.join("");
}

function formatClock(totalSeconds) {
  const seconds = Math.max(0, totalSeconds);
  const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${secs}`;
}

function formatDateTime(timestamp) {
  if (!timestamp) {
    return "-";
  }

  return new Date(timestamp).toLocaleString("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit"
  });
}

function formatCosmicYears(years) {
  if (years >= 100000000) {
    return `${(years / 100000000).toFixed(2)} 亿年`;
  }
  if (years >= 10000) {
    return `${(years / 10000).toFixed(2)} 万年`;
  }
  if (years >= 1) {
    return `${years.toFixed(years < 10 ? 1 : 0)} 年`;
  }

  const months = years * 12;
  if (months >= 1) {
    return `${months.toFixed(1)} 个月`;
  }

  const days = years * 365;
  return `${Math.max(1, Math.round(days))} 天`;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getCurrentStage(hours) {
  return STAGES.find((stage) => hours >= stage.min && hours < stage.max) || STAGES[STAGES.length - 1];
}

function getStageProgress(hours) {
  const stage = getCurrentStage(hours);

  if (!Number.isFinite(stage.max)) {
    return {
      percent: 100,
      text: "已进入最终阶段，时间换算已接近现实。"
    };
  }

  const total = stage.max - stage.min;
  const current = clamp(hours - stage.min, 0, total);
  const percent = (current / total) * 100;
  const remaining = Math.max(0, stage.max - hours);

  return {
    percent,
    text: `距离下一阶段还需 ${formatHumanHours(remaining)}。`
  };
}

function convertRealHoursToPlanetYears(realHours, stage) {
  return (realHours * stage.perTwoHoursYears) / 2;
}

function pushLog(kind, title, text) {
  state.recentLogs.unshift({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    kind,
    title,
    text,
    createdAt: Date.now()
  });

  state.recentLogs = state.recentLogs.slice(0, 12);
}

function readSelectedRadio(name) {
  const target = document.querySelector(`input[name="${name}"]:checked`);
  return target ? target.value : "";
}

function updateSetupPreview() {
  const planetType = readSelectedRadio("planetType") || "rock";
  const speciesFocus = readSelectedRadio("speciesFocus") || "carbon";
  const preview = document.getElementById("setupPreview");

  preview.textContent = `将以 ${PLANET_OPTIONS[planetType].name} + ${SPECIES_OPTIONS[speciesFocus].name} 建立新的观测对象。`;
}

function syncOfflineTime() {
  const now = Date.now();

  if (!state.observerSince) {
    state.observerSince = now;
  }

  if (state.world && state.world.running && state.world.runningStartedAt) {
    const fallbackHours = Math.max(0, (now - state.world.runningStartedAt) / 3600000);
    if (fallbackHours > MIN_COUNTABLE_HOURS && state.world.alive) {
      addHoursToWorld(fallbackHours);
    }
    state.world.running = false;
    state.world.runningStartedAt = null;
    state.world.lastOfflineHours = 0;
    state.lastExitAt = now;
    saveState();
    return;
  }

  if (state.world && state.world.alive && state.lastExitAt) {
    const offlineHours = Math.max(0, (now - state.lastExitAt) / 3600000);
    state.world.lastOfflineHours = offlineHours;

    if (offlineHours > MIN_COUNTABLE_HOURS) {
      addHoursToWorld(offlineHours);
    }
  } else if (state.world) {
    state.world.lastOfflineHours = 0;
  }

  state.lastExitAt = now;
  saveState();
}

function persistOnExit() {
  if (state.world && state.world.running) {
    commitRunningSession();
  }
  state.lastExitAt = Date.now();
  saveState();
}

function commitRunningSession() {
  if (!state.world || !state.world.running || !state.world.runningStartedAt) {
    return;
  }

  const deltaHours = Math.max(0, (Date.now() - state.world.runningStartedAt) / 3600000);
  if (deltaHours > 0) {
    addHoursToWorld(deltaHours);
  }

  state.world.running = false;
  state.world.runningStartedAt = null;
  saveState();
}

function hasPendingChoiceReport() {
  return !!(state.world && state.world.currentReport && state.world.currentReport.type === "choice");
}

function startObservation() {
  if (!state.world || !state.world.alive) {
    activeView = "setup";
    render();
    return;
  }

  if (hasPendingChoiceReport()) {
    activeView = "report";
    render();
    return;
  }

  if (!state.world.running) {
    state.world.running = true;
    state.world.runningStartedAt = Date.now();
    saveState();
    render();
  }
}

function pauseObservation() {
  commitRunningSession();
  render();
}

function getPendingChoiceEvent(totalHours) {
  if (!state.world) {
    return null;
  }

  return CHOICE_EVENTS.find((event) => {
    return totalHours >= event.threshold && !state.world.completedChoices.includes(event.id);
  }) || null;
}

function makeIntroReport(world) {
  return {
    type: "intro",
    title: "📡 观测档案建立完成",
    meta: `${PLANET_OPTIONS[world.planetType].name} · ${SPECIES_OPTIONS[world.speciesFocus].name}`,
    icon: "📡",
    text:
      `你已成为一名高维空间文明观测员。\n\n` +
      `当前样本：${PLANET_OPTIONS[world.planetType].name} / ${SPECIES_OPTIONS[world.speciesFocus].name}\n` +
      `时间规则会随着文明阶段推进逐步贴近现实。\n\n` +
      `现在可以在主控台开始记录学习 / 工作时间，也可以直接返回观测站查看后续演化。`
  };
}

function makeIdleReport() {
  const world = getCurrentWorld();
  const stage = world ? getCurrentStage(world.totalHours) : STAGES[0];

  return {
    type: "idle",
    title: "🔭 暂无新的观测变化",
    meta: `${stage.name} · 继续记录时间后再回来`,
    icon: "🔭",
    text: "这一次返回观测站没有新的已结算时长。先去开始观测、暂停计时，或过段时间再回来查看。"
  };
}

function getTraitNarrative() {
  if (!state.world) {
    return "";
  }

  const notes = [];
  const traits = state.world.traits;

  if (traits.ecology >= 2) {
    notes.push("生态网络展现出较强的自愈力，灾后恢复速度高于平均样本。");
  }
  if (traits.ecology <= -2) {
    notes.push("生态系统已经出现明显脆化迹象，任何大型灾难都更容易引发连锁崩坏。");
  }
  if (traits.tech >= 2) {
    notes.push("技术扩散速度很快，知识在各区域之间传播得异常高效。");
  }
  if (traits.resilience >= 2) {
    notes.push("这个世界的韧性显著偏高，即便遭受打击也更容易留下幸存火种。");
  }
  if (traits.aggression >= 2) {
    notes.push("资源竞争与冲突倾向持续累积，战争或内耗风险明显上升。");
  }
  if (traits.aggression <= -1) {
    notes.push("合作与克制倾向在这个样本里更常见，群体对冲突的容忍度较低。");
  }

  const lastChoice = state.world.choiceHistory[0];
  if (lastChoice) {
    notes.push(`你此前选择“${lastChoice.optionLabel}”的影响仍在持续发酵。`);
  }

  return notes.slice(0, 2).join("\n\n");
}

function computeExtinctionRisk(stage, pendingHours) {
  if (!state.world) {
    return 0;
  }

  const traits = state.world.traits;
  let risk = 0.008;

  if (stage.id === "dawn") risk += 0.01;
  if (stage.id === "agriculture") risk += 0.02;
  if (stage.id === "industry") risk += 0.05;
  if (stage.id === "information") risk += 0.08;
  if (stage.id === "interstellar") risk += 0.12;

  risk += Math.max(0, traits.aggression) * 0.02;
  risk += Math.max(0, -traits.ecology) * 0.025;
  risk -= Math.max(0, traits.resilience) * 0.015;

  if (state.world.planetType === "ice" && stage.min < 20) {
    risk += 0.015;
  }
  if (state.world.planetType === "gas" && stage.id === "birth") {
    risk += 0.01;
  }
  if (state.world.speciesFocus === "ocean" && (stage.id === "industry" || stage.id === "information")) {
    risk += 0.01;
  }

  const durationFactor = clamp(0.65 + pendingHours / 6, 0.65, 1.7);
  return clamp(risk * durationFactor, 0.01, 0.45);
}

function maybeCreateExtinctionReport(pendingHours, stage) {
  if (!state.world || !state.world.alive) {
    return false;
  }

  const risk = computeExtinctionRisk(stage, pendingHours);
  const roll = Math.random();

  if (roll >= risk) {
    return false;
  }

  let reasonPool = EXTINCTION_EVENTS.late;
  if (stage.min < 20) {
    reasonPool = EXTINCTION_EVENTS.early;
  } else if (stage.min < 100) {
    reasonPool = EXTINCTION_EVENTS.middle;
  }

  const converted = convertRealHoursToPlanetYears(pendingHours, stage);
  const reason = pick(reasonPool);
  const title = stage.min < 20 ? "☄️ 样本星球失联" : "☄️ 文明观测终止";

  state.world.alive = false;
  state.world.extinctionReason = reason;
  state.world.pendingHours = 0;
  state.world.currentReport = {
    type: "extinction",
    title,
    meta: `${stage.name} · 样本终止`,
    icon: "☄️",
    text:
      `本次观测结算：现实 ${formatHumanHours(pendingHours)}，约等于星球 ${formatCosmicYears(converted)}。\n\n` +
      `${reason}\n\n` +
      `观测目标已被判定为灭绝 / 失联。你需要重新选择新的观测对象继续观测，但累计总观测时长将完整保留。`
  };

  state.setupNotice = "上一颗观测样本已经毁灭，请重新选择新的观测对象。";
  pushLog("extinction", title, reason);
  return true;
}

function buildBriefReport(pendingHours, stage) {
  const converted = convertRealHoursToPlanetYears(pendingHours, stage);
  const eventText = pick(STAGE_EVENTS[stage.id]);
  const planetText = pick(PLANET_FRAGMENTS[state.world.planetType]);
  const speciesText = pick(SPECIES_FRAGMENTS[state.world.speciesFocus]);
  const traitText = getTraitNarrative();
  const crisisPool = CRISIS_EVENTS[stage.id] || [];
  const risk = computeExtinctionRisk(stage, pendingHours);
  const crisisText = crisisPool.length && risk > 0.09 && Math.random() < 0.5 ? pick(crisisPool) : "";

  const parts = [
    `本次观测结算：现实 ${formatHumanHours(pendingHours)}，约等于星球 ${formatCosmicYears(converted)}。`,
    eventText,
    planetText,
    speciesText
  ];

  if (traitText) {
    parts.push(traitText);
  }
  if (crisisText) {
    parts.push(`风险提示：${crisisText}`);
  }

  return {
    type: "brief",
    title: `${stage.icon} ${stage.name}观测简报`,
    meta: `${stage.name} · ${stage.ruleText}`,
    icon: stage.icon,
    text: parts.join("\n\n")
  };
}

function buildChoiceReport(event, pendingHours, stage) {
  const converted = convertRealHoursToPlanetYears(pendingHours, stage);

  return {
    type: "choice",
    title: `${stage.icon} 关键抉择`,
    meta: `${stage.name} · ${stage.ruleText}`,
    icon: "🧭",
    eventId: event.id,
    text:
      `本次观测结算：现实 ${formatHumanHours(pendingHours)}，约等于星球 ${formatCosmicYears(converted)}。\n\n` +
      `${event.prompt}\n\n` +
      `你的选择会影响后续简报、文明倾向，甚至毁灭风险。`,
    options: event.options.map((option) => ({
      label: option.label,
      result: option.result,
      effect: option.effect
    }))
  };
}

function generateStationReport() {
  if (!state.world) {
    activeView = "setup";
    render();
    return;
  }

  if (!state.world.alive) {
    if (!state.world.currentReport || state.world.currentReport.type !== "extinction") {
      const stage = getCurrentStage(state.world.totalHours);
      state.world.currentReport = {
        type: "extinction",
        title: "☄️ 文明观测终止",
        meta: `${stage.name} · 样本终止`,
        icon: "☄️",
        text:
          `${state.world.extinctionReason || "上一颗样本已经毁灭。"}\n\n` +
          `你需要重新选择新的观测对象，但累计总观测时长不会丢失。`
      };
    }
    saveState();
    activeView = "report";
    render();
    return;
  }

  commitRunningSession();

  if (state.world.currentReport && state.world.currentReport.type === "choice") {
    activeView = "report";
    render();
    return;
  }

  if (!state.world.currentReport && state.world.totalHours === 0) {
    state.world.currentReport = makeIntroReport(state.world);
    saveState();
    activeView = "report";
    render();
    return;
  }

  const pendingHours = state.world.pendingHours;
  if (pendingHours <= MIN_COUNTABLE_HOURS) {
    state.world.currentReport = makeIdleReport();
    saveState();
    activeView = "report";
    render();
    return;
  }

  const totalHours = state.world.totalHours;
  const stage = getCurrentStage(totalHours);
  const choiceEvent = getPendingChoiceEvent(totalHours);

  if (choiceEvent) {
    state.world.pendingHours = 0;
    state.world.currentReport = buildChoiceReport(choiceEvent, pendingHours, stage);
    saveState();
    activeView = "report";
    render();
    return;
  }

  if (maybeCreateExtinctionReport(pendingHours, stage)) {
    saveState();
    activeView = "report";
    render();
    return;
  }

  state.world.pendingHours = 0;
  state.world.currentReport = buildBriefReport(pendingHours, stage);
  pushLog("brief", state.world.currentReport.title, state.world.currentReport.text);
  saveState();
  activeView = "report";
  render();
}

function resolveChoice(index) {
  if (!state.world || !state.world.currentReport || state.world.currentReport.type !== "choice") {
    return;
  }

  const report = state.world.currentReport;
  const event = CHOICE_EVENTS.find((item) => item.id === report.eventId);
  if (!event) {
    return;
  }

  const option = event.options[index];
  if (!option) {
    return;
  }

  Object.entries(option.effect).forEach(([key, value]) => {
    state.world.traits[key] = (state.world.traits[key] || 0) + value;
  });

  state.world.completedChoices.push(event.id);
  state.world.choiceHistory.unshift({
    id: event.id,
    optionLabel: option.label,
    result: option.result,
    createdAt: Date.now()
  });
  state.world.choiceHistory = state.world.choiceHistory.slice(0, 10);

  const stage = getCurrentStage(state.world.totalHours);
  state.world.currentReport = {
    type: "result",
    title: `${stage.icon} 分支已锁定`,
    meta: `${stage.name} · 关键抉择已记录`,
    icon: "🧭",
    text:
      `你选择了：${option.label}\n\n` +
      `${option.result}\n\n` +
      `从现在起，这条分支会持续影响后续简报与毁灭风险。`
  };

  pushLog("choice", option.label, option.result);
  saveState();
  render();
}

function createWorldFromSetup() {
  const planetType = readSelectedRadio("planetType") || "rock";
  const speciesFocus = readSelectedRadio("speciesFocus") || "carbon";

  state.world = createWorld(planetType, speciesFocus);
  state.setupNotice = "";
  state.world.currentReport = makeIntroReport(state.world);
  pushLog(
    "setup",
    "建立观测档案",
    `${PLANET_OPTIONS[planetType].name} · ${SPECIES_OPTIONS[speciesFocus].name}`
  );
  saveState();

  activeView = "report";
  render();
}

function resetCurrentWorld(noticeText) {
  if (state.world && state.world.running) {
    commitRunningSession();
  }

  state.world = null;
  state.setupNotice = noticeText || "请重新选择新的观测对象。";
  state.lastExitAt = Date.now();
  saveState();

  activeView = "setup";
  render();
}

function clearAllData() {
  state = getDefaultState();
  localStorage.removeItem(STORAGE_KEY);
  activeView = "setup";
  render();
}

function showView(name) {
  if (name === "main") {
    if (!state.world) {
      activeView = "setup";
    } else if (!state.world.alive) {
      activeView = "report";
    } else {
      activeView = "main";
    }
  } else if (name === "report") {
    activeView = state.world ? "report" : "setup";
  } else if (name === "settings") {
    activeView = "settings";
  } else {
    activeView = "setup";
  }

  render();
}

function renderNavActive() {
  document.querySelectorAll(".nav-button").forEach((button) => {
    button.classList.toggle("nav-active", button.dataset.nav === activeView);
  });
}

function renderTopStats() {
  const now = new Date();
  document.getElementById("nowTime").textContent = now.toLocaleString("zh-CN");
  document.getElementById("lifetimeHours").textContent = formatHourValue(getDisplayedLifetimeHours());
  document.getElementById("worldHours").textContent = formatHourValue(getDisplayedWorldHours());
}

function renderSetupView() {
  const setupNotice = document.getElementById("setupNotice");
  const shouldShowNotice = !!state.setupNotice;

  setupNotice.classList.toggle("hidden", !shouldShowNotice);
  setupNotice.textContent = state.setupNotice || "";

  updateSetupPreview();
}

function renderTraits() {
  const container = document.getElementById("traitTags");
  if (!state.world) {
    container.innerHTML = "";
    return;
  }

  const traitMeta = [
    { key: "ecology", label: "生态" },
    { key: "tech", label: "科技" },
    { key: "resilience", label: "韧性" },
    { key: "aggression", label: "冲突" }
  ];

  container.innerHTML = traitMeta.map((item) => {
    const value = state.world.traits[item.key] || 0;
    const isPositive = item.key === "aggression" ? value <= 0 : value >= 0;
    const sign = value > 0 ? `+${value}` : `${value}`;
    const cls = isPositive ? "positive" : "negative";
    return `<span class="chip ${cls}">${item.label} ${sign}</span>`;
  }).join("");
}

function renderBranchNotes() {
  const container = document.getElementById("branchNotes");
  if (!state.world || state.world.choiceHistory.length === 0) {
    container.innerHTML = `<div class="note-item">尚未发生关键抉择。返回观测站后，系统会在关键节点给出分支选项。</div>`;
    return;
  }

  container.innerHTML = state.world.choiceHistory.slice(0, 3).map((item) => {
    return `
      <div class="note-item">
        <strong>${escapeHtml(item.optionLabel)}</strong>
        <div class="subtle">${escapeHtml(item.result)}</div>
      </div>
    `;
  }).join("");
}

function renderRecentLogs() {
  const container = document.getElementById("recentLog");

  if (state.recentLogs.length === 0) {
    container.innerHTML = `<div class="log-item">暂无历史记录。建立观测档案并开始计时后，这里会出现最新简报。</div>`;
    return;
  }

  container.innerHTML = state.recentLogs.slice(0, 6).map((log) => {
    return `
      <div class="log-item">
        <strong>${escapeHtml(log.title)}</strong>
        <div class="subtle">${escapeHtml(log.text).slice(0, 120)}${log.text.length > 120 ? "..." : ""}</div>
        <small>${formatDateTime(log.createdAt)}</small>
      </div>
    `;
  }).join("");
}

function renderMainView() {
  const world = state.world;
  const statusBadge = document.getElementById("statusBadge");

  if (!world) {
    statusBadge.textContent = "未建档";
    return;
  }

  const worldHours = getDisplayedWorldHours();
  const pendingHours = getDisplayedPendingHours();
  const stage = getCurrentStage(worldHours);
  const stageProgress = getStageProgress(worldHours);
  const runningSeconds = Math.floor(getRunningHoursDelta() * 3600);

  if (!world.alive) {
    statusBadge.textContent = "样本灭绝";
  } else if (world.running) {
    statusBadge.textContent = "观测中";
  } else if (hasPendingChoiceReport()) {
    statusBadge.textContent = "等待决策";
  } else {
    statusBadge.textContent = "待机中";
  }

  document.getElementById("offlineDuration").textContent =
    world.lastOfflineHours > MIN_COUNTABLE_HOURS
      ? `已过去 ${formatHumanHours(world.lastOfflineHours)}，已自动计入本轮观测。`
      : "刚刚返回，暂无新的离线流逝时间。";

  document.getElementById("pendingHours").textContent = formatHumanHours(pendingHours);
  document.getElementById("sessionTimer").textContent = formatClock(runningSeconds);
  document.getElementById("timerHint").textContent =
    world.running
      ? "当前在线时长会在暂停或返回观测站时结算。"
      : hasPendingChoiceReport()
      ? "观测站正在等待你的关键抉择。"
      : "当前在线观测尚未开始。";

  document.getElementById("stageName").textContent = stage.name;
  document.getElementById("stageDescription").textContent = stage.description;
  document.getElementById("planetTimeRule").textContent = stage.ruleText;
  document.getElementById("stageProgressBar").style.width = `${stageProgress.percent}%`;
  document.getElementById("stageProgressText").textContent = stageProgress.text;

  document.getElementById("planetValue").textContent = PLANET_OPTIONS[world.planetType].name;
  document.getElementById("speciesValue").textContent = SPECIES_OPTIONS[world.speciesFocus].name;
  document.getElementById("observerSince").textContent = formatDateTime(state.observerSince);
  document.getElementById("aliveState").textContent = world.alive ? "观测中" : "已毁灭";

  renderTraits();
  renderBranchNotes();
  renderRecentLogs();

  document.getElementById("startButton").disabled = !world.alive || world.running || hasPendingChoiceReport();
  document.getElementById("pauseButton").disabled = !world.alive || !world.running;
  document.getElementById("stationButton").disabled = !world;
}

function renderReportView() {
  const title = document.getElementById("reportTitle");
  const meta = document.getElementById("reportMeta");
  const text = document.getElementById("reportText");
  const icon = document.getElementById("reportIcon");
  const typeBadge = document.getElementById("reportTypeBadge");
  const stageMeta = document.getElementById("reportStageMeta");
  const options = document.getElementById("reportOptions");
  const continueButton = document.getElementById("reportContinueButton");
  const restartButton = document.getElementById("reportRestartButton");

  options.innerHTML = "";

  if (!state.world) {
    title.textContent = "尚未建立观测档案";
    meta.textContent = "请先去初始化观测对象";
    text.textContent = "你还没有选择星球与重点物种。先建立观测档案，再返回观测站接收世界简报。";
    icon.textContent = "📡";
    typeBadge.textContent = "未建档";
    stageMeta.textContent = "尚未进入观测流程";
    continueButton.textContent = "前往建档";
    continueButton.disabled = false;
    restartButton.classList.add("hidden");
    return;
  }

  const report = state.world.currentReport || makeIdleReport();
  title.textContent = report.title;
  meta.textContent = report.meta;
  text.textContent = report.text;
  icon.textContent = report.icon || "🔭";
  stageMeta.textContent = report.meta;

  const badgeMap = {
    intro: "初始化",
    idle: "待命",
    brief: "普通简报",
    choice: "关键选项",
    result: "分支结果",
    extinction: "样本终止"
  };

  typeBadge.textContent = badgeMap[report.type] || "简报";

  if (report.type === "choice" && Array.isArray(report.options)) {
    report.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.className = "option-btn";
      button.textContent = option.label;
      button.addEventListener("click", () => resolveChoice(index));
      options.appendChild(button);
    });
  }

  if (report.type === "choice") {
    continueButton.textContent = "请先完成选择";
    continueButton.disabled = true;
  } else if (!state.world.alive) {
    continueButton.textContent = "前往重新建档";
    continueButton.disabled = false;
  } else {
    continueButton.textContent = "返回主控台";
    continueButton.disabled = false;
  }

  restartButton.classList.toggle("hidden", state.world.alive);
}

function renderSettingsView() {
  document.getElementById("themeLabel").textContent =
    state.theme === "aurora" ? "当前主题：极光观测站" : "当前主题：深空观测站";
}

function updateVisibleViews() {
  const setupView = document.getElementById("setupView");
  const mainView = document.getElementById("mainView");
  const reportView = document.getElementById("reportView");
  const settingsView = document.getElementById("settingsView");

  setupView.classList.toggle("hidden", activeView !== "setup");
  mainView.classList.toggle("hidden", activeView !== "main");
  reportView.classList.toggle("hidden", activeView !== "report");
  settingsView.classList.toggle("hidden", activeView !== "settings");
}

function render() {
  document.body.dataset.theme = state.theme;
  renderTopStats();
  renderSetupView();
  renderMainView();
  renderReportView();
  renderSettingsView();
  renderNavActive();
  updateVisibleViews();
}

function bindEvents() {
  document.querySelectorAll('input[name="planetType"], input[name="speciesFocus"]').forEach((input) => {
    input.addEventListener("change", updateSetupPreview);
  });

  document.querySelectorAll(".nav-button").forEach((button) => {
    button.addEventListener("click", () => {
      showView(button.dataset.nav);
    });
  });

  document.getElementById("createWorldButton").addEventListener("click", createWorldFromSetup);
  document.getElementById("startButton").addEventListener("click", startObservation);
  document.getElementById("pauseButton").addEventListener("click", pauseObservation);
  document.getElementById("stationButton").addEventListener("click", generateStationReport);

  document.getElementById("reportContinueButton").addEventListener("click", () => {
    if (!state.world) {
      activeView = "setup";
      render();
      return;
    }

    if (state.world.currentReport && state.world.currentReport.type === "choice") {
      return;
    }

    if (!state.world.alive) {
      activeView = "setup";
      render();
      return;
    }

    activeView = "main";
    render();
  });

  document.getElementById("reportRestartButton").addEventListener("click", () => {
    resetCurrentWorld("上一颗样本已毁灭，请重新选择新的观测对象。");
  });

  document.getElementById("themeToggleButton").addEventListener("click", () => {
    state.theme = state.theme === "nebula" ? "aurora" : "nebula";
    saveState();
    render();
  });

  document.getElementById("resetWorldButton").addEventListener("click", () => {
    const ok = window.confirm("重新选择星球会清空当前星球进度，但保留累计总观测时长。确认继续吗？");
    if (ok) {
      resetCurrentWorld("你已主动更换观测对象，累计总时长已保留。");
    }
  });

  document.getElementById("clearAllButton").addEventListener("click", () => {
    const ok = window.confirm("这会清空全部本地数据，包括累计总时长。确认继续吗？");
    if (ok) {
      clearAllData();
    }
  });

  window.addEventListener("pagehide", persistOnExit);
  window.addEventListener("beforeunload", persistOnExit);
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      persistOnExit();
    }
  });
}

function initView() {
  if (!state.world) {
    activeView = "setup";
  } else if (!state.world.alive) {
    activeView = "report";
  } else {
    activeView = "main";
  }
}

function startTicker() {
  if (timerId) {
    clearInterval(timerId);
  }

  timerId = setInterval(() => {
    renderTopStats();
    if (activeView === "main") {
      renderMainView();
    }
  }, 1000);
}

function init() {
  syncOfflineTime();
  bindEvents();
  initView();
  render();
  startTicker();
}

window.addEventListener("DOMContentLoaded", init);
