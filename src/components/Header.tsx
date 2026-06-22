import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Phone, Mail, LogIn, LogOut, LayoutDashboard, CreditCard, ChevronRight, ChevronDown } from "lucide-react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import logoImage from "@/assets/nova-logo.jpg";
import whstsapp from "@/assets/whatsapp.png";
import LoginModal from "./auth/LoginModal";
import SignupModal from "./auth/SignupModal";
import ForgotPasswordModal from "./auth/ForgotPasswordModal";
import ScheduleFreeDemoModal from "./ScheduleFreeDemoModal";
import { useAuth } from "../context/AuthContext";
import { getWhatsAppLink, whatsappMessages } from "@/utils/whatsapp";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const { user, logout, isLoading } = useAuth() as any;
  const navigate = useNavigate();
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const prevUserRef = useRef(user);
  const prevLoadingRef = useRef(isLoading);

  // Redirect only when user EXPLICITLY logs in (null → value after auth is already initialized).
  // Do NOT redirect when auth just restores a session from localStorage on page load
  // (that would prevent a logged-in student from ever visiting the home page).
  useEffect(() => {
    const wasLoggedOut = !prevUserRef.current;
    const isNowLoggedIn = !!user;
    const authWasAlreadyInitialized = !prevLoadingRef.current; // loading was false before this change

    if (wasLoggedOut && isNowLoggedIn && authWasAlreadyInitialized) {
      setIsLoginOpen(false);
      if (user.role === 'admin') navigate('/admin-dashboard');
      else if (user.role === 'student') navigate('/student-dashboard');
    }
    prevUserRef.current = user;
    prevLoadingRef.current = isLoading;
  }, [user, isLoading]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const boardMenus = [
    { label: "CBSE", slug: "cbse" },
    { label: "ICSE / ISC", slug: "icse" },
    { label: "State Board", slug: "state-board" },
  ];

  const gradeGroups = [
    {
      label: "Grade 6–8",
      slug: "grade-6-8",
      grades: [
        { label: "Grade 6", slug: "grade-6" },
        { label: "Grade 7", slug: "grade-7" },
        { label: "Grade 8", slug: "grade-8" },
      ],
      subjects: ["Mathematics", "Science", "Social Science", "Languages"],
    },
    {
      label: "Grade 9–10",
      slug: "grade-9-10",
      grades: [
        { label: "Grade 9", slug: "grade-9" },
        { label: "Grade 10", slug: "grade-10" },
      ],
      subjects: ["Mathematics", "Science", "Social Science", "Languages"],
    },
    {
      label: "Grade 11–12",
      slug: "grade-11-12",
      grades: [
        { label: "Grade 11", slug: "grade-11" },
        { label: "Grade 12", slug: "grade-12" },
      ],
      subjects: ["Physics", "Chemistry", "Mathematics", "Biology", "Computer Science", "English"],
    },
  ];

  const seniorSubjectsByCbse = ["Physics", "Chemistry", "Mathematics", "Biology", "Accountancy", "Business Studies", "Economics", "Computer Science", "English"];
  const seniorSubjectsByIcseState = ["Physics", "Chemistry", "Mathematics", "Biology", "Commerce Subjects", "Computer Science", "English"];

  const getSubjects = (boardSlug: string, gradeGroupSlug: string) => {
    if (gradeGroupSlug === "grade-11-12") {
      return boardSlug === "cbse" ? seniorSubjectsByCbse : seniorSubjectsByIcseState;
    }
    return ["Mathematics", "Science", "Social Science", "Languages"];
  };

  const toSlug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const [mobileOpen, setMobileOpen] = useState<Record<string, boolean>>({});
  const toggleMobile = (key: string) => setMobileOpen(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <>
    <header className="sticky top-0 z-50 bg-background shadow-md">
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex flex-col sm:flex-row sm:flex-wrap items-center justify-between gap-3 text-sm">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 justify-center sm:justify-start w-full sm:w-auto">
            <a href="tel:+917348956284" className="flex items-center gap-1 hover:text-accent transition-colors whitespace-nowrap">
              <Phone className="w-3 h-3 flex-shrink-0" />
              <span className="text-xs sm:text-sm">+91-734 895 6284</span>
            </a>
            <a href={getWhatsAppLink(whatsappMessages.GENERAL)} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent transition-colors whitespace-nowrap">
              <img src={whstsapp} alt="WhatsApp" className="w-4 h-4 flex-shrink-0" />
              <span className="text-xs sm:text-sm">+91-974 071 2301</span>
            </a>
            <a href="mailto:novatuitions@ixpoe.com" className="flex items-center gap-1 hover:text-accent transition-colors whitespace-nowrap">
              <Mail className="w-3 h-3 flex-shrink-0" />
              <span className="text-xs sm:text-sm">novatuitions@ixpoe.com</span>
            </a>
            <NavLink to="/fee-payment" className="flex items-center gap-1 hover:text-accent transition-colors whitespace-nowrap text-xs sm:text-sm font-medium">
              <CreditCard className="w-3 h-3 flex-shrink-0" />
              <span>Fee Payment</span>
            </NavLink>
            <NavLink to="/why-nova/reviews" className="flex items-center gap-1 hover:text-accent transition-colors whitespace-nowrap text-xs sm:text-sm font-medium">
              Reviews
            </NavLink>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <a href="https://www.facebook.com/NOVAtuitions" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" title="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/novatuitions?igsh=OHZvbmNuaDZyM3h5" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" title="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://x.com/novatuitions" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" title="Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/in/nova-tuitions-b250913a3" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" title="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="https://www.youtube.com/@NovaTuitions" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" title="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href={getWhatsAppLink(whatsappMessages.GENERAL)} target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors" title="WhatsApp">
              <img src={whstsapp} alt="WhatsApp" className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-1">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="Nova Tuitions Logo" className="h-12 sm:h-14 w-auto" />
          </NavLink>

          {/* Desktop Navigation */}
          {/* Simple CSS-based desktop nav (positions dropdowns under their triggers) */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-2">
              <li className="relative">
                <NavLink to="/" className="px-3 py-1 text-sm font-medium hover:text-primary transition-colors inline-block">
                  Home
                </NavLink>
              </li>

              {/* About Us */}
              <li className="relative group">
                <button className="px-3 py-1 text-sm font-medium hover:text-primary transition-colors inline-block">
                  About Us
                </button>
                <div className="absolute left-0 top-full mt-2 z-50 w-48 bg-background rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                  <ul className="flex flex-col p-2">
                    <li><NavLink to="/about/history" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Brief History</NavLink></li>
                    <li><NavLink to="/about/vision" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Vision & Mission</NavLink></li>
                    <li><NavLink to="/about/message" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Message from Rohit Sir</NavLink></li>
                    <li><NavLink to="/about/photos" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Photo Gallery</NavLink></li>
                    <li><NavLink to="/about/videos" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Video Gallery</NavLink></li>
                  </ul>
                </div>
              </li>

              {/* Why NOVA */}
              <li className="relative group">
                <button className="px-3 py-1 text-sm font-medium hover:text-primary transition-colors inline-block">
                  Why NOVA
                </button>
                <div className="absolute left-0 top-full mt-2 z-50 w-56 bg-background rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                  <ul className="flex flex-col p-2">
                    <li><NavLink to="/why-nova/online-classes" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Online Classes</NavLink></li>
                    <li><NavLink to="/why-nova/different" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">How We Are Different</NavLink></li>
                    <li><NavLink to="/why-nova/methodology" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Teaching Methodology</NavLink></li>
                    <li><NavLink to="/why-nova/tutors" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Our Tutors</NavLink></li>
                    <li><NavLink to="/why-nova/testimonials" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Testimonials </NavLink></li>
                    <li><NavLink to="/why-nova/reviews" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Reviews</NavLink></li>
                  </ul>
                </div>
              </li>

              {/* Board Menus: CBSE / ICSE / State Board */}
              {boardMenus.map((board) => (
                <li key={board.slug} className="relative group">
                  <button className="px-3 py-1 text-sm font-medium hover:text-primary transition-colors inline-block">
                    {board.label}
                  </button>
                  {/* Level 1: Grade Groups */}
                  <div className="absolute left-0 top-full mt-2 z-50 w-44 bg-background rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                    <ul className="flex flex-col p-2">
                      {gradeGroups.map((gg) => (
                        <li key={gg.slug} className="relative group/gg">
                          <button className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-secondary rounded-md">
                            {gg.label}
                            <ChevronRight className="w-3 h-3 ml-1 flex-shrink-0" />
                          </button>
                          {/* Level 2: Grades */}
                          <div className="absolute left-full top-0 ml-1 z-50 w-36 bg-background rounded-md shadow-lg opacity-0 invisible group-hover/gg:opacity-100 group-hover/gg:visible transition-all duration-150">
                            <ul className="flex flex-col p-2">
                              {gg.grades.map((grade) => (
                                <li key={grade.slug} className="relative group/gr">
                                  <button className="w-full flex items-center justify-between px-4 py-2 text-sm hover:bg-secondary rounded-md">
                                    {grade.label}
                                    <ChevronRight className="w-3 h-3 ml-1 flex-shrink-0" />
                                  </button>
                                  {/* Level 3: Subjects */}
                                  <div className="absolute left-full top-0 ml-1 z-50 w-48 bg-background rounded-md shadow-lg opacity-0 invisible group-hover/gr:opacity-100 group-hover/gr:visible transition-all duration-150">
                                    <ul className="flex flex-col p-2">
                                      {getSubjects(board.slug, gg.slug).map((subject) => (
                                        <li key={subject}>
                                          <NavLink
                                            to={`/${board.slug}/${gg.slug}/${grade.slug}/${toSlug(subject)}`}
                                            className="block px-4 py-2 text-sm hover:bg-secondary rounded-md"
                                          >
                                            {subject}
                                          </NavLink>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}

              <li>
                <NavLink to="/blogs" className="px-3 py-1 text-sm font-medium hover:text-primary transition-colors inline-block">Blogs</NavLink>
              </li>
              <li>
                <NavLink to="/running-classes" className="px-3 py-1 text-sm font-medium hover:text-primary transition-colors inline-block">Running Classes</NavLink>
              </li>
              
              <li>
                <NavLink to="/contact" className="px-3 py-1 text-sm font-medium hover:text-primary transition-colors inline-block">Contact Us</NavLink>
              </li>
            </ul>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-2">
            {user ? (
              <>
                <Button
                  onClick={() => navigate(user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard')}
                  variant="outline"
                  className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors font-semibold"
                >
                  <LayoutDashboard className="w-4 h-4 mr-1.5" />
                  Dashboard
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsLoginOpen(true)}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors font-semibold"
              >
                Login
              </Button>
            )}
            <Button onClick={() => setIsDemoModalOpen(true)} className="bg-accent hover:bg-accent/90 text-accent-foreground">
              Book Free Demo
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[300px] overflow-y-auto">
              <nav className="flex flex-col gap-3 sm:gap-4 mt-6 sm:mt-8">
                <NavLink to="/" className="text-sm font-medium hover:text-primary py-1.5" onClick={() => setIsOpen(false)}>
                  Home
                </NavLink>
                
                {/* About Us - Collapsible */}
                <div>
                  <button
                    className="w-full flex items-center justify-between text-sm font-medium hover:text-primary py-1.5"
                    onClick={() => toggleMobile('about-us')}
                  >
                    About Us
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpen['about-us'] ? "rotate-180" : ""}`} />
                  </button>
                  {mobileOpen['about-us'] && (
                    <div className="flex flex-col gap-1 sm:gap-1.5 ml-3 sm:ml-4 mt-2">
                      <NavLink to="/about/history" className="text-xs sm:text-sm hover:text-primary py-1" onClick={() => setIsOpen(false)}>Brief History</NavLink>
                      <NavLink to="/about/vision" className="text-xs sm:text-sm hover:text-primary py-1" onClick={() => setIsOpen(false)}>Vision & Mission</NavLink>
                      <NavLink to="/about/message" className="text-xs sm:text-sm hover:text-primary py-1" onClick={() => setIsOpen(false)}>Message from Rohit Sir</NavLink>
                      <NavLink to="/about/photos" className="text-xs sm:text-sm hover:text-primary py-1" onClick={() => setIsOpen(false)}>Photo Gallery</NavLink>
                      <NavLink to="/about/videos" className="text-xs sm:text-sm hover:text-primary py-1" onClick={() => setIsOpen(false)}>Video Gallery</NavLink>
                    </div>
                  )}
                </div>
                
                {/* Why NOVA - Collapsible */}
                <div>
                  <button
                    className="w-full flex items-center justify-between text-sm font-medium hover:text-primary py-1.5"
                    onClick={() => toggleMobile('why-nova')}
                  >
                    Why NOVA
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpen['why-nova'] ? "rotate-180" : ""}`} />
                  </button>
                  {mobileOpen['why-nova'] && (
                    <div className="flex flex-col gap-1 sm:gap-1.5 ml-3 sm:ml-4 mt-2">
                      <NavLink to="/why-nova/online-classes" className="text-xs sm:text-sm hover:text-primary py-1" onClick={() => setIsOpen(false)}>Online Classes</NavLink>
                      <NavLink to="/why-nova/different" className="text-xs sm:text-sm hover:text-primary py-1" onClick={() => setIsOpen(false)}>How We Are Different</NavLink>
                      <NavLink to="/why-nova/methodology" className="text-xs sm:text-sm hover:text-primary py-1" onClick={() => setIsOpen(false)}>Teaching Methodology</NavLink>
                      <NavLink to="/why-nova/tutors" className="text-xs sm:text-sm hover:text-primary py-1" onClick={() => setIsOpen(false)}>Our Tutors</NavLink>
                      <NavLink to="/why-nova/testimonials" className="text-xs sm:text-sm hover:text-primary py-1" onClick={() => setIsOpen(false)}>Testimonials & Success</NavLink>
                      <NavLink to="/why-nova/reviews" className="text-xs sm:text-sm hover:text-primary py-1" onClick={() => setIsOpen(false)}>Reviews</NavLink>
                    </div>
                  )}
                </div>

                {/* Board menus — mobile accordion */}
                {boardMenus.map((board) => (
                  <div key={board.slug}>
                    <button
                      className="w-full flex items-center justify-between text-sm font-medium hover:text-primary py-1.5"
                      onClick={() => toggleMobile(board.slug)}
                    >
                      {board.label}
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileOpen[board.slug] ? "rotate-180" : ""}`} />
                    </button>
                    {mobileOpen[board.slug] && (
                      <div className="flex flex-col gap-0.5 sm:gap-1 ml-2 sm:ml-3">
                        {gradeGroups.map((gg) => (
                          <div key={gg.slug}>
                            <button
                              className="w-full flex items-center justify-between text-xs sm:text-sm font-medium py-1"
                              onClick={() => toggleMobile(`${board.slug}-${gg.slug}`)}
                            >
                              {gg.label}
                              <ChevronDown className={`w-3 h-3 transition-transform ${mobileOpen[`${board.slug}-${gg.slug}`] ? "rotate-180" : ""}`} />
                            </button>
                            {mobileOpen[`${board.slug}-${gg.slug}`] && (
                              <div className="flex flex-col gap-0.5 sm:gap-1 ml-2 sm:ml-3">
                                {gg.grades.map((grade) => (
                                  <div key={grade.slug}>
                                    <button
                                      className="w-full flex items-center justify-between text-xs text-muted-foreground py-1"
                                      onClick={() => toggleMobile(`${board.slug}-${gg.slug}-${grade.slug}`)}
                                    >
                                      {grade.label}
                                      <ChevronDown className={`w-2.5 h-2.5 sm:w-3 sm:h-3 transition-transform ${mobileOpen[`${board.slug}-${gg.slug}-${grade.slug}`] ? "rotate-180" : ""}`} />
                                    </button>
                                    {mobileOpen[`${board.slug}-${gg.slug}-${grade.slug}`] && (
                                      <div className="flex flex-col gap-0.5 sm:gap-1 ml-2 sm:ml-3">
                                        {getSubjects(board.slug, gg.slug).map((subject) => (
                                          <NavLink
                                            key={subject}
                                            to={`/${board.slug}/${gg.slug}/${grade.slug}/${toSlug(subject)}`}
                                            className="text-xs sm:text-sm hover:text-primary py-0.5"
                                            onClick={() => setIsOpen(false)}
                                          >
                                            {subject}
                                          </NavLink>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}

                <NavLink to="/blogs" className="text-sm font-medium hover:text-primary py-1.5" onClick={() => setIsOpen(false)}>
                  Blogs
                </NavLink>
                <NavLink to="/running-classes" className="text-sm font-medium hover:text-primary py-1.5" onClick={() => setIsOpen(false)}>
                  Running Classes
                </NavLink>
                <NavLink to="/fee-payment" className="text-sm font-medium hover:text-primary py-1.5" onClick={() => setIsOpen(false)}>
                  Fee Payment
                </NavLink>
                <NavLink to="/contact" className="text-sm font-medium hover:text-primary py-1.5" onClick={() => setIsOpen(false)}>
                  Contact Us
                </NavLink>
                {user ? (
                  <Button
                    onClick={() => { navigate(user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'); setIsOpen(false); }}
                    className="bg-primary text-white mt-1 sm:mt-2 w-full py-2.5 text-sm"
                  >
                    <LayoutDashboard className="w-4 h-4 mr-1.5" /> Dashboard
                  </Button>
                ) : (
                  <Button
                    onClick={() => { setIsLoginOpen(true); setIsOpen(false); }}
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold mt-1 sm:mt-2 w-full py-2.5 text-sm"
                  >
                    <LogIn className="w-4 h-4 mr-1.5" /> Login
                  </Button>
                )}
                <Button onClick={() => { setIsDemoModalOpen(true); setIsOpen(false); }} className="bg-accent hover:bg-accent/90 text-accent-foreground mt-1 sm:mt-2 w-full py-2.5 text-sm">
                  Book Free Demo
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>

    {/* Auth Modals */}
    <LoginModal
      isOpen={isLoginOpen}
      onClose={() => setIsLoginOpen(false)}
      onOpenSignup={() => { setIsLoginOpen(false); setIsSignupOpen(true); }}
      onOpenForgotPassword={() => { setIsLoginOpen(false); setIsForgotOpen(true); }}
    />
    <SignupModal
      isOpen={isSignupOpen}
      onClose={() => setIsSignupOpen(false)}
      onOpenLogin={() => { setIsSignupOpen(false); setIsLoginOpen(true); }}
    />
    <ForgotPasswordModal
      isOpen={isForgotOpen}
      onClose={() => setIsForgotOpen(false)}
      onOpenLogin={() => { setIsForgotOpen(false); setIsLoginOpen(true); }}
    />
    <ScheduleFreeDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </>
  );
};

export default Header;
