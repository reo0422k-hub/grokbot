import Link from "next/link";
import { pages, pageLabel, type SitePage, type Section } from "@/content/site";
import { Catalog, FAQDirectory } from "./catalog";
import { ContactBanner, ConsultationCTA, RelatedPages } from "./site-common";
import { BotArtwork, MiniBot, pageArtwork } from "./bot-family";
import { SiteIcon } from "./site-icon";
import { characterFor } from "@/content/characters";
import type { CSSProperties } from "react";
const groupFor = (page: SitePage) =>
  page.slug.startsWith("use-cases/")
    ? ["活用例", "/use-cases/"]
    : page.slug.startsWith("news/")
      ? ["ブログ", "/news/"]
      : page.slug.startsWith("grok-bot/")
        ? ["Grok Botとは", "/grok-bot/"]
        : null;
function DataTable({ value }: { value: NonNullable<Section["table"]> }) {
  return (
    <div className="data-table-wrap">
      <table className="data-table">
        <thead>
          <tr>
            {value.head.map((h) => (
              <th key={h} scope="col">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {value.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} data-label={value.head[j]}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default function ContentPage({ page }: { page: SitePage }) {
  const theme = characterFor(page.slug);
  const group = groupFor(page);
  const isArticle = page.kind === "article";
  const isDirectory = page.kind === "directory" || page.kind === "news";
  const textOnly = ["privacy", "editorial-policy"].includes(page.slug);
  return (
    <main id="main" tabIndex={-1} className={`subpage page-${page.kind}`} style={{ "--page-accent": theme.ink, "--page-tint": theme.tint } as CSSProperties}>
      <div className="container breadcrumbs">
        <nav aria-label="パンくずリスト">
          <Link href="/">ホーム</Link>
          <span>/</span>
          {group && (
            <>
              <Link href={group[1]}>{group[0]}</Link>
              <span>/</span>
            </>
          )}
          <span aria-current="page">{pageLabel(page.slug)}</span>
        </nav>
        <MiniBot color={theme.color} className="page-guide-bot" />
      </div>
      <section className={`subhero ${textOnly ? "text-only" : ""}`}>
        <div className="subhero-copy">
          {isArticle && (
            <p className="article-meta">
              <time dateTime={page.date}>
                {page.date?.replaceAll("-", ".")}
              </time>
              <span>{page.category}</span>
            </p>
          )}
          <h1>
            {page.title.split("\n").map((line, i) => (
              <span key={i} className={i === 1 ? "red" : ""}>
                {line}
              </span>
            ))}
          </h1>
          <p className="subhero-lead">{page.lead}</p>
          {["department", "service", "contact"].includes(page.kind) && (
            <div className="subhero-actions">
              <ConsultationCTA />
            </div>
          )}
        </div>
        {!textOnly && (
          <div className="subhero-art">
            <BotArtwork
              src={pageArtwork(page.slug, "hero")}
              color={theme.color}
              alt=""
              priority
            />
          </div>
        )}
      </section>
      {page.kind === "department" && (
        <section className="department-flow container">
          <div className="section-head">
            <div>
              <h2>依頼から、確認まで。</h2>
            </div>
            <span className="example-note">検証前の活用例</span>
          </div>
          <div className="workflow-request">
            <span>あなたからの依頼</span>
            <p>「{page.request}」</p>
          </div>
          <div className="workflow-grid">
            <div>
              <h3>Botが進めること</h3>
              <ol>
                {page.tasks?.map((t, i) => (
                  <li key={t}>
                    <span>{i + 1}</span>
                    {t}
                  </li>
                ))}
              </ol>
            </div>
            <div>
              <h3>受け取るもの</h3>
              <ul>
                {page.outputs?.map((t) => (
                  <li key={t}>
                    <SiteIcon name="document" size={18} detail />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="human-review">
              <h3>人が確認・判断すること</h3>
              <p>{page.human}</p>
              <SiteIcon name="approval" size={28} detail />
            </div>
          </div>
        </section>
      )}
      {isDirectory && (
        <Catalog
          items={pages.filter((p) =>
            page.kind === "news"
              ? p.kind === "article"
              : p.kind === "department",
          )}
          kind={page.kind === "news" ? "news" : "departments"}
        />
      )}
      {page.kind === "faq" && <FAQDirectory />}
      {page.sections.length > 0 && (
        <div
          className={`container content-layout ${isArticle ? "article-layout" : ""} ${textOnly ? "legal-layout" : ""}`}
        >
          <details className="page-toc">
            <summary>目次 <SiteIcon name="chevron-down" size={18} /></summary>
            <ol>
              {page.sections.map((s, i) => (
                <li key={s.title}>
                  <a href={"#section-" + (i + 1)}>
                    {s.title}
                  </a>
                </li>
              ))}
            </ol>
            {isArticle && (
              <Link className="toc-back" href="/news/">
                ブログ一覧へ
                <SiteIcon name="arrow-right" size={15} />
              </Link>
            )}
          </details>
          <article className="page-body">
            {page.sections.map((s, i) => (
              <section
                className="content-section"
                id={"section-" + (i + 1)}
                key={s.title}
              >
                <h2>{s.title}</h2>
                {s.body && <p>{s.body}</p>}
                {s.items && (
                  <ul className="content-list">
                    {s.items.map((t) => (
                      <li key={t}>
                        <SiteIcon name="check" size={17} detail />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {s.table && <DataTable value={s.table} />}
              </section>
            ))}
            <details className="source-note">
              <summary>出典・確認日 <SiteIcon name="chevron-down" size={18} /></summary>
              <p>公開情報の確認日：{page.checked}</p>
              {page.slug.startsWith("grok-bot") && (
                <a href="https://docs.x.ai/grok-bot/overview">
                  製品の最新ドキュメント
                  <SiteIcon name="arrow-up-right" size={14} />
                </a>
              )}
              {page.primary && (
                <a href={page.primary}>
                  提供元の発表・出典を読む
                  <SiteIcon name="arrow-up-right" size={14} />
                </a>
              )}
              <a href={page.source}>
                参照した公開サイト
                <SiteIcon name="arrow-up-right" size={14} />
              </a>
              {page.slug === "privacy" && (
                <a href="https://grokbotjp.com/privacy/">
                  公開サービスサイトのプライバシーポリシー
                  <SiteIcon name="arrow-up-right" size={14} />
                </a>
              )}
            </details>
          </article>
        </div>
      )}
      {page.slug === "grok-bot" && (
        <section className="guide-directory container">
          <div className="section-head">
            <div>
              <h2>Grok Bot導入ガイド</h2>
            </div>
          </div>
          <div className="guide-link-grid">
            {pages
              .filter((p) => p.slug.startsWith("grok-bot/"))
              .map((p) => (
                <Link key={p.slug} href={"/" + p.slug + "/"}>
                  <h3>{pageLabel(p.slug)}</h3>
                  <SiteIcon name="arrow-right" size={20} />
                </Link>
              ))}
          </div>
        </section>
      )}
      {page.related.length > 0 && <RelatedPages slugs={page.related} />}
      {!["privacy", "editorial-policy"].includes(page.slug) && (
        <ContactBanner slug={page.slug} />
      )}
    </main>
  );
}
