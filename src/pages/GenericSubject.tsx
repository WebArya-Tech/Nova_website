import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";

const GenericSubject = () => {
  const { board, subject } = useParams();
  
  const boardName = board?.toUpperCase() || "BOARD";
  const subjectName = subject?.charAt(0).toUpperCase() + (subject?.slice(1) || "");

  const topics = [
    "Complete syllabus coverage",
    "Concept-based learning approach",
    "Regular practice and assignments",
    "Chapter-wise tests and assessments",
    "Previous year question practice",
    "Doubt-solving sessions",
    "Exam preparation strategies",
    "Performance tracking and feedback"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              {subjectName} - {boardName}
            </h1>
            <p className="text-xl opacity-95">
              Expert online tuition for {boardName} {subjectName} (Grades 6-12)
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="mb-12 border-2">
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold mb-3">About the Course</h2>
                    <p className="text-muted-foreground">
                      Our {boardName} {subjectName} course is designed to build strong conceptual foundations and help students excel in their board examinations. With experienced teachers, small batch sizes, and personalized attention, we ensure every student masters the subject thoroughly.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">What We Cover</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {topics.map((topic, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <p className="font-medium">{topic}</p>
                  </div>
                ))}
              </div>
            </div>

            <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10 mb-12">
              <CardContent className="p-8">
                <h2 className="text-2xl font-bold mb-4">Why Choose Nova for {subjectName}?</h2>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Expert teachers with 10-25 years of experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Small batches of 4-6 students for personalized attention</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Live interactive online classes with recorded sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Comprehensive study materials and notes</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Regular assessments and performance tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary font-bold">•</span>
                    <span>Parent-teacher updates and progress reports</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Excel in {subjectName}?</h2>
              <p className="text-muted-foreground mb-6">
                Book a free demo class and experience our teaching methodology
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <a href="https://wa.me/918197466607?text=I%20would%20like%20to%20book%20a%20free%20demo%20class%20for%20{subjectName}%20{boardName}" target="_blank" rel="noopener noreferrer">
                  Book Free Demo Class
                </a>
              </Button>
              <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center text-sm">
                <a href="tel:+918197466607" className="text-primary hover:underline font-medium">
                  Call: +91 81974 66607
                </a>
                <span className="hidden sm:inline">/</span>
                <a href="tel:+917795010900" className="text-primary hover:underline font-medium">
                  +91 7795 010 900
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GenericSubject;
