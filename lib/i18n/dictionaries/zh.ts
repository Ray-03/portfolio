import type { Dictionary } from "./en";

export const zh: Dictionary = {
  meta: {
    title: "作品集",
    description: "作品集的主题基础。",
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
