"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { SiteBrand } from "./site-brand";
import { SiteIcon } from "./site-icon";
import {
  consultation,
  menuGroups,
  navigation,
  pageLabel,
} from "@/content/site";
export default function SiteHeader() {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.querySelector<HTMLButtonElement>("button")?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  function close() {
    setOpen(false);
    trigger.current?.focus();
  }
  return (
    <>
      <a className="skip" href="#main">
        本文へ移動
      </a>
      <header className="header">
        <div className="container header-inner">
          <SiteBrand />
          <nav className="desktop-nav" aria-label="メインナビゲーション">
            {navigation.map(([name, href]) => (
              <Link
                key={href}
                href={href}
                aria-current={
                  path.startsWith(href.slice(0, -1)) ? "page" : undefined
                }
              >
                {name}
              </Link>
            ))}
          </nav>
          <div className="header-actions">
            <a className="button primary small" href={consultation}>
              無料相談
              <SiteIcon name="arrow-up-right" size={17} />
            </a>
            <button
              ref={trigger}
              className="site-menu-trigger"
              aria-expanded={open}
              aria-controls="site-menu"
              aria-label={open ? "メニューを閉じる" : "すべてのページを開く"}
              onClick={() => (open ? close() : setOpen(true))}
            >
              <SiteIcon name={open ? "close" : "menu"} size={20} />
            </button>
          </div>
        </div>
      </header>
      {open && (
        <div className="site-menu-overlay">
          <button
            className="menu-scrim"
            aria-label="メニューを閉じる"
            onClick={close}
          />
          <div
            id="site-menu"
            ref={panel}
            className="site-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="サイトメニュー"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                close();
              }
              if (e.key === "Tab") {
                const all =
                  panel.current?.querySelectorAll<HTMLElement>("a,button");
                if (!all?.length) return;
                const first = all[0],
                  last = all[all.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                  e.preventDefault();
                  last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                  e.preventDefault();
                  first.focus();
                }
              }
            }}
          >
            <div className="menu-heading">
              <h2>サイトメニュー</h2>
              <button onClick={close} aria-label="メニューを閉じる">
                <SiteIcon name="close" size={22} />
              </button>
            </div>
            <nav className="menu-columns" aria-label="全ページ">
              {menuGroups.map((g) => (
                <div key={g.title}>
                  <h2>{g.title}</h2>
                  {g.paths.map((slug) => (
                    <Link key={slug} href={"/" + slug + "/"} onClick={close}>
                      {pageLabel(slug)}
                      <SiteIcon name="arrow-right" size={14} />
                    </Link>
                  ))}
                </div>
              ))}
            </nav>
            <div className="menu-bottom">
              <Link href="/news/" onClick={close}>
                ブログ・読みもの
                <SiteIcon name="arrow-right" size={16} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
