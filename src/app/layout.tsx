import type { Metadata } from "next";
import "@fontsource-variable/inter";
import "@fontsource-variable/noto-sans-jp";
import "./globals.css";
import "./hero-reference.css";
import "./site.css";
import "./color-family.css";
import "./reading-layout.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";
export const metadata: Metadata = {
  title: "Grok Bot導入支援・45日PoC｜株式会社プレミアムヒューマン",
  description:
    "Grok Botを、自社の戦力に。業務選定からBot構築、ツール接続、承認設計、社員研修、運用改善まで支援。1部署・1業務の45日PoCで本格導入を検討。オンライン30分の導入相談は無料です。",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
