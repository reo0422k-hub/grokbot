import Link from "next/link";
import Image from "next/image";
import { BotArtwork, MiniBot, pageArtwork } from "./bot-family";
import { SiteIcon } from "./site-icon";
import { characterFor } from "@/content/characters";
import {
  consultation,
  findPage,
  pageLabel,
  type SitePage,
} from "@/content/site";
export function ConsultationCTA() {
  return (
    <a className="button primary" href={consultation}>
      無料で導入相談する
      <SiteIcon name="arrow-up-right" size={19} />
    </a>
  );
}
export function ContactBanner({ slug }: { slug: string }) {
  return (
    <section className="site-contact">
      <div className="container site-contact-inner">
        <div>
          <h2>最初に任せる仕事を、一緒に。</h2>
          <p>法人向けの無料オンライン相談。30分で業務と利用ツールを整理します。</p>
          <ConsultationCTA />
        </div>
        <BotArtwork
          src={pageArtwork(slug, "contact")}
          color="pink"
          alt=""
        />
      </div>
    </section>
  );
}
export function PageCard({ page }: { page: SitePage }) {
  return (
    <Link className="page-card" href={"/" + page.slug + "/"}>
      <span className="card-category">
        {page.department ?? page.category ?? page.eyebrow}
      </span>
      <h3>{page.title.replace(/\n/g, "")}</h3>
      <p>{page.lead}</p>
      <span className="card-bottom">
        詳しく見る
        <SiteIcon name="arrow-right" size={19} />
      </span>
    </Link>
  );
}
export function RelatedPages({ slugs }: { slugs: string[] }) {
  return (
    <section className="related-pages container">
      <div className="section-head">
        <div>
          <h2>あわせて読みたい</h2>
        </div>
      </div>
      <div className="related-grid">
        {slugs.map((slug) => {
          const p = findPage(slug);
          return p ? (
            <Link href={"/" + slug + "/"} key={slug}>
              <h3>{pageLabel(slug)}</h3>
              <SiteIcon name="arrow-right" size={20} />
            </Link>
          ) : null;
        })}
      </div>
    </section>
  );
}
export function HomeExplore() {
  return (
    <>
      <section className="home-story section">
        <div className="container story-grid">
          <BotArtwork
            src="/images/work-guide-transparent.webp"
            alt="資料を整理し、仕事の準備をするマスコット"
          />
          <div>
            <h2>
              人は、考える仕事へ。
              <br />
              Botは、その準備を。
            </h2>
            <p>情報を調べ、整理し、下書きまで。判断に必要な準備をBotに任せられます。</p>
            <Link className="text-link" href="/grok-bot/">
              Grok Botについて知る
              <SiteIcon name="arrow-right" size={18} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
export function HomeMore() {
  const guides = ["security", "pricing", "getting-started"];
  return (
    <section className="section home-guides" id="guides" aria-labelledby="home-guides-title">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 id="home-guides-title">導入ガイド</h2>
          </div>
          <Link className="text-link" href="/news/">
            ブログ・読みもの
            <SiteIcon name="arrow-right" size={18} />
          </Link>
        </div>
        <div className="home-guide-grid">
          {guides.map((guide) => {
            const slug = `grok-bot/${guide}`;
            const theme = characterFor(slug);
            return (
              <Link key={slug} href={`/${slug}/`}>
                <picture className="guide-card-media" style={{ backgroundColor: theme.tint }}>
                  <source media="(max-width: 768px)" srcSet={`/images/guide-card-${guide}.webp`} />
                  <Image
                    src={`/images/guide-wide-${guide}.webp`}
                    alt=""
                    width={1280}
                    height={720}
                    sizes="(max-width: 1440px) 32vw, 416px"
                  />
                </picture>
                <div>
                  <MiniBot color={theme.color} className="guide-card-bot" />
                  <h3>{pageLabel(slug)}</h3>
                  <SiteIcon name="arrow-right" size={21} />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
