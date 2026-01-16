import { useState } from "react";
import { Briefcase, Mail, ArrowRight, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/ui/link";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";
import { toast } from "@/hooks/use-toast";
import { forgotPassword as forgotPasswordRequest } from "@/services/authServices";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  if (!email.trim()) return;

  setIsLoading(true);

  try {
    await forgotPasswordRequest(email.trim().toLowerCase());
    setIsSubmitted(true);

    toast({
      title: t("forgotPassword.emailSent"),
      description: t("forgotPassword.checkInbox"),
    });
  } catch (error) {
    console.error(error);
    toast({
      title: t("forgotPassword.error"),
      description: t("forgotPassword.tryAgain"),
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Panel - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <Link href="/" className="inline-flex items-center gap-3 mb-12">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Briefcase className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">BidHub</span>
          </Link>

          {/* Back to login */}
          <button
            onClick={() => navigate("/auth")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('forgotPassword.backToLogin')}
          </button>

          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-bold text-foreground">
                  {t('forgotPassword.title')}
                </h1>
                <p className="mt-2 text-muted-foreground">
                  {t('forgotPassword.description')}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground">{t('auth.email')}</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 bg-card border-border focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full h-11 gap-2 mt-6" disabled={isLoading}>
                  {isLoading ? t('forgotPassword.sending') : t('forgotPassword.sendLink')}
                  {!isLoading && <ArrowRight className="h-4 w-4" />}
                </Button>
              </form>
            </>
          ) : (
            <>
              {/* Success State */}
              <div className="text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mx-auto mb-6">
                  <Mail className="h-8 w-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground mb-2">
                  {t('forgotPassword.checkEmail')}
                </h1>
                <p className="text-muted-foreground mb-8">
                  {t('forgotPassword.sentTo')} <span className="font-medium text-foreground">{email}</span>
                </p>
                <Button
                  variant="outline"
                  className="w-full h-11"
                  onClick={() => navigate("/auth")}
                >
                  {t('forgotPassword.backToLogin')}
                </Button>
                <p className="mt-6 text-sm text-muted-foreground">
                  {t('forgotPassword.noEmail')}{" "}
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {t('forgotPassword.tryAgain')}
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Right Panel - Decorative */}
      <div className="hidden lg:flex flex-1 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-primary/80" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-primary-foreground blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-primary-foreground blur-3xl" />
        </div>
        <div className="relative flex flex-col items-center justify-center p-12 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-foreground/20 mb-8">
            <Briefcase className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            {t('forgotPassword.secureReset')}
          </h2>
          <p className="text-primary-foreground/80 max-w-sm leading-relaxed">
            {t('forgotPassword.secureDescription')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
