import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Users } from 'lucide-react';
import { cbseGrades } from '@/data/boardsData';

const CBSEBoard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-primary-dark to-primary text-primary-foreground py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">CBSE Board Programs</h1>
            <p className="text-xl md:text-2xl text-primary-foreground/90 max-w-3xl mx-auto">
              Comprehensive coaching for CBSE students from Grade 6 to Grade 12
            </p>
          </div>
        </div>
      </section>

      {/* Grades Overview */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Select Your Grade</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose your grade to explore comprehensive subject offerings
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Object.entries(cbseGrades).map(([gradeNum, gradeData]) => (
              <div key={gradeNum} className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-4 bg-primary/10 rounded-full">
                    <GraduationCap className="text-primary" size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{gradeData.label}</h3>
                </div>
                
                <div className="space-y-3">
                  {gradeData.subjects.map((subject) => (
                    <Link
                      key={subject.id}
                      to={subject.path}
                      className="flex items-center justify-between p-4 bg-gray-50 hover:bg-primary/10 rounded-lg transition-colors group"
                    >
                      <span className="font-semibold text-gray-900 group-hover:text-primary">
                        {subject.name}
                      </span>
                      <BookOpen className="text-gray-400 group-hover:text-primary transition-colors" size={20} />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose CBSE at Nova */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Nova for CBSE?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'NCERT-Focused Curriculum',
                description: 'Complete alignment with CBSE and NCERT guidelines ensuring comprehensive preparation.',
                icon: BookOpen
              },
              {
                title: 'Experienced Faculty',
                description: 'Expert teachers with deep understanding of CBSE examination patterns and requirements.',
                icon: Users
              },
              {
                title: 'Board Exam Excellence',
                description: 'Focused preparation for CBSE Board examinations with regular assessments and mock tests.',
                icon: GraduationCap
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-8 shadow-lg text-center">
                <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                  <feature.icon className="text-primary" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CBSEBoard;
