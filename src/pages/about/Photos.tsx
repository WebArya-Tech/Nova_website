import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import onlineClass from "@/assets/gallery/online-class-1.jpg";
import studentsStudying from "@/assets/gallery/students-studying.jpg";
import teacherDesk from "@/assets/gallery/teacher-desk.jpg";
import studentSuccess from "@/assets/gallery/student-success.jpg";
import studyMaterials from "@/assets/gallery/study-materials.jpg";
import digitalBoard from "@/assets/gallery/digital-board.jpg";

const STATIC_PHOTOS = [
  { id: 'default-1', src: onlineClass, title: "Live Online Teaching Session", description: "Interactive online classes with expert teachers" },
  { id: 'default-2', src: studentsStudying, title: "Students Learning Together", description: "Collaborative learning environment" },
  { id: 'default-3', src: teacherDesk, title: "Professional Teaching Setup", description: "Modern digital teaching infrastructure" },
  { id: 'default-4', src: studentSuccess, title: "Student Achievement", description: "Celebrating academic excellence" },
  { id: 'default-5', src: studyMaterials, title: "Study Materials", description: "Comprehensive learning resources" },
  { id: 'default-6', src: digitalBoard, title: "Digital Whiteboard", description: "Advanced teaching tools and technology" },
];

const Photos = () => {
  const [adminPhotos, setAdminPhotos] = useState<any[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('nova_photo_gallery');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Only use admin entries that have a real imageUrl
        const withUrls = parsed.filter((p: any) => p.imageUrl && p.imageUrl.trim());
        setAdminPhotos(withUrls);
      } catch { /* ignore */ }
    }
  }, []);

  // Merge: admin photos with URLs first, then fill remaining slots from static defaults
  const displayPhotos = [
    ...adminPhotos.map(p => ({ id: p.id, src: p.imageUrl, title: p.title, description: p.description })),
    ...STATIC_PHOTOS.filter(sp => !adminPhotos.find(ap => ap.id === sp.id)),
  ];

  return (
    <div className="min-h-screen py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-center">Photo Gallery</h1>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Glimpses of our teaching sessions, student achievements, and memorable moments at Nova Tuitions
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayPhotos.map((image) => (
              <Card key={image.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105">
                <CardContent className="p-0">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={image.src}
                      alt={image.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">{image.title}</h3>
                    <p className="text-sm text-muted-foreground">{image.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Want to see more?</p>
            <a
              href="https://www.facebook.com/NOVAtuitions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-primary-light text-primary-foreground px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Visit Our Facebook Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Photos;

