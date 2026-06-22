import { Button } from "@/components/ui/button";
import { BookOpen, Users, Award, Clock, CheckCircle2, GraduationCap, Target, TrendingUp, Star, ChevronLeft, ChevronRight, Atom, Calculator, FlaskConical, Globe, Languages, Laptop, Sparkles, Lightbulb, Shield, BarChart3, Headphones, Zap, BookMarked, Monitor, MessageSquare, FileText, HeartHandshake, Trophy } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import CountUp from "@/components/CountUp";
import ScheduleFreeDemoModal from "@/components/ScheduleFreeDemoModal";

/* ─── Scroll-reveal hook ─── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

/* ─── Reveal wrapper ─── */
const Reveal = ({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
};

/* ─── Hero slides ─── */
const slides = [
  {
    img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1600&q=80",
    heading: "Empowering Students to Excel",
    sub: "25+ years of transforming academic journeys through conceptual learning, small batches, and personalised mentorship across CBSE, ICSE & State Boards.",
    badge: "CBSE • ICSE • ISC • State Boards",
    cta: "Book Free Demo Class",
  },
  {
    img: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=1600&q=80",
    heading: "Expert Online Tuition, Grades 6–12",
    sub: "Live interactive classes with India's most experienced faculty. Only 4–6 students per batch for guaranteed individual attention and accelerated results.",
    badge: "25+ Years of Teaching Excellence",
    cta: "Explore Our Courses",
  },
  {
    img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600&q=80",
    heading: "Personalised Learning, Proven Results",
    sub: "Every student is unique. We craft customised study plans, provide one-on-one doubt sessions, and track progress with regular assessments to ensure success.",
    badge: "1000+ Students Successfully Trained",
    cta: "Start Your Journey Today",
  },
 
];

const features = [
  { icon: BookOpen, title: "Expert Teachers", desc: "Our faculty brings 10–25 years of teaching experience with deep subject mastery. Every teacher is hand-picked for their ability to simplify complex topics and connect with students.", color: "from-blue-500 to-blue-700" },
  { icon: Users, title: "Small Batches (4–6)", desc: "Unlike crowded classrooms, we limit each batch to just 4–6 students. This ensures every child receives the personalised attention they deserve, with ample time for doubt resolution.", color: "from-emerald-500 to-emerald-700" },
  { icon: Award, title: "Proven Track Record", desc: "Over two decades of consistent academic excellence. Our students regularly score 95%+ in board exams and gain admission to India's top colleges and competitive programs.", color: "from-amber-500 to-amber-700" },
  { icon: Clock, title: "Flexible Scheduling", desc: "We understand busy academic lives. Choose from multiple class timings that fit your routine. Morning, afternoon, or evening — learning happens on your terms.", color: "from-purple-500 to-purple-700" },
  { icon: Laptop, title: "Live Interactive Platform", desc: "Crystal-clear audio and video, real-time digital whiteboard, screen sharing, and instant chat. Our online classroom is designed to replicate — and improve upon — in-person learning.", color: "from-cyan-500 to-cyan-700" },
  { icon: BarChart3, title: "Performance Analytics", desc: "Detailed progress reports after every test. Track strengths, weaknesses, attendance, and improvement trends. Parents receive monthly updates with actionable insights.", color: "from-rose-500 to-rose-700" },
  { icon: Shield, title: "Recorded Sessions", desc: "Every class is recorded and made available on-demand. Students can revisit any lesson for revision before exams, ensuring nothing is missed.", color: "from-indigo-500 to-indigo-700" },
  { icon: Target, title: "Exam-Oriented Practice", desc: "Regular mock tests, previous year paper discussions, timed assignments, and board-specific practice. We prepare students not just to learn, but to excel in examinations.", color: "from-orange-500 to-orange-700" },
];

const boards = [
  { name: "CBSE", desc: "Complete coverage for Classes 6–12. Our CBSE curriculum aligns with the latest NCERT guidelines and focuses on building conceptual clarity across Science, Mathematics, Social Studies, and Languages. Regular practice with CBSE pattern question papers ensures exam readiness.", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80", grades: "Classes 6–12" },
  { name: "ICSE / ISC", desc: "Comprehensive preparation for the ICSE (Classes 10) and ISC (Classes 12) examinations. We cover the detailed syllabus with special emphasis on analytical writing, application-based questions, and internal assessment support.", img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&q=80", grades: "Classes 6–12" },
  { name: "State Boards", desc: "Tailored instruction aligned with individual state board syllabi (Karnataka, Maharashtra, Tamil Nadu, and more). Our tutors are familiar with state-specific textbooks, exam patterns, and evaluation methods to deliver targeted results.", img: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?w=600&q=80", grades: "Classes 6–12" },
];

const subjects = [
  { icon: Atom, name: "Physics", desc: "Mechanics, Optics, Electromagnetism, Modern Physics", color: "bg-blue-100 text-blue-700" },
  { icon: FlaskConical, name: "Chemistry", desc: "Organic, Inorganic, Physical Chemistry & more", color: "bg-green-100 text-green-700" },
  { icon: Calculator, name: "Mathematics", desc: "Algebra, Calculus, Geometry, Trigonometry, Statistics", color: "bg-amber-100 text-amber-700" },
  { icon: BookOpen, name: "Biology", desc: "Botany, Zoology, Genetics, Biotechnology, Ecology", color: "bg-rose-100 text-rose-700" },
  { icon: Globe, name: "Social Science", desc: "History, Geography, Civics, Economics", color: "bg-indigo-100 text-indigo-700" },
  { icon: Languages, name: "English", desc: "Grammar, Literature, Writing Skills, Communication", color: "bg-purple-100 text-purple-700" },
  { icon: Laptop, name: "Computer Science", desc: "Programming, Databases, Networks, Web Development", color: "bg-teal-100 text-teal-700" },
  { icon: TrendingUp, name: "Economics", desc: "Micro & Macro Economics, Statistics, Development", color: "bg-orange-100 text-orange-700" },
];

const approachSteps = [
  { icon: BookMarked, title: "Assess", desc: "We begin by evaluating each student's current level, learning style, and academic goals through a diagnostic assessment." },
  { icon: Lightbulb, title: "Teach", desc: "Concepts are taught from the ground up using real-world examples, visual aids, and interactive problem-solving." },
  { icon: BarChart3, title: "Practice", desc: "Students apply what they learn through graded assignments, weekly quizzes, and full-length mock tests." },
  { icon: TrendingUp, title: "Review & Improve", desc: "Performance is analysed, weak areas are identified, and targeted remedial sessions are scheduled for continuous improvement." },
];

const benefits = [
  "Live interactive online classes with real-time doubt solving",
  "Every class recorded for unlimited revision — revisit topics anytime",
  "Batch size of 4–6 students ensures individual attention for everyone",
  "Weekly tests, monthly assessments, detailed progress reports for parents",
  "Personalised study plans based on each student's strengths and weaknesses",
  "Coverage of all major boards — CBSE, ICSE, ISC, and State Boards",
];

const testimonials = [
  { name: "Priya Sharma", grade: "Grade 10 – CBSE", text: "Nova Tuitions transformed my daughter's understanding of Mathematics. She went from struggling with basic concepts to scoring 95+ in her board exams. The individual attention she received was invaluable.", rating: 5 },
  { name: "Rajesh Kumar", grade: "Grade 12 – Physics", text: "The small batch size made all the difference. My son received personalised mentorship that helped him not only ace his Class 12 boards but also crack the JEE with a rank under 5000. Truly grateful to the Nova team.", rating: 5 },
  { name: "Meena Iyer", grade: "Grade 8 – ICSE", text: "I was initially skeptical about online tuition, but Nova changed my mind completely. The teachers explain even the most difficult Science concepts with everyday examples. My daughter now actively participates in class and loves learning.", rating: 5 },
  { name: "Anita Reddy", grade: "Grade 11 – Chemistry", text: "Best online tuition we've found in Bangalore. The recorded sessions are a lifesaver during exam revision, and the teachers are always available to clear doubts — even late at night before tests.", rating: 5 },
  { name: "Vikram Singh", grade: "Grade 9 – Mathematics", text: "My son used to be afraid of Maths. After joining Nova, not only has his fear disappeared, but he has also started helping his friends with their homework. The change in his confidence is remarkable.", rating: 5 },
  { name: "Sunita Patel", grade: "Grade 12 – Biology", text: "The teachers at Nova have an incredible ability to break down complex Biology concepts into simple, memorable chunks. My daughter scored 98/100 in Biology — something we never thought possible.", rating: 5 },
  { name: "Arun Nair", grade: "Grade 10 – Social Science", text: "What sets Nova apart is their systematic approach. They have a structured curriculum, regular tests, and detailed feedback after every assessment. My son improved from 60% to 92% in just one year.", rating: 5 },
  { name: "Deepa Krishnan", grade: "Grade 7 – All Subjects", text: "Both my children study at Nova and the improvement in their academic performance has been outstanding. The mentors keep us updated every month with detailed progress cards. Highly recommended.", rating: 5 },
];

const faqs = [
  { q: "How are the batches structured?", a: "We maintain an ultra-small batch size of 4–6 students per class. This ensures every student gets individual attention, and no question remains unanswered." },
  { q: "Which boards and grades do you cover?", a: "We teach all major boards — CBSE, ICSE, ISC, and State Boards — for Grades 6 through 12. We also provide coaching for competitive exams like JEE, NEET, and various Olympiads." },
  { q: "How do I book a free demo class?", a: "Simply click the 'Book Free Demo Class' button on our website or reach out to us via WhatsApp at +91-974 071 2301. We will schedule a demo with the most suitable teacher for your subject and grade." },
  { q: "Are classes conducted live or pre-recorded?", a: "All classes are conducted live by expert teachers in real-time. We also record every session and make it available for later revision, so students never miss out on any lesson." },
  { q: "How do you track student progress?", a: "We conduct weekly topic tests, monthly assessments, and full-length mock exams. Detailed progress reports are shared with parents, highlighting strengths, areas for improvement, attendance, and performance trends." },
  { q: "Do you offer any trial period?", a: "Yes, we offer a free demo class with no obligation. After the demo, if you choose to enrol, we provide a 1-week trial period to ensure the teaching style and batch are the right fit for your child." },
  { q: "What technology do I need for online classes?", a: "You need a laptop or tablet with a stable internet connection, a webcam, and headphones. Our platform works smoothly on Windows, macOS, iOS, and Android devices." },
  { q: "How do I get my doubts resolved outside class hours?", a: "Students can reach out to their teachers via WhatsApp or our dedicated portal. Most queries are resolved within a few hours, ensuring uninterrupted learning." },
];

const Home = () => {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [openFaq, setOpenFaq] = useState(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const go = useCallback((idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(idx); setAnimating(false); }, 500);
  }, [animating]);

  const next = useCallback(() => go((current + 1) % slides.length), [current, go]);
  const prev = useCallback(() => go((current - 1 + slides.length) % slides.length), [current, go]);

  useEffect(() => {
    timerRef.current = setInterval(next, 6000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [next]);

  return (
    <div className="min-h-screen overflow-x-hidden">

      {/* ── HERO CAROUSEL ── */}
      <section className="relative h-[60vh] md:h-[80vh] lg:h-[85vh] min-h-[500px] md:min-h-[600px] overflow-hidden">
        {slides.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, zIndex: i === current ? 1 : 0 }}
          >
            <img src={s.img} alt="" className="w-full h-full object-cover scale-105 transition-transform duration-[8000ms]" style={{ transform: i === current ? "scale(1)" : "scale(1.05)" }} />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary/65 to-black/60" />
          </div>
        ))}
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
          <span
            className="inline-block bg-accent/90 text-white text-xs font-bold tracking-widest uppercase px-4 md:px-5 py-1.5 md:py-2 rounded-full mb-4 md:mb-6 shadow-lg backdrop-blur"
            style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(-10px)" : "translateY(0)", transition: "all 0.5s ease" }}
          >
            {slides[current].badge}
          </span>
          <h1
            className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-lg max-w-5xl px-2"
            style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(20px)" : "translateY(0)", transition: "all 0.55s ease 0.05s" }}
          >
            {slides[current].heading}
          </h1>
          <p
            className="mt-3 md:mt-5 text-sm sm:text-base md:text-lg lg:text-xl text-white/80 max-w-3xl font-light leading-relaxed px-2"
            style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(20px)" : "translateY(0)", transition: "all 0.55s ease 0.1s" }}
          >
            {slides[current].sub}
          </p>
          <div
            className="mt-6 md:mt-8 flex flex-col sm:flex-row gap-3 md:gap-4 px-4 w-full sm:w-auto"
            style={{ opacity: animating ? 0 : 1, transform: animating ? "translateY(20px)" : "translateY(0)", transition: "all 0.55s ease 0.18s" }}
          >
            <Button onClick={() => setIsDemoModalOpen(true)} size="lg" className="bg-accent hover:bg-accent/90 text-white text-sm md:text-base px-8 md:px-10 py-5 md:py-7 rounded-full shadow-xl hover:scale-105 transition-transform font-bold w-full sm:w-auto">
              {slides[current].cta}
            </Button>
            <Button asChild variant="outline" size="lg" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-primary text-sm md:text-base px-8 md:px-10 py-5 md:py-7 rounded-full backdrop-blur transition-all font-semibold w-full sm:w-auto">
              <a href="/why-nova/online-classes">Learn More</a>
            </Button>
          </div>
        </div>
        {/* Hide left/right arrows on mobile, show on larger screens */}
        <button onClick={prev} className="hidden md:block absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur text-white p-3 rounded-full transition-all">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={next} className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur text-white p-3 rounded-full transition-all">
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i)} className={`rounded-full transition-all duration-300 ${i === current ? "w-8 md:w-10 h-2 md:h-3 bg-accent" : "w-2 md:w-3 h-2 md:h-3 bg-white/60 hover:bg-white/80"}`} />
          ))}
        </div>
        
      </section>

      {/* ── WELCOME / ABOUT ── */}
      <section className="py-16 lg:py-20 bg-white border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-2">Welcome to Nova Tuitions</p>
              <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-6 leading-tight">Your Trusted Partner in Academic <span className="text-primary">Excellence</span></h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                For over 25 years, Nova Tuitions has been a beacon of quality education in Bangalore, helping students across CBSE, ICSE, ISC, and State Boards achieve outstanding academic results. Founded with a simple yet powerful vision — to make high-quality conceptual education accessible to every student — we have grown from a small tutoring centre into a trusted online learning institution.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                At Nova, we believe that every student has the potential to excel. The key lies in the right guidance, the right environment, and a teaching methodology that prioritises <span className="font-semibold text-foreground">understanding over memorisation</span>. Our small batch sizes, experienced faculty, and structured curriculum are designed to unlock that potential.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Located in <span className="font-semibold text-foreground">Whitefield, Bangalore</span>, and now serving students across India through our advanced online platform, Nova Tuitions continues to uphold the values of <span className="font-semibold text-foreground">integrity, excellence, and personalised care</span> that have defined us for two and a half decades.
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-foreground">25+ years of experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-foreground">10 expert faculty members</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-foreground">1000+ students trained</span>
                </div>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80"
                  alt="Nova Tuitions"
                  className="w-full h-[500px] object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-accent text-white rounded-2xl p-6 shadow-xl max-w-[200px]">
                  <div className="text-3xl font-extrabold">25+</div>
                  <p className="text-sm font-medium text-white/90">Years of Educational Excellence</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Target, end: 25, suffix: "+", label: "Years of Excellence" },
              { icon: Users, end: 10, suffix: "+", label: "Expert Teachers" },
              { icon: TrendingUp, end: 1000, suffix: "+", label: "Students Trained" },
              { icon: Award, end: 3, suffix: "", label: "Major Boards Covered" },
            ].map(({ icon: Icon, end, suffix, label }, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="flex flex-col items-center gap-2">
                  <Icon className="w-7 h-7 text-accent" />
                  <div className="text-4xl font-extrabold text-accent">
                    <CountUp end={end} duration={2000} suffix={suffix} />
                  </div>
                  <p className="text-white/80 text-sm font-medium">{label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-8 lg:py-8 bg-gradient-to-b from-white to-secondary/20">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-16">
            <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-2">Why Nova?</p>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">Why Choose Nova Tuitions?</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We don't just teach — we mentor, guide, and empower. Here's what makes us the preferred choice for hundreds of families across India.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map(({ icon: Icon, title, desc, color }, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group relative rounded-2xl overflow-hidden border border-border bg-white shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${color}`} />
                  <div className="p-7">
                    <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${color} text-white mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-bold text-lg mb-2 text-foreground">{title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR TEACHING APPROACH ── */}
      <section className="py-8 lg:py-8 bg-white">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-16">
            <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-2">Methodology</p>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">Our Teaching <span className="text-primary">Approach</span></h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A structured, four-step methodology that ensures deep conceptual understanding and consistent academic growth.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto relative">
            {approachSteps.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="flex flex-col items-center text-center relative z-10 p-6 rounded-2xl bg-secondary/10 hover:bg-secondary/20 border border-border/50 hover:border-primary/30 transition-all">
                  <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/20 flex items-center justify-center mb-5">
                    <Icon className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg mb-3 text-foreground">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BOARDS ── */}
      <section className="py-8 lg:py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-16">
            <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-2">Curriculum</p>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">We Cover All Major Boards</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Specialised teaching aligned with the latest curriculum of each board, delivered by faculty who understand every syllabus inside out.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {boards.map(({ name, desc, img, grades }, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="group overflow-hidden shadow-md hover:shadow-2xl transition-all duration-400 hover:-translate-y-2 bg-white border border-border rounded-2xl">
                  <div className="relative h-52 overflow-hidden">
                    <img src={img} alt={name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="text-white font-extrabold text-2xl drop-shadow-lg">{name}</span>
                      <p className="text-white/80 text-xs font-medium mt-1">{grades}</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
                    <div className="mt-4 flex gap-2 flex-wrap">
                      {["Grade 6–8", "Grade 9–10", "Grade 11–12"].map(g => (
                        <span key={g} className="text-xs bg-secondary text-primary px-3 py-1 rounded-full font-medium">{g}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUBJECTS ── */}
      <section className="py-8 lg:py-8 bg-white">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-16">
            <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-2">Subjects</p>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">Subjects We Teach</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">Expert guidance across all core and elective subjects for Classes 6–12, with in-depth coverage of every topic prescribed by your board.</p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto">
            {subjects.map(({ icon: Icon, name, desc, color }, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className={`flex items-center gap-4 p-5 rounded-2xl ${color.split(" ")[0]} border border-transparent hover:border-current hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer`}>
                  <Icon className={`w-10 h-10 ${color.split(" ")[1]} shrink-0`} />
                  <div>
                    <span className={`font-bold text-sm block ${color.split(" ")[1]}`}>{name}</span>
                    <span className="text-xs text-muted-foreground mt-0.5 block">{desc}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── STUDENT SUPPORT ── */}
      <section className="py-8 lg:py-8 bg-gradient-to-br from-primary to-primary/80 text-white">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-16">
            <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-2">Support</p>
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4">Beyond the Classroom</h2>
            <p className="text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
              At Nova, our commitment to your success extends far beyond scheduled class hours. We provide a comprehensive support ecosystem designed to keep you on track.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { icon: Headphones, title: "24/7 Doubt Support", desc: "Stuck on a problem? Send it to your teacher on WhatsApp, and get a detailed video or text explanation within hours — not days." },
              { icon: Monitor, title: "Recorded Library", desc: "Every class is automatically recorded and added to your personal library. Revisit any lesson, anytime, as many times as you need." },
              { icon: MessageSquare, title: "Parent Updates", desc: "Monthly progress reports with detailed analytics on test scores, attendance, participation, and improvement areas." },
              { icon: FileText, title: "Study Materials", desc: "Comprehensive notes, practice sheets, and revision guides prepared by our faculty specifically for each board and grade." },
              { icon: Zap, title: "Rapid Assessments", desc: "Weekly quizzes, topic-wise tests, and full-length mock exams with instant grading and detailed feedback to track every step of progress." },
              { icon: HeartHandshake, title: "Academic Mentorship", desc: "Each student is assigned a dedicated mentor who provides personalised guidance, motivation, and academic planning support." },
              { icon: Trophy, title: "Olympiad Training", desc: "Special coaching for Science Olympiads, Maths Olympiads, and other competitive exams to help students excel beyond the classroom." },
              { icon: Sparkles, title: "Career Guidance", desc: "Our senior faculty advise students on subject selection, stream choices, college applications, and long-term career planning." },
            ].map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="p-6 rounded-2xl bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition-all group">
                  <Icon className="w-8 h-8 text-accent mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-base mb-2">{title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS / WHAT MAKES US DIFFERENT ── */}
      <section className="py-8 lg:py-8 bg-secondary/20">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-12">
            <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-2">Difference</p>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4 leading-tight">What Makes Us <span className="text-primary">Different</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              A complete learning ecosystem designed for student success at every stage — from concept introduction to exam-day confidence.
            </p>
          </Reveal>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div className="space-y-3">
                {benefits.map((b, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow border border-border">
                    <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-foreground font-medium">{b}</p>
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80"
                  alt="Online learning"
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent" />
                <div className="absolute bottom-6 left-6 bg-white rounded-2xl p-5 shadow-xl max-w-[240px]">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                    <span className="text-xs font-bold text-primary">Live Class in Progress</span>
                  </div>
                  <p className="text-sm font-semibold text-foreground">Grade 10 Mathematics</p>
                  <p className="text-xs text-muted-foreground">5 students • CBSE • Real-time doubt solving</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-8 lg:py-8 bg-gradient-to-br from-primary/90 to-primary text-white">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-16">
            <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-2">Process</p>
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-4">How It Works</h2>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">Getting started with Nova Tuitions is simple. Just four easy steps to academic excellence.</p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-white/20" />
            {[
              { step: "01", title: "Book Free Demo", desc: "Click on 'Book Free Demo' or WhatsApp us. We'll schedule a trial class with the perfect teacher for your subject and grade — no commitment needed." },
              { step: "02", title: "Meet Your Tutor", desc: "Attend the demo and experience our teaching style first-hand. You'll be matched with an expert who specialises in your board and subject." },
              { step: "03", title: "Start Learning", desc: "Join live online classes in small, focused batches of 4–6 students. Access recordings, notes, and practice materials from day one." },
              { step: "04", title: "Track & Excel", desc: "Regular tests, detailed progress reports, and parent-teacher meetings ensure continuous improvement and exam-ready confidence." },
            ].map(({ step, title, desc }, i) => (
              <Reveal key={i} delay={i * 150}>
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="w-20 h-20 rounded-full bg-white/10 border-2 border-accent flex items-center justify-center mb-5 shadow-lg">
                    <span className="text-accent font-extrabold text-2xl">{step}</span>
                  </div>
                  <h3 className="font-bold text-lg mb-3">{title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-8 lg:py-8 bg-white">
        <div className="container mx-auto px-4">
          <Reveal className="text-center mb-16">
            <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-2">Reviews</p>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">What Parents & Students Say</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't take our word for it. Hear from the hundreds of families who have trusted Nova Tuitions with their children's education.
            </p>
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {testimonials.map(({ name, grade, text, rating }, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="h-full flex flex-col p-6 rounded-2xl bg-secondary/30 border border-border hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <div className="flex gap-0.5 mb-4">
                    {Array.from({ length: rating }).map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                  </div>
                  <p className="text-sm text-foreground leading-relaxed flex-1 mb-4 italic">"{text}"</p>
                  <div className="pt-3 border-t border-border/50">
                    <p className="font-bold text-sm text-primary">{name}</p>
                    <p className="text-xs text-muted-foreground">{grade}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-10">
            <Button asChild variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full px-10 py-6 font-semibold">
              <a href="/why-nova/testimonials">Read More Testimonials →</a>
            </Button>
          </Reveal>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-8 lg:py-8 bg-secondary/20">
        <div className="container mx-auto px-4 max-w-6xl">
          <Reveal className="text-center mb-14">
            <p className="text-accent font-semibold tracking-widest uppercase text-sm mb-2">FAQ</p>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-foreground mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground">Everything you need to know about Nova Tuitions. Still have questions? <a href="/contact" className="text-primary font-semibold hover:underline">Contact us</a>.</p>
          </Reveal>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left font-semibold text-foreground hover:bg-secondary/20 transition-colors"
                  >
                    <span>{q}</span>
                    <ChevronRight className={`w-5 h-5 text-primary transition-transform duration-300 ${openFaq === i ? "rotate-90" : ""}`} />
                  </button>
                  <div
                    className="overflow-hidden transition-all duration-300"
                    style={{ maxHeight: openFaq === i ? "300px" : "0px" }}
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{a}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative py-8 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1513258496099-48168024aec0?w=1600&q=80"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 to-primary/70" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <Reveal>
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Ready to Excel in Your Studies?
            </h2>
            <p className="text-lg lg:text-xl mb-10 text-white/85 max-w-3xl mx-auto leading-relaxed">
              Join hundreds of students who have transformed their academic journey with Nova Tuitions. Whether you're preparing for board exams, competitive entrance tests, or simply want to build stronger foundations — we're here to help you succeed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => setIsDemoModalOpen(true)} size="lg" className="bg-accent hover:bg-accent/90 text-white rounded-full px-12 py-7 text-lg shadow-2xl hover:scale-105 transition-transform font-bold">
                Book Free Demo Class
              </Button>
              <Button asChild size="lg" variant="outline" className="border-2 border-white text-white bg-white/10 hover:bg-white hover:text-primary rounded-full px-12 py-7 text-lg backdrop-blur font-semibold">
                <a href="/contact">Contact Us</a>
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <ScheduleFreeDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  );
};

export default Home;
