import { NavLink } from "./NavLink";
import { Facebook, Instagram, Twitter, Linkedin, Youtube, Phone, Mail, MapPin } from "lucide-react";
import logoImage from "@/assets/nova-logo.jpg";
import whstsapp from "@/assets/whatsapp.png";
import { getWhatsAppLink, whatsappMessages } from "@/utils/whatsapp";


const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-8 sm:pt-12 pb-4 sm:pb-6">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* About Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <img src={logoImage} alt="Nova Tuitions" className="h-12 sm:h-16 w-auto mb-3 sm:mb-4 object-contain" />
            <p className="text-xs sm:text-sm opacity-90 mb-3 sm:mb-4 leading-relaxed">
              H1402, Borewell Rd, opposite to Top In Town Super Market, Nallurhalli, Whitefield, Bengaluru, Karnataka 560066
            </p>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <a href="https://www.facebook.com/NOVAtuitions" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" title="Facebook">
                <Facebook className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </a>
              <a href="https://www.instagram.com/novatuitions?igsh=OHZvbmNuaDZyM3h5" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" title="Instagram">
                <Instagram className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </a>
              <a href="https://x.com/novatuitions" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" title="Twitter">
                <Twitter className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </a>
              <a href="https://www.linkedin.com/in/nova-tuitions-b250913a3" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" title="LinkedIn">
                <Linkedin className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </a>
              <a href="https://www.youtube.com/@NovaTuitions" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" title="YouTube">
                <Youtube className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </a>
              <a href={getWhatsAppLink(whatsappMessages.GENERAL)} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors" title="WhatsApp">
                <img src={whstsapp} alt="WhatsApp" className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-sm sm:text-lg mb-3 sm:mb-4">Quick Links</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <NavLink to="/why-nova/testimonials" className="opacity-90 hover:text-accent hover:opacity-100 transition-all block py-0.5">
                  Testimonials & Success Stories
                </NavLink>
              </li>
              <li>
                <NavLink to="/why-nova/tutors" className="opacity-90 hover:text-accent hover:opacity-100 transition-all block py-0.5">
                  Our Tutors
                </NavLink>
              </li>
              <li>
                <NavLink to="/why-nova/online-classes" className="opacity-90 hover:text-accent hover:opacity-100 transition-all block py-0.5">
                  Online Classes
                </NavLink>
              </li>
              <li>
                <NavLink to="/about/history" className="opacity-90 hover:text-accent hover:opacity-100 transition-all block py-0.5">
                  Brief History
                </NavLink>
              </li>
              <li>
                <NavLink to="/about/vision" className="opacity-90 hover:text-accent hover:opacity-100 transition-all block py-0.5">
                  Vision & Mission
                </NavLink>
              </li>
              <li>
                <NavLink to="/about/message" className="opacity-90 hover:text-accent hover:opacity-100 transition-all block py-0.5">
                  Message from Rohit Sir
                </NavLink>
              </li>
              <li>
                <NavLink to="/about/photos" className="opacity-90 hover:text-accent hover:opacity-100 transition-all block py-0.5">
                  Photo Gallery
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="font-semibold text-sm sm:text-lg mb-3 sm:mb-4">Policies</h3>
            <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
              <li>
                <NavLink to="/policies/refund" className="opacity-90 hover:text-accent hover:opacity-100 transition-all block py-0.5">
                  Refund Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/policies/user-agreement" className="opacity-90 hover:text-accent hover:opacity-100 transition-all block py-0.5">
                  User Agreement
                </NavLink>
              </li>
              <li>
                <NavLink to="/policies/certificate" className="opacity-90 hover:text-accent hover:opacity-100 transition-all block py-0.5">
                  Certificate
                </NavLink>
              </li>
              <li>
                <NavLink to="/policies/privacy" className="opacity-90 hover:text-accent hover:opacity-100 transition-all block py-0.5">
                  Privacy Policy
                </NavLink>
              </li>
              <li>
                <NavLink to="/policies/terms" className="opacity-90 hover:text-accent hover:opacity-100 transition-all block py-0.5">
                  Terms of Use
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-sm sm:text-lg mb-3 sm:mb-4">Contact Us</h3>
            <ul className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
              <li className="flex items-start gap-1.5 sm:gap-2">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mt-0.5 flex-shrink-0" />
                <span className="opacity-90">Bangalore, India</span>
              </li>
              <li className="flex items-center gap-1.5 sm:gap-2">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <a href="tel:+917348956284" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  +91-734 895 6284
                </a>
              </li>
              <li className="flex items-center gap-1.5 sm:gap-2">
                <img src={whstsapp} alt="WhatsApp" className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <a href={getWhatsAppLink(whatsappMessages.GENERAL)} target="_blank" rel="noopener noreferrer" className="opacity-90 hover:text-accent hover:opacity-100 transition-all">
                  +91-974 071 2301
                </a>
              </li>
              <li className="flex items-center gap-1.5 sm:gap-2">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                <a href="mailto:novatuitions@ixpoe.com" className="opacity-90 hover:text-accent hover:opacity-100 transition-all break-all text-xs sm:text-sm">
                  novatuitions@ixpoe.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-4 sm:pt-6 flex flex-col items-center gap-1.5 sm:gap-2 text-xs sm:text-sm opacity-80">
          <p>&copy; {new Date().getFullYear()} Nova Tuitions. All rights reserved.</p>
          <div className="text-[10px] sm:text-xs text-gray-300 flex flex-wrap justify-center items-center gap-1.5 sm:gap-2">
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
