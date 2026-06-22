import { useState } from "react";
import { Award, BookOpen, Users, TrendingUp, Heart, Target } from "lucide-react";
import ScheduleFreeDemoModal from "@/components/ScheduleFreeDemoModal";
import AISHWARYA from "@/assets/Teacher/AISHWARYA.png";
import Ashwin from "@/assets/Teacher/Ashwin.jpeg";
import Ramya from "@/assets/Teacher/Ramya.jpg";
import RamMohan from "@/assets/Teacher/RamMohan.jpg";
import Balu from "@/assets/Teacher/Balu.jpg";
import Rakesh1 from "@/assets/Teacher/Rakesh (1).jpg";
import Neha from "@/assets/Teacher/Neha.png";
import Saritha from "@/assets/Teacher/SARITHA.PNG";
import Sant from "@/assets/Teacher/SANT.jpeg";
import VijayKalyan from "@/assets/Teacher/VijayKalyan.jpeg";
import RohitGupta from "@/assets/Teacher/RohitGupta.jpg";

const TutorsNew = () => {
  const [expandedExpertise, setExpandedExpertise] = useState<Record<number, boolean>>({});
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  const tutors = [
    {
      id: 1,
      name: 'B. Aishwarya',
      image: AISHWARYA,
      title: 'Chemistry Teacher',
      qualification: 'M.Sc. in Chemistry from NIT Rourkela | GATE (Chemistry) AIR 390',
      expertise: ['Chemistry', 'CBSE', 'ICSE', 'ISC', 'State Boards'],
      description: 'B. Aishwarya, M.Sc. Chemistry (NIT Rourkela) and GATE-qualified (AIR 390), is a highly experienced Chemistry educator known for her strong conceptual clarity, exam-focused teaching, and proven success in guiding students across CBSE, ICSE, ISC, and state board curricula.',
      initial: 'BA'
    },
    {
      id: 2,
      name: 'Ms. Balasaritha P',
      image: Saritha,
      title: 'Physics and Mathematics Teacher',
      qualification: 'Ph.D. in Physics | NET Qualified (AIR 132)',
      expertise: ['Physics', 'Mathematics', 'CBSE', 'ICSE', 'ISC', 'NIOS'],
      description: 'Ms. Balasaritha P, Ph.D. in Physics and NET-qualified (AIR 132), is an experienced Physics and Mathematics educator known for her clear, exam-oriented teaching and proven success in guiding CBSE, ICSE, ISC, and NIOS students to excel in board examinations.',
      initial: 'BP'
    },
    {
      id: 3,
      name: 'Ms. Ramya Rajamani',
      image: Ramya,
      title: 'Math, Physics, Statistics Teacher',
      qualification: '19+ Years of Teaching Experience',
      expertise: ['Mathematics', 'Statistics', 'Physics', 'CBSE', 'ICSE', 'ISC'],
      description: 'With 19+ years of experience, Ms. Ramya is an accomplished Mathematics, Statistics, and Physics educator who blends strong conceptual teaching with real-world applications to help Indian board students excel.',
      initial: 'RR'
    },
    {
      id: 4,
      name: 'Mr. Ram G. Mohan',
      image: RamMohan,
      title: 'Math and Physics Teacher',
      qualification: 'M.Tech from IIT Delhi | 10+ Years Teaching Experience',
      expertise: ['Physics', 'Mathematics', 'CBSE', 'ICSE', 'ISC'],
      description: 'An IIT Delhi alumnus with 10+ years of teaching and rich industry experience, Mr. Ram is a highly effective Physics and Mathematics faculty known for clarity, discipline, and board-focused mentoring.',
      initial: 'RM'
    },
    {
      id: 5,
      name: 'Mr. K. V. Bala Subramanyam (Mr. Balu)',
      image: Balu,
      title: 'Physics Teacher',
      qualification: 'Physics Educator | 15+ Years Experience',
      expertise: ['Physics', 'CBSE', 'ICSE', 'ISC', 'State Boards'],
      description: 'With 15+ years of experience, Mr. Balu is a result-oriented Physics educator renowned for simplifying complex concepts and helping CBSE, ICSE, ISC, and State Board students score high.',
      initial: 'KB'
    },
    {
      id: 6,
      name: 'Mr. Shambhu M. G',
      image: null,
      title: 'Biology Teacher',
      qualification: 'M.Sc. Biotechnology | 15+ Years Experience',
      expertise: ['Biology', 'CBSE', 'ICSE', 'ISC', 'State Boards'],
      description: 'An M.Sc. Biotechnology graduate with 15+ years of experience, Mr. Shambhu is a highly regarded Biology educator known for his student-friendly teaching and strong emphasis on conceptual understanding for Indian board exams.',
      initial: 'SM'
    },
    {
      id: 7,
      name: 'Mr. Rakesh',
      image: Rakesh1,
      title: 'Chemistry and Science Teacher',
      qualification: 'M.Sc. Chemistry (Gold Medalist) from University of Mysore',
      expertise: ['Chemistry', 'Mathematics', 'Science', 'CBSE', 'ICSE'],
      description: 'A gold medalist M.Sc. Chemistry graduate with 8+ years of experience, Mr. Rakesh is a dedicated Chemistry, Math, and Science educator who helps Indian board students build strong fundamentals and achieve excellent results.',
      initial: 'R'
    },
    {
      id: 8,
      name: 'Ms. Salai Kulamani Birlasekar',
      image: null,
      title: 'English and Communication skills Teacher',
      qualification: 'M.Phil English | 12+ Years Experience',
      expertise: ['English', 'Communication', 'CBSE', 'ICSE', 'ISC', 'State Boards'],
      description: 'An M.Phil English educator with 12+ years of experience, Ms. Birlasekar specializes in strengthening grammar, writing, and literature skills for CBSE, ICSE, ISC, and State Board students.',
      initial: 'SB'
    },
    {
      id: 9,
      name: 'Ms. Neha Aggarwal',
      image: Neha,
      title: 'Mathematics Teacher and Subject Matter Expert',
      qualification: 'CSIR NET Qualified | Mathematics Instructor',
      expertise: ['Mathematics', 'CBSE', 'ICSE', 'Problem Solving'],
      description: 'A CSIR NET-qualified Mathematics educator, Ms. Neha specializes in guiding CBSE and ICSE students of Classes 9–12 with a strong focus on conceptual clarity, structured problem-solving, and exam readiness.',
      initial: 'NA'
    }
  ];
  const toggleExpertise = (tutorId: number) => {
    setExpandedExpertise(prev => ({
      ...prev,
      [tutorId]: !prev[tutorId]
    }));
  };
  const highlights = [
    {
      icon: Award,
      title: 'Expertise & Experience',
      description: 'Average 10+ years of experience in board exam preparation with proven results'
    },
    {
      icon: BookOpen,
      title: 'Highly Qualified Tutors',
      description: 'Expert educators with extensive experience and proven track records'
    },
    {
      icon: Heart,
      title: 'Passion for Teaching',
      description: 'Dedicated to student success with personalized mentoring and continuous support'
    },
    {
      icon: Users,
      title: 'Small Batch Teaching',
      description: 'Individual attention in small batches for better learning outcomes'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <main>
        {/* Hero Section */}
        <section className="bg-white py-8 sm:py-12 lg:py-12 border-b border-gray-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-12 items-center">
              <div className="text-center lg:text-left">
                <span className="inline-block bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
                  Meet Our Expert Team
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                  Our Tutors
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6 sm:mb-8">
                  Our tutors are carefully selected from top educational institutions and have a proven track record in helping students achieve exceptional results.
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-4 justify-center lg:justify-start">
                  <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm">
                    <span>✅</span> Highly Qualified
                  </div>
                  <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm">
                    <span>✅</span> 12+ Years Avg Experience
                  </div>
                  <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm">
                    <span>✅</span> Expert Teachers
                  </div>
                </div>
              </div>
              <div className="block">
                <img 
                  src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800" 
                  alt="Expert Tutors" 
                  className="rounded-2xl shadow-2xl w-full mt-6 lg:mt-0"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Tutors Grid */}
        <section className="py-8 sm:py-12 lg:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">Meet Our Expert Faculty</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2">Each tutor brings specialized expertise and a passion for helping students achieve their academic goals.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {tutors.map((tutor) => (
                <div 
                  key={tutor.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-gray-100 hover:border-primary/50"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-br from-gray-50 to-white p-4 sm:p-6 text-center border-b border-gray-100">
                    {tutor.image ? (
                      <img
                        src={tutor.image}
                        alt={tutor.name}
                        className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full mx-auto mb-4 sm:mb-6 object-cover shadow-lg group-hover:scale-105 transition-transform border-4 border-primary/20"
                        onError={(e) => {
                          // If image fails to load, hide it and show initials
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const initialsDiv = target.nextElementSibling as HTMLElement;
                          if (initialsDiv) {
                            initialsDiv.style.display = 'flex';
                          }
                        }}
                      />
                    ) : null}
                    {/* Initials fallback - shown if no image or image fails to load */}
                    <div
                      className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 text-3xl sm:text-4xl md:text-5xl font-bold text-primary-foreground shadow-lg group-hover:scale-105 transition-transform"
                      style={{ display: tutor.image ? 'none' : 'flex' }}
                    >
                      {tutor.initial}
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-2">
                      {tutor.name}
                    </h3>
                    <p className="text-gray-600 text-xs sm:text-sm md:text-base leading-relaxed">
                      {tutor.title}
                    </p>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-6">
                    {/* Qualification */}
                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs sm:text-base text-gray-500 font-medium mb-1">Qualification:</p>
                      <p className="text-gray-800 font-semibold text-xs sm:text-base">{tutor.qualification}</p>
                    </div>

                    {/* Expertise */}
                    <div className="mb-3 sm:mb-4">
                      <p className="text-xs sm:text-base text-gray-500 font-medium mb-2">Expertise:</p>
                      <div className="flex flex-wrap gap-1 sm:gap-2">
                        {(expandedExpertise[tutor.id] ? tutor.expertise : tutor.expertise.slice(0, 4)).map((item, idx) => (
                          <span 
                            key={idx}
                            className="bg-primary/10 text-primary text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full"
                          >
                            {item}
                          </span>
                        ))}
                        {tutor.expertise.length > 4 && (
                          <button 
                            onClick={() => toggleExpertise(tutor.id)}
                            className="bg-gradient-to-r from-primary to-primary-dark text-primary-foreground text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-1.5 rounded-full hover:shadow-md transition-all cursor-pointer font-medium"
                          >
                            {expandedExpertise[tutor.id] ? '- Show less' : `+${tutor.expertise.length - 4} more`}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 text-xs sm:text-base leading-relaxed">
                      {tutor.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Teaching Approach */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="text-center mb-8 sm:mb-12">
              <span className="inline-block bg-accent/20 text-accent px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
                🎯 Our Approach
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                How We Help Students Excel
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {[
                { img: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=250&fit=crop", title: "Interactive Classes", desc: "Live engagement & discussions" },
                { img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=400&h=250&fit=crop", title: "Personalized Learning", desc: "Tailored to each student" },
                { img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=250&fit=crop", title: "Exam Focused", desc: "Strategic test preparation" },
                { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=250&fit=crop", title: "Doubt Solving", desc: "24/7 support & guidance" }
              ].map((item, idx) => (
                <div key={idx} className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl group transition-shadow duration-300">
                  <div className="relative h-48 sm:h-56">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 text-white">
                      <h3 className="font-bold text-sm sm:text-base">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-white/90">{item.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Our Tutors Stand Out */}
        <section className="py-8 sm:py-12 bg-gray-50">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {highlights.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 sm:p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 hover:border-primary/50 text-center group"
                >
                  <div className="w-14 sm:w-16 h-14 sm:h-16 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4 shadow-lg group-hover:scale-105 transition-transform">
                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-gray-900 text-xs sm:text-base mb-2">{item.title}</h3>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-gradient-to-r from-primary via-primary-light to-primary-dark text-primary-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <img 
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop" 
              alt="" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-2xl md:text-4xl font-bold mb-4">
              Book a Free Demo Class and Experience World-Class Education
            </h2>
            <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of students who have achieved their academic dreams with Nova Tuitions expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                📞 Book Free Demo Class
              </button>
            </div>
          </div>
        </section>

        <ScheduleFreeDemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      </main>
    </div>
  );
};

export default TutorsNew;
