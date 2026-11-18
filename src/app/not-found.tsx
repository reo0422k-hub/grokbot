import Link from "next/link";
import Image from "next/image";
export default function NotFound() {
  return (
    <main id="main" tabIndex={-1} className="not-found-page container">
      <Image
        src="/images/work-guide-transparent.webp"
        alt="資料を探しているマスコット"
        width={440}
        height={330}
      />
      <h1>ページが見つかりませんでした。</h1>
      <p>URLをご確認いただくか、トップページからお探しください。</p>
      <Link className="button primary" href="/">
        トップページへ戻る
      </Link>
    </main>
  );
}
