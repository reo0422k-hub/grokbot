import content from "./pages.json";
export type Section = {
  title: string;
  body: string;
  items?: string[];
  table?: { head: string[]; rows: string[][] };
};
export type SitePage = {
  slug: string;
  title: string;
  lead: string;
  eyebrow: string;
  image: string;
  kind: string;
  sections: Section[];
  related: string[];
  source: string;
  checked: string;
  department?: string;
  request?: string;
  tasks?: string[];
  outputs?: string[];
  human?: string;
  date?: string;
  category?: string;
  primary?: string;
};
export const pages = content as SitePage[];
export const findPage = (slug: string) => pages.find((p) => p.slug === slug);
export const consultation = "https://grokbotjp.com/#contact-form";
export const navigation = [
  ["Grok Botとは", "/grok-bot/"],
  ["活用例", "/use-cases/"],
  ["導入支援", "/support/"],
  ["45日PoC", "/poc/"],
  ["ブログ", "/news/"],
];
export const menuGroups = [
  {
    title: "Grok Botを知る",
    paths: [
      "grok-bot",
      "grok-bot/features",
      "grok-bot/getting-started",
      "grok-bot/vs-chat-ai",
      "grok-bot/enterprise",
      "grok-bot/security",
      "grok-bot/pricing",
      "grok-bot/galaxy",
    ],
  },
  {
    title: "部門別の活用例",
    paths: [
      "use-cases",
      "use-cases/sales",
      "use-cases/recruiting",
      "use-cases/marketing",
      "use-cases/procurement",
      "use-cases/customer-success",
      "use-cases/engineering",
    ],
  },
  {
    title: "導入を相談する",
    paths: [
      "support",
      "poc",
      "flow",
      "faq",
      "contact",
      "company",
      "privacy",
      "editorial-policy",
    ],
  },
];
const labels: Record<string, string> = {
  "grok-bot": "Grok Botとは",
  "grok-bot/features": "できること・機能",
  "grok-bot/getting-started": "始め方・使い方",
  "grok-bot/vs-chat-ai": "回答と作業実行の違い",
  "grok-bot/enterprise": "法人・Enterprise導入",
  "grok-bot/security": "セキュリティと承認設計",
  "grok-bot/pricing": "料金・支援費用",
  "grok-bot/galaxy": "Galaxy・公開イベント",
  "use-cases": "活用例の一覧",
  support: "導入支援の内容",
  poc: "45日PoC",
  flow: "導入の流れ",
  faq: "よくある質問",
  contact: "無料相談について",
  company: "会社概要",
  privacy: "プライバシーポリシー",
  "editorial-policy": "編集方針",
  news: "ブログ・読みもの",
};
export function pageLabel(slug: string) {
  return (
    labels[slug] ??
    findPage(slug)?.department ??
    findPage(slug)?.title.replace(/\n/g, "") ??
    slug
  );
}
export const faqItems = [
  {
    category: "業務・進め方",
    q: "最初は、どの業務を選べばよいですか？",
    a: "手順と完成条件が明確な繰り返し作業から。相談で1部署・1業務に絞ります。",
  },
  {
    category: "業務・進め方",
    q: "対象業務が決まっていなくても相談できますか？",
    a: "はい。困っている作業や普段使うツールから一緒に整理します。",
  },
  {
    category: "業務・進め方",
    q: "導入には、どのくらいの期間がかかりますか？",
    a: "まず45日PoCで検証し、結果をもとに本格導入の範囲と期間をご提案します。",
  },
  {
    category: "費用・PoC",
    q: "製品利用料と支援費用は、どう違いますか？",
    a: "製品利用料はGrok Botの契約費用です。構築・検証・研修の支援費用は別途ご案内します。",
  },
  {
    category: "費用・PoC",
    q: "PoCだけでも依頼できますか？",
    a: "はい。1部署・1業務で試し、本格導入するかは検証後に判断できます。",
  },
  {
    category: "費用・PoC",
    q: "45日で、必ず効果が出ますか？",
    a: "45日間で作業時間・修正率・完了率を測ります。効果や全社導入の完了は保証していません。",
  },
  {
    category: "運用・研修",
    q: "社員研修では、何を教えてもらえますか？",
    a: "依頼の書き方、成果物の確認、処理を止める手順を研修します。",
  },
  {
    category: "運用・研修",
    q: "メール送信まで自動にする必要はありますか？",
    a: "下書きまでに絞れます。送信や変更の前に、誰が確認するかを決めます。",
  },
  {
    category: "運用・研修",
    q: "既存の業務ツールと接続できますか？",
    a: "ツールの契約・認証・権限を確認して接続可否を判断します。",
  },
  {
    category: "運用・研修",
    q: "xAIの公式サービスですか？",
    a: "株式会社プレミアムヒューマンが独立して提供する導入支援です。xAIの公式・提携サービスではありません。",
  },
];
