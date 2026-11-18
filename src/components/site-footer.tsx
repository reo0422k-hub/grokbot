import Link from "next/link";
import { consultation, pageLabel } from "@/content/site";
import { BotFamily } from "./bot-family";
import { SiteBrand } from "./site-brand";
import { SiteIcon } from "./site-icon";
export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <BotFamily className="footer-bot-family" />
        <div className="footer-intro">
          <SiteBrand />
          <p>株式会社プレミアムヒューマン</p>
        </div>
        <nav className="footer-links" aria-label="フッターナビゲーション">
          {["company", "privacy", "editorial-policy", "faq"].map((slug) => (
            <Link key={slug} href={`/${slug}/`}>{pageLabel(slug)}</Link>
          ))}
          <a href={consultation}>
            無料相談 <SiteIcon name="arrow-up-right" size={16} />
          </a>
        </nav>
        <p className="legal">
          本サービスは株式会社プレミアムヒューマンが独立して提供しています。xAIの公式サービスではなく、提携・承認も受けていません。
          <br />
          Grok および Grok Bot は xAI の製品であり、xAI および Grok は xAI
          の商標です。
        </p>
        <div className="footer-end">
          <p>© 2026 Premium Human Inc.</p>
        </div>
      </div>
    </footer>
  );
}
