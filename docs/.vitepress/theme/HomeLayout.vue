<template>
  <div class="home-shell">
    <!-- ── Standalone Navbar ── -->
    <nav class="home-nav" :class="{ 'home-nav--scrolled': scrolled }">
      <div class="home-nav-inner">
        <!-- Logo -->
        <a class="home-nav-logo" href="/">
          <svg
            width="24"
            height="24"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#a78bfa" />
                <stop offset="100%" stop-color="#7c3aed" />
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="30" fill="url(#lg1)" opacity="0.18" />
            <path
              d="M15 21 L7 32 L15 43"
              stroke="url(#lg1)"
              stroke-width="3.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M49 21 L57 32 L49 43"
              stroke="url(#lg1)"
              stroke-width="3.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <line
              x1="32"
              y1="18"
              x2="32"
              y2="28"
              stroke="url(#lg1)"
              stroke-width="2.5"
              stroke-linecap="round"
            />
            <circle cx="32" cy="15" r="4.5" fill="#a78bfa" />
            <path
              d="M32 28 L22 38"
              stroke="#a78bfa"
              stroke-width="2"
              stroke-linecap="round"
              stroke-opacity="0.7"
            />
            <path
              d="M32 28 L42 38"
              stroke="#a78bfa"
              stroke-width="2"
              stroke-linecap="round"
              stroke-opacity="0.7"
            />
            <circle cx="22" cy="40" r="3" fill="#c4b5fd" />
            <circle cx="42" cy="40" r="3" fill="#c4b5fd" />
            <circle cx="32" cy="50" r="3.5" fill="#a78bfa" />
            <path
              d="M22 40 L32 48"
              stroke="#a78bfa"
              stroke-width="2"
              stroke-linecap="round"
              stroke-opacity="0.6"
            />
            <path
              d="M42 40 L32 48"
              stroke="#a78bfa"
              stroke-width="2"
              stroke-linecap="round"
              stroke-opacity="0.6"
            />
          </svg>
          <span class="home-nav-brand">whispercom</span>
        </a>

        <!-- Center links -->
        <div class="home-nav-links">
          <a href="/guide/introduction" class="home-nav-link">Guide</a>
          <a href="/reference/commands" class="home-nav-link">Reference</a>
          <a href="/guide/providers" class="home-nav-link">Providers</a>
        </div>

        <!-- Right actions -->
        <div class="home-nav-actions">
          <a
            class="home-nav-version"
            href="https://github.com/badalkr2004/whispercom/releases"
            target="_blank"
            rel="noopener"
            >v1.0.0</a
          >
          <a
            class="home-nav-github"
            href="https://github.com/badalkr2004/whispercom"
            target="_blank"
            rel="noopener"
            aria-label="GitHub"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
          </a>
          <a class="btn btn-primary btn-sm" href="/guide/getting-started"
            >Get Started</a
          >
        </div>
      </div>
    </nav>

    <!-- ── HERO ── -->
    <section class="hero">
      <div class="hero-grid" aria-hidden="true"></div>
      <div class="orb orb-1" aria-hidden="true"></div>
      <div class="orb orb-2" aria-hidden="true"></div>

      <div class="hero-inner">
        <a
          class="badge"
          href="https://www.npmjs.com/package/whispercom"
          target="_blank"
          rel="noopener"
        >
          <span class="badge-dot"></span>
          <span>v1.0.0 on npm</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6H9.5M6.5 3L9.5 6L6.5 9"
              stroke="currentColor"
              stroke-width="1.4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </a>

        <h1 class="hero-headline">
          <span class="hero-headline-dim">Perfect commits,</span><br />
          <span class="hero-headline-bright">zero friction.</span>
        </h1>

        <p class="hero-tagline">
          whispercom analyzes your staged diff and generates<br
            class="hide-sm"
          />
          3 AI-crafted conventional commits — right in your terminal.
        </p>

        <div class="hero-actions">
          <a class="btn btn-primary" href="/guide/getting-started">
            Get Started
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
          <a
            class="btn btn-secondary"
            href="https://github.com/badalkr2004/whispercom"
            target="_blank"
            rel="noopener"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path
                d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              />
            </svg>
            GitHub
          </a>
        </div>

        <div class="install-bar">
          <span class="install-prompt">$</span>
          <span class="install-cmd">npm install -g whispercom</span>
          <button
            class="install-copy"
            @click="copyInstall"
            :class="{ copied: installCopied }"
            title="Copy to clipboard"
          >
            <svg
              v-if="!installCopied"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
            >
              <rect
                x="4.5"
                y="4.5"
                width="8"
                height="8"
                rx="1.5"
                stroke="currentColor"
                stroke-width="1.3"
              />
              <path
                d="M2 9.5V2.5A1 1 0 0 1 3 1.5h7"
                stroke="currentColor"
                stroke-width="1.3"
                stroke-linecap="round"
              />
            </svg>
            <svg v-else width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 7.5L5.5 10.5L11.5 3.5"
                stroke="#22c55e"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      <!-- Terminal preview -->
      <div class="terminal-wrap">
        <div class="terminal">
          <div class="terminal-header">
            <div class="terminal-dots">
              <span class="dot dot-red"></span>
              <span class="dot dot-yellow"></span>
              <span class="dot dot-green"></span>
            </div>
            <span class="terminal-title">whispercom — AI commit picker</span>
          </div>
          <div class="terminal-body">
            <div class="terminal-line">
              <span class="t-dim">$</span>
              <span class="t-cmd"> git add src/auth/login.ts</span>
            </div>
            <div class="terminal-line">
              <span class="t-dim">$</span>
              <span class="t-cmd"> whis</span>
            </div>
            <div class="terminal-line t-spacer"></div>
            <div class="terminal-line">
              <span class="t-label">✦</span>
              <span class="t-purple"> Analyzing diff with </span>
              <span class="t-highlight">claude-sonnet-4-5</span>
              <span class="t-dim">...</span>
            </div>
            <div class="terminal-line t-spacer"></div>
            <div class="terminal-line">
              <span class="t-dim"> Pick a commit message:</span>
            </div>
            <div class="terminal-line t-spacer"></div>
            <div class="terminal-line t-selected">
              <span class="t-arrow">❯</span>
              <span class="t-num"> 1 </span>
              <span class="t-msg"
                >feat(auth): add JWT login flow with refresh token</span
              >
            </div>
            <div class="terminal-line">
              <span class="t-gap"> </span>
              <span class="t-num"> 2 </span>
              <span class="t-msg t-dim"
                >feat(auth): implement session management for login</span
              >
            </div>
            <div class="terminal-line">
              <span class="t-gap"> </span>
              <span class="t-num"> 3 </span>
              <span class="t-msg t-dim"
                >feat: add authentication with JWT and refresh tokens</span
              >
            </div>
            <div class="terminal-line t-spacer"></div>
            <div class="terminal-line">
              <span class="t-dim">
                [↑↓ navigate · e edit · Enter commit · q quit]</span
              >
            </div>
          </div>
        </div>
        <div class="terminal-glow" aria-hidden="true"></div>
      </div>
    </section>

    <!-- ── STATS BAR ── -->
    <section class="stats-bar">
      <div class="stats-inner">
        <div class="stat" v-for="s in stats" :key="s.label">
          <span class="stat-val">{{ s.value }}</span>
          <span class="stat-label">{{ s.label }}</span>
        </div>
      </div>
    </section>

    <!-- ── FEATURES ── -->
    <section class="features-section">
      <div class="features-header">
        <p class="section-eyebrow">Features</p>
        <h2 class="section-title">
          Everything you need,<br />nothing you don't.
        </h2>
        <p class="section-sub">
          Built for engineers who care about clean git history<br
            class="hide-sm"
          />
          without slowing down their flow.
        </p>
      </div>
      <div class="features-grid">
        <div
          class="feature-card"
          v-for="f in features"
          :key="f.title"
          :class="f.wide ? 'feature-card--wide' : ''"
        >
          <div class="feature-card-icon">{{ f.icon }}</div>
          <h3 class="feature-card-title">{{ f.title }}</h3>
          <p class="feature-card-desc">{{ f.desc }}</p>
          <div v-if="f.tags" class="feature-tags">
            <span class="feature-tag" v-for="t in f.tags" :key="t">{{
              t
            }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── PROVIDERS ── -->
    <section class="providers-section">
      <div class="providers-inner">
        <p class="section-eyebrow">AI Providers</p>
        <h2 class="section-title">Your model, your choice.</h2>
        <p class="section-sub">
          Plug in your existing API key. Switch providers anytime with
          <code>whis configure</code>.
        </p>
        <div class="providers-grid">
          <div class="provider-card" v-for="p in providers" :key="p.name">
            <div class="provider-logo">{{ p.logo }}</div>
            <div class="provider-info">
              <span class="provider-name">{{ p.name }}</span>
              <span class="provider-key">{{ p.key }}</span>
            </div>
            <span v-if="p.badge" class="provider-badge">{{ p.badge }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- ── CTA ── -->
    <section class="cta-section">
      <div class="cta-orb" aria-hidden="true"></div>
      <div class="cta-inner">
        <h2 class="cta-title">Start shipping cleaner commits.</h2>
        <p class="cta-sub">One command to install. Zero config to start.</p>
        <div class="cta-actions">
          <a class="btn btn-primary btn-lg" href="/guide/getting-started">
            Read the Docs
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                stroke-width="1.6"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </a>
          <a
            class="btn btn-ghost btn-lg"
            href="https://github.com/badalkr2004/whispercom"
            target="_blank"
            rel="noopener"
            >View Source</a
          >
        </div>
      </div>
    </section>

    <!-- ── Home Footer ── -->
    <footer class="home-footer">
      <span>Released under the MIT License.</span>
      <span>© 2025 Badal Kumar</span>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";

const installCopied = ref(false);
const scrolled = ref(false);

function copyInstall() {
  navigator.clipboard.writeText("npm install -g whispercom").then(() => {
    installCopied.value = true;
    setTimeout(() => {
      installCopied.value = false;
    }, 2000);
  });
}

function onScroll() {
  scrolled.value = window.scrollY > 20;
}

onMounted(() => window.addEventListener("scroll", onScroll, { passive: true }));
onUnmounted(() => window.removeEventListener("scroll", onScroll));

const stats = [
  { value: "5", label: "AI providers" },
  { value: "3", label: "suggestions per commit" },
  { value: "0", label: "config files required" },
  { value: "1", label: "command to install" },
];

const features = [
  {
    icon: "⚡",
    title: "AI Commit Generator",
    desc: "Generates 3 Conventional Commit suggestions from your staged diff — high-level, specific, and scope-focused — in seconds.",
    tags: ["feat", "fix", "chore", "refactor"],
  },
  {
    icon: "🎛️",
    title: "Interactive TUI",
    desc: "Built with Ink (React for terminals). Navigate suggestions, edit subject lines, and commit — all with keyboard shortcuts. No mouse. No friction.",
  },
  {
    icon: "🌿",
    title: "Fuzzy Branch Switcher",
    desc: "Live fuzzy-filter across all local and remote branches. Start typing, hit Enter. Skip memorizing branch names forever.",
  },
  {
    icon: "📜",
    title: "Commit Graph Browser",
    desc: "Colored ASCII git graph with paginated history, full diff viewer, and ref badges. Like `git log --graph` but beautiful.",
    wide: true,
  },
  {
    icon: "📦",
    title: "File Staging UI",
    desc: "Stage and unstage individual files interactively before generating commit messages. Visual, instant, frictionless.",
  },
  {
    icon: "🔧",
    title: "One-time Setup",
    desc: "Run `whis configure` once, pick your provider and model, done. Config lives in `~/.config/whispercom/config.json`.",
  },
];

const providers = [
  {
    logo: "◆",
    name: "Anthropic",
    key: "ANTHROPIC_API_KEY",
    badge: "Recommended",
  },
  { logo: "◎", name: "OpenAI", key: "OPENAI_API_KEY" },
  {
    logo: "✦",
    name: "Google Gemini",
    key: "GOOGLE_GENERATIVE_AI_API_KEY",
    badge: "Free tier",
  },
  { logo: "▲", name: "Mistral AI", key: "MISTRAL_API_KEY" },
  { logo: "⬡", name: "Groq", key: "GROQ_API_KEY", badge: "Fastest" },
];
</script>
