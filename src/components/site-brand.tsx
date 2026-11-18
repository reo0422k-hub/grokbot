import Image from "next/image";
import Link from "next/link";

export function SiteBrand() {
  return (
    <Link className="brand" href="/" aria-label="Grok Bot 導入支援 トップ">
      <Image
        className="brand-mark"
        src="/images/brand/mark.webp"
        width={36}
        height={36}
        alt=""
        unoptimized
      />
      <Image
        className="brand-wordmark"
        src="/images/brand/wordmark.webp"
        width={108}
        height={20}
        alt=""
        unoptimized
      />
      <span className="brand-sub">導入支援</span>
    </Link>
  );
}
