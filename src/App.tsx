import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ScrollToTop from "./components/ScrollToTop";
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
import Reviews from "./pages/Reviews";
import GenericSubject from "./pages/GenericSubject";
import GenericPolicy from "./pages/policies/Generic";
import NotFound from "./pages/NotFound";
import AdminDashboard from "./components/admin-dashboard/AdminDashboard";
import StudentDashboard from "./components/student-dashboard/StudentDashboard";
import RunningClasses from "./pages/RunningClasses";
import FeePayment from "./pages/FeePayment";
import WriteReview from "./pages/WriteReview";

// CBSE Grade Subject Pages
import CBSEGrade6Mathematics from "./pages/boards/cbse/grade-6/Mathematics";
import CBSEGrade6Science from "./pages/boards/cbse/grade-6/Science";
import CBSEGrade6SocialScience from "./pages/boards/cbse/grade-6/SocialScience";
import CBSEGrade6Languages from "./pages/boards/cbse/grade-6/Languages";
import CBSEGrade7Mathematics from "./pages/boards/cbse/grade-7/Mathematics";
import CBSEGrade7Science from "./pages/boards/cbse/grade-7/Science";
import CBSEGrade7SocialScience from "./pages/boards/cbse/grade-7/SocialScience";
import CBSEGrade7Languages from "./pages/boards/cbse/grade-7/Languages";
import CBSEGrade8Mathematics from "./pages/boards/cbse/grade-8/Mathematics";
import CBSEGrade8Science from "./pages/boards/cbse/grade-8/Science";
import CBSEGrade8SocialScience from "./pages/boards/cbse/grade-8/SocialScience";
import CBSEGrade8Languages from "./pages/boards/cbse/grade-8/Languages";
import CBSEGrade9Mathematics from "./pages/boards/cbse/grade-9/Mathematics";
import CBSEGrade9Science from "./pages/boards/cbse/grade-9/Science";
import CBSEGrade9SocialScience from "./pages/boards/cbse/grade-9/SocialScience";
import CBSEGrade9Languages from "./pages/boards/cbse/grade-9/Languages";
import CBSEGrade10Mathematics from "./pages/boards/cbse/grade-10/Mathematics";
import CBSEGrade10Science from "./pages/boards/cbse/grade-10/Science";
import CBSEGrade10SocialScience from "./pages/boards/cbse/grade-10/SocialScience";
import CBSEGrade10Languages from "./pages/boards/cbse/grade-10/Languages";
import CBSEGrade11Physics from "./pages/boards/cbse/grade-11/Physics";
import CBSEGrade11Chemistry from "./pages/boards/cbse/grade-11/Chemistry";
import CBSEGrade11Mathematics from "./pages/boards/cbse/grade-11/Mathematics";
import CBSEGrade11Biology from "./pages/boards/cbse/grade-11/Biology";
import CBSEGrade11Economics from "./pages/boards/cbse/grade-11/Economics";
import CBSEGrade12Physics from "./pages/boards/cbse/grade-12/Physics";
import CBSEGrade12Chemistry from "./pages/boards/cbse/grade-12/Chemistry";
import CBSEGrade12Mathematics from "./pages/boards/cbse/grade-12/Mathematics";
import CBSEGrade12Biology from "./pages/boards/cbse/grade-12/Biology";
import CBSEGrade12Economics from "./pages/boards/cbse/grade-12/Economics";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <Routes>
          {/* Dashboard & standalone routes — NO header/footer */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/running-classes" element={<RunningClasses />} />
          <Route path="/fee-payment" element={<FeePayment />} />
          <Route path="/why-nova/reviews" element={<Reviews />} />
          <Route path="/review" element={<Reviews />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/write-review" element={<WriteReview />} />

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
            
            {/* CBSE Board Routes */}
            <Route path="/boards/cbse/grade-6/mathematics" element={<CBSEGrade6Mathematics />} />
            <Route path="/boards/cbse/grade-6/science" element={<CBSEGrade6Science />} />
            <Route path="/boards/cbse/grade-6/social-science" element={<CBSEGrade6SocialScience />} />
            <Route path="/boards/cbse/grade-6/languages" element={<CBSEGrade6Languages />} />
            <Route path="/boards/cbse/grade-7/mathematics" element={<CBSEGrade7Mathematics />} />
            <Route path="/boards/cbse/grade-7/science" element={<CBSEGrade7Science />} />
            <Route path="/boards/cbse/grade-7/social-science" element={<CBSEGrade7SocialScience />} />
            <Route path="/boards/cbse/grade-7/languages" element={<CBSEGrade7Languages />} />
            <Route path="/boards/cbse/grade-8/mathematics" element={<CBSEGrade8Mathematics />} />
            <Route path="/boards/cbse/grade-8/science" element={<CBSEGrade8Science />} />
            <Route path="/boards/cbse/grade-8/social-science" element={<CBSEGrade8SocialScience />} />
            <Route path="/boards/cbse/grade-8/languages" element={<CBSEGrade8Languages />} />
            <Route path="/boards/cbse/grade-9/mathematics" element={<CBSEGrade9Mathematics />} />
            <Route path="/boards/cbse/grade-9/science" element={<CBSEGrade9Science />} />
            <Route path="/boards/cbse/grade-9/social-science" element={<CBSEGrade9SocialScience />} />
            <Route path="/boards/cbse/grade-9/languages" element={<CBSEGrade9Languages />} />
            <Route path="/boards/cbse/grade-10/mathematics" element={<CBSEGrade10Mathematics />} />
            <Route path="/boards/cbse/grade-10/science" element={<CBSEGrade10Science />} />
            <Route path="/boards/cbse/grade-10/social-science" element={<CBSEGrade10SocialScience />} />
            <Route path="/boards/cbse/grade-10/languages" element={<CBSEGrade10Languages />} />
            <Route path="/boards/cbse/grade-11/physics" element={<CBSEGrade11Physics />} />
            <Route path="/boards/cbse/grade-11/chemistry" element={<CBSEGrade11Chemistry />} />
            <Route path="/boards/cbse/grade-11/mathematics" element={<CBSEGrade11Mathematics />} />
            <Route path="/boards/cbse/grade-11/biology" element={<CBSEGrade11Biology />} />
            <Route path="/boards/cbse/grade-11/economics" element={<CBSEGrade11Economics />} />
            <Route path="/boards/cbse/grade-12/physics" element={<CBSEGrade12Physics />} />
            <Route path="/boards/cbse/grade-12/chemistry" element={<CBSEGrade12Chemistry />} />
            <Route path="/boards/cbse/grade-12/mathematics" element={<CBSEGrade12Mathematics />} />
            <Route path="/boards/cbse/grade-12/biology" element={<CBSEGrade12Biology />} />
            <Route path="/boards/cbse/grade-12/economics" element={<CBSEGrade12Economics />} />
            
            <Route path="/cbse/:subject" element={<GenericSubject />} />
            <Route path="/icse/:subject" element={<GenericSubject />} />
            <Route path="/state-boards/:subject" element={<GenericSubject />} />
            <Route path="/:board/:gradeGroup/:grade/:subject" element={<GenericSubject />} />
            <Route path="/policies/:policy" element={<GenericPolicy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
