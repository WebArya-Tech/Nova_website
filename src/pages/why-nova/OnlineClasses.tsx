import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, ArrowRight, Sparkles, Award, BookOpen, TrendingUp, Target, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppLink, whatsappMessages } from "@/utils/whatsapp";

import liveClassImg from "@/assets/gallery/online-class-1.jpg";
import smallBatchImg from "@/assets/gallery/students-studying.jpg";
import digitalToolsImg from "@/assets/gallery/digital-board.jpg";
import recordingsImg from "@/assets/gallery/teacher-desk.jpg";
import doubtSolvingImg from "@/assets/gallery/student-success.jpg";
import assessmentsImg from "@/assets/gallery/study-materials.jpg";
import parentUpdatesImg from "@/assets/gallery/online-class-1.jpg";

const OnlineClasses = () => {
  const features = [
    {
      image: liveClassImg,
      title: "Live Interactive Sessions",
      description: "Real-time explanation, discussion, and doubt-solving just like a physical classroom, but more focused"
    },
    {
      image: smallBatchImg,
      title: "Small Batch Size",
      description: "Only 4–6 students per batch ensuring personalized attention and tailored guidance"
    },
    {
      image: digitalToolsImg,
      title: "Advanced Digital Tools",
      description: "Interactive whiteboards, digital notes, visual animations, and practical examples"
    },
    {
      image: recordingsImg,
      title: "Class Recordings",
      description: "All sessions recorded and shared for unlimited revision, especially before exams"
    },
    {
      image: doubtSolvingImg,
      title: "Doubt-Solving Support",
      description: "Separate doubt-clearing sessions and one-on-one mentoring"
    },
    {
      image: assessmentsImg,
      title: "Regular Assessments",
      description: "Weekly and monthly tests track progress and strengthen exam preparation"
    },
    {
      image: parentUpdatesImg,
      title: "Parent-Teacher Updates",
      description: "Monthly performance reports and feedback on learning progress"
    }
  ];

  const comparisons = [
    {
      feature: "Batch Size",
      nova: "4-6 students, individual attention",
      traditional: "Crowded classrooms with limited focus"
    },
    {
      feature: "Teacher Access",
      nova: "Top expert teachers from anywhere",
      traditional: "Limited to local tutor availability"
    },
    {
      feature: "Revision",
      nova: "Class recordings for repeated revision",
      traditional: "No access to recorded lessons"
    },
    {
      feature: "Technology",
      nova: "Real-time whiteboard and digital resources",
      traditional: "Traditional blackboard-only learning"
    },
    {
      feature: "Convenience",
      nova: "No travel time, learn from home",
      traditional: "Wasted time commuting"
    },
    {
      feature: "Flexibility",
      nova: "Flexible timings",
      traditional: "Rigid schedules"
    },
    {
      feature: "Transparency",
      nova: "Parent involvement through reports",
      traditional: "Limited transparency"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground py-8 lg:py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1588072432836-e10032774350?w=1200" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">

            <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
              Why NOVA – <span className="text-accent">Online Classes</span>
            </h1>
            <p className="text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto">
              High-Quality Online Learning Designed for Excellence
            </p>

          </div>
        </div>
      </section>



      {/* Intro with Stats */}
      <section className="py-16 lg:py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Why Online?
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground leading-tight">
                The Future of{" "}
                <span className="text-primary">Learning</span> is Online
              </h2>
              <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                <p>
                  Our online platform replicates the best aspects of classroom learning while adding powerful digital advantages. Students get the same expert teachers, same structured curriculum, and even more personalized attention — all from the comfort of their homes.
                </p>
                <p>
                  No commuting, no large classrooms, no distractions. Just focused, high-quality learning that fits your schedule.
                </p>
              </div>

              <div className="flex items-start gap-3 bg-primary/5 rounded-xl p-4 border border-primary/10">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-foreground">25+ Years of Teaching Excellence</p>
                  <p className="text-sm text-muted-foreground">Proven track record of academic success</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                  alt="Online Learning"
                  className="rounded-2xl shadow-2xl w-full object-cover h-[350px] lg:h-[400px]"
                />
                <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-black/10"></div>
              </div>

              <div className="absolute -bottom-5 -right-5 bg-background rounded-2xl shadow-2xl p-5 border z-20">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center text-primary-foreground font-black text-lg shadow-lg">
                    25+
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">Years of</p>
                    <p className="text-muted-foreground text-xs">Teaching Excellence</p>
                  </div>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 bg-background rounded-xl shadow-lg p-3 border z-20">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="text-sm font-semibold text-foreground">Trusted by Parents</span>
                </div>
              </div>

              <div className="absolute -bottom-8 -left-8 w-full h-full bg-primary/5 rounded-2xl -z-10"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-background relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl -z-0"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                Key Features
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-4 mb-3">
                How Our Online Classes{" "}
                <span className="text-primary">Stand Apart</span>
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Every feature designed to maximize your learning outcomes</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="group border hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold text-primary shadow-lg">
                      {index + 1}
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="inline-block bg-background/90 backdrop-blur-sm text-primary text-xs font-semibold px-3 py-1 rounded-full">
                        Feature {index + 1}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-5">
                    <h3 className="font-bold text-lg mb-2 text-foreground group-hover:text-primary transition-colors">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">{feature.description}</p>
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                      <span>Learn more</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
                <TrendingUp className="w-3.5 h-3.5" />
                Nova vs Traditional
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-4 mb-3">
                Why Online Classes at{" "}
                <span className="text-primary">Nova Work Better</span>
              </h2>
              <p className="text-lg text-muted-foreground">See the difference for yourself</p>
            </div>
            <Card className="overflow-hidden border-0 shadow-2xl rounded-2xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-primary text-primary-foreground">
                      <th className="p-4 text-left font-semibold text-sm">Feature</th>
                      <th className="p-4 text-left font-semibold text-sm">Online at Nova</th>
                      <th className="p-4 text-left font-semibold text-sm">Traditional Offline</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((row, index) => (
                      <tr
                        key={index}
                        className={`transition-colors hover:bg-primary/5 ${index % 2 === 0 ? "bg-muted/50" : "bg-background"}`}
                      >
                        <td className="p-4 font-semibold text-foreground">{row.feature}</td>
                        <td className="p-4">
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
                            </div>
                            <span className="text-foreground/80">{row.nova}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-start gap-2">
                            <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <svg className="w-3.5 h-3.5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            </div>
                            <span className="text-muted-foreground">{row.traditional}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Visual Section - Two image-text layouts */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* First row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-24">
              <div className="relative group">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800" alt="Interactive Online Learning" className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-full h-full border-2 border-primary/10 rounded-2xl -z-10"></div>
              </div>
              <div className="space-y-5">
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
                  <Play className="w-3.5 h-3.5" />
                  Interactive
                </span>
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                  Interactive &{" "}
                  <span className="text-primary">Engaging</span>
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  Our online classes aren't passive video lectures. They're dynamic, interactive sessions where students actively participate, ask questions, and engage with concepts in real-time.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  With digital whiteboards, screen sharing, and visual aids, learning becomes more effective than traditional classrooms.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Real-time participation & feedback</span>
                </div>
              </div>
            </div>

            {/* Second row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 space-y-5">
                <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
                  <Target className="w-3.5 h-3.5" />
                  Personalized
                </span>
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                  Personalized Learning{" "}
                  <span className="text-primary">Experience</span>
                </h3>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  With only 4-6 students per batch, teachers can focus on each student's unique learning needs, pace, and challenges.
                </p>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  This personalized attention ensures no student is left behind and every doubt is addressed promptly.
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Individual attention guaranteed</span>
                </div>
              </div>
              <div className="order-1 lg:order-2 relative group">
                <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800" alt="Personalized Learning" className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-tl from-primary/20 to-transparent"></div>
                </div>
                <div className="absolute -bottom-4 -left-4 w-full h-full border-2 border-primary/10 rounded-2xl -z-10"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What Students Get */}
      <section className="py-16 lg:py-24 bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-gradient-to-b from-primary/5 to-transparent rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
                <BookOpen className="w-3.5 h-3.5" />
                What You Get
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-4">
                Complete Learning{" "}
                <span className="text-primary">Ecosystem</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-5 p-6 bg-background rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <Play className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Live Classes</h3>
                  <p className="text-muted-foreground">Real-time teaching with two-way interaction</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-6 bg-background rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Recorded Sessions</h3>
                  <p className="text-muted-foreground">Watch again anytime for revision</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-6 bg-background rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-primary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Study Material</h3>
                  <p className="text-muted-foreground">Notes, summaries, and practice worksheets</p>
                </div>
              </div>
              <div className="flex items-start gap-5 p-6 bg-background rounded-2xl shadow-lg border hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-accent rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 transition-transform">
                  <svg className="w-7 h-7 text-accent-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                </div>
                <div>
                  <h3 className="font-bold text-lg text-foreground mb-1">Performance Tracking</h3>
                  <p className="text-muted-foreground">Regular tests and detailed progress reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-secondary to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-primary/5 to-transparent rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold">
              <Award className="w-3.5 h-3.5" />
              Why Students Love It
            </span>
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
              Perfect for{" "}
              <span className="text-primary">Today's Students</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-3xl mx-auto">
              Students today need flexibility, clarity, and personal mentoring. Nova's online platform delivers a learning experience that is:
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { label: "Focused & Distraction-free", icon: Target },
                { label: "Highly Interactive", icon: Play },
                { label: "Efficient & Time-saving", icon: TrendingUp },
                { label: "Student-centric", icon: Award },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="group p-5 bg-background rounded-2xl hover:shadow-xl transition-all duration-300 border hover:border-primary/30 hover:-translate-y-1 cursor-default"
                >
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center mx-auto mb-3 shadow-lg group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <p className="font-semibold text-sm md:text-base text-foreground">{item.label}</p>
                </div>
              ))}
            </div>


          </div>
        </div>
      </section>


    </div>
  );
};

export default OnlineClasses;
