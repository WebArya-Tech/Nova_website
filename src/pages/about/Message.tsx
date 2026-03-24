import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";
import RohitGupta from "@/assets/Teacher/RohitGupta.jpg";

const Message = () => {
  return (
    <div className="min-h-screen py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-center">Message from Rohit Sir</h1>
          <p className="text-center text-muted-foreground text-lg mb-12">Founder, Nova Tuitions</p>

          <Card className="border-2 shadow-lg">

            <CardContent className="p-8 lg:p-12">
              <img src={RohitGupta} alt="Rohit Sir" className="w-20 h-20 rounded-full object-cover mx-auto mb-4" />
              <Quote className="w-12 h-12 text-primary mb-6 opacity-50" />

              <div className="space-y-6 text-lg text-muted-foreground">
                <p className="font-medium text-foreground text-xl">Dear Students and Parents,</p>

                <p>
                  It gives me immense pride and joy to welcome you to Nova Tuitions.
                </p>

                <p>
                  When we founded Nova more than 25 years ago, our vision was simple yet powerful — to create a learning environment where every student receives personal attention, builds strong conceptual clarity, and gains the confidence to excel academically and in life. Over the years, this vision has grown into a trusted educational platform supported by a team of highly experienced teachers and mentors who are passionate about student success.
                </p>

                <p>
                  At Nova, we believe that education is not just about marks, but about shaping thinking, nurturing curiosity, and developing discipline and self-belief. We have seen students transform from struggling to outstanding performers when they are guided correctly, encouraged consistently, and taught with care.
                </p>

                <div className="bg-secondary/30 rounded-lg p-6 my-8">
                  <p className="font-semibold text-foreground mb-3">Our approach to teaching is rooted in:</p>
                  <ul className="space-y-2 list-none">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Deep subject understanding</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Small, focused batches</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Structured learning with regular assessments</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>Personalized attention and mentorship</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span>A strong emphasis on fundamentals</span>
                    </li>
                  </ul>
                </div>

                <p>
                  Today, Nova Tuitions proudly supports students from CBSE, ICSE, ISC, and State Boards across India and abroad, helping them prepare not just for exams but for future opportunities — including college admissions, subject selection guidance, international study pathways, and project support.
                </p>

                <p>
                  To all parents who trust us and all students who learn with us, thank you for making Nova Tuitions what it is today. We remain committed to evolving continuously, maintaining the highest standards of academic excellence, and guiding every student towards success.
                </p>

                <div className="mt-8 pt-6 border-t">
                  <p className="font-medium text-foreground">With warm regards and best wishes,</p>
                  <p className="text-2xl font-bold text-primary mt-2">Rohit Gupta</p>
                  <p className="text-sm text-muted-foreground">Founder, Nova Tuitions</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <p className="text-lg text-muted-foreground mb-4">
              Ready to experience the Nova difference?
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
    </div>
  );
};

export default Message;
