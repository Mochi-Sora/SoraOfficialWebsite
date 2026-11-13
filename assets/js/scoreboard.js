(() => {
  "use strict";

  /*
   * Live benchmark scoreboard.
   *
   * The public markdown file is the source of truth; the markup ships with a
   * snapshot of the latest run so the section still reads without JavaScript
   * or network access. On load we fetch the source, parse the tables, and
   * replace the snapshot values in place.
   */

  const SOURCE =
    "https://raw.githubusercontent.com/Mochi-Sora/SoraAgent-Benchmarks/main/SoraAgent-live-scoreboard.md";

  const clean = (value) =>
    String(value ?? "")
      .replace(/\*\*/g, "")
      .replace(/`/g, "")
      .trim();

  const toNumber = (value) => {
    const match = clean(value).match(/-?\d+(?:\.\d+)?/);
    return match ? Number.parseFloat(match[0]) : null;
  };

  const normalize = (value) => clean(value).replace(/\s+/g, " ").toLowerCase();

  const clamp = (value) => Math.min(100, Math.max(0, value));

  function parseTable(lines) {
    return lines
      .map((line) => line.trim())
      .filter((line) => line.startsWith("|"))
      .map((line) =>
        line
          .replace(/^\|/, "")
          .replace(/\|$/, "")
          .split("|")
          .map(clean),
      )
      .filter((cells) => cells.length >= 2)
      .filter((cells) => !cells.every((cell) => /^:?-{3,}:?$/.test(cell)))
      .filter((cells) => cells[0] !== "Metric" && cells[0] !== "Suite");
  }

  function parseSections(lines) {
    const sections = {};
    let current = null;

    for (const line of lines) {
      const heading = line.match(/^##\s+(.+?)\s*$/);
      if (heading) {
        current = heading[1];
        sections[current] = [];
        continue;
      }

      if (/^###\s+/.test(line)) {
        current = null;
        continue;
      }

      if (current) sections[current].push(line);
    }

    return sections;
  }

  function parse(markdown) {
    const lines = markdown.split(/\r?\n/);
    const meta = {};

    lines.slice(0, 16).forEach((line) => {
      const match = line.match(
        /^\*\*(Model|Mode|Generated|Duration|Scored agent runs):\*\*\s*(.+?)\s*$/,
      );
      if (match) meta[match[1]] = clean(match[2]);
    });

    const sections = parseSections(lines);
    const overall = Object.fromEntries(parseTable(sections.Overall || []));

    const overallScore = clean(overall["Overall score"] || "");
    const scoreMatch = overallScore.match(/([\d.]+)\s*\/\s*100/);
    const gradeMatch = overallScore.match(/\(([A-F][+-]?)\)/);

    const suites = parseTable(sections["Suite scores"] || []).map(([name, score, runs]) => ({
      name,
      score: toNumber(score),
      runs: clean(runs || ""),
    }));

    // Cards can reference any metric table, not just the headline block.
    const metrics = new Map();
    Object.entries(sections).forEach(([title, sectionLines]) => {
      if (title === "Overall" || title === "Suite scores") return;

      parseTable(sectionLines).forEach(([name, value, score]) => {
        if (!name || score === undefined) return;

        const key = normalize(name);
        if (metrics.has(key)) return;

        metrics.set(key, { name, value: clean(value), score: toNumber(score) });
      });
    });

    const headline = [...metrics.values()];

    const runsMatch = (meta["Scored agent runs"] || "").match(/\d[\d,]*/);

    return {
      meta: {
        model: meta.Model || "",
        mode: meta.Mode || "",
        generated: meta.Generated || "",
        duration: meta.Duration || "",
        runs: runsMatch ? runsMatch[0] : "",
      },
      overall: {
        score: scoreMatch ? Number.parseFloat(scoreMatch[1]) : null,
        grade: gradeMatch ? gradeMatch[1] : "",
      },
      suites,
      headline,
    };
  }

  function formatDate(iso) {
    const date = new Date(iso);
    if (Number.isNaN(date.getTime())) return iso;

    const day = new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
      timeZone: "UTC",
    }).format(date);

    const time = new Intl.DateTimeFormat("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "UTC",
    }).format(date);

    return `${day} · ${time} UTC`;
  }

  function apply(data, root) {
    const setText = (selector, text) => {
      if (!text) return;
      root.querySelectorAll(selector).forEach((el) => {
        el.textContent = text;
      });
    };

    if (data.overall.score !== null) {
      const score = data.overall.score.toFixed(1);
      setText('[data-bench="overall"]', score);

      const dial = root.querySelector("[data-bench-dial]");
      if (dial) {
        dial.style.setProperty("--p", String(clamp(data.overall.score)));
        dial.setAttribute("aria-label", `Overall benchmark score ${score} out of 100`);
      }
    }

    setText('[data-bench="grade"]', data.overall.grade);
    setText('[data-bench="model"]', data.meta.model);
    setText('[data-bench="mode"]', data.meta.mode);
    setText('[data-bench="runs"]', data.meta.runs);
    setText('[data-bench="duration"]', data.meta.duration);

    const updated = root.querySelector('[data-bench="updated"]');
    if (updated && data.meta.generated) {
      updated.dateTime = data.meta.generated;
      updated.textContent = formatDate(data.meta.generated);
    }

    const suiteItems = [...root.querySelectorAll("[data-suite]")];
    data.suites.forEach((suite) => {
      if (suite.score === null) return;

      const item = suiteItems.find(
        (el) => normalize(el.dataset.suite) === normalize(suite.name),
      );
      if (!item) return;

      const score = item.querySelector("[data-suite-score]");
      if (score) score.textContent = suite.score.toFixed(1);

      const bar = item.querySelector("[data-suite-bar]");
      if (bar) {
        bar.setAttribute("aria-valuenow", String(suite.score));
        const fill = bar.querySelector("span");
        if (fill) fill.style.width = `${clamp(suite.score)}%`;
      }

      const runs = item.querySelector("[data-suite-runs]");
      if (runs) {
        runs.textContent = suite.runs && suite.runs !== "—" ? `${suite.runs} runs` : "—";
      }
    });

    const metricCards = [...root.querySelectorAll("[data-metric]")];
    data.headline.forEach((metric) => {
      const card = metricCards.find(
        (el) => normalize(el.dataset.metric) === normalize(metric.name),
      );
      if (!card) return;

      const value = card.querySelector("[data-metric-value]");
      if (value && metric.value) value.textContent = metric.value;

      if (metric.score === null) return;

      const score = card.querySelector("[data-metric-score]");
      if (score) score.textContent = metric.score.toFixed(1);

      const bar = card.querySelector(".bench-metric-bar i");
      if (bar) bar.style.width = `${clamp(metric.score)}%`;
    });
  }

  async function init() {
    const root = document.querySelector("[data-scoreboard]");
    if (!root) return;

    const status = root.querySelector('[data-bench="status"]');
    const updated = root.querySelector('[data-bench="updated"]');
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 8000);

    try {
      const response = await fetch(`${SOURCE}?v=${Date.now()}`, {
        cache: "no-store",
        signal: controller.signal,
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      const data = parse(await response.text());
      if (data.overall.score === null || data.suites.length === 0) {
        throw new Error("Unrecognized scoreboard format");
      }

      apply(data, root);
      root.classList.add("is-live");

      if (status) status.textContent = "Live";
    } catch {
      root.classList.add("is-snapshot");
      if (status) status.textContent = "Snapshot";
    } finally {
      window.clearTimeout(timeout);
    }
  }

  window.SoraScoreboard = { parse, init };

  if (typeof document !== "undefined") {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", init);
    } else {
      init();
    }
  }
})();
