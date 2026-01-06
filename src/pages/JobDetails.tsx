import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, DollarSign, Users, MapPin, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useLanguage } from "@/lib/i18n";

const jobsData = [
  {
    id: "1",
    title: "Webbplatsutveckling för E-handel",
    company: "TechStart AB",
    budget: "45 000 - 65 000 kr",
    deadline: "15 Dec 2024",
    bidsCount: 12,
    tags: ["React", "Node.js", "E-handel"],
    status: "open" as const,
    location: "Stockholm, Sverige",
    postedDate: "28 Nov 2024",
    description: "Vi söker en erfaren utvecklare för att bygga en modern e-handelsplattform. Projektet inkluderar frontend-utveckling med React, backend med Node.js, och integration med betalningslösningar.",
    requirements: [
      "Minst 3 års erfarenhet av React-utveckling",
      "Erfarenhet av Node.js och Express",
      "Kunskap om e-handelssystem och betalningsintegrationer",
      "God förståelse för responsiv design",
      "Flytande svenska och engelska"
    ],
    deliverables: [
      "Komplett e-handelsplattform",
      "Adminpanel för produkthantering",
      "Integration med Stripe/Klarna",
      "Responsiv design för mobil och desktop",
      "Dokumentation och överlämning"
    ]
  },
  {
    id: "2",
    title: "Mobilapp för Fastighetsmäklare",
    company: "Bostadsgruppen",
    budget: "80 000 - 120 000 kr",
    deadline: "20 Jan 2025",
    bidsCount: 8,
    tags: ["React Native", "Firebase", "iOS", "Android"],
    status: "open" as const,
    location: "Göteborg, Sverige",
    postedDate: "25 Nov 2024",
    description: "Vi behöver en mobilapp som hjälper våra mäklare att hantera visningar, kundkontakter och objektinformation. Appen ska fungera på både iOS och Android.",
    requirements: [
      "Erfarenhet av React Native eller Flutter",
      "Kunskap om Firebase eller liknande backend-lösningar",
      "Erfarenhet av att publicera appar på App Store och Google Play",
      "Förståelse för offline-funktionalitet"
    ],
    deliverables: [
      "Mobilapp för iOS och Android",
      "Backend-integration med Firebase",
      "Push-notifikationer",
      "Offline-stöd för grundläggande funktioner",
      "Användardokumentation"
    ]
  },
  {
    id: "3",
    title: "CRM-system Integration",
    company: "Konsultfirman Nord",
    budget: "25 000 - 35 000 kr",
    deadline: "10 Dec 2024",
    bidsCount: 15,
    tags: ["API", "Salesforce", "Integration"],
    status: "in-progress" as const,
    location: "Malmö, Sverige",
    postedDate: "20 Nov 2024",
    description: "Vi behöver hjälp med att integrera vårt befintliga system med Salesforce CRM. Projektet inkluderar datamigrering och API-utveckling.",
    requirements: [
      "Erfarenhet av Salesforce-integrationer",
      "Kunskap om REST och SOAP API:er",
      "Erfarenhet av datamigrering",
      "Förståelse för CRM-processer"
    ],
    deliverables: [
      "Komplett Salesforce-integration",
      "Datamigrering från befintligt system",
      "API-dokumentation",
      "Testrapporter och kvalitetssäkring"
    ]
  }
];

export default function JobDetails() {
  const { id } = useParams<{ id: string }>();
  const { t } = useLanguage();
  const job = jobsData.find(j => j.id === id);

  if (!job) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-semibold text-foreground">{t('jobDetails.notFound')}</h1>
          <p className="text-muted-foreground mt-2">{t('jobDetails.notFoundDesc')}</p>
          <Link to="/jobs">
            <Button className="mt-4">{t('jobDetails.backToJobs')}</Button>
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const statusStyles = {
    open: "bg-success/10 text-success border-success/20",
    "in-progress": "bg-warning/10 text-warning border-warning/20",
    closed: "bg-muted text-muted-foreground border-border",
  };

  const statusLabels = {
    open: t('jobCard.statusOpen'),
    "in-progress": t('jobCard.statusInProgress'),
    closed: t('jobCard.statusClosed'),
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <Link to="/jobs" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>{t('jobDetails.backToJobs')}</span>
        </Link>

        {/* Header */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-card mb-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-semibold text-foreground">{job.title}</h1>
                <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${statusStyles[job.status]}`}>
                  {statusLabels[job.status]}
                </span>
              </div>
              <p className="text-lg text-muted-foreground">{job.company}</p>
            </div>
            <Button size="lg">{t('jobCard.placeBid')}</Button>
          </div>

          <div className="flex flex-wrap gap-2 mt-4">
            {job.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{t('jobDetails.budget')}</p>
                <p className="font-medium text-foreground">{job.budget}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{t('jobDetails.deadline')}</p>
                <p className="font-medium text-foreground">{job.deadline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{t('jobDetails.bids')}</p>
                <p className="font-medium text-foreground">{job.bidsCount} {t('jobCard.bids')}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-xs text-muted-foreground">{t('jobDetails.location')}</p>
                <p className="font-medium text-foreground">{job.location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-card mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="h-5 w-5" />
            {t('jobDetails.description')}
          </h2>
          <p className="text-muted-foreground leading-relaxed">{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-card mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('jobDetails.requirements')}</h2>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {req}
              </li>
            ))}
          </ul>
        </div>

        {/* Deliverables */}
        <div className="bg-card rounded-xl border border-border p-6 shadow-card mb-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">{t('jobDetails.deliverables')}</h2>
          <ul className="space-y-2">
            {job.deliverables.map((del, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-primary mt-1">•</span>
                {del}
              </li>
            ))}
          </ul>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button size="lg" className="flex-1">{t('jobCard.placeBid')}</Button>
          <Button size="lg" variant="outline">{t('jobDetails.contactClient')}</Button>
        </div>
      </div>
    </DashboardLayout>
  );
}