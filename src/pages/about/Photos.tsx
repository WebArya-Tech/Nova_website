import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { X, ZoomIn, Sparkles } from "lucide-react";
import onlineClass from "@/assets/gallery/online-class-1.jpg";
import studentsStudying from "@/assets/gallery/students-studying.jpg";
import teacherDesk from "@/assets/gallery/teacher-desk.jpg";
import studentSuccess from "@/assets/gallery/student-success.jpg";
import studyMaterials from "@/assets/gallery/study-materials.jpg";
import digitalBoard from "@/assets/gallery/digital-board.jpg";

const STATIC_PHOTOS = [
  { 
    id: 'default-1', 
    src: onlineClass, 
    title: "Live Online Teaching Session", 
    description: "Interactive online classes with expert teachers",
    category: "Classes" 
  },
  { 
    id: 'default-2', 
    src: studentsStudying, 
    title: "Students Learning Together", 
    description: "Collaborative learning environment",
    category: "Students" 
  },
  { 
    id: 'default-3', 
    src: teacherDesk, 
    title: "Professional Teaching Setup", 
    description: "Modern digital teaching infrastructure",
    category: "Infrastructure" 
  },
  { 
    id: 'default-4', 
    src: studentSuccess, 
    title: "Student Achievement", 
    description: "Celebrating academic excellence",
    category: "Success" 
  },
  { 
    id: 'default-5', 
    src: studyMaterials, 
    title: "Study Materials", 
    description: "Comprehensive learning resources",
    category: "Resources" 
  },
  { 
    id: 'default-6', 
    src: digitalBoard, 
    title: "Digital Whiteboard", 
    description: "Advanced teaching tools and technology",
    category: "Technology" 
  },
];

const Photos = () => {
  const [adminPhotos, setAdminPhotos] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('nova_photo_gallery');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        const withUrls = parsed.filter((p: any) => p.imageUrl && p.imageUrl.trim());
        setAdminPhotos(withUrls);
      } catch { /* ignore */ }
    }
    setIsVisible(true);
  }, []);

  const displayPhotos = [
    ...adminPhotos.map(p => ({ id: p.id, src: p.imageUrl, title: p.title, description: p.description, category: p.category || "Gallery" })),
    ...STATIC_PHOTOS.filter(sp => !adminPhotos.find(ap => ap.id === sp.id)),
  ];

  const categories = ["All", ...new Set(displayPhotos.map(p => p.category))];
  const filteredPhotos = activeFilter === "All" 
    ? displayPhotos 
    : displayPhotos.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <section className="relative py-8 lg:py-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1600&h=900&fit=crop"
            alt="Photo Gallery"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/85 via-primary-dark/75 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
           

            <h1
              className={`text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Photo <span className="text-accent font-bold">Gallery</span>
            </h1>

            <p
              className={`text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Glimpses of our teaching sessions, student achievements, and memorable moments at Nova Tuitions
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-8 lg:py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Filter Buttons */}
            <div
              className={`flex flex-wrap justify-center gap-3 mb-16 transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "300ms" }}
            >
              {categories.map((category, idx) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform ${
                    activeFilter === category
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-105"
                      : "bg-white border-2 border-primary/20 text-foreground hover:border-primary/40 hover:bg-primary/5 hover:scale-105"
                  }`}
                  style={{ transitionDelay: `${300 + idx * 50}ms` }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Masonry Gallery */}
            <div
              className={`columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 transform transition-all duration-1000 ${
                isVisible ? "opacity-100" : "opacity-0"
              }`}
            >
              {filteredPhotos.map((photo, index) => (
                <div
                  key={photo.id}
                  className={`group relative break-inside-avoid overflow-hidden rounded-3xl cursor-pointer transform transition-all duration-500 hover:scale-105 ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                  }`}
                  style={{ transitionDelay: `${400 + (index % 6) * 50}ms` }}
                  onClick={() => setSelectedPhoto(photo)}
                >
                    {/* Card Container */}
                    <div className="relative overflow-hidden rounded-3xl border-0 shadow-lg transition-all duration-300 group-hover:shadow-2xl">
                    {/* Image */}
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-auto object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay - Always visible, enhanced on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:via-black/40 transition-all duration-300"></div>

                    {/* Primary Color Accent Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/10 group-hover:to-primary/20 transition-all duration-300"></div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-4 py-2 rounded-full text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-8 group-hover:translate-x-0">
                      {photo.category}
                    </div>

                    {/* Zoom Icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="bg-primary/30 backdrop-blur-md p-5 rounded-full border-2 border-primary/50 transform scale-75 group-hover:scale-100">
                        <ZoomIn className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content - Always visible at bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                      <h3 className="font-bold text-lg text-white mb-2 leading-tight group-hover:text-primary transition-colors duration-300">
                        {photo.title}
                      </h3>
                      <p className="text-sm text-white/85 group-hover:text-white transition-all duration-300 line-clamp-2">
                        {photo.description}
                      </p>
                    </div>

                    {/* Shine Effect on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="relative max-w-4xl w-full animate-in zoom-in-95">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-10 right-0 text-white hover:text-primary transition-colors"
            >
              <X className="w-8 h-8" />
            </button>

            <Card className="border-0 shadow-xl overflow-hidden">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.title}
                className="w-full h-auto max-h-[80vh] object-cover"
              />
              <CardContent className="p-6 bg-card">
                <h2 className="text-2xl font-bold text-foreground mb-2">{selectedPhoto.title}</h2>
                <p className="text-muted-foreground">{selectedPhoto.description}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Photos;

