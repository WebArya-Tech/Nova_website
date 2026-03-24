import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import { HomePage as BlogHomePage } from "./components/blog/HomePage";
import { BlogListPage } from "./components/blog/BlogListPage";
import { SubmitBlogPage } from "./components/blog/SubmitBlogPage";
import { SubscribePage } from "./components/blog/SubscribePage";
import { BlogDetailPage } from "./components/blog/BlogDetailPage";
import History from "./pages/about/History";
import Vision from "./pages/about/Vision";
import Message from "./pages/about/Message";
import Photos from "./pages/about/Photos";
import Videos from "./pages/about/Videos";
import OnlineClasses from "./pages/why-nova/OnlineClasses";
import Different from "./pages/why-nova/Different";
import Methodology from "./pages/why-nova/Methodology";
import Tutors from "./pages/why-nova/Tutors";
import Testimonials from "./pages/why-nova/Testimonials";
import GenericSubject from "./pages/GenericSubject";
import GenericPolicy from "./pages/policies/Generic";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import StudentDashboard from "./components/student-dashboard/StudentDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          {/* Dashboard routes — NO header/footer */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />

          {/* Public routes — with header/footer */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blogs" element={<BlogHomePage />} />
            <Route path="/blogs/all" element={<BlogListPage />} />
            <Route path="/blogs/submit" element={<SubmitBlogPage />} />
            <Route path="/blogs/subscribe" element={<SubscribePage />} />
            <Route path="/blogs/:slug" element={<BlogDetailPage />} />
            <Route path="/about/history" element={<History />} />
            <Route path="/about/vision" element={<Vision />} />
            <Route path="/about/message" element={<Message />} />
            <Route path="/about/photos" element={<Photos />} />
            <Route path="/about/videos" element={<Videos />} />
            <Route path="/why-nova/online-classes" element={<OnlineClasses />} />
            <Route path="/why-nova/different" element={<Different />} />
            <Route path="/why-nova/methodology" element={<Methodology />} />
            <Route path="/why-nova/tutors" element={<Tutors />} />
            <Route path="/why-nova/testimonials" element={<Testimonials />} />
            <Route path="/cbse/:subject" element={<GenericSubject />} />
            <Route path="/icse/:subject" element={<GenericSubject />} />
            <Route path="/state-boards/:subject" element={<GenericSubject />} />
            <Route path="/policies/:policy" element={<GenericPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
