"use client";

import { FiClipboard, FiClock, FiBarChart2, FiArrowRight, FiCheck } from "react-icons/fi";
import { AiFillThunderbolt } from "react-icons/ai";

const features = [
  {
    icon: FiClipboard,
    title: "Task Management",
    description:
      "Create, organize, and prioritize tasks with ease. Set deadlines, assign statuses, and never lose track of what matters.",
    bullets: ["Priority levels & labels", "Deadline tracking", "Status workflows"],
  },
  {
    icon: FiClock,
    title: "Time Tracking",
    description:
      "Log time against any task with a single click. Know exactly where your hours go throughout the day.",
    bullets: ["One-click timer", "Manual log entry", "Per-task breakdowns"],
  },
  {
    icon: FiBarChart2,
    title: "Productivity Insights",
    description:
      "Visual summaries of your daily output. Spot patterns, eliminate bottlenecks, and continuously improve your workflow.",
    bullets: ["Daily & weekly summaries", "Time-spent charts", "Trend analysis"],
  },
];

const stats = [
  { value: "10k+", label: "Active users" },
  { value: "2M+", label: "Tasks completed" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.9★", label: "Average rating" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <main className="flex-1">
        {/* ── Hero ────────────────────────────────────────────── */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          {/* Decorative blobs */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary/10 blur-3xl"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-32 -left-40 w-[500px] h-[500px] rounded-full bg-violet-500/10 blur-3xl"
          />

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Eyebrow */}
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-subtle px-4 py-1.5 text-xs font-semibold text-primary uppercase tracking-wider mb-8">
              <AiFillThunderbolt className="w-3.5 h-3.5" />
              Your productivity, supercharged
            </span>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-heading leading-tight tracking-tight mb-6">
              Manage tasks.
              <br />
              <span className="bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                Track your time.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed">
              TaskFlow brings task management and time tracking together in one
              clean workspace — so you can focus on the work that matters.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 text-base"
              >
                Start for free
                <FiArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-border text-foreground font-medium px-8 py-3.5 rounded-xl hover:bg-background-secondary transition-colors text-base"
              >
                Sign in
              </a>
            </div>

            {/* Social proof micro-text */}
            <p className="mt-6 text-sm text-text-muted">
              Free forever · No credit card required
            </p>
          </div>
        </section>

        {/* ── Stats strip ─────────────────────────────────────── */}
        <section className="border-y border-border bg-background-secondary">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <dl className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map(({ value, label }) => (
                <div key={label} className="text-center">
                  <dt className="text-3xl font-extrabold text-heading">{value}</dt>
                  <dd className="mt-1 text-sm text-text-secondary">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ── Features ────────────────────────────────────────── */}
        <section className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-heading mb-4">
                Everything you need to stay productive
              </h2>
              <p className="text-text-secondary text-lg max-w-xl mx-auto">
                Three core pillars that work seamlessly together to help you
                ship more and stress less.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
              {features.map(({ icon: Icon, title, description, bullets }) => (
                <div
                  key={title}
                  className="group bg-card rounded-2xl border border-border p-7 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-subtle flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors">
                    <Icon className="w-5 h-5 text-primary" aria-hidden />
                  </div>
                  <h3 className="text-xl font-semibold text-heading mb-3">{title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed mb-5">
                    {description}
                  </p>
                  <ul className="space-y-2">
                    {bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2 text-sm text-text-secondary">
                        <FiCheck className="w-4 h-4 text-success shrink-0" aria-hidden />
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA banner ──────────────────────────────────────── */}
        <section className="py-20 sm:py-24 bg-background-secondary">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 shadow-lg shadow-indigo-500/30 mb-6 mx-auto">
              <AiFillThunderbolt className="h-6 w-6 text-white" aria-hidden />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-heading mb-4">
              Ready to take back your time?
            </h2>
            <p className="text-text-secondary text-lg mb-8 max-w-xl mx-auto">
              Join thousands of people who use TaskFlow to do their best work
              every day. It&apos;s free to get started.
            </p>
            <a
              href="/signup"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 text-base"
            >
              Create free account
              <FiArrowRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </main>

      {/* ── Footer ──────────────────────────────────────────── */}
      <footer className="border-t border-border py-8 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600">
              <AiFillThunderbolt className="h-3 w-3 text-white" aria-hidden />
            </div>
            <span className="text-sm font-semibold text-heading">
              Task<span className="text-primary">Flow</span>
            </span>
          </div>

          <p className="text-xs text-text-muted order-last sm:order-none">
            © 2026 TaskFlow. All rights reserved.
          </p>

          <nav className="flex gap-5" aria-label="Footer navigation">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-sm text-text-secondary hover:text-foreground transition-colors"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  );
}
