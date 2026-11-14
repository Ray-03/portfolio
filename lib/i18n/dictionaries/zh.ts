import type { Dictionary } from "./en";
import { siteConfig } from "@/lib/site";

export const zh: Dictionary = {
  meta: {
    title: "Richard Rinaldy｜印尼 React / Next.js 工程师",
    description:
      "Richard Rinaldy，丹格朗全栈与前端工程师。擅长 React、Next.js、TypeScript，以及新加坡、台湾与印尼产品的可量化 SEO。",
  },
  apps: {
    github: "GitHub",
  },
  hero: {
    tagline:
      `丹格朗的 React / Next.js 工程师 — 自 ${siteConfig.careerStartYear} 年起为新加坡、台湾与印尼打造可量化 SEO 与可扩展产品。`,
  },
  shell: {
    proof: "精选成果",
    about: "关于",
    exploreCodex: "打开典籍",
    classified: "机密",
  },
  about: {
    role: "全栈与前端软件工程师",
    lead:
      "我是 Richard Rinaldy，丹格朗的全栈软件工程师。交付 React 与 Next.js 产品、扩展高并发系统，并把 SEO 做成可量化流量——服务新加坡、台湾与印尼。",
    hireKicker: "接受全职机会",
    contactEmail: "邮件",
    contactLinkedIn: "LinkedIn",
    skillsLabel: "技能",
    educationLabel: "教育",
    education: "计算机科学学士 · Binus University · GPA 3.71",
    skills: {
      frontend: {
        label: "前端",
        detail: "React · Next.js · TypeScript · Tailwind · Zustand · React Query",
      },
      seo: {
        label: "SEO 与 i18n",
        detail: "JSON-LD · Merchant Center · 多语言 · Lighthouse · GTM",
      },
      fullstack: {
        label: "全栈",
        detail: "Node.js · NestJS · Python · REST APIs",
      },
      systems: {
        label: "系统",
        detail: "PostgreSQL · Elasticsearch · Ceph · MySQL",
      },
      cloud: {
        label: "云",
        detail: "AWS · GCP · Docker · Cloud Run",
      },
    },
    credentials: [
      {
        label: "认证",
        value: "AWS Certified Cloud Practitioner · 有效期至 2029 年 2 月",
      },
      {
        label: "奖项",
        value: "冠军 — Start On: Hackathon 2021",
      },
    ],
  },
  chatbot: {
    title: "问问 AI",
    lead: "打开终端会话，像 ChatGPT 一样询问 Richard 的工作、技术栈或兴趣。",
    placeholder: "问问 Richard 的工作…",
    send: "enter",
    host: "visitor@richard-rinaldy",
    path: "~/ask",
    prompt: "visitor@richard:~$",
    boot: [
      "Ask AI v1.0 — Richard Rinaldy 的作品集助手",
      "回答仅基于已交付的作品数据。输入问题或运行建议命令。",
    ],
    suggestionsLabel: "# 建议命令",
    thinking: "思考中…",
    hint: "enter 发送 · esc 停止流式输出",
    suggestions: [
      "Richard 在前端方面的主要技能是什么？",
      "Richard 在 Trainge 是如何提升 SEO 的？",
      "Richard 编程之外的兴趣爱好有哪些？",
    ],
    error: "出了点问题，这个助手可能还没配置好。请直接通过邮件联系 Richard。",
    rateLimit: "来自此网络的提问过多。请稍等一分钟后再询问 Richard 的作品集。",
    rejected: "该请求已被拦截。请只询问 Richard 的工作、技术栈或背景。",
    disabled: "Ask AI 暂时关闭。仍可通过邮件或 LinkedIn 联系 Richard。",
    budget: "Ask AI 已达今日全站上限。请明天再试，或直接发邮件联系 Richard。",
  },
  portfolio: {
    title: "作品集",
    back: "主屏幕",
    lead: "React、Next.js、SEO 与高并发系统案例，交付给新加坡、台湾与印尼团队。",
    openProject: "打开项目",
    impactLabel: "成果",
    stackLabel: "技术栈",
    sections: {
      problem: "问题",
      role: "职责",
      solution: "方案",
      result: "结果",
      proof: "证明",
    },
    categories: {
      all: "全部",
      frontend: "前端",
      fullstack: "全栈",
      data: "数据与分析",
    },
    projects: [
      {
        name: "Market Capitalization View",
        company: "PropertyLimBrothers · 新加坡",
        tag: "React · Next.js · Analytics",
        category: "data",
        description: "用于分析新加坡房地产市场趋势与价格的互动数据分析界面。",
        impact: "将用户研究时间缩短约 30%。",
        stack: "React.js, Next.js, Data Analytics",
        href: "",
        relatedSkills: ["frontend"],
        problem:
          "分析师要在分散的视图里比较新加坡房价，研究耗时过长。市场视图必须在现有 React / Next.js 产品里保持快速。",
        role:
          "负责 Market Capitalization View：筛选、对比状态和分析师布局，并与新加坡团队一起定义指标。",
        solution:
          "做了一个同时看趋势和价格的分析界面，把筛选和对比留在同一视图，并用 React 与 Next.js 交付。",
        result: "用户研究时间缩短最多 30%。",
        proof: "这是内部产品，没有公开链接。上面的数字是可以对外说明的结果。",
      },
      {
        name: "SEO 与 i18n 架构",
        company: "Trainge · 台湾",
        tag: "Next.js · SEO · i18n",
        category: "frontend",
        description:
          "SEO 架构改造、Google Merchant Center 集成、多语言（i18n）与动态日历系统。",
        impact:
          "Lighthouse SEO 60 → 90；Google Merchant 索引商品增长 2.5×（1,400 → ~3,500）。",
        stack: "Next.js, JSON-LD, i18n, Tailwind CSS",
        href: "",
        relatedSkills: ["seo", "frontend"],
        problem:
          "跨语言的搜索和商品信息流很难被发现。Lighthouse SEO 只有 60，Merchant Center 只索引了约 1,400 个商品。",
        role:
          "负责 SEO 架构、JSON-LD 和 i18n 路由，并与产品团队一起做动态排期日历。",
        solution:
          "重建 metadata 与 hreflang，加入 JSON-LD，接入 Google Merchant Center，并用 Next.js 交付动态日历。",
        result:
          "Lighthouse SEO 从 60 升到 90。索引商品从约 1,400 增长到约 3,500。",
        proof: "这些是可以公开的测量结果。更多细节可以在交谈中说明。",
      },
      {
        name: "高并发交易系统与 SEO",
        company: "Shopee · 印尼",
        tag: "Node.js · Storage · Search",
        category: "fullstack",
        description: "构建并扩展高容量交易系统，同时优化自然搜索。",
        impact:
          "基于 Ceph 日均约 14,000 次操作；SEO 45 → 92；3 个月内自然流量 +35%。",
        stack: "Node.js, Python, Ceph, PostgreSQL, Elasticsearch",
        href: "",
        relatedSkills: ["fullstack", "systems", "seo"],
        problem:
          "每日交易必须在高体量下保持可靠，自然搜索也弱。Lighthouse SEO 的起点是 45。",
        role:
          "负责扩展交易链路，并在同一产品面上提升 SEO，与平台团队一起处理存储和搜索。",
        solution:
          "在 Ceph 分布式存储上扩展交易系统，按负载使用 PostgreSQL 和 Elasticsearch，并用同一套 SEO 方法拉高自然搜索。",
        result:
          "日均约 14,000 次操作保持可靠。SEO 从 45 升到 92，3 个月内自然流量增长 35%。",
        proof: "这项工作不是个人公开仓库。上面的数字是可以对外说明的结果。",
      },
    ],
  },
  notFound: {
    kicker: "HTTP 404",
    title: "Not Found",
    lead: "请求的 URL 在此服务器上不存在，没有匹配的路由。",
    home: "主页",
    pathLabel: "GET",
  },
  a11y: {
    switchToLight: "切换到浅色模式",
    switchToDark: "切换到深色模式",
    language: "语言",
    skipToContent: "跳到正文",
  },
};
