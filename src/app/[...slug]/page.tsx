import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pages, findPage } from "@/content/site";
import ContentPage from "@/components/content-page";
export const dynamicParams = false;
export function generateStaticParams() {
  return pages.map((p) => ({ slug: p.slug.split("/") }));
}
type Props = { params: Promise<{ slug: string[] }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = findPage(slug.join("/"));
  if (!page) return {};
  return {
    title: page.title.replace(/\n/g, "") + "｜Grok Bot 導入支援",
    description: page.lead,
    openGraph: {
      title: page.title.replace(/\n/g, ""),
      description: page.lead,
      locale: "ja_JP",
      type: page.kind === "article" ? "article" : "website",
    },
  };
}
export default async function Page({ params }: Props) {
  const { slug } = await params;
  const page = findPage(slug.join("/"));
  if (!page) notFound();
  return <ContentPage page={page} />;
}
