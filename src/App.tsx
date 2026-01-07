import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/lib/i18n";
import Landing from "./pages/Landing";
import Dashboard from "./pages/FreelancerDashboard";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import ProjectCreate from "./pages/ProjectCreate";
import ChatWorkspace from "./pages/ChatWorkspace";
import PaymentCheckout from "./pages/PaymentCheckout";
import Auth from "./pages/Auth";
import ForgotPassword from "./pages/ForgotPassword";
import RoleSelection from "./pages/RoleSelection";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import { ProtectedRoute } from "./components/protectedPath";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "./context/authContext";
import DashboardRedirect from "./pages/DashboardRedirect";
import ClientDashboard from "./pages/ClientDashboard";
import FreelancerDashboard from './pages/FreelancerDashboard'

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        
        <BrowserRouter>
        {/*  Public routes */}
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

             {/*  Logged-in but role not chosen yet */}
            <Route path="/role-selection" element={
              <ProtectedRoute>
              <RoleSelection />
              </ProtectedRoute>
              }/>
            
            {/* 🔐 Authenticated routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
              <DashboardRedirect /> 
              </ProtectedRoute>}/>

            <Route path="client/dashboard" element={
              <ProtectedRoute role="client"  >
              <ClientDashboard/>
              </ProtectedRoute>}/>

             
              <Route path="/admin" element={
                <ProtectedRoute role="admin" >
                <AdminDashboard />
                </ProtectedRoute>} />
             
              
               <Route path="freelancer/dashboard" element={
              <ProtectedRoute role="freelancer" >
              <FreelancerDashboard/>
              </ProtectedRoute>}/>

            <Route path="/jobs" element={
              <ProtectedRoute role="freelancer" ><Jobs/></ProtectedRoute>}/>

            <Route path="/jobs/:id" element={
              <ProtectedRoute role="freelancer"><JobDetails /></ProtectedRoute>} />

            <Route path="/create-project" element={
             <ProtectedRoute role="client">
              <ProjectCreate /> 
              </ProtectedRoute> } />

            <Route path="/workspace" element={
             <ProtectedRoute> 
              <ChatWorkspace />
             </ProtectedRoute>} />

            <Route path="/checkout" element={
              <ProtectedRoute>
              <PaymentCheckout />
              </ProtectedRoute>} />
            <Route path="/messages" element={
              <ProtectedRoute>
              <Messages />
              </ProtectedRoute>} />

            <Route path="/profile" element={
              <ProtectedRoute>
              <Profile />
              </ProtectedRoute>} />

            <Route path="/credits" element={
              <ProtectedRoute>
              <Dashboard />
              </ProtectedRoute>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
       
      </TooltipProvider>
    </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
