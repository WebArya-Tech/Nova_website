import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Search, Brain, Monitor, BookOpen, PenTool, ClipboardCheck, MessageCircle, Target, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, whatsappMessages } from "@/utils/whatsapp";

const Methodology = () => {
  const learningSteps = [
    {
      icon: Search,
      title: "Diagnostic Assessment & Batch Allocation",
      description: "Initial evaluation to understand each student's level and place them in optimal 4–6 member batches",
      highlights: ["Identify strengths & gaps", "Personalized batch placement", "Targeted learning path"]
    },
    {
      icon: Brain,
      title: "Concept-Based Teaching",
      description: "Every chapter taught from basics to advanced using real-life examples, diagrams, and board-specific explanations",
      highlights: ["Fundamentals first", "Real-life applications", "Board-specific approach"]
    },
    {
      icon: Monitor,
      title: "Interactive Live Classes",
      description: "Engaging discussion-based sessions where students actively participate and solve questions live",
      highlights: ["Two-way interaction", "Live problem-solving", "Instant doubt clarification"]
    },
    {
      icon: BookOpen,
      title: "Notes, Summaries & Learning Material",
      description: "Chapter-wise notes, formula sheets, concept summaries, and previous year questions",
      highlights: ["Comprehensive notes", "Formula sheets", "PYQ practice"]
    },
    {
      icon: PenTool,
      title: "Practice-Driven Learning",
      description: "Worksheets, assignments, and detailed feedback on solutions for continuous improvement",
      highlights: ["Daily practice sets", "Detailed corrections", "Progress tracking"]
    },
    {
      icon: ClipboardCheck,
      title: "Regular Tests & Performance Tracking",
      description: "Weekly tests, monthly assessments, and pre-board exams with detailed analysis",
      highlights: ["Weekly assessments", "Performance analytics", "Pre-board preparation"]
    },
    {
      icon: MessageCircle,
      title: "Personalized Doubt-Solving",
      description: "Dedicated time for clearing doubts, revisiting weak topics, and one-on-one guidance",
      highlights: ["One-on-one sessions", "Weak area focus", "Unlimited doubt support"]
    },
    {
      icon: Target,
      title: "Revision & Exam Preparation",
      description: "Intensive revision, previous board questions, mock tests, and exam strategy sessions",
      highlights: ["Mock test series", "Exam strategy", "Confidence building"]
    }
  ];

  const outcomes = [
    "Strong fundamentals",
    "Higher accuracy and confidence",
    "Better writing and presentation skills",
    "Improved time management",
    "Consistent score improvement",
    "Reduced stress and increased motivation"
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground py-8 lg:py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1200" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Teaching <span className="text-accent">Methodology</span>
            </h1>
            <p className="text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto">
              Strong concepts + consistent practice + personalized feedback = guaranteed academic success
            </p>

          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 lg:py-8 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Our Approach</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">A Framework Built Over 25 Years</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Over 25 years, we have developed a proven and structured learning framework that helps students understand deeply, retain confidently, and perform exceptionally in exams.
              </p>
              <p className="text-xl font-medium text-foreground leading-relaxed">
                Our approach eliminates fear, builds discipline, and makes learning meaningful and enjoyable.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop" 
                alt="Teaching methodology" 
                className="rounded-2xl shadow-2xl w-full object-cover h-[350px]"
              />
              <div className="absolute -bottom-5 -right-5 bg-background rounded-2xl shadow-xl p-5 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-lg">8</div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Step</p>
                    <p className="text-muted-foreground text-xs">Learning Process</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Process */}
      <section className="py-8 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Step by Step</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Step-by-Step Learning Process</h2>
              <p className="text-lg text-muted-foreground mt-3">A structured journey from fundamentals to exam mastery</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningSteps.map((step, index) => (
                <Card key={index} className="group border-2 hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-primary to-primary-light"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary-light text-primary-foreground flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                          <step.icon className="w-7 h-7" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold shadow-md">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">{step.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-3">{step.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {step.highlights.map((h, i) => (
                            <span key={i} className="inline-flex items-center gap-1 text-xs font-medium bg-primary/5 text-primary px-2.5 py-1 rounded-full border border-primary/10">
                              <ArrowRight className="w-3 h-3" />
                              {h}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-8 lg:py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Our Philosophy</span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-8">Teaching Philosophy at Nova</h2>
            <div className="bg-gradient-to-br from-primary to-primary-light text-primary-foreground rounded-2xl p-8 lg:p-12 mb-8 shadow-2xl">
              <p className="text-2xl lg:text-3xl font-bold leading-relaxed">
                Concept → Practice → Revision → Test → Feedback → Mastery
              </p>
              <p className="mt-4 text-lg opacity-90">
                This cycle guarantees measurable improvement and academic success
              </p>
            </div>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Every student progresses through this cycle repeatedly, each time building deeper understanding and stronger performance.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Methodology Section */}
      <section className="py-8 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
              <div>
                <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800" alt="Concept Teaching" className="rounded-2xl shadow-2xl w-full" />
              </div>
              <div>
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">Concept First</span>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">Concept-First Approach</h3>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  We don't believe in rote memorization. Every topic is explained from the fundamentals, with real-life examples and practical applications.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Students learn to think critically and solve problems independently, not just repeat answers.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">Practice</span>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">Practice Makes Perfect</h3>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  Regular tests, assignments, and practice sessions ensure concepts are reinforced and retained.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Detailed feedback helps students understand their mistakes and improve continuously.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800" alt="Practice Learning" className="rounded-2xl shadow-2xl w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-8 lg:py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Student Outcomes</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Learning Outcomes Expected from Nova Students</h2>
              <p className="text-lg text-muted-foreground mt-3">What every student achieves through our methodology</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 p-5 rounded-xl bg-background border border-border hover:border-primary/30 transition-colors shadow-sm hover:shadow-md">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                  </div>
                  <p className="font-medium text-foreground">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Methodology;
