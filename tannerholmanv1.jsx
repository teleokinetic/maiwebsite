export default function TannerHolmanSite() {
  const CONTACT_EMAIL = "tannerholman97@gmail.com"; // ← replace with your real email
  const CALENDLY = "https://calendly.com/tannerholman/consultation"; // ← replace with your scheduling link (e.g., https://calendly.com/yourname/intro)

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = encodeURIComponent(form.get("name") || "");
    const email = encodeURIComponent(form.get("email") || "");
    const message = encodeURIComponent(form.get("message") || "");
    const subject = encodeURIComponent("Inquiry from website");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  };

  const features = [
    {
      title: "Clarity",
      body: "Update your model of pain: understand threat prediction, context effects, and why pain can persist without damage.",
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6"><path fill="currentColor" d="M11 2a9 9 0 1 0 9 9h-2A7 7 0 1 1 11 4V2zm1 3h8v2h-8z"/></svg>
      )
    },
    {
      title: "Calibration",
      body: "Gentle, targeted movement experiments that to unlearn movement avoidance and rediscover movement options.",
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6"><path fill="currentColor" d="M12 2l3 7h7l-5.5 4 2 8L12 16l-6.5 5 2-8L2 9h7z"/></svg>
      )
    },
    {
      title: "Carryover",
      body: "Practice co‑piloting turns insights into results during real‑world triggers at work, gym, or life.",
      icon: (
        <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6"><path fill="currentColor" d="M3 3h18v2H3V3zm2 5h14v2H5V8zm-2 5h18v2H3v-2zm2 5h14v2H5v-2z"/></svg>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 text-neutral-900 antialiased selection:bg-neutral-900 selection:text-white">
      {/* Skip link for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-black focus:px-3 focus:py-2 focus:text-white">Skip to content</a>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-neutral-200/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20">
          <a href="#home" className="group inline-flex items-center gap-2 font-medium">
            <span className="inline-flex size-8 items-center justify-center rounded-xl bg-neutral-900 text-white">TH</span>
            <span className="text-sm tracking-wide text-neutral-700 group-hover:text-neutral-900">Tanner Holman</span>
          </a>
          <nav className="hidden items-center gap-6 text-sm text-neutral-700 md:flex">
            <a className="hover:text-neutral-900" href="#approach">Approach</a>
            <a className="hover:text-neutral-900" href="#services">Services</a>
            <a className="hover:text-neutral-900" href="#testimonials">Results</a>
            <a className="inline-flex items-center rounded-xl bg-neutral-900 px-3 py-2 font-medium text-white hover:bg-neutral-800" href="#contact">Book a consult</a>
          </nav>
          {/* Mobile menu */}
          <details className="md:hidden">
            <summary aria-label="Open menu" className="list-none rounded-xl p-2 hover:bg-neutral-100 active:bg-neutral-200">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6"><path fill="currentColor" d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z"/></svg>
            </summary>
            <div className="absolute inset-x-0 top-16 border-b border-neutral-200/60 bg-white p-4 shadow-lg">
              <div className="grid gap-1">
                <a className="rounded-lg px-3 py-2 hover:bg-neutral-100" href="#approach">Approach</a>
                <a className="rounded-lg px-3 py-2 hover:bg-neutral-100" href="#services">Services</a>
                <a className="rounded-lg px-3 py-2 hover:bg-neutral-100" href="#testimonials">Results</a>
                <a className="rounded-lg bg-neutral-900 px-3 py-2 text-white hover:bg-neutral-800" href="#contact">Tell me about your pain</a>
              </div>
            </div>
          </details>
        </div>
      </header>

      {/* Hero */}
      <section id="home" className="relative">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[-10%] aspect-[1/1] w-[60rem] -translate-x-1/2 rounded-full bg-gradient-to-tr from-neutral-200/50 to-transparent blur-3xl"/>
        </div>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 sm:py-20 md:grid-cols-2 md:gap-12 lg:py-24">
          <div>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Chronic pain relief that <span className="underline decoration-4 decoration-neutral-900 underline-offset-4">sticks</span>
            </h1>
            <p className="mt-5 max-w-prose text-pretty text-base leading-relaxed text-neutral-600 sm:text-lg">
              I'm Tanner Holman, chronic pain coach and movement teacher. I use evidence‑informed practice and movement experiments to change how your system predicts pain, so you can get back to what matters.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-400">Book a free consult</a>
              <a href="#approach" className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-5 py-3 text-sm font-medium text-neutral-800 hover:bg-neutral-100">How it works</a>
            </div>
            <div className="mt-8 text-sm text-neutral-500">
              <span className="rounded-full border border-neutral-200 px-3 py-1">Evidence‑based</span>
              <span className="ml-2 rounded-full border border-neutral-200 px-3 py-1">Practice‑forward</span>
              <span className="ml-2 rounded-full border border-neutral-200 px-3 py-1">Nervous system‑informed</span>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <blockquote className="text-pretty text-neutral-700">
                “I felt like I'd never get rid of the pain. Now I can release my low back at will, move my neck into new territory, and I'm back to walking and running.”
              </blockquote>
              <div className="mt-4 text-sm text-neutral-500">— S.V. </div>
            </div>
          </div>
        </div>
      </section>

      {/* Approach */}
      <section id="approach" className="scroll-mt-20 border-t border-neutral-200/60 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">A simple approach that respects complexity</h2>
            <p className="mt-3 text-neutral-600">We don’t chase symptoms. We update predictions, expand movement options, and test carryover where it counts.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <div key={i} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition-colors hover:border-neutral-300">
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-neutral-900/90 p-2 text-white">{f.icon}</div>
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                </div>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services / Pricing */}
      <section id="services" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Ways to work together</h2>
            <p className="mt-3 text-neutral-600">Choose a light‑touch weekly cadence or an intensive designed for momentum.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold">Hourly Coaching</h3>
                <div className="text-right">
                  <div className="text-2xl font-semibold">$200</div>
                  <div className="text-xs text-neutral-500">per 60‑minute session</div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-700">
                <li>• Weekly sessions for ~8 weeks</li>
                <li>• Email/text support between sessions</li>
                <li>• Optional daily accountability check‑ins</li>
              </ul>
              <a href="#contact" className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800">Get started</a>
            </div>
            <div className="rounded-2xl border border-neutral-900 bg-neutral-900 p-6 text-white shadow-sm">
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold">8‑Week Intensive</h3>
                <div className="text-right">
                  <div className="text-2xl font-semibold">$3,000</div>
                  <div className="text-xs/5 text-neutral-300">high‑touch support</div>
                </div>
              </div>
              <ul className="mt-4 space-y-2 text-sm text-neutral-100">
                <li>• Functionally unlimited booking (M–F, up to 5 hrs/wk)</li>
                <li>• Live co‑piloting before or during triggers</li>
                <li>• Priority troubleshooting + daily accountability</li>
                <li>• Payment split: half at start, half at satisfaction</li>
              </ul>
              <a href="#contact" className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-2.5 text-sm font-medium text-neutral-900 hover:bg-neutral-100">Apply</a>
            </div>
          </div>
          <p className="mt-4 text-center text-xs text-neutral-500">Coaching is educational and collaborative. This is not medical care and does not replace your clinician.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="scroll-mt-20 border-t border-neutral-200/60 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Results clients notice</h2>
            <p className="mt-3 text-neutral-600">Short sessions, big shifts. Here’s what people report.</p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                quote: "The most surprising thing was how easy it felt—and how attuned to my body I am now. This is a skill for life.",
                name: "A.R.",
              },
              {
                quote: "Most of my upper‑back pain is gone. I can touch my toes again and get back to long walks.",
                name: "J.K.",
              },
              {
                quote: "We found the protective pattern and switched it off. Neck range I thought was impossible showed up in minutes.",
                name: "S.M.",
              },
            ].map((t, i) => (
              <figure key={i} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
                <blockquote className="text-pretty text-neutral-700">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-neutral-500">— {t.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Callout */}
      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="relative overflow-hidden rounded-3xl border border-neutral-200 bg-gradient-to-tr from-neutral-900 to-neutral-700 p-8 text-white shadow-sm">
            <div className="relative z-10">
              <h3 className="text-balance text-2xl font-semibold sm:text-3xl">Let’s make the next 8 weeks count</h3>
              <p className="mt-2 max-w-prose text-neutral-200">If you’ve plateaued with exercises and appointments, we can change the game in a few focused sessions.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#contact" className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-medium text-neutral-900 hover:bg-neutral-100">Book a consult</a>
                <a href={CALENDLY} className="inline-flex items-center justify-center rounded-xl border border-white/30 px-5 py-3 text-sm font-medium text-white/90 hover:bg-white/10">View availability</a>
              </div>
            </div>
            <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 aspect-square w-96 rounded-full bg-white/10 blur-3xl"/>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-neutral-200/60 bg-white py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Common questions</h2>
          </div>
          <div className="mx-auto mt-8 max-w-3xl divide-y divide-neutral-200 rounded-2xl border border-neutral-200 bg-white">
            {[{
              q: "Is this physical therapy?",
              a: "No—it's coaching and education. We collaborate to change habits and predictions that keep pain sticky. I can coordinate with your clinician if helpful.",
            }, {
              q: "Do I need to be ‘in shape’?",
              a: "No. We start from what you can do now. Many sessions are desk‑friendly experiments that fit into daily life.",
            }, {
              q: "How soon will I notice a change?",
              a: "Often within a session or two. We look for early ‘green shoots’—less guarding, smoother motion, and better carryover.",
            }].map((item, i) => (
              <details key={i} className="group open:bg-neutral-50 open:shadow-sm">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left text-sm font-medium">
                  {item.q}
                  <span className="rounded-md border border-neutral-300 px-2 py-1 text-[10px] text-neutral-600 group-open:hidden">Open</span>
                  <span className="hidden rounded-md border border-neutral-300 px-2 py-1 text-[10px] text-neutral-600 group-open:inline">Close</span>
                </summary>
                <div className="px-5 pb-5 text-sm leading-6 text-neutral-700">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="scroll-mt-20 py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">Start with a free consult</h2>
            <p className="mt-3 text-neutral-600">Tell me a bit about your situation. I’ll reply with next steps and a couple of times to meet.</p>
          </div>
          <div className="mx-auto mt-10 grid max-w-3xl gap-6 sm:grid-cols-5">
            <form onSubmit={handleEmailSubmit} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:col-span-3">
              <div className="grid gap-4">
                <label className="grid gap-1 text-sm">
                  <span className="text-neutral-700">Name</span>
                  <input name="name" required placeholder="Jane Doe" className="h-10 rounded-xl border border-neutral-300 px-3 outline-none ring-0 placeholder:text-neutral-400 focus:border-neutral-900" />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="text-neutral-700">Email</span>
                  <input type="email" name="email" required placeholder="you@example.com" className="h-10 rounded-xl border border-neutral-300 px-3 outline-none ring-0 placeholder:text-neutral-400 focus:border-neutral-900" />
                </label>
                <label className="grid gap-1 text-sm">
                  <span className="text-neutral-700">Message</span>
                  <textarea name="message" rows={5} placeholder="What's going on and what you'd like help with" className="resize-y rounded-xl border border-neutral-300 px-3 py-2 outline-none placeholder:text-neutral-400 focus:border-neutral-900" />
                </label>
                <button type="submit" className="inline-flex items-center justify-center rounded-xl bg-neutral-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-neutral-800">Send</button>
              </div>
              <p className="mt-3 text-xs text-neutral-500">This opens your email app with a pre‑filled message to {CONTACT_EMAIL.replace(/@.*/, "@…")}.</p>
            </form>
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 text-sm text-neutral-700 shadow-sm sm:col-span-2">
              <div className="space-y-4">
                <div>
                  <div className="text-xs uppercase tracking-wide text-neutral-500">Email</div>
                  <a className="mt-1 inline-flex items-center gap-2 text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-neutral-500">Schedule</div>
                  <a className="mt-1 inline-flex items-center gap-2 text-neutral-900 underline decoration-neutral-300 underline-offset-4 hover:decoration-neutral-900" href={CALENDLY}>View availability</a>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wide text-neutral-500">Based in</div>
                  <p className="mt-1">Denver, Colorado (remote worldwide)</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-200/60 bg-white py-10 text-sm text-neutral-600">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <p>© {new Date().getFullYear()} Tanner Holman. All rights reserved.</p>
          <nav className="flex items-center gap-4">
            <a href="#approach" className="hover:text-neutral-900">Approach</a>
            <a href="#services" className="hover:text-neutral-900">Services</a>
            <a href="#contact" className="hover:text-neutral-900">Contact</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
