"use client";

import { useEffect, useRef, useState } from "react";
import Diagram from "@/components/Diagram";
import type { Project } from "@/content";
import type { Story } from "@/stories";

type Meta = { line: string; icon: string; from: string; to: string };

const ICONS: Record<string, React.ReactNode> = {
  pulse: <path d="M4 26h9l4-10 6 20 5-14 3 4h13" />,
  game: <path d="M14 18h20a8 8 0 0 1 8 8v2a6 6 0 0 1-11 3l-2-3H19l-2 3a6 6 0 0 1-11-3v-2a8 8 0 0 1 8-8ZM15 22v6M12 25h6M31 24h.01M35 27h.01" />,
  mic: <path d="M24 6a6 6 0 0 1 6 6v10a6 6 0 0 1-12 0V12a6 6 0 0 1 6-6ZM12 22a12 12 0 0 0 24 0M24 34v8M17 42h14" />,
  plane: <path d="M6 28l36-14-10 28-7-11-11-3ZM25 31l17-17" />,
  pin: <path d="M24 44s14-12 14-24a14 14 0 0 0-28 0c0 12 14 24 14 24ZM24 25a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />,
  trophy: <path d="M16 6h16v12a8 8 0 0 1-16 0V6ZM16 10H8a6 6 0 0 0 8 8M32 10h8a6 6 0 0 1-8 8M24 26v8M16 42h16l-2-8H18Z" />,
  cloud: <path d="M14 36h22a8 8 0 0 0 0-16 12 12 0 0 0-23-2A9 9 0 0 0 14 36ZM24 22v6M24 32h.01" />,
  browser: <path d="M6 10h36v28H6ZM6 17h36M11 13.5h.01M15 13.5h.01M12 24h12M12 30h20" />,
  shield: <path d="M24 5l16 6v11c0 10-7 18-16 21C15 40 8 32 8 22V11Z M17 24l5 5 9-10" />,
};

export default function ProjectGallery({
  projects,
  meta,
  stories,
}: {
  projects: Project[];
  meta: Record<string, Meta>;
  stories: Record<string, Story>;
}) {
  const [open, setOpen] = useState<Project | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <>
      <div className="gallery">
        {projects.map((p, i) => {
          const m = meta[p.slug];
          return (
            <button
              key={p.slug}
              type="button"
              className={`card ${i === 0 ? "card--wide" : ""}`}
              onClick={() => setOpen(p)}
              aria-haspopup="dialog"
              data-reveal
            >
              <span className="card__cover" style={{ background: `linear-gradient(135deg, ${m.from}, ${m.to})` }}>
                {p.shots ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.shots.desktop} alt="" loading="lazy" />
                ) : (
                  <svg viewBox="0 0 48 48" aria-hidden="true">{ICONS[m.icon]}</svg>
                )}
              </span>
              <span className="card__body">
                <span className="card__kind">{p.kind}</span>
                <span className="card__name">{p.name}</span>
                <span className="card__line">{m.line}</span>
                {i === 0 && <span className="card__summary">{p.summary}</span>}
                <span className="card__tags">
                  {p.stack.slice(0, i === 0 ? 12 : 4).map((s) => <span key={s}>{s}</span>)}
                </span>
                <span className="card__more">View case study</span>
              </span>
            </button>
          );
        })}
      </div>

      <dialog
        ref={dialog}
        className="modal"
        aria-labelledby="modal-title"
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(null);
        }}
      >
        {open && (
          <div className="modal__inner">
            <button type="button" className="modal__close" onClick={() => setOpen(null)} aria-label="Close">
              ×
            </button>
            <p className="feature__kind">{open.kind}</p>
            <h3 id="modal-title" className="modal__title">{open.name}</h3>
            {open.shots && (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="modal__shot" src={open.shots.desktop} alt={`${open.name} home page`} />
            )}
            <p className="modal__summary">{open.summary}</p>
            <p className="feature__role"><strong>My role:</strong> {open.role}</p>
            {stories[open.slug] && (
              <div className="modal__story">
                <div>
                  <h4>The problem</h4>
                  <p>{stories[open.slug].problem}</p>
                </div>
                <div>
                  <h4>What I did</h4>
                  <p>{stories[open.slug].solution}</p>
                </div>
                <div>
                  <h4>Result</h4>
                  <p>{stories[open.slug].result}</p>
                </div>
              </div>
            )}
            <h4 className="modal__sub">Architecture</h4>
            <div className="modal__diagram">
              <Diagram spec={open.diagram} title={`${open.name} architecture`} />
            </div>
            <h4 className="modal__sub">What I built</h4>
            <ul className="feature__list">
              {open.highlights.map((h) => <li key={h}>{h}</li>)}
            </ul>
            <ul className="tags" aria-label="Stack">
              {open.stack.map((s) => <li key={s}>{s}</li>)}
            </ul>
            {open.link && (
              <a className="btn btn--primary" href={open.link.href} target="_blank" rel="noreferrer">
                Visit {open.link.label}
              </a>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
