/*
 * Meet Adi — one-screen homepage behaviour.
 * Single script for the whole page, per issue #32 §8.
 * Timings are kept as named constants so they're easy to tune (§4).
 */
(function () {
  "use strict";

  /* ------------------------------------------------------------------
   * Theme: keep following journal-prefs live when the reader's choice
   * is "system" (the inline pre-paint snippet in <head> sets the
   * initial value before first paint; this only handles later OS
   * theme changes without a reload).
   * ------------------------------------------------------------------ */
  function watchSystemTheme() {
    var html = document.documentElement;
    if (html.getAttribute("data-theme-choice") !== "system") return;
    var media = window.matchMedia("(prefers-color-scheme: dark)");
    var onChange = function (e) {
      if (html.getAttribute("data-theme-choice") !== "system") return;
      html.setAttribute("data-theme", e.matches ? "dark-modern" : "original");
    };
    if (media.addEventListener) media.addEventListener("change", onChange);
    else if (media.addListener) media.addListener(onChange); // older Safari
  }

  /* ------------------------------------------------------------------
   * Loader: pure-CSS "jetpack person", adapted from Mr. Alien's CodePen
   * "speeder" (https://codepen.io/mr_alien/pen/FDLjg). Hidden on
   * window load AND document.fonts.ready, whichever is later, with a
   * hard 4s timeout so it can never hang. Skipped on repeat visits
   * within the same session, and skipped (faded immediately) under
   * prefers-reduced-motion.
   * ------------------------------------------------------------------ */
  var LOADER_TIMEOUT_MS = 4000;
  var LOADER_FADE_MS = 300;
  var SESSION_KEY = "meet-adi-loader-shown";

  function hideLoader(wrapper) {
    if (!wrapper || wrapper.hidden) return;
    wrapper.style.opacity = "0";
    window.setTimeout(function () {
      wrapper.hidden = true;
      document.dispatchEvent(new CustomEvent("loader:done"));
    }, LOADER_FADE_MS);
  }

  function initLoader() {
    var wrapper = document.getElementById("loader-wrapper");
    if (!wrapper) return;

    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    var alreadyShown = false;
    try {
      alreadyShown = sessionStorage.getItem(SESSION_KEY) === "1";
    } catch (e) {
      /* storage unavailable: treat as not shown yet */
    }

    if (reduceMotion || alreadyShown) {
      wrapper.hidden = true;
      // still fire the event so the typewriter starts on its own delay
      document.dispatchEvent(new CustomEvent("loader:done"));
      try {
        sessionStorage.setItem(SESSION_KEY, "1");
      } catch (e) {}
      return;
    }

    try {
      sessionStorage.setItem(SESSION_KEY, "1");
    } catch (e) {}

    var done = false;
    function finish() {
      if (done) return;
      done = true;
      hideLoader(wrapper);
    }

    var loadDone = document.readyState === "complete";
    var fontsDone = !document.fonts || document.fonts.status === "loaded";

    function maybeFinish() {
      if (loadDone && fontsDone) finish();
    }

    if (!loadDone) {
      window.addEventListener("load", function () {
        loadDone = true;
        maybeFinish();
      });
    }
    if (!fontsDone && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(function () {
        fontsDone = true;
        maybeFinish();
      });
    }
    maybeFinish();
    window.setTimeout(finish, LOADER_TIMEOUT_MS);
  }

  /* ------------------------------------------------------------------
   * Typewriter headline (§4).
   * ------------------------------------------------------------------ */
  var LINES = [
    "Following curiosity, wherever it leads.",
    "Between what I know and what I wonder.",
    "Some ideas take shape. Others find their words.",
    "Some thoughts become experiments. Others become stories.",
    "The more I learn, the more there is to wonder about.",
  ];
  var TYPE_MS = 55;
  var HOLD_MS = 3000;
  var ERASE_MS = 25;
  var GAP_MS = 450;
  var START_DELAY_MS = 400;

  function initTypewriter() {
    var liveEl = document.querySelector(".tw-live");
    var cursorEl = document.querySelector(".tw-cursor");
    if (!liveEl) return;

    var reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      liveEl.textContent = LINES[0];
      if (cursorEl) cursorEl.hidden = true;
      return;
    }

    var lineIndex = 0;
    var charIndex = 0;
    var phase = "typing"; // typing | holding | erasing | gap

    function schedule(fn, ms) {
      window.setTimeout(fn, ms);
    }

    function step() {
      var line = LINES[lineIndex];
      if (phase === "typing") {
        charIndex++;
        liveEl.textContent = line.slice(0, charIndex);
        if (charIndex >= line.length) {
          phase = "holding";
          schedule(step, HOLD_MS);
        } else {
          schedule(step, TYPE_MS);
        }
      } else if (phase === "holding") {
        phase = "erasing";
        schedule(step, 0);
      } else if (phase === "erasing") {
        charIndex--;
        liveEl.textContent = line.slice(0, Math.max(charIndex, 0));
        if (charIndex <= 0) {
          phase = "gap";
          schedule(step, GAP_MS);
        } else {
          schedule(step, ERASE_MS);
        }
      } else if (phase === "gap") {
        lineIndex = (lineIndex + 1) % LINES.length;
        charIndex = 0;
        phase = "typing";
        schedule(step, 0);
      }
    }

    schedule(step, START_DELAY_MS);
  }

  document.addEventListener("loader:done", initTypewriter, { once: true });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      watchSystemTheme();
      initLoader();
    });
  } else {
    watchSystemTheme();
    initLoader();
  }
})();
