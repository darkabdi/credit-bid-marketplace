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
    'howItWorks.title': 'Hur Offera fungerar',
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
    'testimonial1.content': 'Offera förändrade hur vi rekryterar utvecklartalanger. Vi hittade vår lead-utvecklare inom en vecka.',
    'testimonial2.content': 'Kreditsystemet är genialt. Jag bjuder bara på projekt jag verkligen är intresserad av, vilket sparar tid för alla.',
    'testimonial3.content': 'Professionellt, effektivt och pålitligt. Offera är nu vår förstahandsplattform för alla entreprenörsbehov.',
    
    // Contact Form
    'contact.title': 'Kontakta oss',
    'contact.subtitle': 'Har du frågor eller vill veta mer? Vi hör gärna från dig.',
    'contact.name': 'Namn',
    'contact.namePlaceholder': 'Ditt namn',
    'contact.email': 'E-post',
    'contact.emailPlaceholder': 'din@email.com',
    'contact.company': 'Företag',
    'contact.companyPlaceholder': 'Ditt företagsnamn',
    'contact.message': 'Meddelande',
    'contact.messagePlaceholder': 'Berätta mer om vad du behöver hjälp med...',
    'contact.submit': 'Skicka meddelande',
    
    // Footer
    'footer.privacy': 'Integritet',
    'footer.terms': 'Villkor',
    'footer.support': 'Support',
    'footer.contact': 'Kontakt',
    'footer.rights': '© 2024 Offera. Alla rättigheter förbehållna.',

    // Sidebar Navigation
    'sidebar.dashboard': 'Översikt',
    'sidebar.jobs': 'Jobb',
    'sidebar.bids': 'Bud',
    'sidebar.credits': 'Krediter',
    'sidebar.messages': 'Meddelanden',
    'sidebar.profile': 'Profil',
    'sidebar.logout': 'Logga ut',

    // Dashboard Common
    'dashboard.welcome': 'Välkommen tillbaka',
    'dashboard.overview': 'Här är din översikt.',
    'dashboard.manageProjects': 'Hantera dina projekt.',

    // Freelancer Dashboard
    'freelancer.activeContracts': 'Aktiva kontrakt',
    'freelancer.pendingProposals': 'Väntande förslag',
    'freelancer.totalEarnings': 'Totala intäkter',
    'freelancer.successRate': 'Framgångsgrad',
    'freelancer.newThisWeek': 'nytt denna vecka',
    'freelancer.responses': 'svar',
    'freelancer.thisMonth': 'denna månad',
    'freelancer.improvement': 'förbättring',
    'freelancer.availableJobs': 'Tillgängliga jobb',
    'freelancer.browseJobs': 'Bläddra och lägg bud på projekt som matchar dina färdigheter',
    'freelancer.viewAllJobs': 'Visa alla jobb',
    'freelancer.viewAll': 'Visa alla',
    'freelancer.due': 'Förfaller',

    // Client Dashboard
    'client.activeProjects': 'Aktiva projekt',
    'client.pendingProposals': 'Väntande förslag',
    'client.totalSpent': 'Totalt spenderat',
    'client.activeFreelancers': 'Aktiva frilansare',
    'client.inProgress': 'pågående',
    'client.newToday': 'nya idag',
    'client.recentProposals': 'Senaste förslag',
    'client.pendingMilestones': 'Väntande milstolpar',
    'client.approveAll': 'Godkänn alla',
    'client.yourProjects': 'Dina projekt',
    'client.monitorProgress': 'Övervaka framsteg och hantera dina publicerade projekt',
    'client.viewAllProjects': 'Visa alla projekt',
    'client.postNewProject': 'Publicera nytt projekt',
    'client.jobs': 'jobb',

    // Admin Dashboard
    'admin.title': 'Admin Dashboard',
    'admin.subtitle': 'Plattformsöversikt och hanteringsverktyg',
    'admin.totalUsers': 'Totalt antal användare',
    'admin.activeJobs': 'Aktiva jobb',
    'admin.openDisputes': 'Öppna tvister',
    'admin.platformRevenue': 'Plattformens intäkter',
    'admin.newThisMonth': 'nya denna månad',
    'admin.newToday': 'nya idag',
    'admin.pendingReview': 'väntar på granskning',
    'admin.vsLastMonth': 'jämfört med förra månaden',
    'admin.recentDisputes': 'Senaste tvister',
    'admin.recentJobs': 'Senaste jobb',
    'admin.recentUsers': 'Senaste användare',
    'admin.pending': 'Väntande',
    'admin.inReview': 'Under granskning',
    'admin.resolved': 'Löst',
    'admin.active': 'Aktiv',
    'admin.underReview': 'Under granskning',
    'admin.flagged': 'Flaggad',
    'admin.suspended': 'Avstängd',
    'admin.name': 'Namn',
    'admin.email': 'E-post',
    'admin.type': 'Typ',
    'admin.status': 'Status',
    'admin.joined': 'Gick med',
    'admin.actions': 'Åtgärder',

    // Jobs Page
    'jobs.title': 'Alla Jobb',
    'jobs.openProjects': 'öppna projekt väntar på dig',
    'jobs.searchPlaceholder': 'Sök jobb, företag eller kategori...',
    'jobs.all': 'Alla',
    'jobs.open': 'Öppna',
    'jobs.inProgress': 'Pågående',
    'jobs.showing': 'Visar',
    'jobs.of': 'av',
    'jobs.jobs': 'jobb',
    'jobs.openCount': 'öppna',
    'jobs.loading': 'Laddar projekt...',
    'jobs.noJobsFound': 'Inga jobb hittades',
    'jobs.noProjectsYet': 'Det finns inga projekt ännu',
    'jobs.tryDifferentSearch': 'Försök med en annan sökterm eller filter',

    // Job Card
    'jobCard.viewDetails': 'Visa detaljer',
    'jobCard.placeBid': 'Lägg bud',
    'jobCard.bids': 'bud',
    'jobCard.statusOpen': 'Öppen',
    'jobCard.statusInProgress': 'Pågående',
    'jobCard.statusClosed': 'Stängd',

    // Job Details
    'jobDetails.notFound': 'Jobbet hittades inte',
    'jobDetails.notFoundDesc': 'Det efterfrågade jobbet kunde inte hittas.',
    'jobDetails.backToJobs': 'Tillbaka till jobb',
    'jobDetails.budget': 'Budget',
    'jobDetails.deadline': 'Deadline',
    'jobDetails.bids': 'Bud',
    'jobDetails.location': 'Plats',
    'jobDetails.description': 'Beskrivning',
    'jobDetails.requirements': 'Krav',
    'jobDetails.deliverables': 'Leverabler',
    'jobDetails.contactClient': 'Kontakta kund',

    // Auth Page
    'auth.welcomeBack': 'Välkommen tillbaka',
    'auth.createAccount': 'Skapa ditt konto',
    'auth.enterCredentials': 'Ange dina uppgifter för att komma åt ditt konto',
    'auth.startConnecting': 'Börja ansluta med kvalitetsentreprenörer idag',
    'auth.fullName': 'Fullständigt namn',
    'auth.email': 'E-post',
    'auth.password': 'Lösenord',
    'auth.forgotPassword': 'Glömt lösenord?',
    'auth.signIn': 'Logga in',
    'auth.signUp': 'Registrera dig',
    'auth.orContinueWith': 'Eller fortsätt med',
    'auth.noAccount': 'Har du inget konto?',
    'auth.haveAccount': 'Har du redan ett konto?',
    'auth.connectQuality': 'Anslut med kvalitet',
    'auth.joinThousands': 'Gå med tusentals företag och entreprenörer som bygger framgångsrika partnerskap på Offera.',

    // Profile Page
    'profile.title': 'Profil',
    'profile.subtitle': 'Hantera din profilinformation',
    'profile.editProfile': 'Redigera profil',
    'profile.cancel': 'Avbryt',
    'profile.saveChanges': 'Spara ändringar',
    'profile.name': 'Namn',
    'profile.location': 'Plats',
    'profile.bio': 'Biografi',
    'profile.hourlyRate': 'Timpris',
    'profile.completedProjects': 'Slutförda projekt',
    'profile.memberSince': 'Medlem sedan',
    'profile.skills': 'Färdigheter',

    // Messages Page
    'messages.title': 'Meddelanden',
    'messages.subtitle': 'Chatta med kunder och frilansare',
    'messages.searchPlaceholder': 'Sök konversationer...',
    'messages.noConversations': 'Inga konversationer hittades',

    // Project Create
    'projectCreate.backToDashboard': 'Tillbaka till översikt',
    'projectCreate.basics': 'Grundläggande',
    'projectCreate.basicsDesc': 'Projekttitel & kategori',
    'projectCreate.budget': 'Budget',
    'projectCreate.budgetDesc': 'Sätt din budget',
    'projectCreate.details': 'Detaljer',
    'projectCreate.detailsDesc': 'Beskriv ditt projekt',
    'projectCreate.files': 'Filer',
    'projectCreate.filesDesc': 'Ladda upp bilagor',
    'projectCreate.projectTitle': 'Projekttitel',
    'projectCreate.titlePlaceholder': 'Ange en tydlig, beskrivande titel',
    'projectCreate.category': 'Kategori',
    'projectCreate.selectCategory': 'Välj en kategori',
    'projectCreate.budgetUSD': 'Budget (USD)',
    'projectCreate.budgetHint': 'Sätt en realistisk budget för att attrahera kvalitetsentreprenörer',
    'projectCreate.projectDescription': 'Projektbeskrivning',
    'projectCreate.descriptionPlaceholder': 'Beskriv dina projektkrav, mål och eventuella specifika detaljer entreprenörer bör känna till...',
    'projectCreate.descriptionHint': 'Var specifik om leverabler och tidsförväntningar',
    'projectCreate.attachments': 'Bilagor (Valfritt)',
    'projectCreate.dropFiles': 'Släpp filer här eller klicka för att ladda upp',
    'projectCreate.fileTypes': 'PDF, DOC, PNG, JPG upp till 10MB',
    'projectCreate.back': 'Tillbaka',
    'projectCreate.continue': 'Fortsätt',
    'projectCreate.createProject': 'Skapa projekt',

    // Categories
    'category.webDevelopment': 'Webbutveckling',
    'category.mobileDevelopment': 'Mobilutveckling',
    'category.uiuxDesign': 'UI/UX Design',
    'category.dataAnalysis': 'Dataanalys',
    'category.contentWriting': 'Innehållsskrivning',
    'category.marketing': 'Marknadsföring',
    'category.videoProduction': 'Videoproduktion',
    'category.other': 'Övrigt',

    // Common
    'common.loading': 'Laddar...',
    'common.error': 'Ett fel uppstod',
    'common.save': 'Spara',
    'common.cancel': 'Avbryt',
    'common.delete': 'Ta bort',
    'common.edit': 'Redigera',
    'common.view': 'Visa',
    'common.close': 'Stäng',
    'common.submit': 'Skicka',
    'common.client': 'Kund',

    // TopBar
    'search': 'Sök jobb, bud...',
    'buyCredits': 'Köp krediter',
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
    'howItWorks.title': 'How Offera Works',
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
    'testimonial1.content': 'Offera transformed how we source development talent. We found our lead engineer within a week.',
    'testimonial2.content': 'The credit system is brilliant. I only bid on projects I\'m genuinely interested in, saving everyone time.',
    'testimonial3.content': 'Professional, efficient, and trustworthy. Offera is now our go-to platform for all contractor needs.',
    
    // Contact Form
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Have questions or want to learn more? We would love to hear from you.',
    'contact.name': 'Name',
    'contact.namePlaceholder': 'Your name',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'your@email.com',
    'contact.company': 'Company',
    'contact.companyPlaceholder': 'Your company name',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Tell us more about what you need help with...',
    'contact.submit': 'Send Message',
    
    // Footer
    'footer.privacy': 'Privacy',
    'footer.terms': 'Terms',
    'footer.support': 'Support',
    'footer.contact': 'Contact',
    'footer.rights': '© 2024 Offera. All rights reserved.',

    // Sidebar Navigation
    'sidebar.dashboard': 'Dashboard',
    'sidebar.jobs': 'Jobs',
    'sidebar.bids': 'Bids',
    'sidebar.credits': 'Credits',
    'sidebar.messages': 'Messages',
    'sidebar.profile': 'Profile',
    'sidebar.logout': 'Logout',

    // Dashboard Common
    'dashboard.welcome': 'Welcome back',
    'dashboard.overview': 'Here\'s your overview.',
    'dashboard.manageProjects': 'Manage your projects.',

    // Freelancer Dashboard
    'freelancer.activeContracts': 'Active Contracts',
    'freelancer.pendingProposals': 'Pending Proposals',
    'freelancer.totalEarnings': 'Total Earnings',
    'freelancer.successRate': 'Success Rate',
    'freelancer.newThisWeek': 'new this week',
    'freelancer.responses': 'responses',
    'freelancer.thisMonth': 'this month',
    'freelancer.improvement': 'improvement',
    'freelancer.availableJobs': 'Available Jobs',
    'freelancer.browseJobs': 'Browse and bid on projects matching your skills',
    'freelancer.viewAllJobs': 'View All Jobs',
    'freelancer.viewAll': 'View All',
    'freelancer.due': 'Due',

    // Client Dashboard
    'client.activeProjects': 'Active Projects',
    'client.pendingProposals': 'Pending Proposals',
    'client.totalSpent': 'Total Spent',
    'client.activeFreelancers': 'Active Freelancers',
    'client.inProgress': 'in progress',
    'client.newToday': 'new today',
    'client.recentProposals': 'Recent Proposals',
    'client.pendingMilestones': 'Pending Milestones',
    'client.approveAll': 'Approve All',
    'client.yourProjects': 'Your Projects',
    'client.monitorProgress': 'Monitor progress and manage your posted projects',
    'client.viewAllProjects': 'View All Projects',
    'client.postNewProject': 'Post New Project',
    'client.jobs': 'jobs',

    // Admin Dashboard
    'admin.title': 'Admin Dashboard',
    'admin.subtitle': 'Platform overview and management tools',
    'admin.totalUsers': 'Total Users',
    'admin.activeJobs': 'Active Jobs',
    'admin.openDisputes': 'Open Disputes',
    'admin.platformRevenue': 'Platform Revenue',
    'admin.newThisMonth': 'new this month',
    'admin.newToday': 'new today',
    'admin.pendingReview': 'pending review',
    'admin.vsLastMonth': 'vs last month',
    'admin.recentDisputes': 'Recent Disputes',
    'admin.recentJobs': 'Recent Jobs',
    'admin.recentUsers': 'Recent Users',
    'admin.pending': 'Pending',
    'admin.inReview': 'In Review',
    'admin.resolved': 'Resolved',
    'admin.active': 'Active',
    'admin.underReview': 'Under Review',
    'admin.flagged': 'Flagged',
    'admin.suspended': 'Suspended',
    'admin.name': 'Name',
    'admin.email': 'Email',
    'admin.type': 'Type',
    'admin.status': 'Status',
    'admin.joined': 'Joined',
    'admin.actions': 'Actions',

    // Jobs Page
    'jobs.title': 'All Jobs',
    'jobs.openProjects': 'open projects waiting for you',
    'jobs.searchPlaceholder': 'Search jobs, companies or categories...',
    'jobs.all': 'All',
    'jobs.open': 'Open',
    'jobs.inProgress': 'In Progress',
    'jobs.showing': 'Showing',
    'jobs.of': 'of',
    'jobs.jobs': 'jobs',
    'jobs.openCount': 'open',
    'jobs.loading': 'Loading projects...',
    'jobs.noJobsFound': 'No jobs found',
    'jobs.noProjectsYet': 'There are no projects yet',
    'jobs.tryDifferentSearch': 'Try a different search term or filter',

    // Job Card
    'jobCard.viewDetails': 'View Details',
    'jobCard.placeBid': 'Place Bid',
    'jobCard.bids': 'bids',
    'jobCard.statusOpen': 'Open',
    'jobCard.statusInProgress': 'In Progress',
    'jobCard.statusClosed': 'Closed',

    // Job Details
    'jobDetails.notFound': 'Job not found',
    'jobDetails.notFoundDesc': 'The requested job could not be found.',
    'jobDetails.backToJobs': 'Back to jobs',
    'jobDetails.budget': 'Budget',
    'jobDetails.deadline': 'Deadline',
    'jobDetails.bids': 'Bids',
    'jobDetails.location': 'Location',
    'jobDetails.description': 'Description',
    'jobDetails.requirements': 'Requirements',
    'jobDetails.deliverables': 'Deliverables',
    'jobDetails.contactClient': 'Contact Client',

    // Auth Page
    'auth.welcomeBack': 'Welcome back',
    'auth.createAccount': 'Create your account',
    'auth.enterCredentials': 'Enter your credentials to access your account',
    'auth.startConnecting': 'Start connecting with quality contractors today',
    'auth.fullName': 'Full Name',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.forgotPassword': 'Forgot password?',
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.orContinueWith': 'Or continue with',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.haveAccount': 'Already have an account?',
    'auth.connectQuality': 'Connect with Quality',
    'auth.joinThousands': 'Join thousands of businesses and contractors building successful partnerships on Offera.',

    // Profile Page
    'profile.title': 'Profile',
    'profile.subtitle': 'Manage your profile information',
    'profile.editProfile': 'Edit Profile',
    'profile.cancel': 'Cancel',
    'profile.saveChanges': 'Save Changes',
    'profile.name': 'Name',
    'profile.location': 'Location',
    'profile.bio': 'Bio',
    'profile.hourlyRate': 'Hourly Rate',
    'profile.completedProjects': 'Completed Projects',
    'profile.memberSince': 'Member Since',
    'profile.skills': 'Skills',

    // Messages Page
    'messages.title': 'Messages',
    'messages.subtitle': 'Chat with clients and freelancers',
    'messages.searchPlaceholder': 'Search conversations...',
    'messages.noConversations': 'No conversations found',

    // Project Create
    'projectCreate.backToDashboard': 'Back to Dashboard',
    'projectCreate.basics': 'Basics',
    'projectCreate.basicsDesc': 'Project title & category',
    'projectCreate.budget': 'Budget',
    'projectCreate.budgetDesc': 'Set your budget',
    'projectCreate.details': 'Details',
    'projectCreate.detailsDesc': 'Describe your project',
    'projectCreate.files': 'Files',
    'projectCreate.filesDesc': 'Upload attachments',
    'projectCreate.projectTitle': 'Project Title',
    'projectCreate.titlePlaceholder': 'Enter a clear, descriptive title',
    'projectCreate.category': 'Category',
    'projectCreate.selectCategory': 'Select a category',
    'projectCreate.budgetUSD': 'Budget (USD)',
    'projectCreate.budgetHint': 'Set a realistic budget to attract quality contractors',
    'projectCreate.projectDescription': 'Project Description',
    'projectCreate.descriptionPlaceholder': 'Describe your project requirements, goals, and any specific details contractors should know...',
    'projectCreate.descriptionHint': 'Be specific about deliverables and timeline expectations',
    'projectCreate.attachments': 'Attachments (Optional)',
    'projectCreate.dropFiles': 'Drop files here or click to upload',
    'projectCreate.fileTypes': 'PDF, DOC, PNG, JPG up to 10MB',
    'projectCreate.back': 'Back',
    'projectCreate.continue': 'Continue',
    'projectCreate.createProject': 'Create Project',

    // Categories
    'category.webDevelopment': 'Web Development',
    'category.mobileDevelopment': 'Mobile Development',
    'category.uiuxDesign': 'UI/UX Design',
    'category.dataAnalysis': 'Data Analysis',
    'category.contentWriting': 'Content Writing',
    'category.marketing': 'Marketing',
    'category.videoProduction': 'Video Production',
    'category.other': 'Other',

    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.view': 'View',
    'common.close': 'Close',
    'common.submit': 'Submit',
    'common.client': 'Client',

    // TopBar
    'search': 'Search jobs, bids...',
    'buyCredits': 'Buy Credits',
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