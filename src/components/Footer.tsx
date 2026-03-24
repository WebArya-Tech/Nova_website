import { NavLink } from "./NavLink";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Phone, Mail, MessageCircle, MapPin } from "lucide-react";
import logoImage from "@/assets/nova-logo.jpg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <img src={logoImage} alt="Nova Tuitions" className="h-16 w-auto mb-4 object-contain" />
            <p className="text-sm opacity-90 mb-4">
              SY no 164, ground floor, Harohalli Village, Anagondanahalli, Hobli, Hoskote TQ, Bangalore: 560087
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.facebook.com/NOVAtuitions" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="https://wa.me/917348956284" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/why-nova/testimonials" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  Testimonials & Success Stories
                </NavLink>
              </li>
              <li>
                <NavLink to="/why-nova/tutors" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  Our Tutors
                </NavLink>
              </li>
              <li>
                <NavLink to="/why-nova/online-classes" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  Online Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/about/history" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  Brief History
                </NavLink>
              </li>
              <li>
                <NavLink to="/about/vision" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  Vision & Mission
                </NavLink>
              </li>
              <li>
                <NavLink to="/about/message" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  Message from Rohit Sir
                </NavLink>
              </li>
              <li>
                <NavLink to="/about/photos" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  Photo Gallery
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Policies</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <NavLink to="/policies/refund" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  Refund Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/policies/user-agreement" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  User Agreement
                </NavLink>
              </li>
              <li>
                <NavLink to="/policies/certificate" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  Certificate
                </NavLink>
              </li>
              <li>
                <NavLink to="/policies/privacy" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/policies/terms" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  Terms of Use
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">Bangalore, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+917348956284" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                    +91 7348956284
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 flex-shrink-0" />
                <a href="https://wa.me/917348956284" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  WhatsApp: +91 7348956284
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 flex-shrink-0" />
                <a href="mailto:novatuitions@ixpoe.com" className="opacity-90 hover:text-accent hover:opacity-100 transition-all break-all">
                  novatuitions@ixpoe.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 flex flex-col items-center gap-2 text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Nova Tuitions. All rights reserved.</p>
          <div className="text-xs text-gray-300 flex flex-wrap justify-center items-center gap-2">
            <span>Developed by</span>
            <a
              href="https://webarya.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold hover:text-[#ddaa2c] transition"
              style={{ color: '#ddaa2c' }}
            >
              WebArya
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
