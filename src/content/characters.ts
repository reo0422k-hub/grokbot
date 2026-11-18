export const botColors = ["black", "teal", "purple", "blue", "orange", "amber", "pink", "gray", "brown"] as const;
export type BotColor = (typeof botColors)[number];
const palette: Record<BotColor, [string, string]> = {
  black: ["#151B28", "#F3F4F6"],
  teal: ["#008A7D", "#E8F8F4"],
  purple: ["#7641CF", "#F3EDFD"],
  blue: ["#126DCD", "#EDF5FF"],
  orange: ["#B84B09", "#FFF2E8"],
  amber: ["#996000", "#FFF7DD"],
  pink: ["#C72D78", "#FFF0F7"],
  gray: ["#62686F", "#F2F3F5"],
  brown: ["#865632", "#F8F1E9"],
};
const assignments: Record<string, BotColor> = {
  "use-cases": "teal", "use-cases/sales": "teal", "use-cases/recruiting": "purple",
  "use-cases/marketing": "blue", "use-cases/procurement": "amber",
  "use-cases/customer-success": "pink", "use-cases/engineering": "orange",
  "grok-bot": "teal", "grok-bot/features": "orange", "grok-bot/getting-started": "teal",
  "grok-bot/vs-chat-ai": "purple", "grok-bot/enterprise": "brown",
  "grok-bot/security": "blue", "grok-bot/pricing": "amber", "grok-bot/galaxy": "pink",
  support: "purple", poc: "teal", flow: "orange", faq: "blue", contact: "pink",
  company: "brown", privacy: "gray", "editorial-policy": "gray", news: "orange",
  "news/xai-support-grok-bot": "teal", "news/xai-procurement-haggle-bot": "amber",
  "news/grok-bot-for-enterprise": "blue", "news/designing-grok-bot": "purple",
  "news/grok-bot-and-x": "pink", "news/grok-bot-more-plans": "brown",
};
export function characterFor(slug: string) {
  const color = assignments[slug] ?? "teal";
  const [ink, tint] = palette[color];
  return { color, ink, tint };
}
