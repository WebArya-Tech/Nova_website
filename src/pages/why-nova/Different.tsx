import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, GraduationCap, Brain, BookOpen, MessageCircle, LineChart, Laptop, TrendingUp, Award, Target, ArrowRight, ClipboardList, RefreshCw, CheckCircle2, BarChart, FileText } from "lucide-react";
import ScheduleFreeDemoModal from "@/components/ScheduleFreeDemoModal";

const Different = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
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
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground py-8 lg:py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1200" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
           
            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              How Are We <span className="text-accent">Different?</span>
            </h1>
            <p className="text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto">
              At Nova Tuitions, we don't just teach — we transform learning
            </p>

          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-8 lg:py-8 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Our Philosophy</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Built on Experience, Driven by Results</h2>
              <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                Our approach is built on deep expertise, personalized attention, and proven academic success developed over 25+ years of working with CBSE, ICSE, ISC, and State Board students.
              </p>
              <p className="text-lg text-foreground font-medium leading-relaxed">
                We understand that every child learns differently. That's why our teaching methods, class structure, and support systems are designed to focus on individual progress, not just generic instruction.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                alt="Small batch learning" 
                className="rounded-2xl shadow-2xl w-full object-cover h-[350px]"
              />
              <div className="absolute -bottom-5 -left-5 bg-background rounded-2xl shadow-xl p-5 border border-border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary font-black text-lg">25+</div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Years of</p>
                    <p className="text-muted-foreground text-xs">Educational Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Differentiators */}
      <section className="py-8 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">What Makes Us Unique</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">What Makes Nova Stand Out?</h2>
              <p className="text-lg text-muted-foreground mt-3">10 key reasons why students and parents choose Nova Tuitions</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {differentiators.map((item, index) => (
                <Card key={index} className="group border-2 hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className="h-1 bg-gradient-to-r from-primary to-primary-light"></div>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="relative flex-shrink-0">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shadow-md ring-1 ring-primary/10 group-hover:bg-gradient-to-br group-hover:from-primary group-hover:to-primary-light group-hover:text-primary-foreground transition-all duration-300">
                          <item.icon className="w-7 h-7 text-primary group-hover:text-primary-foreground transition-colors" />
                        </div>
                        <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xs font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
                          {index + 1}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg mb-1.5 group-hover:text-primary transition-colors">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Visual Impact Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center mb-20">
              <div>
                <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800" alt="Small Batch Learning" className="rounded-2xl shadow-2xl w-full" />
              </div>
              <div>
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">Small Batches</span>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">Small Batches, Big Results</h3>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  In our batches of just 4-6 students, every student gets the attention they deserve. Teachers can identify learning gaps, adapt teaching pace, and provide personalized guidance.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  This is not possible in large classrooms where students become just another face in the crowd.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="order-2 lg:order-1">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-4">Expert Faculty</span>
                <h3 className="text-3xl lg:text-4xl font-bold mb-4">Experienced Teachers, Real Impact</h3>
                <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
                  Our faculty brings 10-25 years of teaching experience. They are not college students or part-time instructors — they are career educators who have mastered the art of teaching.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Every lesson is delivered with clarity, depth, and real-world relevance.
                </p>
              </div>
              <div className="order-1 lg:order-2">
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800" alt="Expert Teachers" className="rounded-2xl shadow-2xl w-full" />
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
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Our System</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Structured Learning System</h2>
              <p className="text-lg text-muted-foreground mt-3">A disciplined framework that guarantees measurable improvement</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: BookOpen, num: '01', title: 'Chapter-wise Teaching', desc: 'Systematic coverage of entire syllabus with detailed explanations', color: 'from-blue-500 to-cyan-400' },
                { icon: FileText, num: '02', title: 'Notes & Summaries', desc: 'Comprehensive study material designed for quick revision', color: 'from-violet-500 to-purple-400' },
                { icon: ClipboardList, num: '03', title: 'Regular Tests', desc: 'Continuous assessment to track progress and identify gaps', color: 'from-emerald-500 to-green-400' },
                { icon: BarChart, num: '04', title: 'Analysis & Feedback', desc: 'Detailed performance reports with actionable insights', color: 'from-orange-500 to-amber-400' },
                { icon: RefreshCw, num: '05', title: 'Revision Cycles', desc: 'Multiple rounds of concept reinforcement before exams', color: 'from-pink-500 to-rose-400' },
                { icon: Target, num: '06', title: 'Final Exam Prep', desc: 'Intensive preparation with mock tests and strategy sessions', color: 'from-primary to-primary-light' },
              ].map((item, idx) => (
                <Card key={idx} className="group border-2 hover:border-primary hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                  <div className={`h-1.5 bg-gradient-to-r ${item.color}`}></div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <item.icon className="w-6 h-6" />
                      </div>
                      <span className={`text-3xl font-black bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>{item.num}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-3 bg-primary/5 border border-primary/10 rounded-2xl px-6 py-4">
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Proven cycle repeated throughout the academic year</span>
                </div>
                <ArrowRight className="w-5 h-5 text-primary hidden sm:block" />
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Guaranteed score improvement</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promise Section */}
      <section className="py-8 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Our Commitment</span>
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">The Nova Promise</h2>
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-2xl p-8 border border-primary/10 mb-8">
              <p className="text-2xl font-medium text-primary">
                "Every student matters. Every student grows."
              </p>
            </div>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              We are committed to delivering real improvement, disciplined study habits, and strong foundations that last beyond school. Our approach doesn't just prepare students for exams — it prepares them for life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
              >
                Join a Free Demo Class
              </button>
              <a href="tel:+919734895684" className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-primary-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl">
                Call: +91-734 895 6284
              </a>
            </div>
          </div>
        </div>
      </section>

  
      <ScheduleFreeDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
};

export default Different;
