"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Photo } from "@/lib/logements";
import type { Lang } from "@/lib/i18n";

const T = {
  fr: { agrandir: "Agrandir la photo", fermer: "Fermer", prec: "Photo précédente", suiv: "Photo suivante" },
  en: { agrandir: "Enlarge photo", fermer: "Close", prec: "Previous photo", suiv: "Next photo" },
};

export default function Gallery({ photos, lang = "fr" }: { photos: Photo[]; lang?: Lang }) {
  const t = T[lang];
  const [index, setIndex] = useState<number | null>(null);

  const fermer = useCallback(() => setIndex(null), []);
  const precedente = useCallback(
    () => setIndex((i) => (i === null ? null : (i + photos.length - 1) % photos.length)),
    [photos.length],
  );
  const suivante = useCallback(
    () => setIndex((i) => (i === null ? null : (i + 1) % photos.length)),
    [photos.length],
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fermer();
      if (e.key === "ArrowLeft") precedente();
      if (e.key === "ArrowRight") suivante();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, fermer, precedente, suivante]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {photos.map((photo, i) => (
          <button
            key={photo.src + i}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative aspect-[4/3] overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-corten"
            aria-label={`${t.agrandir} : ${photo.alt}`}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 640px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {index !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-bark/95 p-4"
          role="dialog"
          aria-modal="true"
          onClick={fermer}
        >
          <div
            className="relative h-[80vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={photos[index].src}
              alt={photos[index].alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <p className="absolute bottom-6 left-1/2 -translate-x-1/2 rounded-full bg-bark/70 px-4 py-1.5 text-sm text-cream">
            {photos[index].alt} — {index + 1}/{photos.length}
          </p>
          <button
            type="button"
            onClick={fermer}
            aria-label={t.fermer}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream hover:bg-cream/20"
          >
            ×
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              precedente();
            }}
            aria-label={t.prec}
            className="absolute left-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream hover:bg-cream/20 sm:left-6"
          >
            ‹
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              suivante();
            }}
            aria-label={t.suiv}
            className="absolute right-2 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-2xl text-cream hover:bg-cream/20 sm:right-6"
          >
            ›
          </button>
        </div>
      )}
    </>
  );
}
