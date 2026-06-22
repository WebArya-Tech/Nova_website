import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock, Sparkles, Film } from "lucide-react";

const DEFAULT_VIDEOS = [
  { id: 'default-1', title: "Introduction to Nova Tuitions", description: "Learn about our teaching methodology and approach", duration: "5:30", videoUrl: "", category: "About" },
  { id: 'default-2', title: "Online Class Demo - Mathematics", description: "Watch how we teach complex math concepts simply", duration: "12:45", videoUrl: "", category: "Demos" },
  { id: 'default-3', title: "Student Success Stories", description: "Hear from our successful students and parents", duration: "8:20", videoUrl: "", category: "Testimonials" },
  { id: 'default-4', title: "Physics Concepts Simplified", description: "Interactive physics teaching demonstration", duration: "15:00", videoUrl: "", category: "Demos" },
  { id: 'default-5', title: "Chemistry Lab Session", description: "Virtual chemistry experiments and explanations", duration: "10:15", videoUrl: "", category: "Demos" },
  { id: 'default-6', title: "Study Tips for Board Exams", description: "Expert guidance on exam preparation strategies", duration: "7:50", videoUrl: "", category: "Tips" },
];

const GRADIENT_COLORS = [
  'from-blue-500 to-blue-600',
  'from-primary to-primary',
  'from-green-500 to-green-600',
  'from-orange-500 to-orange-600',
  'from-red-500 to-red-600',
  'from-indigo-500 to-indigo-600',
];

const getYoutubeThumbnail = (url: string) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
};

const Videos = () => {
  const [videoGallery, setVideoGallery] = useState(DEFAULT_VIDEOS);
  const [activeFilter, setActiveFilter] = useState("All");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('nova_video_gallery');
    if (stored) {
      try { 
        setVideoGallery(JSON.parse(stored)); 
      } catch { /* ignore */ }
    }
    setIsVisible(true);
  }, []);

  const categories = ["All", ...new Set(videoGallery.map(v => v.category))];
  const filteredVideos = activeFilter === "All" 
    ? videoGallery 
    : videoGallery.filter(v => v.category === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background Image */}
      <section className="relative py-8 lg:py-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1600&h=900&fit=crop"
            alt="Video Gallery"
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
              Video <span className="text-accent font-bold">Gallery</span>
            </h1>

            <p
              className={`text-xl lg:text-2xl text-white/90 max-w-3xl mx-auto transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Watch our teaching sessions, student testimonials, and exclusive educational content
            </p>
          </div>
        </div>
      </section>

      {/* Videos Section */}
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
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30 scale-110"
                      : "bg-white border-2 border-primary/20 text-foreground hover:border-primary/40 hover:bg-primary/5 hover:scale-105"
                  }`}
                  style={{ transitionDelay: `${300 + idx * 50}ms` }}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Videos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredVideos.map((video, index) => {
                const ytThumb = getYoutubeThumbnail(video.videoUrl);
                const gradient = GRADIENT_COLORS[index % GRADIENT_COLORS.length];
                
                return (
                  <div
                    key={video.id || index}
                    className={`group relative transform transition-all duration-1000 hover:-translate-y-2 ${
                      isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                    style={{ transitionDelay: `${400 + (index % 6) * 100}ms` }}
                  >
                    <div className="absolute inset-0 bg-primary/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <Card className="overflow-hidden border-0 shadow-xl relative transition-all duration-300 h-full group-hover:shadow-2xl">
                      <CardContent className="p-0">
                        {/* Video Thumbnail */}
                        <div className={`aspect-video ${ytThumb ? '' : `bg-gradient-to-br ${gradient}`} flex items-center justify-center relative overflow-hidden group/inner`}>
                          {ytThumb ? (
                            <img 
                              src={ytThumb} 
                              alt={video.title} 
                              className="w-full h-full object-cover group-hover/inner:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-black/40"></div>
                          )}
                          
                          {/* Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover/inner:opacity-100 transition-opacity duration-300"></div>

                          {/* Play Icon */}
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="bg-primary group-hover/inner:shadow-2xl backdrop-blur-sm p-5 rounded-full group-hover/inner:scale-125 transition-all duration-300 shadow-xl transform scale-90 group-hover/inner:scale-125">
                              <Play className="w-8 h-8 text-primary-foreground fill-primary-foreground" />
                            </div>
                          </div>

                          {/* Duration Badge */}
                          <div className="absolute bottom-4 right-4 bg-gradient-to-r from-black/80 to-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1 group-hover/inner:bg-black transition-colors shadow-lg">
                            <Clock className="w-4 h-4" />
                            {video.duration}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 lg:p-7">
                          <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-primary"></div>
                            <span className="text-xs font-bold text-primary uppercase tracking-wider">{video.category}</span>
                          </div>
                          <h3 className="font-bold text-lg text-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
                            {video.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 group-hover:text-muted-foreground transition-colors leading-relaxed">
                            {video.description}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                );
              })}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">No videos found in this category</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-8 bg-gradient-to-r from-primary/10 via-background to-primary/5 border-t-2 border-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h2
              className={`text-4xl lg:text-5xl font-bold text-foreground mb-6 transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              Want More <span className="text-primary font-bold">Video Content?</span>
            </h2>
            <p
              className={`text-lg text-muted-foreground mb-10 max-w-2xl mx-auto transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              Follow us on YouTube and Facebook for regular updates, live sessions, and exclusive educational content to support your academic journey.
            </p>
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center transform transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <a
                href="https://www.youtube.com/@NOVAtuitions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-red-600 to-red-700 hover:shadow-lg hover:shadow-red-600/30 hover:scale-110 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                <Film className="w-5 h-5" />
                YouTube Channel
              </a>
              <a
                href="https://www.facebook.com/NOVAtuitions"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg hover:shadow-blue-600/30 hover:scale-110 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300"
              >
                <span className="text-2xl">f</span>
                Facebook Page
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Videos;

