import { Button } from '@/components/ui/button';
import { BookOpen, Users, Clock, Award, CheckCircle, Target, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

interface SubjectPageProps {
  grade: string;
  subject: string;
  board: string;
  title: string;
  subtitle: string;
  overview: string[];
  keyAreas: string[];
  methodology: Array<{
    title: string;
    description: string;
  }>;
  learningOutcomes: string[];
  whyChoose?: Array<{
    title: string;
    description: string;
  }>;
}

const SubjectPageTemplate = ({
  grade,
  subject,
  board,
  title,
  subtitle,
  overview,
  keyAreas,
  methodology,
  learningOutcomes,
  whyChoose
}: SubjectPageProps) => {
  const defaultWhyChoose = [
    {
      title: 'Experienced Faculty',
      description: `Qualified and experienced teachers with expertise in ${board} ${subject}.`
    },
    {
      title: 'Personalized Learning',
      description: 'Individual attention to address each student\'s strengths and improvement areas.'
    },
    {
      title: 'Flexible Learning',
      description: 'Attend classes from the comfort of your home with access to recorded sessions.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary via-primary-dark to-primary text-primary-foreground py-6 md:py-8 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block px-3 py-1 md:px-4 md:py-2 bg-white/20 rounded-full text-xs md:text-sm font-semibold mb-3 md:mb-4">
              {board} Board
            </div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 px-2">{title}</h1>
            <p className="text-base md:text-xl lg:text-2xl text-primary-foreground/90 mb-4 md:mb-6 px-2">
              {subtitle}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4 px-4">
              <Link to="/schedule-demo" className="w-full sm:w-auto">
                <Button size="lg" variant="secondary" className="shadow-lg w-full sm:w-auto">
                  Schedule Free Demo
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white w-full sm:w-auto">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Course Overview */}
      <section className="py-8 lg:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Course Overview</h2>
            {overview.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 leading-relaxed mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Key Learning Areas */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Key Learning Areas</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keyAreas.map((topic, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-primary">
                <div className="flex items-center gap-3">
                  <CheckCircle className="text-primary shrink-0" size={24} />
                  <h3 className="font-semibold text-gray-900">{topic}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Our Teaching Methodology</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {methodology.map((method, index) => {
              const icons = [Users, BookOpen, Target, Award, TrendingUp, Clock];
              const Icon = icons[index % icons.length];
              return (
                <div key={index} className="bg-white rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon className="text-primary" size={32} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
                      <p className="text-gray-700 leading-relaxed">{method.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-12 lg:py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Learning Outcomes</h2>
          <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
            <p className="text-lg text-gray-700 mb-6">By the end of the course, students will:</p>
            <div className="grid md:grid-cols-2 gap-4">
              {learningOutcomes.map((outcome, index) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                  <p className="text-gray-700">{outcome}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Nova */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose Nova Tuitions?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {(whyChoose || defaultWhyChoose).map((feature, index) => {
              const icons = [Award, Target, Clock];
              const Icon = icons[index % icons.length];
              return (
                <div key={index} className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 text-center hover:shadow-xl transition-shadow">
                  <div className="inline-flex p-4 bg-primary/10 rounded-full mb-4">
                    <Icon className="text-primary" size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-700">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary via-primary-dark to-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Enroll Today</h2>
          <p className="text-xl mb-8 text-primary-foreground/90">
            Help your child develop knowledge, confidence, and a strong foundation in {subject} through engaging and interactive learning at Nova Tuitions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/schedule-demo">
              <Button size="lg" variant="secondary" className="shadow-lg">
                Schedule Free Demo
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubjectPageTemplate;
