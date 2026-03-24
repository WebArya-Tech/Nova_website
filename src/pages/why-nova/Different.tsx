import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, Brain, BookOpen, MessageCircle, LineChart, Laptop, TrendingUp, Award, Target } from "lucide-react";

const Different = () => {
  const differentiators = [
    {
      icon: Users,
      title: "Small Batches for Individual Attention",
      description: "Only 4–6 students per batch, unlike typical coaching centers with 20–50 students"
    },
    {
      icon: GraduationCap,
      title: "Highly Experienced Teachers",
      description: "10–25 years of teaching experience, not college students or part-time teachers"
    },
    {
      icon: Brain,
      title: "Conceptual Teaching, Not Rote Learning",
      description: "Focus on clarity of fundamentals, logical reasoning, and application-based understanding"
    },
    {
      icon: BookOpen,
      title: "Structured Learning System",
      description: "Disciplined study plan with chapter-wise teaching, tests, analysis, and revision cycles"
    },
    {
      icon: MessageCircle,
      title: "Doubt-Solving & Mentorship",
      description: "Special doubt classes and guided mentoring to strengthen weak areas"
    },
    {
      icon: LineChart,
      title: "Real-Time Tracking",
      description: "Parents receive periodic reports on performance, attendance, and improvement areas"
    },
    {
      icon: Laptop,
      title: "Advanced Teaching Tools",
      description: "Digital whiteboards, visual explanations, and smart learning materials"
    },
    {
      icon: TrendingUp,
      title: "Focus on Results & Future",
      description: "Support beyond exams including college counseling and career guidance"
    },
    {
      icon: Award,
      title: "Flexible Online Learning",
      description: "No travel time, safer environment, learn from anywhere without compromising quality"
    },
    {
      icon: Target,
      title: "Proven Track Record",
      description: "Thousands of students transformed from average to top scorers"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">How Are We Different?</h1>
            <p className="text-xl opacity-95">
              At Nova Tuitions, we don't just teach — we transform learning
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Our approach is built on deep expertise, personalized attention, and proven academic success developed over 25+ years of working with CBSE, ICSE, ISC, and State Board students.
            </p>
            <p className="text-lg text-foreground font-medium">
              We understand that every child learns differently. That's why our teaching methods, class structure, and support systems are designed to focus on individual progress, not just generic instruction.
            </p>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">What Makes Nova Stand Out?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {differentiators.map((item, index) => (
                <Card key={index} className="border-2 hover:border-primary hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Process */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">Our Structured Learning System</h2>
            <Card className="border-2">
              <CardContent className="p-8">
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">1</span>
                    <div>
                      <p className="font-semibold">Chapter-wise teaching</p>
                      <p className="text-sm text-muted-foreground">Systematic coverage of entire syllabus</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">2</span>
                    <div>
                      <p className="font-semibold">Notes & summaries</p>
                      <p className="text-sm text-muted-foreground">Comprehensive study material for revision</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">3</span>
                    <div>
                      <p className="font-semibold">Regular tests</p>
                      <p className="text-sm text-muted-foreground">Continuous assessment and evaluation</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">4</span>
                    <div>
                      <p className="font-semibold">Analysis & feedback</p>
                      <p className="text-sm text-muted-foreground">Detailed performance tracking</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">5</span>
                    <div>
                      <p className="font-semibold">Revision cycles</p>
                      <p className="text-sm text-muted-foreground">Multiple rounds of concept reinforcement</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 font-bold">6</span>
                    <div>
                      <p className="font-semibold">Final exam preparation</p>
                      <p className="text-sm text-muted-foreground">Intensive preparation for board exams</p>
                    </div>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">The Nova Promise</h2>
            <p className="text-2xl font-medium text-primary mb-8">
              "Every student matters. Every student grows."
            </p>
            <p className="text-lg text-muted-foreground mb-12">
              We are committed to delivering real improvement, disciplined study habits, and strong foundations that last beyond school.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/918197466607?text=I%20would%20like%20to%20join%20a%20free%20demo%20class"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-md font-semibold transition-colors"
              >
                Join a Free Demo Class
              </a>
              <a href="tel:+918197466607" className="inline-block bg-primary hover:bg-primary-light text-primary-foreground px-8 py-3 rounded-md font-semibold transition-colors">
                Call: +91 81974 66607
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Different;
