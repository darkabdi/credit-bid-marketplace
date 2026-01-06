import { useState } from "react";
import { ArrowRight, Briefcase, Shield, Zap, Users, CheckCircle, Star, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LanguageSwitcher } from "@/components/ui/language-switcher";
import { useLanguage } from "@/lib/i18n";

const Landing = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Briefcase,
      title: t('features.postJobs.title'),
      description: t('features.postJobs.description'),
    },
    {
      icon: Zap,
      title: t('features.creditBidding.title'),
      description: t('features.creditBidding.description'),
    },
    {
      icon: Shield,
      title: t('features.secure.title'),
      description: t('features.secure.description'),
    },
    {
      icon: Users,
      title: t('features.vetted.title'),
      description: t('features.vetted.description'),
    },
  ];

  const steps = [
    { step: "01", title: t('howItWorks.step1.title'), description: t('howItWorks.step1.description') },
    { step: "02", title: t('howItWorks.step2.title'), description: t('howItWorks.step2.description') },
    { step: "03", title: t('howItWorks.step3.title'), description: t('howItWorks.step3.description') },
    { step: "04", title: t('howItWorks.step4.title'), description: t('howItWorks.step4.description') },
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "CTO, TechStart Inc.",
      content: t('testimonial1.content'),
      rating: 5,
    },
    {
      name: "Marcus Johnson",
      role: "Freelance Developer",
      content: t('testimonial2.content'),
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Director",
      content: t('testimonial3.content'),
      rating: 5,
    },
  ];

  const stats = [
    { value: "50K+", label: t('stats.jobsPosted') },
    { value: "15K+", label: t('stats.contractors') },
    { value: "$25M+", label: t('stats.paidOut') },
    { value: "98%", label: t('stats.satisfaction') },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">Offera</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t('nav.features')}</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t('nav.howItWorks')}</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">{t('nav.testimonials')}</a>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Link to ="/auth">
              <Button variant="ghost" size="sm">{t('nav.signIn')}</Button>
            </Link>
            <Link to ="/auth">
              <Button size="sm">{t('nav.getStarted')}</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
        <div className="relative mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-sm animate-fade-in">
              <span className="flex h-2 w-2 rounded-full bg-success" />
              <span className="text-muted-foreground">{t('hero.badge')}</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-in">
              {t('hero.title')}
              <span className="text-primary">{t('hero.titleHighlight')}</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed animate-fade-in">
              {t('hero.description')}
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in">
              <Link to ="/create-project">
                <Button size="lg" className="gap-2 px-8">
                  {t('hero.cta')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>{t('hero.noFees')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>{t('hero.escrow')}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>{t('hero.support')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">{t('features.title')}</h2>
            <p className="mt-4 text-muted-foreground">
              {t('features.subtitle')}
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-elevated hover:border-accent/50"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="mt-2 text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="bg-secondary/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">{t('howItWorks.title')}</h2>
            <p className="mt-4 text-muted-foreground">
              {t('howItWorks.subtitle')}
            </p>
          </div>
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="absolute right-0 top-8 hidden h-0.5 w-full bg-border lg:block" style={{ transform: 'translateX(50%)' }} />
                )}
                <div className="relative rounded-xl bg-card p-6 shadow-card">
                  <span className="text-4xl font-bold text-accent/30">{step.step}</span>
                  <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-foreground">{t('testimonials.title')}</h2>
            <p className="mt-4 text-muted-foreground">
              {t('testimonials.subtitle')}
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.name}
                className="rounded-xl border border-border bg-card p-6 shadow-card"
              >
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-warning text-warning" />
                  ))}
                </div>
                <p className="mt-4 text-foreground leading-relaxed">"{testimonial.content}"</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-primary-foreground">{t('contact.title')}</h2>
            <p className="mt-4 text-primary-foreground/80">
              {t('contact.subtitle')}
            </p>
          </div>
          <form className="space-y-6 bg-background/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-primary-foreground mb-2">
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full px-4 py-3 rounded-lg bg-background/20 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 transition-all"
                  placeholder={t('contact.namePlaceholder')}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-primary-foreground mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-3 rounded-lg bg-background/20 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 transition-all"
                  placeholder={t('contact.emailPlaceholder')}
                />
              </div>
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-primary-foreground mb-2">
                {t('contact.company')}
              </label>
              <input
                type="text"
                id="company"
                name="company"
                className="w-full px-4 py-3 rounded-lg bg-background/20 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 transition-all"
                placeholder={t('contact.companyPlaceholder')}
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-primary-foreground mb-2">
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-background/20 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 transition-all resize-none"
                placeholder={t('contact.messagePlaceholder')}
              />
            </div>
            <Button type="submit" variant="secondary" size="lg" className="w-full gap-2">
              {t('contact.submit')}
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Briefcase className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">Offera</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">{t('footer.privacy')}</a>
              <a href="#" className="hover:text-foreground transition-colors">{t('footer.terms')}</a>
              <a href="#" className="hover:text-foreground transition-colors">{t('footer.support')}</a>
              <a href="#" className="hover:text-foreground transition-colors">{t('footer.contact')}</a>
            </div>
            <p className="text-sm text-muted-foreground">{t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
