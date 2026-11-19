"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import ReadableTitle from "./readable-title";
import { SiteIcon } from "./site-icon";
import { faqItems, type SitePage } from "@/content/site";
import { BotArtwork, MiniBot, pageArtwork } from "./bot-family";
import { characterFor } from "@/content/characters";
import type { CSSProperties } from "react";
function searchText(value: string) {
  return value.normalize("NFKC").trim().toLocaleLowerCase("ja");
}
export function Catalog({
  items,
  kind,
}: {
  items: SitePage[];
  kind: "departments" | "news";
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("すべて");
  const categories = [
    "すべて",
    ...new Set(
      items.map((p) => (kind === "departments" ? p.department! : p.category!)),
    ),
  ];
  const shown = useMemo(
    () =>
      items.filter(
        (p) =>
          (category === "すべて" ||
            (kind === "departments" ? p.department : p.category) ===
              category) &&
          searchText([p.department, p.category, p.title, p.lead].join(" ")).includes(searchText(query)),
      ),
    [items, category, query, kind],
  );
  return (
    <div className="catalog container">
      <div className="catalog-toolbar">
        <p>
          {kind === "departments"
            ? "部門から活用例を探す"
            : "テーマから記事を探す"}
        </p>
        <label className="search-field">
          <SiteIcon name="search" size={18} />
          <input
            type="search"
            aria-label={kind === "departments" ? "活用例を検索" : "記事を検索"}
            placeholder={
              kind === "departments" ? "仕事・部門名で検索" : "キーワードで検索"
            }
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <div className="filter-chips" aria-label="表示するカテゴリ">
        {categories.map((c) => (
          <button
            key={c}
            aria-pressed={category === c}
            onClick={() => setCategory(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="result-count" role="status">
        {shown.length}件{kind === "departments" ? "の活用例" : "の記事"}
      </p>
      <div className={`catalog-grid ${kind}`}>
        {shown.map((p) => (
          <Link key={p.slug} className="catalog-card" href={"/" + p.slug + "/"} style={{ "--card-accent": characterFor(p.slug).ink, "--card-tint": characterFor(p.slug).tint } as CSSProperties}>
            {kind === "news" ? (
              <div className="catalog-image">
                <BotArtwork
                  src={pageArtwork(p.slug, "thumbnail")}
                  color={characterFor(p.slug).color}
                  alt=""
                />
                <MiniBot color={characterFor(p.slug).color} className="catalog-mini" />
              </div>
            ) : (
              <div className="department-number">
                <MiniBot color={characterFor(p.slug).color} />
                <span>{p.department}</span>
              </div>
            )}
            <div className="catalog-card-copy">
              {p.date && (
                <time dateTime={p.date}>
                  {p.date.replaceAll("-", ".")}
                </time>
              )}
              <h2><ReadableTitle text={p.title}/></h2>
              <p>{p.lead}</p>
              <div className="card-bottom">
                <SiteIcon name="arrow-right" size={20} />
              </div>
            </div>
          </Link>
        ))}
      </div>
      {shown.length === 0 && (
        <div className="empty-state">
          <h2>
            該当する{kind === "news" ? "記事" : "活用例"}
            が見つかりませんでした。
          </h2>
          <p>キーワードやカテゴリを変えてお試しください。</p>
          <button
            className="button secondary"
            onClick={() => {
              setQuery("");
              setCategory("すべて");
            }}
          >
            絞り込みを解除する
          </button>
        </div>
      )}
      {kind === "departments" && (
        <p className="catalog-notice">
          掲載内容は検証前の活用例です。
        </p>
      )}
    </div>
  );
}
export function FAQDirectory() {
  const [category, setCategory] = useState("すべて");
  const [query, setQuery] = useState("");
  const shown = faqItems.filter(
    (f) =>
      (category === "すべて" || f.category === category) &&
      searchText(f.q + f.a).includes(searchText(query)),
  );
  return (
    <section className="faq-directory container">
      <div className="catalog-toolbar">
        <div className="filter-chips">
          {["すべて", "業務・進め方", "費用・PoC", "運用・研修"].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <label className="search-field">
          <SiteIcon name="search" size={18} />
          <input
            type="search"
            placeholder="質問を検索"
            aria-label="よくある質問を検索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      <p className="result-count" role="status">
        {shown.length}件の質問
      </p>
      <div className="faq-list">
        {shown.map((f) => (
          <details key={f.q}>
            <summary>
              <span className="q">Q.</span>
              <span>{f.q}</span>
              <SiteIcon name="chevron-down" size={20} />
            </summary>
            <p>{f.a}</p>
          </details>
        ))}
      </div>
      {!shown.length && (
        <div className="empty-state">
          <h2>該当する質問が見つかりませんでした。</h2>
          <p>キーワードやカテゴリを変えてお試しください。</p>
          <button
            className="button secondary"
            onClick={() => {
              setQuery("");
              setCategory("すべて");
            }}
          >
            絞り込みを解除する
          </button>
        </div>
      )}
    </section>
  );
}
