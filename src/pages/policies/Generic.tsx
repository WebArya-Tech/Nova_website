import { Card, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { useParams } from "react-router-dom";

const GenericPolicy = () => {
  const { policy } = useParams();
  
  const policyTitles: { [key: string]: string } = {
    "refund": "Refund Policy",
    "user-agreement": "User Agreement",
    "certificate": "Certificate",
    "privacy": "Privacy Policy",
    "terms": "Terms of Use"
  };

  const policyTitle = policyTitles[policy || ""] || "Policy";

  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">{policyTitle}</h1>
            <p className="text-muted-foreground">Last updated: March 2024</p>
          </div>

          <Card className="border-2">
            <CardContent className="p-8 prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                Nova Tuitions is committed to maintaining transparency and trust with our students and parents. This {policyTitle.toLowerCase()} outlines our commitments and your rights.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Overview</h2>
              <p className="text-muted-foreground mb-6">
                This document is currently being prepared and will be published shortly. For immediate questions regarding our {policyTitle.toLowerCase()}, please contact us directly.
              </p>

              <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                For any queries or clarifications regarding our {policyTitle.toLowerCase()}, please reach out to us:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Email: <a href="mailto:novatuitions@ixpoe.com" className="text-primary hover:underline">novatuitions@ixpoe.com</a></li>
                <li>Phone: <a href="tel:+918197466607" className="text-primary hover:underline">+91 81974 66607</a> / <a href="tel:+917795010900" className="text-primary hover:underline">+91 7795 010 900</a></li>
                <li>WhatsApp: <a href="https://wa.me/918197466607" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+91 81974 66607</a></li>
              </ul>

              <div className="mt-8 p-6 bg-secondary/30 rounded-lg">
                <p className="font-medium text-foreground">
                  We are happy to discuss any aspect of our {policyTitle.toLowerCase()} and address your concerns personally.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center mt-12">
            <a
              href="/contact"
              className="inline-block bg-primary hover:bg-primary-light text-primary-foreground px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Contact Us for More Information
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GenericPolicy;
