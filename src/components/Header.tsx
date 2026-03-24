import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { NavLink } from "./NavLink";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Menu, Phone, Mail, MessageCircle, LogIn, LogOut, LayoutDashboard } from "lucide-react";
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react";
import logoImage from "@/assets/nova-logo.jpg";
import whstsapp from "@/assets/whatsapp.png";
import LoginModal from "./auth/LoginModal";
import SignupModal from "./auth/SignupModal";
import ForgotPasswordModal from "./auth/ForgotPasswordModal";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const { user, logout, isLoading } = useAuth() as any;
  const navigate = useNavigate();
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

  const subjects = ["Physics", "Chemistry", "Math", "Biology", "Languages"];

  return (
    <>
    <header className="sticky top-0 z-50 bg-background shadow-md">
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-2 text-sm">
          <div className="flex flex-wrap items-center gap-4">
            <a href="tel:+917348956284" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone className="w-3 h-3" />
              <span>+91 7348956284</span>
            </a>
            <a href="https://wa.me/917348956284" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-accent transition-colors">
              <span><img src={whstsapp} alt="WhatsApp" className="inline w-4 h-4 mr-1" />+91 7348956284</span>
            </a>
            <a href="mailto:novatuitions@ixpoe.com" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Mail className="w-3 h-3" />
              <span className="hidden sm:inline">novatuitions@ixpoe.com</span>
            </a>
          </div>
          <div className="flex items-center gap-3">
            <a href="https://www.facebook.com/NOVAtuitions" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              <Twitter className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#" className="hover:text-accent transition-colors">
              <Youtube className="w-4 h-4" />
            </a>
            <a
              href="https://wa.me/917348956284"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2">
            <img src={logoImage} alt="Nova Tuitions Logo" className="h-16 w-auto" />
          </NavLink>

          {/* Desktop Navigation */}
          {/* Simple CSS-based desktop nav (positions dropdowns under their triggers) */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-2">
              <li className="relative">
                <NavLink to="/" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors inline-block">
                  Home
                </NavLink>
              </li>

              {/* About Us */}
              <li className="relative group">
                <button className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors inline-block">
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
                <button className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors inline-block">
                  Why NOVA
                </button>
                <div className="absolute left-0 top-full mt-2 z-50 w-56 bg-background rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                  <ul className="flex flex-col p-2">
                    <li><NavLink to="/why-nova/online-classes" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Online Classes</NavLink></li>
                    <li><NavLink to="/why-nova/different" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">How We Are Different</NavLink></li>
                    <li><NavLink to="/why-nova/methodology" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Teaching Methodology</NavLink></li>
                    <li><NavLink to="/why-nova/tutors" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Our Tutors</NavLink></li>
                    <li><NavLink to="/why-nova/testimonials" className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">Testimonials </NavLink></li>
                  </ul>
                </div>
              </li>

              {/* CBSE */}
              <li className="relative group">
                <button className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors inline-block">
                  CBSE
                </button>
                <div className="absolute left-0 top-full mt-2 z-50 w-44 bg-background rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                  <ul className="flex flex-col p-2">
                    {subjects.map((s) => <li key={s}><NavLink to={`/cbse/${s.toLowerCase()}`} className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">{s}</NavLink></li>)}
                  </ul>
                </div>
              </li>

              {/* ICSE / ISC */}
              <li className="relative group">
                <button className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors inline-block">
                  ICSE / ISC
                </button>
                <div className="absolute left-0 top-full mt-2 z-50 w-44 bg-background rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                  <ul className="flex flex-col p-2">
                    {subjects.map((s) => <li key={s}><NavLink to={`/icse/${s.toLowerCase()}`} className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">{s}</NavLink></li>)}
                  </ul>
                </div>
              </li>

              {/* State Boards */}
              <li className="relative group">
                <button className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors inline-block">
                  State Boards
                </button>
                <div className="absolute left-0 top-full mt-2 z-50 w-44 bg-background rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                  <ul className="flex flex-col p-2">
                    {subjects.map((s) => <li key={s}><NavLink to={`/state-boards/${s.toLowerCase()}`} className="block px-4 py-2 text-sm hover:bg-secondary rounded-md">{s}</NavLink></li>)}
                  </ul>
                </div>
              </li>

              <li>
                <NavLink to="/blogs" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors inline-block">Blogs</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="px-4 py-2 text-sm font-medium hover:text-primary transition-colors inline-block">Contact Us</NavLink>
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
                <Button
                  onClick={handleLogout}
                  variant="ghost"
                  className="text-muted-foreground hover:text-destructive"
                >
                  <LogOut className="w-4 h-4 mr-1.5" />
                  Logout
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsLoginOpen(true)}
                variant="outline"
                className="border-2 border-primary text-primary hover:bg-primary hover:text-white transition-colors font-semibold"
              >
                <LogIn className="w-4 h-4 mr-1.5" />
                Login
              </Button>
            )}
            <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="https://wa.me/917348956284" target="_blank" rel="noopener noreferrer">
                Book Free Demo
              </a>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] overflow-y-auto">
              <nav className="flex flex-col gap-4 mt-8">
                <NavLink to="/" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                  Home
                </NavLink>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">About Us</p>
                  <div className="flex flex-col gap-2 ml-4">
                    <NavLink to="/about/history" className="text-sm hover:text-primary" onClick={() => setIsOpen(false)}>Brief History</NavLink>
                    <NavLink to="/about/vision" className="text-sm hover:text-primary" onClick={() => setIsOpen(false)}>Vision & Mission</NavLink>
                    <NavLink to="/about/message" className="text-sm hover:text-primary" onClick={() => setIsOpen(false)}>Message from Rohit Sir</NavLink>
                    <NavLink to="/about/photos" className="text-sm hover:text-primary" onClick={() => setIsOpen(false)}>Photo Gallery</NavLink>
                    <NavLink to="/about/videos" className="text-sm hover:text-primary" onClick={() => setIsOpen(false)}>Video Gallery</NavLink>
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Why NOVA</p>
                  <div className="flex flex-col gap-2 ml-4">
                    <NavLink to="/why-nova/online-classes" className="text-sm hover:text-primary" onClick={() => setIsOpen(false)}>Online Classes</NavLink>
                    <NavLink to="/why-nova/different" className="text-sm hover:text-primary" onClick={() => setIsOpen(false)}>How We Are Different</NavLink>
                    <NavLink to="/why-nova/methodology" className="text-sm hover:text-primary" onClick={() => setIsOpen(false)}>Teaching Methodology</NavLink>
                    <NavLink to="/why-nova/tutors" className="text-sm hover:text-primary" onClick={() => setIsOpen(false)}>Our Tutors</NavLink>
                    <NavLink to="/why-nova/testimonials" className="text-sm hover:text-primary" onClick={() => setIsOpen(false)}>Testimonials & Success</NavLink>
                  </div>
                </div>
                <NavLink to="/blogs" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                  Blogs
                </NavLink>
                <NavLink to="/contact" className="text-lg font-medium hover:text-primary" onClick={() => setIsOpen(false)}>
                  Contact Us
                </NavLink>
                {user ? (
                  <>
                    <Button
                      onClick={() => { navigate(user.role === 'admin' ? '/admin-dashboard' : '/student-dashboard'); setIsOpen(false); }}
                      className="bg-primary text-white mt-2"
                    >
                      <LayoutDashboard className="w-4 h-4 mr-1.5" /> Dashboard
                    </Button>
                    <Button onClick={() => { handleLogout(); setIsOpen(false); }} variant="outline" className="mt-2 text-destructive border-destructive">
                      <LogOut className="w-4 h-4 mr-1.5" /> Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => { setIsLoginOpen(true); setIsOpen(false); }}
                    variant="outline"
                    className="border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold mt-2"
                  >
                    <LogIn className="w-4 h-4 mr-1.5" /> Login
                  </Button>
                )}
                <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground mt-2">
                  <a href="https://wa.me/917348956284" target="_blank" rel="noopener noreferrer">
                    Book Free Demo
                  </a>
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
    </>
  );
};

export default Header;
