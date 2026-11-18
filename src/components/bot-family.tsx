import Image from "next/image";
import type { CSSProperties } from "react";
import { botColors, type BotColor } from "@/content/characters";

export function MiniBot({ color, className = "" }: { color: BotColor; className?: string }) {
  return <span aria-hidden="true" className={`mini-bot bot-${color} ${className}`} />;
}
export function BotFamily({ className = "" }: { className?: string }) {
  return <div className={`bot-family ${className}`} aria-hidden="true">
    {botColors.map((color) => <MiniBot color={color} key={color} />)}
  </div>;
}
export function BotArtwork({ original, alt, scene = "work", color = "teal", priority = false, className = "" }: {
  original: string; alt: string; scene?: "work" | "support" | "security"; color?: BotColor; priority?: boolean; className?: string;
}) {
  return <div className={`bot-artwork ${className}`} style={{ "--art-tone": color } as CSSProperties}>
    <Image className="art-original" src={original} alt={alt} width={1448} height={1086} priority={priority} sizes="(max-width: 768px) 90vw, 550px" />
    <Image className="art-mobile" src={`/images/crew-${scene}.png`} alt={alt} width={1402} height={1122} loading={priority ? "eager" : "lazy"} sizes="(max-width: 768px) 100vw, 1px" />
    <div className="art-companions" aria-hidden="true"><MiniBot color={color} /><MiniBot color={color === "blue" ? "purple" : "blue"} /></div>
  </div>;
}
