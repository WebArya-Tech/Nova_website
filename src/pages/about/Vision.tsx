import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye } from "lucide-react";

const Vision = () => {
  return (
    <div className="min-h-screen py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-12 text-center">Vision & Mission</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            <Card className="border-2 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-center mb-6 text-primary">Our Mission</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    At Nova Tuitions, our mission is to <span className="font-semibold text-foreground">empower students with strong academic foundations, conceptual clarity, and confidence</span>, enabling them to excel in school examinations and beyond.
                  </p>
                  <p>
                    We are committed to providing high-quality, personalized online education that is accessible, flexible, and aligned with the evolving needs of students from CBSE, ICSE, ISC, and State Boards.
                  </p>
                  <p>
                    Through expert teaching, continuous mentorship, and a structured learning approach, we strive to shape <span className="font-semibold text-foreground">disciplined, curious, and self-driven learners</span> who are prepared for future academic and career success.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 shadow-lg">
              <CardContent className="p-8">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6 mx-auto">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-center mb-6 text-primary">Our Vision</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Our vision is to become <span className="font-semibold text-foreground">India's most trusted and result-driven online tutoring platform</span> for school students by delivering exceptional academic support and creating meaningful learning experiences.
                  </p>
                  <p>
                    We aim to build a community where every student, regardless of background or location, receives the guidance and encouragement needed to unlock their full potential.
                  </p>
                  <p>
                    Nova Tuitions envisions a future in which education is <span className="font-semibold text-foreground">inspiring, engaging, and future-ready</span>—where students learn with joy, think creatively, and develop the skills to lead with confidence in a rapidly changing world.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-2 shadow-lg bg-gradient-to-br from-primary/5 to-primary/10">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4 text-foreground">Our Core Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">Excellence</div>
                  <p className="text-muted-foreground">Delivering the highest quality education and support</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">Integrity</div>
                  <p className="text-muted-foreground">Building trust through transparency and honesty</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-primary mb-2">Growth</div>
                  <p className="text-muted-foreground">Fostering continuous learning and development</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Vision;
