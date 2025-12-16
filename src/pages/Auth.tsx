import { useEffect, useState } from "react";
import { Briefcase, Mail, Lock, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@/components/ui/link";
import { useAuth } from "@/context/authContext";
import { useNavigate } from "react-router-dom";



  
  const Auth = () => {
  const {login , signup , user} = useAuth()
  const navigate = useNavigate()
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");


  useEffect(()=>{
    if (!user) return
    if (user.role) navigate('/Dashboard')
    else navigate('/role-selection')

  },[user])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
   try {
    if (isLogin){
       await login({email ,password})
    }else{
      await signup({email , password , name})
    }
   
   } catch (error) {
    
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

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Start connecting with quality contractors today"}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name" className="text-foreground">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 h-11 bg-card border-border focus:border-primary"
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11 bg-card border-border focus:border-primary"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                {isLogin && (
                  <a href="#" className="text-sm text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </a>
                )}
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11 bg-card border-border focus:border-primary"
                />
              </div>
            </div>

            <Button type="submit" className="w-full h-11 gap-2 mt-6">
              {isLogin ? "Sign In" : "Create Account"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-3 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-11 border-border hover:bg-card">
              <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" className="h-11 border-border hover:bg-card">
              <svg className="h-4 w-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>

          {/* Toggle */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-primary hover:text-primary/80 transition-colors"
            >
              {isLogin ? "Sign up" : "Sign in"}
            </button>
          </p>
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
            Connect with Quality
          </h2>
          <p className="text-primary-foreground/80 max-w-sm leading-relaxed">
            Join thousands of businesses and contractors building successful partnerships on BidHub.
          </p>
          <div className="mt-12 flex items-center gap-6 text-primary-foreground/80">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-foreground">50K+</p>
              <p className="text-sm">Jobs Posted</p>
            </div>
            <div className="w-px h-12 bg-primary-foreground/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-foreground">15K+</p>
              <p className="text-sm">Contractors</p>
            </div>
            <div className="w-px h-12 bg-primary-foreground/20" />
            <div className="text-center">
              <p className="text-2xl font-bold text-primary-foreground">98%</p>
              <p className="text-sm">Satisfaction</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
