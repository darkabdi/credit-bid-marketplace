import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'sv' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  sv: {
    // Navigation
    'nav.features': 'Funktioner',
    'nav.howItWorks': 'Hur det fungerar',
    'nav.testimonials': 'Omdömen',
    'nav.signIn': 'Logga in',
    'nav.getStarted': 'Kom igång',
    
    // Hero
    'hero.badge': 'Betrodd av 10 000+ företag',
    'hero.title': 'B2B-marknadsplatsen för',
    'hero.titleHighlight': ' Kvalitetsarbete',
    'hero.description': 'Anslut med granskade entreprenörer, lägg upp jobb med förtroende och få arbete gjort effektivt. Vårt kreditbaserade budgivningssystem säkerställer att du endast får seriösa, kvalificerade förslag.',
    'hero.cta': 'Börja lägga upp jobb',
    'hero.noFees': 'Inga månadsavgifter',
    'hero.escrow': 'Escrow-skydd',
    'hero.support': 'Dygnet runt-support',
    
    // Stats
    'stats.jobsPosted': 'Publicerade jobb',
    'stats.contractors': 'Entreprenörer',
    'stats.paidOut': 'Utbetalat',
    'stats.satisfaction': 'Nöjdhet',
    
    // Features
    'features.title': 'Allt du behöver för att få arbete gjort',
    'features.subtitle': 'En komplett plattform designad för modernt B2B-samarbete',
    'features.postJobs.title': 'Lägg upp jobb direkt',
    'features.postJobs.description': 'Skapa detaljerade jobbannonser på några minuter. Nå kvalificerade entreprenörer redo att lägga bud på dina projekt.',
    'features.creditBidding.title': 'Kreditbaserad budgivning',
    'features.creditBidding.description': 'Rättvis och transparent prissättning. Entreprenörer använder krediter för att bjuda, vilket säkerställer endast seriösa förfrågningar.',
    'features.secure.title': 'Säkra transaktioner',
    'features.secure.description': 'Säkerhet på företagsnivå skyddar din data och dina betalningar. Fullt escrow-skydd på alla projekt.',
    'features.vetted.title': 'Granskade yrkespersoner',
    'features.vetted.description': 'Få tillgång till ett nätverk av verifierade entreprenörer med beprövade meriter och kundomdömen.',
    
    // How it works
    'howItWorks.title': 'Hur BidHub fungerar',
    'howItWorks.subtitle': 'Gå från projektidé till färdigt arbete i fyra enkla steg',
    'howItWorks.step1.title': 'Publicera ditt projekt',
    'howItWorks.step1.description': 'Beskriv dina krav, sätt en budget och publicera din jobbannons.',
    'howItWorks.step2.title': 'Ta emot bud',
    'howItWorks.step2.description': 'Kvalificerade entreprenörer skickar in konkurrenskraftiga bud med sina krediter.',
    'howItWorks.step3.title': 'Välj & Samarbeta',
    'howItWorks.step3.description': 'Granska förslag, chatta med kandidater och välj den bästa.',
    'howItWorks.step4.title': 'Slutför & Betala',
    'howItWorks.step4.description': 'Arbetet blir klart, du godkänner och betalningen frigörs säkert.',
    
    // Testimonials
    'testimonials.title': 'Betrodd av branschledare',
    'testimonials.subtitle': 'Se vad våra kunder och entreprenörer säger',
    'testimonial1.content': 'BidHub förändrade hur vi rekryterar utvecklartalanger. Vi hittade vår lead-utvecklare inom en vecka.',
    'testimonial2.content': 'Kreditsystemet är genialt. Jag bjuder bara på projekt jag verkligen är intresserad av, vilket sparar tid för alla.',
    'testimonial3.content': 'Professionellt, effektivt och pålitligt. BidHub är nu vår förstahandsplattform för alla entreprenörsbehov.',
    
    // CTA
    'cta.title': 'Redo att förändra ditt arbetsflöde?',
    'cta.subtitle': 'Gå med tusentals företag som hittar kvalitetsentreprenörer varje dag.',
    'cta.getStarted': 'Kom igång gratis',
    'cta.demo': 'Boka en demo',
    
    // Footer
    'footer.privacy': 'Integritet',
    'footer.terms': 'Villkor',
    'footer.support': 'Support',
    'footer.contact': 'Kontakt',
    'footer.rights': '© 2024 BidHub. Alla rättigheter förbehållna.',
  },
  en: {
    // Navigation
    'nav.features': 'Features',
    'nav.howItWorks': 'How it Works',
    'nav.testimonials': 'Testimonials',
    'nav.signIn': 'Sign In',
    'nav.getStarted': 'Get Started',
    
    // Hero
    'hero.badge': 'Trusted by 10,000+ businesses',
    'hero.title': 'The B2B Marketplace for',
    'hero.titleHighlight': ' Quality Work',
    'hero.description': 'Connect with vetted contractors, post jobs with confidence, and get work done efficiently. Our credit-based bidding ensures you only receive serious, qualified proposals.',
    'hero.cta': 'Start Posting Jobs',
    'hero.noFees': 'No monthly fees',
    'hero.escrow': 'Escrow protection',
    'hero.support': '24/7 support',
    
    // Stats
    'stats.jobsPosted': 'Jobs Posted',
    'stats.contractors': 'Contractors',
    'stats.paidOut': 'Paid Out',
    'stats.satisfaction': 'Satisfaction',
    
    // Features
    'features.title': 'Everything you need to get work done',
    'features.subtitle': 'A complete platform designed for modern B2B collaboration',
    'features.postJobs.title': 'Post Jobs Instantly',
    'features.postJobs.description': 'Create detailed job listings in minutes. Reach qualified contractors ready to bid on your projects.',
    'features.creditBidding.title': 'Credit-Based Bidding',
    'features.creditBidding.description': 'Fair and transparent pricing. Contractors use credits to bid, ensuring serious inquiries only.',
    'features.secure.title': 'Secure Transactions',
    'features.secure.description': 'Enterprise-grade security protects your data and payments. Full escrow protection on all projects.',
    'features.vetted.title': 'Vetted Professionals',
    'features.vetted.description': 'Access a network of verified contractors with proven track records and client reviews.',
    
    // How it works
    'howItWorks.title': 'How BidHub Works',
    'howItWorks.subtitle': 'Get from project idea to completed work in four simple steps',
    'howItWorks.step1.title': 'Post Your Project',
    'howItWorks.step1.description': 'Describe your requirements, set a budget, and publish your job listing.',
    'howItWorks.step2.title': 'Receive Bids',
    'howItWorks.step2.description': 'Qualified contractors submit competitive bids using their credits.',
    'howItWorks.step3.title': 'Choose & Collaborate',
    'howItWorks.step3.description': 'Review proposals, chat with candidates, and select the best fit.',
    'howItWorks.step4.title': 'Complete & Pay',
    'howItWorks.step4.description': 'Work gets done, you approve, and payment is released securely.',
    
    // Testimonials
    'testimonials.title': 'Trusted by Industry Leaders',
    'testimonials.subtitle': 'See what our clients and contractors have to say',
    'testimonial1.content': 'BidHub transformed how we source development talent. We found our lead engineer within a week.',
    'testimonial2.content': 'The credit system is brilliant. I only bid on projects I\'m genuinely interested in, saving everyone time.',
    'testimonial3.content': 'Professional, efficient, and trustworthy. BidHub is now our go-to platform for all contractor needs.',
    
    // CTA
    'cta.title': 'Ready to Transform Your Workflow?',
    'cta.subtitle': 'Join thousands of businesses finding quality contractors every day.',
    'cta.getStarted': 'Get Started Free',
    'cta.demo': 'Schedule a Demo',
    
    // Footer
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.support': 'Support',
    'footer.contact': 'Contact',
    'footer.rights': '© 2024 BidHub. All rights reserved.',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('sv');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
