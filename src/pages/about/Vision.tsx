import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Lightbulb, Sparkles, TrendingUp, Users, Award, CheckCircle2 } from "lucide-react";

const AnimatedNumber = ({ value }: { value: string }) => {
  const [display, setDisplay] = useState("");
  const ref = useRef<HTMLSpanElement>(null);
  const [started, setStarted] = useState(false);

  const match = value.match(/([\d.]+)/);
  const num = match ? parseFloat(match[1]) : 0;
  const prefix = value.startsWith("#") ? "#" : "";
  const suffix = value.replace(/[\d.]/g, "").replace("#", "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let start = 0;
    const duration = 1500;
    const step = Math.ceil(num / 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= num) {
        start = num;
        clearInterval(timer);
      }
      setDisplay(prefix + Math.floor(start) + suffix);
    }, 25);
    return () => clearInterval(timer);
  }, [started, num, prefix, suffix]);

  return <span ref={ref}>{display || prefix + "0" + suffix}</span>;
};

const Vision = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const values = [
    {
      icon: Award,
      title: "Excellence",
      desc: "Delivering the highest quality education and unwavering support",
      longDesc: "We are committed to excellence in everything we do. Excellence means not just delivering quality content, but ensuring every student experiences personalized attention, rigorous academics, and continuous improvement in their understanding and performance.",
      color: "from-blue-500/10 to-blue-600/10",
      bgImage: "https://images.unsplash.com/photo-1516321318423-f06f70d504f0?w=400&h=300&fit=crop"
    },
    {
      icon: Lightbulb,
      title: "Integrity",
      desc: "Building trust through transparency and honest communication",
      longDesc: "Integrity is the foundation of our relationship with students and parents. We maintain transparency in our teaching methods, honest communication about student progress, and ethical practices in all our operations. Trust is earned through consistent, principled actions.",
      color: "from-primary/10 to-primary/5",
      bgImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
    },
    {
      icon: TrendingUp,
      title: "Growth",
      desc: "Fostering continuous learning and holistic development",
      longDesc: "We believe growth is both academic and personal. Every student should develop not just subject expertise but also critical thinking, confidence, and life skills. We foster an environment where learning never stops and every challenge is an opportunity to grow stronger.",
      color: "from-green-500/10 to-green-600/10",
      bgImage: "https://images.unsplash.com/photo-1427504494785-cdae8017b8dd?w=400&h=300&fit=crop"
    }
  ];

  const futureGoals = [
    { number: "100+", label: "Expert Educators", icon: Users },
    { number: "50K+", label: "Students Supported", icon: TrendingUp },
    { number: "15+", label: "Boards & Curriculums", icon: Target },
    { number: "#1", label: "Trusted Platform", icon: Award }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <section className="relative py-8 lg:py-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&h=900&fit=crop"
            alt="Vision & Mission"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary-dark/75 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
           

            <h1
              className={`text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Vision & <span className="text-accent font-bold">Mission</span>
            </h1>

            <p
              className={`text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Defining our commitment to transforming education and empowering students for success
            </p>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="py-8 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8">
            {/* Mission Card */}
            <div
              className={`group relative transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="border-0 shadow-xl relative overflow-hidden transition-all duration-300 h-full hover:shadow-2xl">
                <CardContent className="p-0">
                  {/* Image Background */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                    <img
                      src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop"
                      alt="Our Mission"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                    

                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Mission</h2>

                    <div className="space-y-5 text-base lg:text-lg text-muted-foreground leading-relaxed text-justify">
                      <p>
                        At Nova Tuitions, our mission is to <span className="font-semibold text-primary text-lg">empower students with strong academic foundations, conceptual clarity, and unwavering confidence</span>.
                      </p>
                      <p>
                        We provide high-quality, personalized online education that is <span className="font-semibold text-foreground">accessible and aligned</span> with CBSE, ICSE, ISC, and State Board needs.
                      </p>
                      <p>
                        Through expert teaching and mentorship, we create <span className="font-semibold text-primary">disciplined, curious, and self-driven learners</span> prepared for success.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Vision Card */}
            <div
              className={`group relative transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <Card className="border-0 shadow-xl relative overflow-hidden transition-all duration-300 h-full hover:shadow-2xl">
                <CardContent className="p-0">
                  {/* Image Background */}
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                    <img
                      src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop"
                      alt="Our Vision"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                  </div>

                  {/* Content */}
                  <div className="p-6 lg:p-8">
                   

                    <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Vision</h2>

                    <div className="space-y-5 text-base lg:text-lg text-muted-foreground leading-relaxed text-justify">
                      <p>
                        Our vision is to become <span className="font-semibold text-primary text-lg">India's most trusted online tutoring platform</span> delivering exceptional support.
                      </p>
                      <p>
                        We aim to build a community where every student, regardless of background, receives <span className="font-semibold text-foreground">guidance and encouragement</span> to unlock potential.
                      </p>
                      <p>
                        Nova envisions education as <span className="font-semibold text-primary">inspiring, engaging, and future-ready</span>—where students lead with confidence.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-8 lg:py-8 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 transform transition-all duration-1000">
              <h2
                className={`text-4xl lg:text-5xl font-bold text-foreground mb-6 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                Our Core <span className="text-primary font-bold">Values</span>
              </h2>
              <p
                className={`text-lg text-muted-foreground max-w-2xl mx-auto ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "100ms" }}
              >
                Principles that guide every decision we make and every student we teach
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className={`group relative transform transition-all duration-1000 hover:-translate-y-2 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative bg-gradient-to-br from-card to-secondary/50 border-0 shadow-xl rounded-3xl overflow-hidden transition-all duration-300 h-full group-hover:shadow-2xl">
                    {/* Image */}
                    <div className="relative h-48 lg:h-56 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5">
                      <img
                        src={value.bgImage}
                        alt={value.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/40"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-5 group-hover:scale-125 transition-transform duration-300 shadow-lg">
                        <value.icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">{value.title}</h3>
                      <p className="text-base text-muted-foreground leading-relaxed group-hover:text-muted-foreground transition-colors mb-4">{value.desc}</p>
                      <div className="h-px bg-gradient-to-r from-primary/30 to-transparent mb-4"></div>
                      <p className="text-sm text-muted-foreground leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity">{value.longDesc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Goals Section */}
      <section className="py-8 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2
                className={`text-4xl lg:text-5xl font-bold text-foreground mb-6 transform transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                Our <span className="text-primary">Future Goals</span>
              </h2>
              <p
                className={`text-lg text-muted-foreground max-w-2xl mx-auto transform transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                Ambitious targets as we grow and expand our reach
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {futureGoals.map((goal, index) => (
                <div
                  key={index}
                  className={`group relative transform transition-all duration-1000 hover:-translate-y-2 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/15 to-transparent rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative bg-gradient-to-br from-card to-secondary/30 border-0 shadow-lg rounded-2xl p-6 lg:p-8 text-center transition-all duration-300 group-hover:shadow-xl h-full">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-primary/25 to-primary/10 mb-4 group-hover:bg-primary/35 transition-all duration-300 group-hover:scale-125 transform">
                      <goal.icon className="w-7 h-7 text-primary" />
                    </div>
                    <p className="text-2xl lg:text-3xl font-bold text-primary mb-3"><AnimatedNumber value={goal.number} /></p>
                    <p className="text-xs lg:text-sm font-semibold text-muted-foreground leading-tight">{goal.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-8 bg-gradient-to-r from-primary/10 via-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2
              className={`text-4xl lg:text-5xl font-bold text-foreground mb-6 transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Join Us on This <span className="text-primary">Educational Journey</span>
            </h2>
            <p
              className={`text-xl text-muted-foreground mb-8 max-w-2xl mx-auto transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Be part of a community committed to excellence, growth, and transforming lives through education
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Vision;
