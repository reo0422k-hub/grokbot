import type { CSSProperties } from "react";

type ControlIcon = "arrow-right" | "arrow-up-right" | "chevron-down" | "menu" | "close" | "search";

export type DetailIcon =
  | "research"
  | "layers"
  | "copy"
  | "sales"
  | "recruiting"
  | "marketing"
  | "settings"
  | "workflow"
  | "approval"
  | "training"
  | "document"
  | "check";

type SiteIconProps = { name: ControlIcon; size: number; detail?: false } | {
  name: DetailIcon;
  size: number;
  detail: true;
};

export function SiteIcon({ name, size, detail }: SiteIconProps) {
  const style = {
    "--icon-size": `${size}px`,
    "--icon-image": `url(/images/brand/${name}.webp)`,
  } as CSSProperties;

  return (
    <span
      aria-hidden="true"
      className={detail ? "site-icon site-icon-detail" : "site-icon"}
      style={style}
    />
  );
}
