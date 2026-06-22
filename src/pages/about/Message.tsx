import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Quote, Heart, Target, Lightbulb, Users, CheckCircle2 } from "lucide-react";
import RohitGupta from "@/assets/Teacher/RohitGupta.jpg";
import ScheduleFreeDemoModal from "@/components/ScheduleFreeDemoModal";

const Message = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: Target,
      title: "Deep Subject Understanding",
      desc: "Foundational mastery of every topic"
    },
    {
      icon: Users,
      title: "Small, Focused Batches",
      desc: "Personalized attention for each student"
    },
    {
      icon: Lightbulb,
      title: "Structured Learning",
      desc: "Systematic approach with regular assessments"
    },
    {
      icon: Heart,
      title: "Personalized Mentorship",
      desc: "Individual guidance and support"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <section className="relative py-8 lg:py-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?w=1600&h=900&fit=crop"
            alt="Message from Rohit Sir"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary-dark/60 to-black/55"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto text-center">
            <div
              className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border-0 transform transition-all duration-1000 ${
                isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
              }`}
            >
              <Quote className="w-4 h-4 text-white" />
              <span className="text-sm font-semibold text-white">Founder's Perspective</span>
            </div>

            <h1
               className={`text-3xl lg:text-5xl font-bold text-white mb-6 leading-tight transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Message from <span className="text-accent font-bold">Rohit Sir</span>
            </h1>

            <p
              className={`text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Founder, Nova Tuitions
            </p>
          </div>
        </div>
      </section>

      {/* Message Section */}
      <section className="py-8 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Founder Card */}
            <div
              className={`group relative transform transition-all duration-1000 mb-8 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <Card className="border-0 shadow-xl relative overflow-hidden transition-all duration-300">
                <CardContent className="p-0">
                  {/* Image + Adjacent Content Row */}
                  <div className="flex flex-col lg:flex-row">
                    <div className="lg:w-72 shrink-0 bg-gradient-to-br from-primary/20 to-purple-600/20 relative overflow-hidden group flex items-center justify-center p-8 lg:p-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-600 rounded-2xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                        <img
                          src={RohitGupta}
                          alt="Rohit Gupta"
                          className="w-48 h-48 lg:w-64 lg:h-96 rounded-2xl object-cover relative z-10 shadow-2xl group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </div>

                    <div className="flex-1 p-8 lg:p-12 flex flex-col justify-center">
                      <div className="mb-6">
                        <Quote className="w-10 h-10 text-primary opacity-60" />
                      </div>
                      <p className="font-bold text-2xl text-foreground mb-4">Dear Students and Parents,</p>
                      <p className="text-lg text-muted-foreground leading-relaxed">
                        It gives me immense pride and joy to welcome you to Nova Tuitions. When we founded Nova more than <span className="font-semibold text-primary">25 years ago</span>, our vision was simple yet powerful — to create a learning environment where every student receives personal attention, builds strong conceptual clarity, and gains the confidence to excel academically and in life.
                      </p>
                    </div>
                  </div>

                  {/* Remaining Content Below */}
                  <div className="px-8 lg:px-12 pb-8 lg:pb-12 space-y-6 text-lg text-muted-foreground leading-relaxed">
                    <p>
                      Over the years, this vision has grown into a <span className="font-semibold text-foreground">trusted educational platform</span> supported by a team of highly experienced teachers and mentors who are passionate about student success.
                    </p>

                    <div className="bg-gradient-to-br from-primary/5 to-purple-600/5 border border-primary/10 rounded-xl p-6">
                      <p className="font-bold text-foreground mb-4">At Nova, we believe that education is not just about marks, but about:</p>
                      <ul className="space-y-3">
                        {values.map((value, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <div>
                              <span className="font-semibold text-foreground">{value.title}</span>
                              <p className="text-sm text-muted-foreground">{value.desc}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p>
                      Today, Nova Tuitions proudly supports students from <span className="font-semibold text-foreground">CBSE, ICSE, ISC, and State Boards</span> across India and abroad, helping them prepare not just for exams but for future opportunities — including college admissions, subject selection, international pathways, and project support.
                    </p>

                    <p>
                      To all parents who trust us and all students who learn with us, <span className="font-semibold text-primary">thank you</span> for making Nova Tuitions what it is today. We remain committed to evolving continuously, maintaining the highest standards of academic excellence, and guiding every student towards success.
                    </p>

                    {/* Signature */}
                    <div className="pt-6 border-t border-primary/10">
                      <p className="font-medium text-foreground mb-2">With warm regards and best wishes,</p>
                      <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-600">
                        Rohit Gupta
                      </p>
                      <p className="text-sm text-muted-foreground font-semibold">Founder, Nova Tuitions</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA Section */}
            <div
              className={`group relative transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="bg-gradient-to-r from-primary/10 via-background to-primary/10 border-0 shadow-lg rounded-2xl p-8 lg:p-12 text-center transition-all duration-300 group-hover:shadow-xl">
                <h3 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  Ready to Experience the Nova Difference?
                </h3>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of students who are transforming their academic journey with personalized, expert-led instruction.
                </p>
                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl"
                >
                  Book a Free Demo Class
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ScheduleFreeDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
};

export default Message;
