import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, Award, Clock, CheckCircle2, GraduationCap, Target, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import hero1 from "@/assets/hero/hero-bg-1.jpg";
import hero2 from "@/assets/hero/hero-bg-2.jpg";
import hero3 from "@/assets/hero/hero-bg-3.jpg";


const Home = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Expert Teachers",
      description: "10-25 years of teaching experience with specialized subject knowledge"
    },
    {
      icon: Users,
      title: "Small Batches",
      description: "Only 4-6 students per batch for personalized attention"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "25+ years of consistent academic excellence and student success"
    },
    {
      icon: Clock,
      title: "Flexible Timings",
      description: "Convenient class schedules that fit your routine"
    }
  ];

  const boards = [
    { name: "CBSE", description: "Complete curriculum coverage for grades 6-12" },
    { name: "ICSE / ISC", description: "Comprehensive preparation for all subjects" },
    { name: "State Boards", description: "Tailored teaching for state syllabi" }
  ];

  const benefits = [
    "Live interactive online classes with real-time doubt solving",
    "Recorded sessions for unlimited revision",
    "Regular tests and performance tracking",
    "Personalized study plans and mentorship",
    "Conceptual teaching, not rote learning",
    "Parent-teacher updates and progress reports"
  ];

  // Carousel images (dummy)
  const carouselImages = [
    hero1,
    hero2,
    hero3
  ];

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((c) => (c + 1) % carouselImages.length);
    }, 5000); // change slide every 5s
    return () => clearInterval(id);
  }, [carouselImages.length]);

  const goPrev = () => setCurrent((c) => (c - 1 + carouselImages.length) % carouselImages.length);
  const goNext = () => setCurrent((c) => (c + 1) % carouselImages.length);

  return (
    <div className="min-h-screen">
      {/* Carousel (inserted above Hero) */}
      <section className="bg-transparent">
        <div className="mx-auto">
          <div className="relative mx-auto overflow-hidden rounded-lg">
            <img
              src={carouselImages[current]}
              alt={`Slide ${current + 1}`}
              className="w-full h-90 sm:h-72 md:h-96 object-cover transition-opacity duration-700"
            />

            {/* Absolute overlay: show heading with leading-tight on carousel */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center px-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-white drop-shadow-lg">
                  Empowering Students. Building Strong Foundations.
                </h1>
                <p className="mt-3 text-lg lg:text-2xl text-white/90 max-w-3xl mx-auto pointer-events-auto">
                  Expert Online Tuition for CBSE | ICSE | State Boards (Grades 6–12)
                </p>
              </div>
            </div>
            <button
              onClick={goPrev}
              aria-label="Previous slide"
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 pointer-events-auto"
            >
              ‹
            </button>
            <button
              onClick={goNext}
              aria-label="Next slide"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 pointer-events-auto"
            >
              ›
            </button>

            {/* Indicators */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-3 flex gap-2 pointer-events-auto">
              {carouselImages.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full ${idx === current ? "bg-white" : "bg-white/60"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <br />

      {/* Hero Section */}
      <section className="leading-student-section relative bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground py-20 lg:py-10">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]"></div>
        <div className="container mx-auto relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
                <a href="https://wa.me/917348956284" target="_blank" rel="noopener noreferrer">
                  Book a Free Demo Class →
                </a>
              </Button>
              <div className="flex flex-col sm:flex-row gap-2 text-sm">
                <a href="tel:917348956284" className="hover:text-accent transition-colors font-medium">
                  Call: 917348956284
                </a>
                <span className="hidden sm:inline">/</span>
                <a href="tel:917348956284" className="hover:text-accent transition-colors font-medium">
                  +917348956284
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Why Choose Nova Tuitions?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We combine decades of teaching experience with modern online technology to deliver exceptional results
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Boards Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">We Cover All Major Boards</h2>
            <p className="text-lg text-muted-foreground">Specialized teaching for every curriculum</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {boards.map((board, index) => (
              <Card key={index} className="border-2 hover:border-primary transition-all duration-300 hover:shadow-lg bg-gradient-to-br from-background to-secondary/20">
                <CardContent className="p-8 text-center">
                  <GraduationCap className="w-12 h-12 mx-auto mb-4 text-primary" />
                  <h3 className="font-bold text-2xl mb-2">{board.name}</h3>
                  <p className="text-muted-foreground">{board.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">What Makes Us Different</h2>
              <p className="text-lg text-muted-foreground">
                A complete learning ecosystem designed for student success
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-background hover:shadow-md transition-shadow">
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-foreground">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Target className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">25+</div>
              <p className="text-muted-foreground">Years of Excellence</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <Users className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">10</div>
              <p className="text-muted-foreground">Expert Teachers</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-4">
                <TrendingUp className="w-8 h-8" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <p className="text-muted-foreground">Students Trained</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Excel in Your Studies?</h2>
          <p className="text-lg lg:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students who have transformed their academic journey with Nova Tuitions
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground text-lg px-8 py-6">
            <a href="https://wa.me/917348956284" target="_blank" rel="noopener noreferrer">
              Start Your Free Demo Class Today
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Home;
