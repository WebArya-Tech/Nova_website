import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, CheckCircle2, Target, TrendingUp, Users, Award, Sparkles, GraduationCap, BookMarked, Brain, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "react-router-dom";
import ScheduleFreeDemoModal from "@/components/ScheduleFreeDemoModal";
import { getSubjectContent } from "@/data/subjectContent";

const GenericSubject = () => {
  const { board, subject, gradeGroup, grade } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    window.scrollTo(0, 0);
  }, []);

  const boardLabels: Record<string, string> = {
    cbse: "CBSE", icse: "ICSE / ISC", "state-board": "State Board",
  };
  const boardName = boardLabels[board ?? ""] ?? board?.toUpperCase() ?? "BOARD";
  const subjectName = subject
    ?.split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ") ?? "";
  const gradeLabel = grade
    ?.split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ") ?? "";

  // Get detailed content from data file
  const contentData = getSubjectContent(board ?? "", grade ?? "", subject ?? "");

  const topics = contentData?.keyLearningAreas ?? [
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
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <section className="relative py-8 lg:py-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src={contentData?.heroImage ?? "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=1600&h=900&fit=crop"}
            alt={`${subjectName} - ${boardName}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary-dark/75 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
            <div 
              className={`inline-flex items-center gap-2 bg-accent/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6 transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <GraduationCap className="w-5 h-5 text-accent" />
              <span className="text-sm font-semibold text-white">{boardName} · {gradeLabel}</span>
            </div>

            <h1
              className={`text-3xl lg:text-7xl font-semibold text-white mb-6 leading-tight transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "100ms" }}
            >
              {subjectName}
            </h1>

            <p
              className={`text-xl lg:text-2xl text-white/90 max-w-7xl mx-auto leading-relaxed transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              {contentData?.overview ?? `Expert online tuition for ${boardName} ${subjectName} with experienced teachers`}
            </p>

            <div
              className={`mt-8 flex flex-wrap gap-4 justify-center transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <Button onClick={() => setIsDemoModalOpen(true)} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300">
                <Sparkles className="w-5 h-5 mr-2" />
                Book Free Demo Class
              </Button>
              <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white hover:bg-white/20 shadow-xl">
                <a href="tel:+917348956284">
                  Call: +91-734 895 6284
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Learning Areas */}
      <section className="py-8 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div 
              className={`text-center mb-12 transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Key <span className="text-primary">Learning Areas</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive coverage of all important topics and concepts
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topics.map((topic, index) => (
                <div
                  key={index}
                  className={`group relative transform transition-all duration-1000 hover:-translate-y-2 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${500 + index * 50}ms` }}
                >
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                        </div>
                        <p className="font-medium text-foreground leading-relaxed pt-1">{topic}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      {contentData?.methodology && contentData.methodology.length > 0 && (
        <section className="py-8 lg:py-8 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Our Teaching <span className="text-primary">Methodology</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Proven teaching strategies for effective learning
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {contentData.methodology.map((method, index) => (
                  <div
                    key={index}
                    className={`group relative transform transition-all duration-1000 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <Card className="relative border-0 shadow-xl hover:shadow-2xl transition-all duration-300 h-full overflow-hidden">
                      <CardContent className="p-8">
                        <div className="flex items-start gap-4 mb-4">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                            <Brain className="w-6 h-6 text-primary" />
                          </div>
                          <h3 className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">{method.title}</h3>
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-justify">{method.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Why Choose Nova */}
      <section className="py-8 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                Why Choose <span className="text-primary">Nova Tuitions?</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Excellence in education with personalized attention
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(contentData?.whyChoose ?? [
                "Expert teachers with 10-25 years of experience",
                "Small batches of 4-6 students for personalized attention",
                "Live interactive online classes with recorded sessions",
                "Comprehensive study materials and notes",
                "Regular assessments and performance tracking",
                "Parent-teacher updates and progress reports"
              ]).map((reason, index) => (
                <div
                  key={index}
                  className={`group relative transform transition-all duration-1000 hover:-translate-y-2 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <Card className="relative border-0 shadow-lg hover:shadow-2xl transition-all duration-300 h-full overflow-hidden bg-gradient-to-br from-card to-secondary/30">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                          <Award className="w-5 h-5 text-primary" />
                        </div>
                        <p className="font-medium text-foreground leading-relaxed pt-1">{reason}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      {contentData?.learningOutcomes && contentData.learningOutcomes.length > 0 && (
        <section className="py-8 lg:py-8 bg-gradient-to-b from-secondary/20 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
                  Learning <span className="text-primary">Outcomes</span>
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  What students will achieve by the end of the program
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {contentData.learningOutcomes.map((outcome, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-6 rounded-2xl bg-gradient-to-br from-card to-secondary/30 shadow-lg hover:shadow-xl transition-all duration-300 transform ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${index * 50}ms` }}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/10 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="font-medium text-foreground leading-relaxed">{outcome}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-8 lg:py-8 bg-gradient-to-r from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className={`transform transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Ready to Excel in <span className="text-primary">{subjectName}?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Book a free demo class and experience our expert teaching methodology
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center mb-8">
                <Button onClick={() => setIsDemoModalOpen(true)} size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-xl hover:shadow-2xl transition-all duration-300 text-lg px-8 py-6">
                  <Sparkles className="w-5 h-5 mr-2" />
                  Book Free Demo Class
                </Button>
                <Button asChild size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white shadow-lg text-lg px-8 py-6">
                  <a href="tel:+917348956284">
                    Call: +91-734 895 6284
                  </a>
                </Button>
              </div>

              <div className="inline-flex items-center gap-2 bg-primary/10 px-6 py-3 rounded-full">
                <Users className="w-5 h-5 text-primary" />
                <span className="font-semibold text-foreground">Join thousands of successful students</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScheduleFreeDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
};

export default GenericSubject;
