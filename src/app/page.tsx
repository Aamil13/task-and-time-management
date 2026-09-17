"use client";

import { FiClipboard, FiClock, FiBarChart2 } from "react-icons/fi";
import { useAuthGuard } from "@/hooks/use-auth";

export default function Home() {
  // useAuthGuard("/dashboard", "redirect-authenticated");
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <main className="flex-1">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h2 className="text-5xl font-bold text-heading mb-6">
              Manage Your Tasks,
              <br />
              Track Your Time
            </h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto mb-10">
              A powerful task management and productivity application that helps you stay organized, 
              track time spent on tasks, and visualize your daily productivity.
            </p>
            <div className="flex justify-center gap-4">
              <a
                href="/signup"
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium"
              >
                Get Started Free
              </a>
              <a
                href="/login"
                className="border border-border text-foreground px-8 py-3 rounded-lg hover:bg-background-secondary transition-colors font-medium"
              >
                Sign In
              </a>
            </div>
          </div>
        </section>

        <section className="bg-background-secondary py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl font-bold text-heading text-center mb-12">
              Everything You Need to Stay Productive
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary-subtle rounded-lg flex items-center justify-center mb-4">
                  <FiClipboard className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-heading mb-2">Task Management</h4>
                <p className="text-text-secondary">
                  Create, organize, and manage your tasks with ease. Set priorities, deadlines, and track progress.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary-subtle rounded-lg flex items-center justify-center mb-4">
                  <FiClock className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-heading mb-2">Time Tracking</h4>
                <p className="text-text-secondary">
                  Track time spent on each task. Get detailed insights into how you allocate your time throughout the day.
                </p>
              </div>

              <div className="bg-card p-6 rounded-lg border border-border">
                <div className="w-12 h-12 bg-primary-subtle rounded-lg flex items-center justify-center mb-4">
                  <FiBarChart2 className="w-6 h-6 text-primary" />
                </div>
                <h4 className="text-xl font-semibold text-heading mb-2">Productivity Insights</h4>
                <p className="text-text-secondary">
                  View daily productivity summaries and time logs. Understand your work patterns and optimize your workflow.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-heading mb-4">
                Start Boosting Your Productivity Today
              </h3>
              <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                Join thousands of users who have transformed their task management with TaskFlow.
              </p>
            </div>
            <div className="text-center">
              <a
                href="/signup"
                className="bg-primary text-white px-8 py-3 rounded-lg hover:bg-primary-light transition-colors font-medium text-lg"
              >
                Create Free Account
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <p className="text-text-secondary">
              © 2026 TaskFlow. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-text-secondary hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="text-text-secondary hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="text-text-secondary hover:text-foreground transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
