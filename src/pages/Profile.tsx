import { useState } from "react";
import { User, Mail, MapPin, Briefcase, Calendar, Edit2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useAuth } from "@/context/authContext";
import { useLanguage } from "@/lib/i18n";

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || "John Doe",
    email: user?.email || "john@example.com",
    location: "Stockholm, Sweden",
    bio: "Experienced professional with a passion for delivering quality work. Specialized in web development and digital solutions.",
    skills: ["React", "TypeScript", "Node.js", "UI/UX Design"],
    hourlyRate: "500 SEK",
    completedProjects: 24,
    memberSince: "January 2024",
  });

  const [editForm, setEditForm] = useState(profileData);

  const handleSave = () => {
    setProfileData(editForm);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm(profileData);
    setIsEditing(false);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-foreground">{t('profile.title')}</h1>
            <p className="text-muted-foreground mt-1">
              {t('profile.subtitle')}
            </p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="gap-2">
              <Edit2 className="h-4 w-4" />
              {t('profile.editProfile')}
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleCancel} variant="outline" className="gap-2">
                <X className="h-4 w-4" />
                {t('profile.cancel')}
              </Button>
              <Button onClick={handleSave} className="gap-2 bg-primary hover:bg-primary/90">
                <Save className="h-4 w-4" />
                {t('profile.saveChanges')}
              </Button>
            </div>
          )}
        </div>

        {/* Profile Card */}
        <Card className="shadow-card border-border">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {profileData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <Badge className="mt-3" variant="secondary">
                  {user?.role || "Freelancer"}
                </Badge>
              </div>

              {/* Info Section */}
              <div className="flex-1 space-y-4">
                {isEditing ? (
                  <>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">{t('profile.name')}</label>
                      <Input
                        value={editForm.name}
                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">{t('profile.location')}</label>
                      <Input
                        value={editForm.location}
                        onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">{t('profile.bio')}</label>
                      <Textarea
                        value={editForm.bio}
                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">{t('profile.hourlyRate')}</label>
                      <Input
                        value={editForm.hourlyRate}
                        onChange={(e) => setEditForm({ ...editForm, hourlyRate: e.target.value })}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">{profileData.name}</h2>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Mail className="h-4 w-4" />
                        <span className="text-sm">{profileData.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <MapPin className="h-4 w-4" />
                        <span className="text-sm">{profileData.location}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{profileData.bio}</p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-card border-border">
            <CardContent className="p-6 text-center">
              <Briefcase className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{profileData.completedProjects}</p>
              <p className="text-sm text-muted-foreground">{t('profile.completedProjects')}</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-border">
            <CardContent className="p-6 text-center">
              <span className="text-2xl mb-2 block">💰</span>
              <p className="text-2xl font-bold text-foreground">{profileData.hourlyRate}</p>
              <p className="text-sm text-muted-foreground">{t('profile.hourlyRate')}</p>
            </CardContent>
          </Card>
          <Card className="shadow-card border-border">
            <CardContent className="p-6 text-center">
              <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
              <p className="text-2xl font-bold text-foreground">{profileData.memberSince}</p>
              <p className="text-sm text-muted-foreground">{t('profile.memberSince')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Skills Section */}
        <Card className="shadow-card border-border">
          <CardHeader>
            <CardTitle className="text-lg">{t('profile.skills')}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {profileData.skills.map((skill, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1">
                  {skill}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Profile;