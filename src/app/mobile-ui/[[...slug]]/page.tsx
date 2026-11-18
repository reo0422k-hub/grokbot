import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { consultation, menuGroups, pageLabel, pages } from "@/content/site";
import styles from "../mobile-ui.module.css";

const groups = [
  { title: "トップ", paths: [""] },
  ...menuGroups,
  {
    title: "ブログ・読みもの",
    paths: ["news", ...pages.filter((page) => page.kind === "article").map((page) => page.slug)],
  },
];
const slugs = groups.flatMap((group) => group.paths);

function label(slug: string) {
  return slug ? pageLabel(slug) : "トップページ";
}

function previewUrl(slug: string) {
  return slug ? `/mobile-ui/${slug}/` : "/mobile-ui/";
}

export const dynamicParams = false;

export function generateStaticParams() {
  return slugs.map((slug) => ({ slug: slug ? slug.split("/") : [] }));
}

type Props = { params: Promise<{ slug?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug?.join("/") ?? "";
  return {
    title: `${label(slug)}｜Grok Bot スマホUIプレビュー`,
    description: "Grok Bot導入支援サイトのスマートフォン向けレイアウト画像。",
    robots: { index: false, follow: false },
  };
}

export default async function MobileUiPage({ params }: Props) {
  const slug = (await params).slug?.join("/") ?? "";
  const index = slugs.indexOf(slug);
  if (index === -1) notFound();

  const filename = slug ? slug.replaceAll("/", "-") : "home";
  const previous = slugs[index - 1];
  const next = slugs[index + 1];

  return (
    <main id="main" tabIndex={-1} className={styles.review}>
      <h1 className={styles.visuallyHidden}>{label(slug)}のスマホUI案</h1>
      <header className={styles.toolbar}>
        <details className={styles.picker} key={slug}>
          <summary>ページを選ぶ <span>{index + 1} / {slugs.length}</span></summary>
          <nav className={styles.pageList} aria-label="スマホUIのページ一覧">
            {groups.map((group) => (
              <div key={group.title}>
                <h2>{group.title}</h2>
                {group.paths.map((path) => (
                  <Link key={path} href={previewUrl(path)} prefetch={false} aria-current={path === slug ? "page" : undefined}>
                    {label(path)}
                  </Link>
                ))}
              </div>
            ))}
          </nav>
        </details>
        <Link href={slug ? `/${slug}/` : "/"} prefetch={false}>本文を開く</Link>
      </header>
      <div className={styles.screen}>
        <Image
          className={styles.artwork}
          src={`/images/mobile-ui/${filename}.webp`}
          alt={`${label(slug)}のスマホ版デザイン`}
          width={898}
          height={1752}
          unoptimized
          preload
        />
        {!slug && (
          <>
            <a className={`${styles.hotspot} ${styles.consultation}`} href={consultation} aria-label="無料で導入相談する" />
            <Link className={`${styles.hotspot} ${styles.poc}`} href={previewUrl("poc")} aria-label="45日PoCを見る" />
          </>
        )}
      </div>
      <nav className={styles.pagination} aria-label="前後のスマホUI案">
        {previous !== undefined && <Link href={previewUrl(previous)}>← {label(previous)}</Link>}
        {next !== undefined && <Link href={previewUrl(next)}>{label(next)} →</Link>}
      </nav>
    </main>
  );
}
