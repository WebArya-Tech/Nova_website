import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Video, Users, FileText, Clock, MessageSquare, BarChart, FileCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const OnlineClasses = () => {
  const features = [
    {
      icon: Video,
      title: "Live Interactive Sessions",
      description: "Real-time explanation, discussion, and doubt-solving just like a physical classroom, but more focused"
    },
    {
      icon: Users,
      title: "Small Batch Size",
      description: "Only 4–6 students per batch ensuring personalized attention and tailored guidance"
    },
    {
      icon: FileText,
      title: "Advanced Digital Tools",
      description: "Interactive whiteboards, digital notes, visual animations, and practical examples"
    },
    {
      icon: Clock,
      title: "Class Recordings",
      description: "All sessions recorded and shared for unlimited revision, especially before exams"
    },
    {
      icon: MessageSquare,
      title: "Doubt-Solving Support",
      description: "Separate doubt-clearing sessions and one-on-one mentoring"
    },
    {
      icon: BarChart,
      title: "Regular Assessments",
      description: "Weekly and monthly tests track progress and strengthen exam preparation"
    },
    {
      icon: FileCheck,
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
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Why NOVA – Online Classes</h1>
            <p className="text-xl mb-4 opacity-95">
              High-Quality Online Learning Designed for Excellence
            </p>
            <p className="text-lg opacity-90">
              With 25+ years of teaching experience, we have refined a digital learning environment that combines expert teaching, advanced technology, and personalized attention
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">How Our Online Classes Stand Apart</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-2 hover:border-primary transition-all">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">
              Why Online Classes at Nova Work Better
            </h2>
            <Card className="overflow-hidden border-2">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-primary text-primary-foreground">
                      <tr>
                        <th className="p-4 text-left font-semibold">Feature</th>
                        <th className="p-4 text-left font-semibold">Online at Nova</th>
                        <th className="p-4 text-left font-semibold">Traditional Offline</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisons.map((row, index) => (
                        <tr key={index} className={index % 2 === 0 ? "bg-secondary/20" : "bg-background"}>
                          <td className="p-4 font-medium">{row.feature}</td>
                          <td className="p-4">
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                              <span>{row.nova}</span>
                            </div>
                          </td>
                          <td className="p-4 text-muted-foreground">{row.traditional}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">Perfect for Today's Students</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Students today need flexibility, clarity, and personal mentoring. Nova's online platform delivers a learning experience that is:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="p-4 bg-background rounded-lg">
                <p className="font-semibold">Focused & Distraction-free</p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <p className="font-semibold">Highly Interactive</p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <p className="font-semibold">Efficient & Time-saving</p>
              </div>
              <div className="p-4 bg-background rounded-lg">
                <p className="font-semibold">Student-centric</p>
              </div>
            </div>
            <p className="text-xl font-medium text-foreground mb-8">
              We ensure that students don't just memorize — they understand, apply, and excel.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
              <a href="https://wa.me/918197466607?text=I%20would%20like%20to%20experience%20a%20demo%20class" target="_blank" rel="noopener noreferrer">
                Book a Free Demo Class Now
              </a>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OnlineClasses;
