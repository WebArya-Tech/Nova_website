import { Card, CardContent } from "@/components/ui/card";
import { Users, BookOpen, GraduationCap, Target } from "lucide-react";

const History = () => {
  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">Brief History of Nova Tuitions</h1>
          
          <div className="prose prose-lg max-w-none mb-12">
            <p className="text-lg text-muted-foreground mb-6">
              Nova Tuitions was established by Rohit, Manish, two other IITians, Amaresh and four experienced entrepreneurs with a shared vision—to create a high-quality, reliable, and result-oriented tutoring ecosystem for Indian students.
            </p>
            
            <p className="text-lg text-muted-foreground mb-6">
              What began as a small group of passionate educators has now grown into a trusted learning platform known for its strong academic foundation, personalized teaching, and consistent student success.
            </p>

            <p className="text-lg text-muted-foreground mb-6">
              Over the last 25+ years, Nova Tuitions has specialized in teaching students from CBSE, ICSE, ISC, and various State Boards, covering Grades 6 to 12 across all major subjects. Our mission has always been simple: to strengthen concepts, build confidence, and help every student achieve academic excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Academic Tutoring</h3>
                <p className="text-muted-foreground">
                  Specialized teaching for CBSE, ICSE, ISC, and State Boards covering all major subjects from grades 6 to 12.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">College Counseling</h3>
                <p className="text-muted-foreground">
                  Expert guidance for admissions to Indian colleges and universities, including stream selection.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Study Abroad Support</h3>
                <p className="text-muted-foreground">
                  Comprehensive admission support and guidance for students planning to study abroad.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-xl mb-3">Academic Assistance</h3>
                <p className="text-muted-foreground">
                  Help with school projects, assignments, essays, and presentations to enhance learning.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="bg-secondary/30 rounded-lg p-8">
            <p className="text-lg text-muted-foreground mb-4">
              Today, the Nova team includes <span className="font-semibold text-primary">10 expert teachers</span>, each with extensive experience in training hundreds of students across different boards. With deep subject knowledge, structured pedagogy, and a student-centric approach, our teachers form the backbone of Nova Tuitions and uphold our commitment to excellence.
            </p>
            <p className="text-lg text-foreground font-medium">
              From humble beginnings to becoming a trusted name in online tutoring, Nova Tuitions continues to inspire, mentor, and guide students toward a brighter academic future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
