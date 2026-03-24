import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Play, Clock } from "lucide-react";

const DEFAULT_VIDEOS = [
  { id: 'default-1', title: "Introduction to Nova Tuitions", description: "Learn about our teaching methodology and approach", duration: "5:30", videoUrl: "" },
  { id: 'default-2', title: "Online Class Demo - Mathematics", description: "Watch how we teach complex math concepts simply", duration: "12:45", videoUrl: "" },
  { id: 'default-3', title: "Student Success Stories", description: "Hear from our successful students and parents", duration: "8:20", videoUrl: "" },
  { id: 'default-4', title: "Physics Concepts Simplified", description: "Interactive physics teaching demonstration", duration: "15:00", videoUrl: "" },
  { id: 'default-5', title: "Chemistry Lab Session", description: "Virtual chemistry experiments and explanations", duration: "10:15", videoUrl: "" },
  { id: 'default-6', title: "Study Tips for Board Exams", description: "Expert guidance on exam preparation strategies", duration: "7:50", videoUrl: "" },
];

const GRADIENT_COLORS = [
  'from-blue-500 to-blue-600',
  'from-purple-500 to-purple-600',
  'from-green-500 to-green-600',
  'from-orange-500 to-orange-600',
  'from-red-500 to-red-600',
  'from-indigo-500 to-indigo-600',
];

const getYoutubeThumbnail = (url: string) => {
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
};

const Videos = () => {
  const [videoGallery, setVideoGallery] = useState(DEFAULT_VIDEOS);

  useEffect(() => {
    const stored = localStorage.getItem('nova_video_gallery');
    if (stored) {
      try { setVideoGallery(JSON.parse(stored)); } catch { /* ignore */ }
    }
  }, []);

  return (
    <div className="min-h-screen py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 text-center">Video Gallery</h1>
          <p className="text-center text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
            Watch our teaching sessions, student testimonials, and educational content
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoGallery.map((video, index) => {
              const ytThumb = getYoutubeThumbnail(video.videoUrl);
              const gradient = GRADIENT_COLORS[index % GRADIENT_COLORS.length];
              return (
                <Card key={video.id || index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer group">
                  <CardContent className="p-0">
                    <div className={`aspect-video ${ytThumb ? '' : `bg-gradient-to-br ${gradient}`} flex items-center justify-center relative overflow-hidden`}>
                      {ytThumb ? (
                        <img src={ytThumb} alt={video.title} className="w-full h-full object-cover" />
                      ) : (
                        <>
                          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-300" />
                          <Play className="w-16 h-16 text-white z-10 drop-shadow-lg group-hover:scale-110 transition-transform" />
                        </>
                      )}
                      <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {video.duration}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-foreground mb-1">{video.title}</h3>
                      <p className="text-sm text-muted-foreground">{video.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Watch more videos and follow us for updates</p>
            <a
              href="https://www.facebook.com/NOVAtuitions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-md font-semibold transition-colors"
            >
              Visit Our Facebook Page
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Videos;

