import React from "react";
import Script from "next/script";

export default function Home() {
  return (
    <>
      <Script
        src="https://unpkg.com/@lottiefiles/lottie-player@2.0.12/dist/lottie-player.js"
        strategy="afterInteractive"
      />
      <Script src="/js/app.js" strategy="afterInteractive" />

      <main
        className="onboarding"
        id="onboarding"
        aria-label="Medito onboarding"
        aria-live="polite"
      >
        <header className="topbar">
          <div className="brand-mark" aria-label="Medito">
            <span className="brand-mark__symbol" aria-hidden="true" />
          </div>
          <p className="step-count" id="step-count" aria-label="Scherm 1 van 5">
            01/05
          </p>
        </header>

        <section className="animation-zone" aria-label="Animatie">
          <button
            className="animation-control"
            id="animation-control"
            type="button"
            aria-label="Pauzeer ademhalingsanimatie"
            disabled
          >
            {React.createElement("lottie-player" as React.ElementType, {
              id: "lottie-player",
              src: "/assets/lottie/01_NOISE_TO_FOCUS.json",
              background: "transparent",
              speed: "1",
              loop: true,
              autoplay: true,
            })}
            <span className="animation-state" id="animation-state" aria-hidden="true" />
          </button>
          <p className="animation-instruction" id="animation-instruction" hidden>
            Tik om te pauzeren
          </p>
        </section>

        <section className="story" id="story">
          <div className="story__copy">
            <p className="eyebrow" id="eyebrow">
              01 — Kom tot rust
            </p>
            <h1 id="title">
              Je hoofd staat
              <br />
              nooit stil.
            </h1>
            <p className="description" id="description">
              Gedachten komen en gaan. Medito helpt je om even afstand te nemen.
            </p>
          </div>

          <nav className="navigation" aria-label="Onboarding navigatie">
            <button
              className="back-button"
              id="back-button"
              type="button"
              aria-label="Vorig scherm"
            >
              <span aria-hidden="true">←</span>
            </button>

            <div className="pagination" id="pagination" aria-label="Kies een scherm" />

            <button className="next-button" id="next-button" type="button">
              <span id="next-label">Maak ruimte</span>
              <span className="next-button__arrow" aria-hidden="true">
                →
              </span>
            </button>
          </nav>
        </section>

        <div className="completion-message" id="completion-message" role="status" hidden>
          Je bent klaar om te beginnen.
        </div>
      </main>

      <noscript>
        <p className="noscript-message">
          Schakel JavaScript in om de Medito-onboarding te bekijken.
        </p>
      </noscript>
    </>
  );
}
