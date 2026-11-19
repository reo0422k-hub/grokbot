import Image from "next/image";
import { botColors, type BotColor } from "@/content/characters";

export function MiniBot({ color, className = "" }: { color: BotColor; className?: string }) {
  return <span aria-hidden="true" className={`mini-bot bot-${color} ${className}`} />;
}
export function BotFamily({ className = "" }: { className?: string }) {
  return <div className={`bot-family ${className}`} aria-hidden="true">
    {botColors.map((color) => <MiniBot color={color} key={color} />)}
  </div>;
}
export function pageArtwork(slug: string, placement: "hero" | "contact" | "thumbnail") {
  return `/images/page-artwork/${slug.replaceAll("/", "-")}-${placement}.webp`;
}

export function BotArtwork({ src, alt, color = "teal", priority = false }: {
  src: string;
  alt: string;
  color?: BotColor;
  priority?: boolean;
}) {
  return <div className="bot-artwork">
    <Image
      src={src}
      alt={alt}
      width={480}
      height={360}
      loading={priority ? "eager" : "lazy"}
      sizes="(max-width: 768px) 90vw, 550px"
    />
    <div className="art-companions" aria-hidden="true"><MiniBot color={color} /><MiniBot color={color === "blue" ? "purple" : "blue"} /></div>
  </div>;
}
