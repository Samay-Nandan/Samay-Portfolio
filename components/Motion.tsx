"use client";

import { useEffect, useRef, useState } from "react";

// Reveals every [data-reveal] element as it scrolls into view.
export function RevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add("js");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      // Reveal as soon as an element is about to enter the screen, so you never scroll through empty space.
      { threshold: 0, rootMargin: "0px 0px 12% 0px" },
    );
    document.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}

// Types each phrase, holds, deletes, moves to the next.
export function Typed({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState(phrases[0]);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    let len = phrases[0].length;
    let deleting = true;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      if (deleting) {
        len--;
        if (len === 0) {
          deleting = false;
          i = (i + 1) % phrases.length;
        }
      } else {
        len++;
      }
      setText(phrases[i].slice(0, len));
      let delay = deleting ? 35 : 70;
      if (!deleting && len === phrases[i].length) {
        deleting = true;
        delay = 2200;
      }
      timer = setTimeout(tick, delay);
    };
    timer = setTimeout(tick, 2600);
    return () => clearTimeout(timer);
  }, [phrases]);
  return (
    <span className="typed">
      <span className="sr-only">{phrases.join(", ")}</span>
      <span aria-hidden="true">{text}</span>
      <span className="typed__caret" aria-hidden="true">_</span>
    </span>
  );
}

// Counts from 0 to the value the first time it is seen.
export function CountUp({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(value);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setN(0);
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const p = Math.min(1, (now - start) / 1400);
        setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [value]);
  return (
    <span ref={ref}>
      {prefix}
      {n}
      {suffix}
    </span>
  );
}
