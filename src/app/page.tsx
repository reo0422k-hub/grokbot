"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import { HomeExplore, HomeMore } from "@/components/site-common";
import { MiniBot } from "@/components/bot-family";
import { SiteIcon } from "@/components/site-icon";
import { consultation, faqItems } from "@/content/site";
const cases = [
  {
    name: "営業",
    icon: "sales",
    title: "商談に向き合う時間を、もっと。",
    request: "明日の商談に向けて、企業情報と過去の商談メモを整理して。",
    outputs: [
      "企業調査をまとめた商談メモ",
      "次回の提案につながるメールの下書き",
    ],
    human: "情報の正確さ、提案内容、メールを送るかどうか。",
  },
  {
    name: "採用",
    icon: "recruiting",
    title: "一人ひとりと向き合う、その前に。",
    text: "求人票と面接メモを整理し、対話に必要な準備を支援します。",
    request: "求人票と面接メモを整理して、次の面接の質問案を作って。",
    outputs: ["求人要件に沿った質問案", "面接で確認したい事項の一覧"],
    human: "質問内容の妥当性、実際の面接、採用するかどうか。",
  },
  {
    name: "マーケティング",
    icon: "marketing",
    title: "情報を集めた先の、判断に集中。",
    request: "競合サービスの公開情報を調べて、出典付きで比較して。",
    outputs: ["出典付きの競合比較表", "比較項目ごとの違いと確認事項"],
    human: "比較条件と出典の確認、次に取り組む施策の判断。",
  },
] as const;
const supports = [
  {
    icon: "settings",
    title: "対象業務と完成条件の整理",
    text: "任せる仕事と完成条件、人が判断する範囲を決めます。",
  },
  {
    icon: "workflow",
    title: "Bot構築と業務ツールの接続",
    text: "普段使う資料・手順・ツールに合わせてBotを構築します。",
  },
  {
    icon: "approval",
    title: "権限、承認、品質の設計と検証",
    text: "Botの権限と人の承認を設計し、成果物の品質を確かめます。",
  },
  {
    icon: "training",
    title: "社員研修と運用改善",
    text: "依頼・確認・停止の手順を研修し、使いながら運用を改善します。",
  },
] as const;
function CTA({ small = false }: { small?: boolean }) {
  return (
    <a className={`button primary ${small ? "small" : ""}`} href={consultation}>
      {small ? "無料相談" : "無料で導入相談する"}
      <SiteIcon name="arrow-up-right" size={small ? 16 : 19} />
    </a>
  );
}
function Demo() {
  return (
    <figure className="demo-scene">
      <Image
        className="hero-bot-composite"
        src="/images/hero-desktop-square.webp"
        alt="営業準備Botの活用イメージ。明日の商談準備を依頼し、企業調査・商談メモ・メールの下書きを準備。送信前に人が内容を確認します。"
        width={1122}
        height={1402}
        sizes="(max-width: 600px) calc(100vw - 64px), (max-width: 1000px) 650px, (max-width: 1100px) 550px, (max-width: 1400px) 650px, (min-width: 1587px) 780px, 710px"
        priority
      />
      <Image className="hero-bot-mobile" src="/images/hero-mobile-square.webp" alt="営業準備Botの活用イメージ。黒いBotが企業情報・商談メモ・メールの下書きを並べたパネルを持ち、緑と青のミニBotが支えています。" width={1402} height={1122} sizes="(max-width: 768px) 100vw, 1px" loading="eager" />
      <div className="hero-mini-companions" aria-hidden="true"><MiniBot color="teal" /><MiniBot color="blue" /></div>
      <figcaption className="demo-note">
        ※説明用の画面です。実際の製品画面とは異なります。
      </figcaption>
    </figure>
  );
}
export default function Home() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = cases[active];
  function keyTabs(e: KeyboardEvent, index: number) {
    let next = index;
    if (e.key === "ArrowRight") next = (index + 1) % 3;
    else if (e.key === "ArrowLeft") next = (index + 2) % 3;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = 2;
    else return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  }
  return (
    <>
      <main id="main" tabIndex={-1} className="home-page">
        <section className="hero">
          <div className="container">
            <div className="hero-grid">
              <div className="hero-copy">
                <p className="hero-kicker">
                  <span />
                  法人向け Grok Bot 導入支援
                </p>
                <h1>
                  <span>Grok Botを、</span>
                  <span>自社の戦力に。</span>
                </h1>
                <p className="hero-description">
                  調査・資料作成・メールの下書きまで。
                  <br />
                  貴社の業務に合わせて、Grok Botの
                  <br className="desktop-break" />
                  <span className="hero-description-phrase">導入・定着を支援します。</span>
                </p>
                <p className="hero-proof">
                  まずは1部署・1業務。45日で効果を検証。
                </p>
                <div className="hero-buttons">
                  <CTA />
                  <a className="button secondary" href="#poc">
                    45日PoCを見る
                    <SiteIcon name="arrow-right" size={18} />
                  </a>
                </div>
                <p className="cta-note">法人向け・オンライン30分</p>
              </div>
              <Demo />
            </div>
          </div>
        </section>
        <HomeExplore />
        <section className="section problems">
          <div className="container">
            <div className="section-head">
              <h2>
                準備に時間がかかる仕事
              </h2>
            </div>
            <div className="problem-grid">
              {([
                {
                  icon: "research",
                  t: "企業情報の調査",
                },
                {
                  icon: "layers",
                  t: "資料や議事録の整理",
                },
                {
                  icon: "copy",
                  t: "ツール間の転記",
                },
              ] as const).map(({ icon, t }) => (
                <article key={t}>
                  <SiteIcon name={icon} size={31} detail />
                  <h3>{t}</h3>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section use-cases" id="use-cases">
          <div className="container">
            <div className="section-head">
              <h2>
                準備はBotに。
                <br />
                判断は、あなたに。
              </h2>
            </div>
            <div
              className="case-tabs"
              role="tablist"
              aria-label="部門ごとの活用例"
            >
              {cases.map((c, i) => (
                <button
                  key={c.name}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  role="tab"
                  id={`tab-${i}`}
                  aria-selected={active === i}
                  aria-controls={`panel-${i}`}
                  tabIndex={active === i ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => keyTabs(e, i)}
                >
                  <SiteIcon name={c.icon} size={20} detail />
                  {c.name}
                </button>
              ))}
            </div>
            <div
              className="case-panel"
              id={`panel-${active}`}
              role="tabpanel"
              aria-labelledby={`tab-${active}`}
              tabIndex={0}
            >
              <div className="case-intro">
                <MiniBot color={(["teal", "purple", "blue"] as const)[active]} className="case-guide-bot" />
                <h3>{current.title}</h3>
                <div className="example-note">検証前の活用例</div>
              </div>
              <div className="case-flow">
                <div>
                  <div>
                    <h4>依頼</h4>
                    <p>「{current.request}」</p>
                  </div>
                </div>
                <div>
                  <div>
                    <h4>AIが準備するもの</h4>
                    <ul>
                      {current.outputs.map((x) => (
                        <li key={x}>
                          <SiteIcon name="document" size={16} detail />
                          {x}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="human-step">
                  <div>
                    <h4>人が確認・判断すること</h4>
                    <p>{current.human}</p>
                  </div>
                </div>
              </div>
            </div>
            <Link className="text-link" href="/use-cases/">
              部門別の活用例を詳しく見る
              <SiteIcon name="arrow-up-right" size={18} />
            </Link>
          </div>
        </section>
        <section className="section support" id="support">
          <div className="container support-layout">
            <div className="support-heading">
              <h2>
                業務の選定から、
                <br />
                現場で使い続ける
                <br />
                仕組みまで。
              </h2>
              <p>
                業務に合うBotを設計し、定着を支援します。
              </p>
              <Link className="text-link home-detail-link" href="/support/">
                導入支援を詳しく見る
                <SiteIcon name="arrow-right" size={18} />
              </Link>
            </div>
            <div className="support-list">
              {supports.map(({ icon, title, text }) => (
                <article key={title}>
                  <div className="support-icon">
                    <SiteIcon name={icon} size={30} detail />
                  </div>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section poc" id="poc">
          <div className="container">
            <div className="section-head">
              <h2>
                本格導入の前に、
                <br />
                <span className="red">45日</span>で確かめる。
              </h2>
              <p>
                1部署・1業務で試し、本格導入を判断します。
              </p>
            </div>
            <Link className="text-link home-detail-link" href="/poc/">
              45日PoCの詳細を見る
              <SiteIcon name="arrow-right" size={18} />
            </Link>
            <ol className="timeline">
              {[
                [
                  "1–10",
                  "対象業務と\n現状の整理",
                  "手順・作業量・完成条件を整理し、検証する指標を決めます。",
                ],
                [
                  "11–20",
                  "Botと利用環境の\n設計",
                  "参照情報、ツール接続、権限と承認の流れを整えます。",
                ],
                [
                  "21–35",
                  "実際の業務で\n検証",
                  "現場で使いながら品質を確認。必要な修正を重ねます。",
                ],
                [
                  "36–45",
                  "結果を整理し、\n本格導入を判断",
                  "検証結果を振り返り、続ける範囲や改善点を整理します。",
                ],
              ].map(([days, title, text]) => (
                <li key={days}>
                  <p className="days">
                    {days}
                    <span>日</span>
                  </p>
                  <div className="timeline-dot" />
                  <h3>
                    {title.split("\n").map((s, j) => (
                      <span key={j}>
                        {s}
                        <br />
                      </span>
                    ))}
                  </h3>
                  <p>{text}</p>
                </li>
              ))}
            </ol>
            <div className="measurement">
              <p>
                作業時間・修正率・完了率を比較します。
                <br />
                45日での効果や全社導入を保証するものではありません。
              </p>
            </div>
          </div>
        </section>
        <section className="section pricing">
          <div className="container pricing-layout">
            <div>
              <h2>
                導入にかかる費用
              </h2>
            </div>
            <div className="cost-list">
              <div>
                <h3>
                  相談・ヒアリング・
                  <wbr />
                  PoCの提案は<span className="red">無料</span>
                </h3>
              </div>
              <div>
                <h3>
                  PoC・本格導入の支援費用は、
                  <br />
                  内容に応じて個別にご案内
                </h3>
              </div>
              <p>
                <SiteIcon name="document" size={18} detail />
                Grok Botの製品利用料金は別途必要です。
              </p>
            </div>
          </div>
        </section>
        <section className="section faq" id="faq">
          <div className="container faq-layout">
            <div>
              <h2>よくある質問</h2>
            </div>
            <div className="faq-list">
              {[0, 2, 3, 6, 4].map((index) => faqItems[index]).map(({ q, a }) => (
                <details key={q}>
                  <summary>
                    <span className="q">Q.</span>
                    <span>{q}</span>
                    <SiteIcon name="chevron-down" size={20} />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <HomeMore />
        <section className="contact-section" id="contact" aria-labelledby="home-contact-title">
          <div className="container contact-inner">
            <h2 id="home-contact-title">
              <span>自社のどの仕事から始めるか、</span>
              <span>一緒に整理しませんか。</span>
            </h2>
            <p>
              30分の無料オンライン相談で、最初に試す業務を整理します。
            </p>
            <CTA />
            <Image
              className="contact-visual"
              src="/images/contact-planning-bots.webp"
              alt=""
              width={1280}
              height={720}
              sizes="(max-width: 660px) 112px, (max-width: 1120px) 32vw, 448px"
            />
          </div>
        </section>
      </main>
    </>
  );
}
