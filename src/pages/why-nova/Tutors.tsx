import React, { useState, useEffect } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAllTutors } from '@/api/tutorApi'
import AISHWARYA from '@/assets/Teacher/AISHWARYA.png'
import VijayKalyan from '@/assets/Teacher/VijayKalyan.jpeg'
import SARITHA from '@/assets/Teacher/SARITHA.PNG'
import SANT from '@/assets/Teacher/SANT.jpeg'
import Ramya from '@/assets/Teacher/Ramya.jpg'
import RamMohan from '@/assets/Teacher/RamMohan.jpg'
import Balu from '@/assets/Teacher/Balu.jpg'
import Neha from '@/assets/Teacher/Neha.png'
import Rakesh from '@/assets/Teacher/Rakesh.jpg'
import Ashwin from '@/assets/Teacher/Ashwin.jpeg'
import RohitGupta from '@/assets/Teacher/RohitGupta.jpg'
import Salai from '@/assets/Teacher/salai.png'

export default function OurTutors() {
  const [expandedExpertise, setExpandedExpertise] = useState({})
  const [tutors, setTutors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTutors = async () => {
      setLoading(true)
      try {
        // Fetch only active tutors for frontend display
        const allTutors = await getAllTutors(false)
        // Filter only active tutors
        const activeTutors = Array.isArray(allTutors) ? allTutors.filter(t => t.active !== false) : []
        
        // Use fetched data if available, otherwise use fallback
        if (activeTutors.length > 0) {
          setTutors(activeTutors)
        } else {
          setTutors(fallbackTutors)
        }
        setError(null)
      } catch (err) {
        console.log('API not ready yet, using static fallback data')
        setTutors(fallbackTutors)
        setError(null)
      } finally {
        setLoading(false)
      }
    }

    fetchTutors()
  }, [])

  const toggleExpertise = (tutorId) => {
    setExpandedExpertise(prev => ({
      ...prev,
      [tutorId]: !prev[tutorId]
    }))
  }

  // Hardcoded fallback data in case API fails (backward compatibility)
  const fallbackTutors = [
    {
      id: 1,
      name: 'B. Aishwarya',
      image: AISHWARYA,
      title: 'Chemistry Expert | SAT Subject Test & AP Chemistry Trainer',
      qualification: 'M.Sc. in Chemistry from NIT Rourkela | GATE (Chemistry) AIR 390',
      expertise: ['Chemistry', 'SAT Subject Test', 'AP Chemistry', 'GRE', 'GMAT Quant'],
      description: 'B. Aishwarya is an accomplished Chemistry educator specializing in preparing students for global standardized exams such as SAT Subject Tests, AP Chemistry, and foundational Chemistry sections relevant to GRE and GMAT Quant. An expert with a M.Sc. in Chemistry from NIT Rourkela, she further distinguished herself by clearing GATE (Chemistry) with an impressive AIR 390. Aishwarya has extensive experience designing curriculum-aligned study material, structured notes, and exam-focused summaries for international learners. Her deep conceptual clarity and ability to simplify challenging topics make her highly effective in preparing students for competitive aptitude-based tests. She uses visual explanations, digital tools, and analytical teaching methods to strengthen students\' conceptual understanding, reasoning skills, and problem-solving speed—skills crucial for exams like SAT, AP, GRE, and GMAT. Aishwarya remains committed to helping learners build confidence, overcome weaknesses, and achieve high scores in international Chemistry and Quantitative exams.',
      initial: 'BA'
    },
   
    {
      id: 2,
      name: 'Ms. Balasaritha P',
      image: SARITHA,
      title: 'Physics & Mathematics Educator | SAT, ACT & AP Physics Specialist',
      qualification: 'Ph.D. in Physics | NET Qualified (AIR 132)',
      expertise: ['Physics', 'Mathematics', 'SAT', 'ACT', 'AP Physics', 'GRE Quant'],
      description: 'Ms. Balasaritha P is a highly qualified Physics and Mathematics faculty member with a Ph.D. in Physics and NET qualification (AIR 132). She now focuses exclusively on mentoring students for SAT Math, SAT Subject Tests, ACT Math & Science, AP Physics, and GRE Quant preparation. Her experience spans both digital learning platforms and personalized coaching. She specializes in curriculum mapping, high-yield concept reinforcement, and pattern-based problem-solving, perfectly aligned with international test formats. Her clarity, patience, and step-by-step explanations help learners master challenging topics such as mechanics, electricity, calculus-based reasoning, and data interpretation. With a student-first approach, she ensures students consistently perform with confidence in global competitive exams.',
      initial: 'BP'
    },
   
    {
      id: 3,
      name: 'Ms. Ramya Rajamani',
      image: Ramya,
      title: 'Mathematics, Statistics & Quant Trainer | SAT, ACT, IMO, TMUA, GRE, GMAT Specialist',
      qualification: '19+ Years of Teaching Experience | Research Analyst Background',
      expertise: ['Algebra & Advanced Functions', 'Calculus (School & AP Level)', 'Statistics & Probability', 'Graphical/Data Interpretation', 'Quantitative Comparison & Analytical Skills'],
      description: 'With over 19 years of experience, Ms. Ramya Rajamani is a senior educator specializing in SAT Math, ACT Math, TMUA, GRE Quantitative Reasoning, GMAT Quant, AP Statistics, and AP Calculus fundamentals. She teaches with exceptional clarity and ensures students build strong fundamentals needed for high performance in quantitative sections. Her expertise covers Algebra & Advanced Functions, Calculus (School & AP Level), Statistics & Probability, Graphical/Data Interpretation, and Quantitative Comparison & Analytical Skills. Her background as a Research Analyst enables her to connect theoretical math with real-world logic—making her training highly effective for GRE, GMAT, and SAT-style reasoning questions. With her calm, encouraging, and structured approach, she helps students achieve competitive international exam scores.',
      initial: 'RR'
    },
    {
      id: 4,
      name: 'Mr. Ram G. Mohan',
      image: RamMohan,
      title: 'Physics & Quant Educator | IIT Delhi | SAT, ACT, AP & GRE Tutor',
      qualification: 'M.Tech from IIT Delhi | 10+ Years Teaching Experience',
      expertise: ['AP Physics (Mechanics & Electricity)', 'SAT/ACT problem-solving', 'GRE/GMAT Quant', 'Data-driven assessment'],
      description: 'Mr. Ram G. Mohan, with an M.Tech from IIT Delhi, is an accomplished educator specializing in Physics and Quantitative Reasoning for SAT, ACT, AP Physics, GRE, and GMAT Quant. His academic depth and more than a decade of teaching experience make him a highly respected trainer. His test-prep experience includes AP Physics (Mechanics & Electricity) coaching, SAT/ACT problem-solving strategies, GRE/GMAT Quant strengthening, and Data-driven assessment and feedback. His prior work in top software companies enriches his approach, helping students relate abstract concepts to real-world logic—a key requirement for global standardized exams. Known for his disciplined teaching and conceptual clarity, he helps learners achieve exceptional results.',
      initial: 'RM'
    },
    {
      id: 5,
      name: 'Mr. K. V. Bala Subramanyam',
      image: Balu,
      title: 'Physics Faculty | SAT, ACT & AP Physics Mentor',
      qualification: 'Physics Educator | 15+ Years Experience',
      expertise: ['Conceptual clarity for Physics-based reasoning', 'Numerical problem-solving', 'Test-taking techniques for SAT/ACT', 'Analytical thinking for AP Physics'],
      description: 'Mr. Balu is a dedicated Physics educator with 15+ years of experience, now specializing in SAT Physics, ACT Science, AP Physics, and GRE Physics fundamentals. Renowned for his structured teaching, he excels in breaking down complex Physics concepts into simple, manageable frameworks. His training emphasizes conceptual clarity for Physics-based reasoning, numerical problem-solving for standardized tests, test-taking techniques for SAT/ACT, and analytical thinking needed in AP Physics exams. His student-centered and supportive teaching style helps learners overcome fear, build confidence, and achieve top scores in international Physics assessments.',
      initial: 'KB'
    },
    
    {
      id: 6,
      name: 'Mr. Shambhu M. G.',
      image: Ashwin,
      title: 'Biology Expert | AP Biology & SAT Biology Mentor',
      qualification: 'M.Sc. Biotechnology | IISc Bengaluru Research Experience | 15+ Years',
      expertise: ['High-yield AP Biology themes', 'SAT Biology pattern-based preparation', 'Visual learning and memory techniques', 'Exam-focused chapter prioritization', 'Practice with advanced problems and diagrams'],
      description: 'Mr. Shambhu is a senior Biology educator with 15+ years of experience, specializing in AP Biology, SAT Biology (E/M), and foundational biological reasoning for GRE subject-level preparation. He excels in simplifying complex biological processes, using real-life examples to strengthen conceptual understanding essential for standardized tests. His lessons emphasize high-yield AP Biology themes, SAT Biology pattern-based preparation, visual learning and memory techniques, exam-focused chapter prioritization, and practice with advanced problems and diagrams. Mr. Shambhu\'s student-friendly, clear, and motivational teaching style consistently helps learners achieve strong results in international Biology exams.',
      initial: 'SM'
    },
    {
      id: 7,
      name: 'Mr. Rakesh',
      image:Rakesh,
      title: 'Chemistry, Math & Quantitative Aptitude Trainer | SAT, ACT, AP, GRE Mentor',
      qualification: 'M.Sc. Chemistry (Gold Medalist) from University of Mysore',
      expertise: ['Concept-focused Chemistry for AP & SAT', 'Quantitative reasoning for GRE/GMAT', 'Algebra, geometry, and calculus foundations', 'Real-life examples to simplify complex concepts'],
      description: 'Mr. Rakesh, a gold medallist from the University of Mysore, is an accomplished educator specializing in SAT Math, ACT Math & Science, AP Chemistry, and GRE/GMAT Quant. His core strengths include concept-focused Chemistry for AP & SAT, quantitative reasoning for GRE/GMAT, algebra, geometry, and calculus foundations for SAT/ACT, and real-life examples to simplify complex concepts. His friendly and structured teaching style helps students confidently approach high-level test problems and consistently improve their scores.',
      initial: 'R'
    },
    
   
    {
      id: 8,
      name: 'Ms. Neha Aggarwal',
      image: Neha,
      title: 'Mathematics Faculty | SAT, ACT, GRE/GMAT, TMUA Quant & AP Math Trainer',
      qualification: 'CSIR NET Qualified | Mathematics Instructor',
      expertise: ['Strong conceptual foundations', 'Problem-solving strategies for competitive exams', 'Logical reasoning using math + programming insights', 'Confidence-building through guided practice'],
      description: 'Ms. Neha Aggarwal is a committed Maths educator specializing in SAT Math, ACT Math, GRE Quant, TMUA, GMAT Quant, and AP-level mathematical foundations. Having qualified CSIR NET, she brings academic rigor and conceptual clarity to her training. Her teaching focuses on strong conceptual foundations, problem-solving strategies for competitive exams, logical reasoning using math + programming insights, and confidence-building through guided practice. Her goal is to make mathematics intuitive and enjoyable for students preparing for global standardized tests.',
      initial: 'NA'
    },
    {
      id: 9,
      name: 'Ms. Salai Kulamani Birlasekar',
      image: Salai,
      title: 'English Language & Verbal Reasoning Expert | SAT, ACT, GRE, GMAT Tutor',
      qualification: 'Content Writing & Editing Background | 12+ Years Experience',
      expertise: ['Grammar & usage mastery for standardized tests', 'Critical reading strategies for SAT/ACT', 'Analytical Writing training for GRE/GMAT', 'Essay writing for SAT & AP English', 'Vocabulary-building through structured methods'],
      description: 'With 12+ years of experience, Ms. Birlasekar specializes in English Language, Reading Comprehension, Writing Skills, and Verbal Reasoning for exams like SAT, ACT, AP English, GRE, GMAT, and TOEFL-level communication skills. Her expertise includes grammar & usage mastery for standardized tests, critical reading strategies for SAT/ACT, analytical writing training for GRE/GMAT, essay writing for SAT & AP English, and vocabulary-building through structured methods. Her precision in language instruction and strong command over English enable students to achieve significant improvements in verbal scores.',
      initial: 'SB'
    },
  ]
  const highlights = [
    {
      icon: '🎓',
      title: 'Expertise & Experience',
      description: 'Average 12+ years of experience in competitive exam preparation with proven results'
    },
    {
      icon: '🏆',
      title: 'Highly Qualified Tutors',
      description: 'Expert educators with extensive experience and proven track records in test preparation'
    },
    {
      icon: '❤️',
      title: 'Passion for Teaching',
      description: 'Dedicated to student success with personalized mentoring and continuous support'
    },
    {
      icon: '📚',
      title: 'Continuous Learning',
      description: 'Regular training and updates on latest exam patterns and teaching methodologies'
    }
  ]
  return (
    <div className="min-h-screen">
      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground py-6 lg:py-6 relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-light/20 rounded-full blur-3xl"></div>
          </div>
          <div className="absolute inset-0 opacity-10">
            <img src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
             
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Our <span className="text-accent">Expert</span> Tutors
              </h1>
              <p className="text-xl lg:text-2xl opacity-95 max-w-3xl mx-auto leading-relaxed">
                Our tutors are carefully selected from top educational institutions and have a proven track record in helping students achieve exceptional results.
              </p>
             
            </div>
          </div>
        </section>

        {/* Introduction */}
        <section className="py-8 lg:py-8 bg-secondary/30 relative">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
              <div>
                <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Why Choose Our Faculty</span>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">World-Class Educators at Your Fingertips</h2>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  Each tutor brings specialized expertise and a passion for helping students achieve their academic goals. Our faculty members are not just teachers – they are mentors who have walked the path of academic excellence themselves.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">Highly Qualified</span>
                  <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">12+ Years Avg Experience</span>
                  <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold">Global Test Prep Experts</span>
                </div>
              </div>
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                  alt="Expert faculty" 
                  className="rounded-2xl shadow-2xl w-full object-cover h-[350px]"
                />
               
              </div>
            </div>
          </div>
        </section>

        {/* Tutors Grid */}
        <section className="py-8 lg:py-8 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 relative">
            <div className="text-center mb-14">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">Our Faculty</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Meet Our Expert Faculty</h2>
              <p className="text-lg text-muted-foreground mt-3 max-w-2xl mx-auto">Highly qualified educators dedicated to your academic success</p>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary"></div>
              </div>
            )}

            {/* Tutors Grid */}
            {!loading && tutors && tutors.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {tutors.map((tutor) => (
                <div 
                  key={tutor.id}
                  className="bg-background rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group border border-border hover:border-primary/30"
                >
                  {/* Card Header with Image */}
                  <div className="bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 p-6 sm:p-8 text-center border-b border-border relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full translate-y-1/2 -translate-x-1/2"></div>
                    {tutor.image ? (
                      <div className="relative">
                        <img
                          src={tutor.image}
                          alt={tutor.name}
                          className="w-40 sm:w-48 md:w-52 h-40 sm:h-48 md:h-52 rounded-full mx-auto mb-5 object-cover shadow-xl group-hover:scale-105 transition-transform duration-500 ring-4 ring-primary/20"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      </div>
                    ) : null}
                    <div
                      className="w-32 sm:w-40 md:w-44 h-32 sm:h-40 md:h-44 bg-gradient-to-br from-primary to-primary-light rounded-full flex items-center justify-center mx-auto mb-5 text-4xl sm:text-5xl font-bold text-primary-foreground shadow-xl group-hover:scale-105 transition-transform duration-500"
                      style={{ display: tutor.image ? 'none' : 'flex' }}
                    >
                      {tutor.initial}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 relative">
                      {tutor.name}
                    </h3>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed relative">
                      {tutor.title}
                    </p>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8">
                    {/* Qualification */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Qualification</p>
                      <p className="text-foreground font-semibold text-sm sm:text-base">{tutor.qualification}</p>
                    </div>

                    {/* Expertise */}
                    <div className="mb-4">
                      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Expertise</p>
                      <div className="flex flex-wrap gap-1.5">
                        {(expandedExpertise[tutor.id] ? tutor.expertise : tutor.expertise.slice(0, 4)).map((item, idx) => (
                          <span 
                            key={idx}
                            className="bg-primary/5 text-primary text-xs sm:text-sm px-2.5 py-1 rounded-full border border-primary/10"
                          >
                            {item}
                          </span>
                        ))}
                        {tutor.expertise.length > 4 && (
                          <button 
                            onClick={() => toggleExpertise(tutor.id)}
                            className="bg-primary text-primary-foreground text-xs sm:text-sm px-3 py-1 rounded-full hover:bg-primary-light transition-all cursor-pointer font-medium"
                          >
                            {expandedExpertise[tutor.id] ? '- Show less' : `+${tutor.expertise.length - 4} more`}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm leading-relaxed line-clamp-4">
                      {tutor.description}
                    </p>
                  </div>
                </div>
              ))}
              </div>
            )}
          </div>
        </section>

        {/* Why Our Tutors Stand Out */}
        <section className="py-8 lg:py-8 bg-secondary/30 relative overflow-hidden">
          <div className="absolute inset-0 opacity-5">
            <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200" alt="" className="w-full h-full object-cover" />
          </div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-14">
              <span className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-4">What Makes Us Different</span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Why Our Tutors Stand Out</h2>
              <p className="text-lg text-muted-foreground mt-3 max-w-3xl mx-auto">
                With extensive experience and proven expertise, our faculty understand what it takes to succeed in competitive exams.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {highlights.map((item, idx) => (
                <div 
                  key={idx}
                  className="bg-background rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border-2 border-border hover:border-primary/30 text-center group hover:-translate-y-1"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center mx-auto mb-5 text-3xl shadow-lg group-hover:scale-110 transition-transform duration-300 ring-1 ring-primary/10">
                    {item.icon}
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

       
      </main>
    </div>
  )
}
