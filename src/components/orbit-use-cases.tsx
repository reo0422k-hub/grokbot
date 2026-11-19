"use client";

import { useEffect, useRef } from "react";

export function OrbitUseCases() {
  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const observer = new ResizeObserver(([entry]) => {
      if (entry) {
        frame.style.height = `${Math.ceil(entry.target.getBoundingClientRect().height)}px`;
      }
    });

    function observeContent() {
      observer.disconnect();
      const content = frame?.contentDocument?.querySelector("[data-gbuc]");
      if (content) observer.observe(content);
    }

    frame.addEventListener("load", observeContent);
    observeContent();
    return () => {
      frame.removeEventListener("load", observeContent);
      observer.disconnect();
    };
  }, []);

  return (
    <section id="support" aria-label="Grok Botの導入支援">
      <iframe
        ref={frameRef}
        title="Grok Botの導入支援"
        src="/grokbot-orbit-usecases.html"
        loading="lazy"
        className="orbit-use-cases-frame"
      />
    </section>
  );
}
