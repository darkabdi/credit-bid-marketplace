import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from "@/lib/i18n";
import { Briefcase, Users, CheckCircle2 } from "lucide-react";

const RoleSelection = () => {
  const [selectedRole, setSelectedRole] = useState<"client" | "freelancer" | null>(null);
  const navigate = useNavigate();
  const { language } = useLanguage();

  const t = {
    sv: {
      title: "Välj din roll",
      subtitle: "Hur vill du använda plattformen?",
      client: "Kund",
      clientDesc: "Jag vill publicera jobb och hitta talanger",
      clientFeatures: [
        "Publicera obegränsade jobbförfrågningar",
        "Få bud från kvalificerade frilansare",
        "Hantera projekt och betalningar säkert"
      ],
      freelancer: "Frilansare",
      freelancerDesc: "Jag vill hitta jobb och erbjuda mina tjänster",
      freelancerFeatures: [
        "Bläddra och lägg bud på tillgängliga jobb",
        "Bygg din profil och portfölj",
        "Ta emot säkra betalningar"
      ],
      continue: "Fortsätt",
      selectRole: "Välj en roll för att fortsätta"
    },
    en: {
      title: "Choose your role",
      subtitle: "How would you like to use the platform?",
      client: "Client",
      clientDesc: "I want to post jobs and find talent",
      clientFeatures: [
        "Post unlimited job requests",
        "Receive bids from qualified freelancers",
        "Manage projects and payments securely"
      ],
      freelancer: "Freelancer",
      freelancerDesc: "I want to find work and offer my services",
      freelancerFeatures: [
        "Browse and bid on available jobs",
        "Build your profile and portfolio",
        "Receive secure payments"
      ],
      continue: "Continue",
      selectRole: "Select a role to continue"
    }
  };

  const text = t[language];

  const handleContinue = () => {
    if (selectedRole) {
      // TODO: Save role to database
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            {text.title}
          </h1>
          <p className="text-muted-foreground text-lg">
            {text.subtitle}
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Client Card */}
          <Card
            className={`relative p-8 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
              selectedRole === "client"
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setSelectedRole("client")}
          >
            {selectedRole === "client" && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
            )}
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-2xl mb-6 ${
                selectedRole === "client" ? "bg-primary" : "bg-primary/10"
              }`}>
                <Briefcase className={`h-10 w-10 ${
                  selectedRole === "client" ? "text-primary-foreground" : "text-primary"
                }`} />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {text.client}
              </h2>
              <p className="text-muted-foreground mb-6">
                {text.clientDesc}
              </p>
              <ul className="space-y-3 text-left w-full">
                {text.clientFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>

          {/* Freelancer Card */}
          <Card
            className={`relative p-8 cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
              selectedRole === "freelancer"
                ? "border-primary bg-primary/5 shadow-lg"
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setSelectedRole("freelancer")}
          >
            {selectedRole === "freelancer" && (
              <div className="absolute top-4 right-4">
                <CheckCircle2 className="h-6 w-6 text-primary" />
              </div>
            )}
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-2xl mb-6 ${
                selectedRole === "freelancer" ? "bg-primary" : "bg-primary/10"
              }`}>
                <Users className={`h-10 w-10 ${
                  selectedRole === "freelancer" ? "text-primary-foreground" : "text-primary"
                }`} />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                {text.freelancer}
              </h2>
              <p className="text-muted-foreground mb-6">
                {text.freelancerDesc}
              </p>
              <ul className="space-y-3 text-left w-full">
                {text.freelancerFeatures.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        {/* Continue Button */}
        <div className="flex flex-col items-center gap-3">
          <Button
            size="lg"
            className="w-full max-w-sm"
            disabled={!selectedRole}
            onClick={handleContinue}
          >
            {text.continue}
          </Button>
          {!selectedRole && (
            <p className="text-sm text-muted-foreground">
              {text.selectRole}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
