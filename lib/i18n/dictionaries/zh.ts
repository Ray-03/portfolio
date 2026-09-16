import type { Dictionary } from "./en";

export const zh: Dictionary = {
  meta: {
    title: "作品集",
    description: "作品集的主题基础。",
  },
  apps: {
    about: "关于我",
    portfolio: "作品集",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "邮件",
    contact: "联系方式",
  },
  hero: {
    tagline: "打造高性能的 React 与 Next.js 界面，动效清晰、工艺到位。",
  },
  about: {
    title: "关于我",
    role: "前端软件工程师",
    lead:
      "我专注打造精致、高性能的界面——从富有动效的落地页，到清晰、有意图的产品 UI。",
    body:
      "我关注排版、交互细节，以及在不同设备上依然可靠的交付。除了功能开发，我也常打磨动画、无障碍体验，以及那些让产品更完整的小细节。",
    back: "主屏幕",
    close: "关闭",
  },
  portfolio: {
    title: "作品集",
    back: "主屏幕",
    lead: "精选作品与实验——界面、动效与前端工艺。",
    openProject: "打开项目",
    projects: [
      {
        name: "个人作品集",
        tag: "Next.js · Motion",
        description:
          "以滚动驱动的平板体验，包含主题、多语言，以及面向导航的系统风主屏幕。",
        href: "https://github.com/Ray-03",
      },
      {
        name: "产品 UI 系统",
        tag: "Design systems",
        description: "关注清晰度、无障碍与一致交互的组件库与模式。",
        href: "",
      },
      {
        name: "动效研究",
        tag: "Prototype",
        description: "关于滚动叙事、微交互与空间 UI 隐喻的小型实验。",
        href: "",
      },
    ],
  },
  theme: {
    eyebrow: "主题基础",
    title: "主色 · 次色 · 浅色 / 深色",
    description:
      "青绿主色与琥珀次色，通过 shadcn CSS 变量接入。切换模式即可预览两套主题。",
    tokenLabel: "令牌",
    tokens: {
      primary: "主色",
      secondary: "次色",
      accent: "强调",
      muted: "弱化",
      card: "卡片",
      destructive: "危险",
    },
    componentTitle: "组件检查",
    componentDescription: "使用主色与次色变体的按钮和徽章。",
    buttons: {
      primary: "主色",
      secondary: "次色",
      outline: "描边",
      ghost: "幽灵",
    },
    badges: {
      default: "默认",
      secondary: "次色",
      outline: "描边",
    },
  },
  a11y: {
    switchToLight: "切换到浅色模式",
    switchToDark: "切换到深色模式",
    language: "语言",
  },
};
