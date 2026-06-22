import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, Target, Sparkles, TrendingUp, Award, Heart, CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";

const History = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: "25+", label: "Years of Excellence", icon: Award },
    { number: "10", label: "Expert Teachers", icon: Users },
    { number: "1000+", label: "Students Mentored", icon: TrendingUp },
    { number: "100%", label: "Commitment to Success", icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <section className="relative py-8 lg:py-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&h=900&fit=crop"
            alt="Nova Tuitions History"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary-dark/60 to-black/55"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-6xl mx-auto text-center">
          

            <h1
              className={`text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Brief History of <span className="text-accent font-bold">Nova Tuitions</span>
            </h1>

            <p
              className={`text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              25+ years of transforming education and empowering students
            </p>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto py-8 lg:py-8">


          {/* Introduction Section with Image */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-8 items-center transform transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-1 bg-primary rounded-full"></div>
                <span className="text-sm font-semibold text-primary uppercase tracking-wider">Our Journey</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">Our Strong <span className="text-primary">Foundation</span></h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Nova Tuitions was established by <span className="font-semibold text-foreground">Rohit, Manish, two other IITians, Amaresh and four experienced entrepreneurs</span> with a shared vision—to create a high-quality, reliable, and result-oriented tutoring ecosystem for Indian students.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                What began as a small group of passionate educators has now grown into a trusted learning platform known for its strong academic foundation, personalized teaching, and consistent student success.
              </p>
              <div className="flex gap-4">
                <div className="h-12 w-1 bg-primary rounded-full"></div>
                <p className="text-base font-semibold text-primary">Committed to transforming education through excellence</p>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop"
                alt="Nova Tuitions Foundation"
                className="w-full rounded-2xl shadow-lg object-cover h-96 group-hover:shadow-xl transition-all duration-300 relative z-10"
              />
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold z-20">
                Established Excellence
              </div>
            </div>
          </div>

          {/* Core Mission Section */}
          <div
            className={`bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-xl p-8 lg:p-8 mb-8 border-0 shadow-lg transform transition-all duration-1000 hover:shadow-xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "300ms" }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-8">Our Core Mission</h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Over the last <span className="font-bold text-primary">25+ years</span>, Nova Tuitions has specialized in teaching students from <span className="font-semibold text-foreground">CBSE, ICSE, ISC, and various State Boards</span>, covering Grades 6 to 12 across all major subjects. Our mission has always been simple: <span className="font-bold text-primary">to strengthen concepts, build confidence, and help every student achieve academic excellence.</span>
            </p>
          </div>

          {/* Services Grid */}
          <div className="mb-8">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center">
              What We <span className="text-primary">Offer</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: BookOpen,
                  title: "Academic Tutoring",
                  desc: "Specialized teaching for CBSE, ICSE, ISC, and State Boards covering all major subjects from grades 6 to 12.",
                  img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&h=300&fit=crop",
                },
                {
                  icon: GraduationCap,
                  title: "College Counseling",
                  desc: "Expert guidance for admissions to Indian colleges and universities, including stream selection.",
                  img: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
                },
                {
                  icon: Target,
                  title: "Study Abroad Support",
                  desc: "Comprehensive admission support and guidance for students planning to study abroad.",
                  img: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=400&h=300&fit=crop",
                },
                {
                  icon: Users,
                  title: "Academic Assistance",
                  desc: "Help with school projects, assignments, essays, and presentations to enhance learning.",
                  img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop",
                },
              ].map((service, index) => (
                <div
                  key={index}
                  className={`group relative transform transition-all duration-1000 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${500 + index * 100}ms` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Card className="group relative overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-2xl h-full">
                    {/* Image Background */}
                    <div className="relative h-44 overflow-hidden bg-secondary group-hover:bg-secondary/80 transition-colors">
                      <img
                        src={service.img}
                        alt={service.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent"></div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-6 relative z-10">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 mb-3 transition-all duration-300 group-hover:scale-110">
                        <service.icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg mb-3 text-foreground group-hover:text-primary transition-colors">{service.title}</h3>
                      <p className="text-sm text-muted-foreground group-hover:text-muted-foreground transition-colors leading-relaxed">
                        {service.desc}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 items-center transform transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "800ms" }}
          >
            <div className="relative group order-2 lg:order-1">
              <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop"
                alt="Expert Teachers"
                className="w-full rounded-2xl shadow-lg object-cover h-96 group-hover:shadow-xl transition-all duration-300 relative z-10"
              />
              <div className="absolute bottom-4 left-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-semibold z-20">
                Expert Faculty
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Our Expert Team</h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Today, the Nova team includes <span className="font-bold text-primary text-2xl">10 expert teachers</span>, each with extensive experience in training hundreds of students across different boards.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex gap-4 items-start p-4 rounded-lg bg-gradient-to-r from-secondary/40 to-secondary/20 hover:from-secondary/60 hover:to-secondary/30 transition-all border-0 shadow-md">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Deep Subject Knowledge</h3>
                    <p className="text-muted-foreground text-sm">Expertise across all major subjects and boards</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 rounded-lg bg-gradient-to-r from-secondary/40 to-secondary/20 hover:from-secondary/60 hover:to-secondary/30 transition-all border-0 shadow-md">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Structured Pedagogy</h3>
                    <p className="text-muted-foreground text-sm">Proven teaching methodologies and techniques</p>
                  </div>
                </div>
                <div className="flex gap-4 items-start p-4 rounded-lg bg-gradient-to-r from-secondary/40 to-secondary/20 hover:from-secondary/60 hover:to-secondary/30 transition-all border-0 shadow-md">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground">Student-Centric Approach</h3>
                    <p className="text-muted-foreground text-sm">Personalized learning tailored to each student</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Final Message Section */}
          <div
            className={`bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl p-8 lg:p-8 text-center border-0 shadow-xl transform transition-all duration-1000 hover:shadow-2xl ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: "900ms" }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Our <span className="text-primary">Vision</span> for the Future
            </h2>
            <p className="text-lg lg:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              From humble beginnings to becoming a trusted name in online tutoring, Nova Tuitions continues to <span className="font-bold text-primary">inspire, mentor, and guide students</span> toward a brighter academic future. We remain committed to upholding excellence in education while adapting to the evolving needs of modern learners.
            </p>
            <div className="flex items-center justify-center gap-2 text-primary font-semibold">
              <Sparkles className="w-5 h-5 animate-pulse" />
              <span>Transforming Education, Empowering Minds</span>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
