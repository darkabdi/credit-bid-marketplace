import { ArrowRight, Briefcase, Shield, Zap, Users, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/components/ui/link";

const features = [
  {
    icon: Briefcase,
    title: "Post Jobs Instantly",
    description: "Create detailed job listings in minutes. Reach qualified contractors ready to bid on your projects.",
  },
  {
    icon: Zap,
    title: "Credit-Based Bidding",
    description: "Fair and transparent pricing. Contractors use credits to bid, ensuring serious inquiries only.",
  },
  {
    icon: Shield,
    title: "Secure Transactions",
    description: "Enterprise-grade security protects your data and payments. Full escrow protection on all projects.",
  },
  {
    icon: Users,
    title: "Vetted Professionals",
    description: "Access a network of verified contractors with proven track records and client reviews.",
  },
];

const steps = [
  { step: "01", title: "Post Your Project", description: "Describe your requirements, set a budget, and publish your job listing." },
  { step: "02", title: "Receive Bids", description: "Qualified contractors submit competitive bids using their credits." },
  { step: "03", title: "Choose & Collaborate", description: "Review proposals, chat with candidates, and select the best fit." },
  { step: "04", title: "Complete & Pay", description: "Work gets done, you approve, and payment is released securely." },
];

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, TechStart Inc.",
    content: "BidHub transformed how we source development talent. We found our lead engineer within a week.",
    rating: 5,
  },
  {
    name: "Marcus Johnson",
    role: "Freelance Developer",
    content: "The credit system is brilliant. I only bid on projects I'm genuinely interested in, saving everyone time.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Operations Director",
    content: "Professional, efficient, and trustworthy. BidHub is now our go-to platform for all contractor needs.",
    rating: 5,
  },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-semibold text-foreground">BidHub</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
            <a href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth">
              <Button variant="ghost" size="sm">Sign In</Button>
            </Link>
            <Link href="/auth">
              <Button size="sm">Get Started</Button>
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
              <span className="text-muted-foreground">Trusted by 10,000+ businesses</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl animate-fade-in">
              The B2B Marketplace for
              <span className="text-primary"> Quality Work</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed animate-fade-in">
              Connect with vetted contractors, post jobs with confidence, and get work done efficiently. 
              Our credit-based bidding ensures you only receive serious, qualified proposals.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center animate-fade-in">
              <Link href="/create-project">
                <Button size="lg" className="gap-2 px-8">
                  Start Posting Jobs
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted-foreground animate-fade-in">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>No monthly fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>Escrow protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-success" />
                <span>24/7 support</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card py-12">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { value: "50K+", label: "Jobs Posted" },
              { value: "15K+", label: "Contractors" },
              { value: "$25M+", label: "Paid Out" },
              { value: "98%", label: "Satisfaction" },
            ].map((stat) => (
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
            <h2 className="text-3xl font-bold text-foreground">Everything you need to get work done</h2>
            <p className="mt-4 text-muted-foreground">
              A complete platform designed for modern B2B collaboration
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
            <h2 className="text-3xl font-bold text-foreground">How BidHub Works</h2>
            <p className="mt-4 text-muted-foreground">
              Get from project idea to completed work in four simple steps
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
            <h2 className="text-3xl font-bold text-foreground">Trusted by Industry Leaders</h2>
            <p className="mt-4 text-muted-foreground">
              See what our clients and contractors have to say
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

      {/* CTA Section */}
      <section className="bg-primary py-20">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground">Ready to Transform Your Workflow?</h2>
          <p className="mt-4 text-primary-foreground/80">
            Join thousands of businesses finding quality contractors every day.
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/dashboard">
              <Button variant="secondary" size="lg" className="gap-2 px-8">
                Get Started Free
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 px-8">
              Schedule a Demo
            </Button>
          </div>
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
              <span className="font-semibold text-foreground">BidHub</span>
            </div>
            <div className="flex gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
              <a href="#" className="hover:text-foreground transition-colors">Support</a>
              <a href="#" className="hover:text-foreground transition-colors">Contact</a>
            </div>
            <p className="text-sm text-muted-foreground">© 2024 BidHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
