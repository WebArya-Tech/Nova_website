import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Methodology = () => {
  const learningSteps = [
    {
      title: "Diagnostic Assessment & Batch Allocation",
      description: "Initial evaluation to understand each student's level and place them in optimal 4–6 member batches"
    },
    {
      title: "Concept-Based Teaching",
      description: "Every chapter taught from basics to advanced using real-life examples, diagrams, and board-specific explanations"
    },
    {
      title: "Interactive Live Classes",
      description: "Engaging discussion-based sessions where students actively participate and solve questions live"
    },
    {
      title: "Notes, Summaries & Learning Material",
      description: "Chapter-wise notes, formula sheets, concept summaries, and previous year questions"
    },
    {
      title: "Practice-Driven Learning",
      description: "Worksheets, assignments, and detailed feedback on solutions for continuous improvement"
    },
    {
      title: "Regular Tests & Performance Tracking",
      description: "Weekly tests, monthly assessments, and pre-board exams with detailed analysis"
    },
    {
      title: "Personalized Doubt-Solving",
      description: "Dedicated time for clearing doubts, revisiting weak topics, and one-on-one guidance"
    },
    {
      title: "Revision & Exam Preparation",
      description: "Intensive revision, previous board questions, mock tests, and exam strategy sessions"
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
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Teaching Methodology</h1>
            <p className="text-xl opacity-95">
              Strong concepts + consistent practice + personalized feedback = guaranteed academic success
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-8">
              Over 25 years, we have developed a proven and structured learning framework that helps students understand deeply, retain confidently, and perform exceptionally in exams.
            </p>
            <p className="text-xl font-medium text-foreground">
              Our approach eliminates fear, builds discipline, and makes learning meaningful and enjoyable.
            </p>
          </div>
        </div>
      </section>

      {/* Learning Process */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Our Step-by-Step Learning Process</h2>
            <div className="space-y-6">
              {learningSteps.map((step, index) => (
                <Card key={index} className="border-2 hover:border-primary hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold text-xl">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                        <p className="text-muted-foreground">{step.description}</p>
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
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">Teaching Philosophy at Nova</h2>
            <div className="bg-primary text-primary-foreground rounded-lg p-8 mb-12">
              <p className="text-2xl font-bold">
                Concept → Practice → Revision → Test → Feedback → Mastery
              </p>
              <p className="mt-4 text-lg opacity-90">
                This cycle guarantees measurable improvement and academic success
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Learning Outcomes Expected from Nova Students</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {outcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-secondary/30">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="font-medium">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">The Nova Commitment</h2>
            <p className="text-xl mb-4 opacity-95">
              We do not aim for average improvement — we aim for transformation.
            </p>
            <p className="text-lg mb-8 opacity-90">
              Every child receives attention, support, and guidance to achieve their highest potential.
            </p>
            <Button asChild size="lg" variant="secondary">
              <a href="https://wa.me/918197466607?text=I%20would%20like%20to%20book%20a%20free%20demo%20class" target="_blank" rel="noopener noreferrer">
                Experience Our Methodology Firsthand
              </a>
            </Button>
            <div className="mt-6 flex flex-col sm:flex-row gap-2 justify-center text-sm">
              <a href="tel:+918197466607" className="hover:text-accent transition-colors font-medium">
                Call/WhatsApp: +91 81974 66607
              </a>
              <span className="hidden sm:inline">/</span>
              <a href="tel:+917795010900" className="hover:text-accent transition-colors font-medium">
                +91 7795 010 900
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Methodology;
