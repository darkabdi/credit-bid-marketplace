import { useState } from "react";
import { ArrowLeft, ArrowRight, Upload, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "@/components/ui/link";
import { createProject } from "@/services/projectServices";
import { useNavigate } from "react-router";
import { useLanguage } from "@/lib/i18n";

const ProjectCreate = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    budget: "",
    description: "",
    files: [] as File[],
  });

  const steps = [
    { id: 1, title: t('projectCreate.basics'), description: t('projectCreate.basicsDesc') },
    { id: 2, title: t('projectCreate.budget'), description: t('projectCreate.budgetDesc') },
    { id: 3, title: t('projectCreate.details'), description: t('projectCreate.detailsDesc') },
    { id: 4, title: t('projectCreate.files'), description: t('projectCreate.filesDesc') },
  ];

  const categories = [
    { value: "Web Development", label: t('category.webDevelopment') },
    { value: "Mobile Development", label: t('category.mobileDevelopment') },
    { value: "UI/UX Design", label: t('category.uiuxDesign') },
    { value: "Data Analysis", label: t('category.dataAnalysis') },
    { value: "Content Writing", label: t('category.contentWriting') },
    { value: "Marketing", label: t('category.marketing') },
    { value: "Video Production", label: t('category.videoProduction') },
    { value: "Other", label: t('category.other') },
  ];

  const handleNext = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, files: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async () => {
    try {
      await createProject({
        title: formData.title,
        category: formData.category,
        budget: Number(formData.budget),
        description: formData.description,
      });
      navigate('/dashboard');
    } catch (error: any) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="h-4 w-4" />
            {t('projectCreate.backToDashboard')}
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-3xl">
        {/* Step Indicator */}
        <div className="mb-10">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                      currentStep > step.id
                        ? "bg-[hsl(var(--moss))] text-[hsl(var(--moss-foreground))]"
                        : currentStep === step.id
                        ? "bg-[hsl(var(--moss))] text-[hsl(var(--moss-foreground))]"
                        : "bg-[hsl(var(--nordic-grey))] text-muted-foreground"
                    }`}
                  >
                    {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                  </div>
                  <span className="mt-2 text-xs font-medium text-muted-foreground hidden sm:block">
                    {step.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 sm:w-24 h-0.5 mx-2 ${
                      currentStep > step.id ? "bg-[hsl(var(--moss))]" : "bg-[hsl(var(--nordic-grey-dark))]"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Card */}
        <Card className="shadow-card border-border">
          <CardHeader className="pb-6">
            <CardTitle className="text-xl">{steps[currentStep - 1].title}</CardTitle>
            <CardDescription>{steps[currentStep - 1].description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Basics */}
            {currentStep === 1 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="title">{t('projectCreate.projectTitle')}</Label>
                  <Input
                    id="title"
                    placeholder={t('projectCreate.titlePlaceholder')}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">{t('projectCreate.category')}</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder={t('projectCreate.selectCategory')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            {/* Step 2: Budget */}
            {currentStep === 2 && (
              <div className="space-y-2">
                <Label htmlFor="budget">{t('projectCreate.budgetUSD')}</Label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="0.00"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="h-12 pl-8"
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  {t('projectCreate.budgetHint')}
                </p>
              </div>
            )}

            {/* Step 3: Description */}
            {currentStep === 3 && (
              <div className="space-y-2">
                <Label htmlFor="description">{t('projectCreate.projectDescription')}</Label>
                <Textarea
                  id="description"
                  placeholder={t('projectCreate.descriptionPlaceholder')}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="min-h-[200px] resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  {t('projectCreate.descriptionHint')}
                </p>
              </div>
            )}

            {/* Step 4: Files */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <Label>{t('projectCreate.attachments')}</Label>
                <div
                  className="border-2 border-dashed border-[hsl(var(--nordic-grey-dark))] rounded-xl p-10 text-center hover:border-[hsl(var(--moss))] transition-colors cursor-pointer"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <Upload className="h-10 w-10 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm font-medium text-foreground">
                    {t('projectCreate.dropFiles')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {t('projectCreate.fileTypes')}
                  </p>
                  <input
                    id="file-upload"
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </div>
                {formData.files.length > 0 && (
                  <div className="space-y-2">
                    {formData.files.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-3 bg-[hsl(var(--moss-light))] rounded-lg"
                      >
                        <Check className="h-4 w-4 text-[hsl(var(--moss))]" />
                        <span className="text-sm">{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t border-border">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                {t('projectCreate.back')}
              </Button>
              {currentStep < 4 ? (
                <Button
                  onClick={handleNext}
                  className="gap-2 bg-[hsl(var(--moss))] hover:bg-[hsl(var(--moss))]/90"
                >
                  {t('projectCreate.continue')}
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button
                  className="gap-2 bg-[hsl(var(--moss))] hover:bg-[hsl(var(--moss))]/90"
                  onClick={handleSubmit}
                >
                  <Check className="h-4 w-4" />
                  {t('projectCreate.createProject')}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProjectCreate;