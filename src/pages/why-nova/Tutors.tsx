import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Award, Users, BookOpen } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import Ashwin from "@/assets/Teacher/Ashwin.jpeg";
import AISHWARYA from "@/assets/Teacher/AISHWARYA.png";
import Ramya from "@/assets/Teacher/Ramya.jpg";
import RamMohan from "@/assets/Teacher/RamMohan.jpg";
import Balu from "@/assets/Teacher/Balu.jpg";
import Rakesh1 from "@/assets/Teacher/Rakesh (1).jpg";
import Neha from "@/assets/Teacher/Neha.png";






const STATIC_TUTOR_IMAGES: Record<string, string> = {
  'default-1': AISHWARYA,
  'default-2': Ashwin,
  'default-3': Ramya,
  'default-4': RamMohan,
  'default-5': Balu,
  'default-6': Ashwin,
  'default-7': Rakesh1,
  'default-8': Ashwin,
  'default-9': Neha,
};

const Tutors = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    const loadTutors = () => {
      try {
        const stored = localStorage.getItem('nova_tutors');
        if (stored) {
          const tutors = JSON.parse(stored);
          const mapped = [...tutors]
            .sort((a, b) => (a.order || 0) - (b.order || 0))
            .map(t => ({
              id: t.id,
              name: t.name,
              image: t.imageUrl || STATIC_TUTOR_IMAGES[t.id] || Ashwin,
              role: t.role,
              text: t.bio,
            }));
          setTestimonials(mapped);
        } else {
          setTestimonials([
            { id: 'default-1', name: 'B. Aishwarya', image: AISHWARYA, role: 'Chemistry Teacher', text: 'B. Aishwarya, M.Sc. Chemistry (NIT Rourkela) and GATE-qualified (AIR 390), is a highly experienced Chemistry educator known for her strong conceptual clarity, exam-focused teaching, and proven success in guiding students across CBSE, ICSE, ISC, and state board curricula.' },
            { id: 'default-2', name: 'Ms. Balasaritha P', image: Ashwin, role: 'Physics and Mathematics Teacher.', text: 'Ms. Balasaritha P, Ph.D. in Physics and NET-qualified (AIR 132), is an experienced Physics and Mathematics educator known for her clear, exam-oriented teaching and proven success in guiding CBSE, ICSE, ISC, and NIOS students to excel in board examinations.' },
            { id: 'default-3', name: 'Ms. Ramya Rajamani', image: Ramya, role: 'Math, Physics, Statistics Teacher', text: 'With 19+ years of experience, Ms. Ramya is an accomplished Mathematics, Statistics, and Physics educator who blends strong conceptual teaching with real-world applications to help Indian board students excel.' },
            { id: 'default-4', name: 'Mr. Ram G. Mohan', image: RamMohan, role: 'Math and Physics Teacher', text: 'An IIT Delhi alumnus with 10+ years of teaching and rich industry experience, Mr. Ram is a highly effective Physics and Mathematics faculty known for clarity, discipline, and board-focused mentoring.' },
            { id: 'default-5', name: 'Mr. K. V. Bala Subramanyam (Mr. Balu)', image: Balu, role: 'Physics Teacher', text: 'With 15+ years of experience, Mr. Balu is a result-oriented Physics educator renowned for simplifying complex concepts and helping CBSE, ICSE, ISC, and State Board students score high.' },
            { id: 'default-6', name: 'Mr. Shambhu M. G', image: Ashwin, role: 'Biology Teacher', text: 'An M.Sc. Biotechnology graduate with 15+ years of experience, Mr. Shambhu is a highly regarded Biology educator known for his student-friendly teaching and strong emphasis on conceptual understanding for Indian board exams.' },
            { id: 'default-7', name: 'Mr. Rakesh', image: Rakesh1, role: 'Chemistry and Science Teacher', text: 'A gold medalist M.Sc. Chemistry graduate with 8+ years of experience, Mr. Rakesh is a dedicated Chemistry, Math, and Science educator who helps Indian board students build strong fundamentals and achieve excellent results.' },
            { id: 'default-8', name: 'Ms. Salai Kulamani Birlasekar', image: Ashwin, role: 'English and Communication skills Teacher', text: 'An M.Phil English educator with 12+ years of experience, Ms. Birlasekar specializes in strengthening grammar, writing, and literature skills for CBSE, ICSE, ISC, and State Board students.' },
            { id: 'default-9', name: 'Ms. Neha Aggarwal', image: Neha, role: 'Mathematics Teacher and Subject Matter Expert', text: 'A CSIR NET-qualified Mathematics educator, Ms. Neha specializes in guiding CBSE and ICSE students of Classes 9–12 with a strong focus on conceptual clarity, structured problem-solving, and exam readiness.' },
          ]);
        }
      } catch {
        setTestimonials([]);
      }
    };
    loadTutors();
    window.addEventListener('storage', loadTutors);
    return () => window.removeEventListener('storage', loadTutors);
  }, []);

  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    const update = () => {
      setCanScrollLeft(el.scrollLeft > 0);
      setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };
    update();

    // Use ResizeObserver when available to watch element size/content changes.
    let ro: any = null;
    if (typeof (window as any).ResizeObserver !== "undefined") {
      ro = new (window as any).ResizeObserver(() => update());
      ro.observe(el);
    } else {
      // Fallback for older environments
      window.addEventListener("resize", update);
    }

    return () => {
      if (ro) {
        ro.disconnect();
      } else {
        window.removeEventListener("resize", update);
      }
    };
  }, []);

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  const scrollBy = (dir: number) => {
    const el = carouselRef.current;
    if (!el) return;
    const distance = el.clientWidth * 0.8;
    el.scrollBy({ left: dir * distance, behavior: "smooth" });
  };



  // Autoplay: auto-scroll every 2s, pause when `paused` is true
  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      const el = carouselRef.current;
      if (!el) return;
      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        const distance = el.clientWidth * 0.8;
        el.scrollBy({ left: distance, behavior: "smooth" });
      }
    }, 2000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Tutors</h1>
            <p className="text-xl opacity-95">
              Meet the expert educators who make Nova Tuitions a trusted name in education
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <p className="text-lg text-muted-foreground mb-6">
              At Nova Tuitions, our teachers are the backbone of our success. Each tutor brings years of subject expertise, pedagogical excellence, and a deep commitment to student growth.
            </p>
            <p className="text-xl font-medium text-foreground">
              We have <span className="text-primary font-bold">10 expert teachers</span>, each with extensive experience in training hundreds of students across CBSE, ICSE, ISC, and State Boards.
            </p>
          </div>


          <div className="testimonal-section mb-16">
            <div className="max-w-6xl mx-auto">
              <div className="relative">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold"></h2>
                  <h2 className="text-2xl font-bold text-center">
                    Our Tutors
                  </h2>

                  <div className="space-x-2">
                    <button
                      aria-label="Scroll left"
                      disabled={!canScrollLeft}
                      className={`btn-scroll p-2 rounded-full bg-white shadow hover:bg-gray-100 ${!canScrollLeft ? "opacity-40 cursor-not-allowed" : ""}`}
                      onClick={() => scrollBy(-1)}
                    >
                      ‹
                    </button>
                    <button
                      aria-label="Scroll right"
                      disabled={!canScrollRight}
                      className={`btn-scroll p-2 rounded-full bg-white shadow hover:bg-gray-100 ${!canScrollRight ? "opacity-40 cursor-not-allowed" : ""}`}
                      onClick={() => scrollBy(1)}
                    >
                      ›
                    </button>
                  </div>
                </div>

                <div
                  ref={carouselRef}
                  className="overflow-x-auto no-scrollbar scroll-smooth flex gap-4 py-2 px-1 snap-x snap-mandatory"
                  onScroll={handleScroll}
                  onMouseEnter={() => setPaused(true)}
                  onMouseLeave={() => setPaused(false)}
                >
                  {testimonials.map((t) => (
                    <div key={t.id} className="min-w-[20rem] max-w-sm snap-start flex-shrink-0">
                      <Card className="border-2 hover:border-primary transition-all h-full">
                        <CardContent className="p-6 text-center">
                          <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full object-cover mx-auto mb-4" />
                          <p className="text-sm text-muted-foreground mb-4">"{t.text}"</p>
                          <div>
                            <div className="font-semibold">{t.name}</div>
                            <div className="text-xs text-muted-foreground">{t.role}</div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            </div>


            {/* Teacher Qualities */}

          </div>
        </div>
      </section>

      {/* What Makes Our Teachers Special */}
      <section className="py-16 lg:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">What Makes Our Teachers Special</h2>

            <div className="space-y-6">
              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-3 text-primary">Subject Specialists, Not Generalists</h3>
                  <p className="text-muted-foreground">
                    Each teacher focuses on specific subjects, ensuring expert-level teaching quality and deep conceptual clarity.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-3 text-primary">Board Exam Expertise</h3>
                  <p className="text-muted-foreground">
                    Our teachers have trained thousands of students and understand exactly what examiners look for in answers.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-3 text-primary">Personalized Attention</h3>
                  <p className="text-muted-foreground">
                    In small batches of 4–6 students, teachers can identify each student's strengths and weaknesses, providing tailored guidance.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-3 text-primary">Beyond Academics</h3>
                  <p className="text-muted-foreground">
                    Our teachers act as mentors, guiding students on study habits, exam strategies, and building confidence.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-xl mb-3 text-primary">Continuous Improvement</h3>
                  <p className="text-muted-foreground">
                    Regular training and updates on curriculum changes ensure our teachers stay at the forefront of educational excellence.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Commitment */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-8 text-center">
                <h2 className="text-3xl font-bold mb-6">The Nova Teaching Promise</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Our teachers are committed to not just teaching subjects, but to building confident, thinking students who can tackle any academic challenge.
                </p>
                <p className="text-xl font-medium text-foreground">
                  With patience, expertise, and genuine care, they transform every classroom into a space of learning, growth, and achievement.
                </p>
              </CardContent>
            </Card>

            <div className="text-center mt-12">
              <p className="text-lg text-muted-foreground mb-4">
                Experience world-class teaching firsthand
              </p>
              <a
                href="https://wa.me/918197466607?text=I%20would%20like%20to%20book%20a%20free%20demo%20class"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-3 rounded-md font-semibold transition-colors"
              >
                Book a Free Demo Class
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tutors;
