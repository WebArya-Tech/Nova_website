import { useState, useEffect } from 'react';
import { Star, X, MessageCircle, Plus, Headphones } from 'lucide-react';
import { getApprovedTestimonials } from '@/api/api/testimonialApi';

// Import all testimonial card images
import card1 from '@/assets/testimonialcard/card1.jpeg';
import card2 from '@/assets/testimonialcard/card2.jpeg';
import card3 from '@/assets/testimonialcard/card3.jpeg';
import card4 from '@/assets/testimonialcard/card4.jpeg';
import card5 from '@/assets/testimonialcard/card5.jpeg';
import card6 from '@/assets/testimonialcard/card6.jpeg';
import card7 from '@/assets/testimonialcard/card7.jpeg';
import card8 from '@/assets/testimonialcard/card8.jpeg';
import card9 from '@/assets/testimonialcard/card9.jpeg';
import card10 from '@/assets/testimonialcard/card10.jpeg';

// Import evidence images
import sanjanaEvidence from '@/assets/A level Math and Statistics guidance to Sanjana.png';
import amritEvidence from '@/assets/Amrit scored A grade for Math classes IGCSE.png';
import rithikaEvidence from '@/assets/AS Level guidance and support for Math and Statistics to Rithika.jpeg';
import riaMahiEvidence from '@/assets/RiaMahimath.PNG';
import pradyumnaEvidence from "@/assets/Pradyumna's bridge course for a smooth transition from CBSE to IGCSE.png";
import rheaTheaOjalEvidence from '@/assets/Rhea, Thea and Ojal Math group classes for IGCSE.png';
import siddhantPCEvidence from '@/assets/Siddhant scored A (star) grades in Physics and Chemistry subjects.png';
import siddhantMLEvidence from "@/assets/Siddhant's IA-ML computer science project feedback for IGCSE.png";
import thanyaEvidence from '@/assets/Thanya scored an A grade for 8th grade Math IGCSE.png';

type Testimonial = {
  id: string;
  _id?: string;
  name: string;
  reviewerName?: string;
  text: string;
  role: string;
  category: string;
  rating: number;
  status: string;
  primary?: boolean;
  mediaUrl?: string;
  image?: string;
  videoUrl?: string;
  audioUrl?: string;
  content?: string;
  evidenceImage?: string;
};

const cardImages = [card1, card2, card3, card4, card5, card6, card7, card8, card9, card10];
const evidenceImages = [
  sanjanaEvidence,
  amritEvidence,
  rithikaEvidence,
  riaMahiEvidence,
  pradyumnaEvidence,
  rheaTheaOjalEvidence,
  siddhantPCEvidence,
  siddhantMLEvidence,
  thanyaEvidence,
  sanjanaEvidence
];

const getMediaUrl = (testimonial: Testimonial) => {
  const direct = testimonial.mediaUrl || testimonial.image || testimonial.videoUrl || testimonial.audioUrl || '';
  if (direct) return direct;
  const content = testimonial.content || '';
  return typeof content === 'string' && (content.startsWith('http') || content.startsWith('data:')) ? content : '';
};

const getMediaType = (url: string) => {
  if (!url || typeof url !== 'string') return 'none';
  if (url.startsWith('data:video/') || url.match(/\.(mp4|webm|mov|m4v)(\?.*)?$/i)) return 'video';
  if (url.startsWith('data:audio/') || url.match(/\.(mp3|wav|ogg|m4a)(\?.*)?$/i)) return 'audio';
  if (url.startsWith('data:image/') || url.match(/\.(jpg|jpeg|png|gif|webp)(\?.*)?$/i)) return 'image';
  return 'link';
};

const TestimonialsNew = () => {
  const [active, setActive] = useState<Testimonial | null>(null);
  const [visibleCount, setVisibleCount] = useState(9);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    setLoading(true);
    try {
      const data = await getApprovedTestimonials();
      const testimonialList = data?.content || (Array.isArray(data) ? data : []);
      setTestimonials(testimonialList);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      setTestimonials([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 6);
  };

  const paginatedTestimonials = testimonials.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.9);
        }
      `}</style>

      {/* Main Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Student Success Stories
            </h1>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full mb-6"></div>
            <p className="text-base sm:text-lg text-gray-600 font-medium">
              Explore real success stories from Nova Tuitions students and parents.
            </p>
          </div>

          {/* Authenticity Statement */}
          <div className="max-w-4xl mx-auto mb-8 sm:mb-12 p-4 sm:p-6 bg-primary/10 rounded-xl shadow-md border-2 border-primary/20">
            <p className="text-sm sm:text-base text-foreground leading-relaxed mb-3">
              <span className="font-bold">Dear Parents and Students,</span> All testimonials displayed here are 100% genuine and have been provided by real students and parents. Click on any card to view the original feedback screenshot.
            </p>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              We invite you to verify the authenticity of every testimonial shared here.
            </p>
          </div>

          {/* Testimonials Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-gray-600 mt-4">Loading testimonials...</p>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl">
              <p className="text-gray-600">No testimonials available yet.</p>
            </div>
          ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {paginatedTestimonials.map((testimonial, index) => {
              const id = testimonial.id || testimonial._id || String(index);
              const evidenceImage = evidenceImages[index % evidenceImages.length];
              const mediaUrl = getMediaUrl(testimonial);
              const displayName = testimonial.name || testimonial.reviewerName || 'Anonymous';
              const displayText = testimonial.text || testimonial.content || '';
              
              return (
              <button
                key={id}
                type="button"
                onClick={() => setActive({ ...testimonial, evidenceImage })}
                className="group relative flex flex-col w-full rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] shadow-xl hover:shadow-2xl border-0 bg-white"
              >
                {/* Primary Badge */}
                {testimonial.primary && (
                  <div className="absolute top-3 left-3 flex items-center gap-1 bg-accent text-accent-foreground px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg z-20">
                    <Star size={12} className="fill-current" />
                    <span>Featured</span>
                  </div>
                )}

                {/* Evidence Image as Card Background */}
                <div className="relative w-full aspect-[4/5] overflow-hidden">
                  <img
                    src={evidenceImage}
                    alt={`${displayName} testimonial`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Bottom Label */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-center">
                    Actual Testimonial
                  </p>
                </div>
              </button>
            );
            })}
          </div>
          )}

          {/* Load More Button */}
          {testimonials.length > paginatedTestimonials.length && (
            <div className="mt-12 flex flex-col items-center justify-center gap-4">
              <button
                type="button"
                onClick={handleLoadMore}
                className="group flex items-center gap-3 bg-primary hover:bg-primary-dark text-primary-foreground px-8 py-4 rounded-full font-bold text-sm uppercase tracking-wider shadow-xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95"
              >
                Load More Success Stories
                <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Showing {paginatedTestimonials.length} of {testimonials.length} Stories
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonial Modal */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div
            className="absolute inset-0"
            onClick={() => setActive(null)}
          />

          <div className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setActive(null)}
              className="absolute -top-12 right-0 md:-right-12 rounded-full p-3 text-white hover:bg-white/20 transition-all z-30 bg-white/10"
            >
              <X size={28} />
            </button>

            {/* Testimonial Content */}
            <div className="w-full overflow-hidden rounded-2xl shadow-2xl bg-white border-4 border-primary">
              {(() => {
                if (active.evidenceImage) {
                  return (
                    <img
                      src={active.evidenceImage}
                      alt={`${active.name || active.reviewerName} evidence`}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                  );
                }
                
                const mediaUrl = getMediaUrl(active);
                const mediaType = getMediaType(mediaUrl);
                
                if (mediaType === 'image') {
                  return (
                    <img
                      src={mediaUrl}
                      alt={`${active.name || active.reviewerName} testimonial`}
                      className="w-full h-auto max-h-[80vh] object-contain"
                    />
                  );
                } else if (mediaType === 'video') {
                  return (
                    <video
                      src={mediaUrl}
                      controls
                      className="w-full h-auto max-h-[80vh] object-contain bg-black"
                    />
                  );
                } else if (mediaType === 'audio') {
                  return (
                    <div className="p-8 bg-gradient-to-br from-purple-50 to-purple-100">
                      <div className="flex items-center justify-center mb-6">
                        <Headphones className="text-purple-600" size={64} />
                      </div>
                      <audio src={mediaUrl} controls className="w-full" />
                      <div className="mt-6 text-center">
                        <p className="text-gray-800 text-lg font-bold">{active.name || active.reviewerName}</p>
                        <p className="text-gray-600 mt-2">{active.text || active.content}</p>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div className="p-8 max-h-[80vh] overflow-y-auto">
                      <div className="flex items-center gap-2 mb-4">
                        {Array.from({ length: active.rating || 5 }).map((_, i) => (
                          <Star key={i} size={20} className="fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-gray-800 text-lg leading-relaxed mb-6 whitespace-pre-wrap">
                        {active.text || active.content || 'No testimonial text available.'}
                      </p>
                      <div className="border-t pt-4">
                        <p className="text-gray-900 font-bold">{active.name || active.reviewerName || 'Anonymous'}</p>
                        <p className="text-gray-600 text-sm">{active.role || 'Student'} - {active.category || 'IGCSE'}</p>
                      </div>
                    </div>
                  );
                }
              })()}
            </div>

            {/* Info */}
            <div className="mt-4 text-center">
              <p className="text-white text-lg font-bold mb-1">{active.name || active.reviewerName}</p>
              <p className="text-white/80 text-sm">{active.role} - {active.category}</p>
              <p className="mt-3 text-white/60 text-xs font-bold uppercase tracking-[0.3em]">
                Original Testimonial
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestimonialsNew;
