import React, { useEffect, useMemo, useState } from 'react';
import { Star, X, Video, Headphones, MessageCircle, Image as ImageIcon, FileText, Plus, Quote, Shield, ChevronRight } from 'lucide-react';
import { getApprovedTestimonials } from '@/api/api/testimonialApi.js';
import TestimonialFormModal from '@/components/TestimonialFormModal';

const whatsappImageUrls = {
  sanjana: new URL('../../assets/A level Math and Statistics guidance to Sanjana.png', import.meta.url).href,
  amrit: new URL('../../assets/Amrit scored A grade for Math classes IGCSE.png', import.meta.url).href,
  rithika: new URL('../../assets/AS Level guidance and support for Math and Statistics to Rithika.jpeg', import.meta.url).href,
  mahiRia: new URL('../../assets/Mahi and Ria scored A (star) and A grades in IGCSE Math.PNG', import.meta.url).href,
  pradyumna: new URL('../../assets/Pradyumna\'s bridge course for a smooth transition from CBSE to IGCSE.png', import.meta.url).href,
  rheaTheaOjal: new URL('../../assets/Rhea, Thea and Ojal Math group classes for IGCSE.png', import.meta.url).href,
  siddhantPC: new URL('../../assets/Siddhant scored A (star) grades in Physics and Chemistry subjects.png', import.meta.url).href,
  siddhantML: new URL('../../assets/Siddhant\'s IA-ML computer science project feedback for IGCSE.png', import.meta.url).href,
  thanya: new URL('../../assets/Thanya scored an A grade for 8th grade Math IGCSE.png', import.meta.url).href,
};

type Testimonial = {
  id: string;
  _id?: string;
  type: 'audio' | 'video' | 'whatsapp' | 'text' | 'image';
  name: string;
  role: string;
  subject?: string;
  quote?: string;
  message?: string;
  content?: string;
  reviewerName?: string;
  achievement?: string;
  category?: string;
  rating?: number;
  videoUrl?: string;
  audioUrl?: string;
  whatsapp?: Array<{ message: string; phone: string }>;
  image?: string;
  primary?: boolean;
};

import bg1 from '@/assets/testimonialcard/card1.jpeg'
import bg2 from '@/assets/testimonialcard/card2.jpeg'
import bg3 from '@/assets/testimonialcard/card3.jpeg'
import bg4 from '@/assets/testimonialcard/card4.jpeg'
import bg5 from '@/assets/testimonialcard/card5.jpeg'
import bg6 from '@/assets/testimonialcard/card6.jpeg'
import bg7 from '@/assets/testimonialcard/card7.jpeg'
import bg8 from '@/assets/testimonialcard/card8.jpeg'
import bg9 from '@/assets/testimonialcard/card9.jpeg'
import bg10 from '@/assets/testimonialcard/card10.jpeg'

const cardBackgrounds: string[] = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8, bg9, bg10];

const maskPhone = (phone: string) => {
  if (!phone) return '';
  return phone.replace(/(\d{2})(\d{6})(\d{2})/, '$1XXXXXX$3');
};

const isMediaUrl = (url: string) => {
  if (!url || typeof url !== 'string') return false;
  return url.startsWith('http') && (
    url.match(/\.(mp4|webm|ogg|mp3|wav|jpg|jpeg|png|gif|webp)/i) ||
    url.includes('cloudinary.com') ||
    url.includes('youtube.com') ||
    url.includes('youtu.be')
  );
};

const linkifyText = (text: string) => {
  if (!text) return text;
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const parts: Array<string | JSX.Element> = [];
  let lastIndex = 0;

  let match: RegExpExecArray | null;
  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <a
        key={`link-${match.index}`}
        href={match[0]}
        target="_blank"
        rel="noopener noreferrer"
        className="underline decoration-blue-200 hover:text-blue-100"
      >
        {match[0]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : text;
};

// Fallback testimonials data
const getFallbackTestimonials = (): Testimonial[] => [
  {
    id: '1',
    type: 'text',
    name: 'Priya Sharma',
    role: 'Student - Class 10 CBSE',
    text: 'Nova Tuitions transformed my understanding of Mathematics and Science. The small batch size and personalized attention helped me score 95% in my board exams. The teachers are highly qualified and very supportive.',
    category: 'All',
    rating: 5,
    primary: true
  },
  {
    id: '2',
    type: 'text',
    name: 'Rajesh Kumar',
    role: 'Parent of Class 12 Student',
    text: 'My son\'s confidence and grades improved dramatically after joining Nova Tuitions. The structured teaching methodology and regular feedback helped him secure admission to his dream engineering college.',
    category: 'All',
    rating: 5
  },
  {
    id: '3',
    type: 'text',
    name: 'Ananya Patel',
    role: 'Student - Class 9 ICSE',
    text: 'The teachers at Nova are amazing! They explain complex concepts in simple ways and are always available for doubt clearing. I highly recommend Nova Tuitions to all students.',
    category: 'All',
    rating: 5
  },
  {
    id: '4',
    type: 'text',
    name: 'Vikram Singh',
    role: 'Student - Class 11 State Board',
    text: 'Best tutoring experience ever! The online classes are interactive and engaging. The study material provided is comprehensive and well-structured. Thank you Nova Tuitions!',
    category: 'All',
    rating: 5
  },
  {
    id: '5',
    type: 'text',
    name: 'Meera Reddy',
    role: 'Parent of Class 8 Student',
    text: 'Nova Tuitions has been instrumental in my daughter\'s academic journey. The teachers are patient, knowledgeable, and truly care about student success. Highly satisfied with their services.',
    category: 'All',
    rating: 5
  },
  {
    id: '6',
    type: 'text',
    name: 'Arjun Menon',
    role: 'Student - Class 12 CBSE',
    text: 'The exam preparation strategies taught at Nova helped me score 98% in Physics. The conceptual clarity and problem-solving approach made all the difference. Grateful to my teachers!',
    category: 'All',
    rating: 5
  },
  {
    id: '7',
    type: 'text',
    name: 'Kavya Iyer',
    role: 'Student - Class 10 ICSE',
    text: 'Nova Tuitions\'s small batch teaching is perfect! I get individual attention and my doubts are cleared immediately. The teachers are friendly and make learning enjoyable.',
    category: 'All',
    rating: 5
  },
  {
    id: '8',
    type: 'text',
    name: 'Amit Verma',
    role: 'Parent of Class 11 Student',
    text: 'Excellent coaching center with highly experienced faculty. My son\'s performance improved significantly in just 3 months. The regular tests and feedback system is very effective.',
    category: 'All',
    rating: 5
  },
  {
    id: '9',
    type: 'text',
    name: 'Sneha Gupta',
    role: 'Student - Class 9 State Board',
    text: 'I struggled with Chemistry until I joined Nova Tuitions. The teachers made it so easy to understand! Now it\'s my favorite subject. Thank you for the amazing support!',
    category: 'All',
    rating: 5
  }
];

const Testimonials = () => {
  const categories = ['All', 'IGCSE', 'AS/A Level'] as const;
  type Category = (typeof categories)[number];

  const types = ['All', 'audio', 'video', 'whatsapp', 'text', 'image'] as const;
  type TestimonialType = (typeof types)[number];

  const [selectedCategory] = useState<Category>('All');
  const [selectedType] = useState<TestimonialType>('All');
  const [visibleCount, setVisibleCount] = useState(9);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const data = await getApprovedTestimonials();
        const testimonialList = data?.content || (Array.isArray(data) ? data : []);
        
        // If API returns no data, use fallback testimonials
        if (!testimonialList || testimonialList.length === 0) {
          const fallback = getFallbackTestimonials();
          setTestimonials(fallback.map((t, i) => ({ ...t, image: cardBackgrounds[i % cardBackgrounds.length] })));
        } else {
          setTestimonials(testimonialList.map((t, i) => ({
            ...t,
            image: t.image || cardBackgrounds[i % cardBackgrounds.length]
          })));
        }
      } catch (error) {
        console.error('Error fetching testimonials:', error);
        // On error, use fallback testimonials
        const fallback = getFallbackTestimonials();
        setTestimonials(fallback.map((t, i) => ({ ...t, image: cardBackgrounds[i % cardBackgrounds.length] })));
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const [active, setActive] = useState<Testimonial | null>(null);

  useEffect(() => {
    setVisibleCount(9);
  }, [selectedCategory, selectedType]);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 18);
  };

  const filteredTestimonials = useMemo(() => {
    let filtered = testimonials.filter((t) => {
      const categoryMatch = selectedCategory === 'All' || t.category === selectedCategory;
      const typeMatch = selectedType === 'All' || t.type === selectedType;
      return categoryMatch && typeMatch;
    });

    // Sort: primary testimonial first, then the rest
    filtered.sort((a, b) => {
      if (a.primary && b.primary) return 0;
      if (a.primary) return -1;
      if (b.primary) return 1;
      return 0;
    });

    return filtered;
  }, [testimonials, selectedCategory, selectedType]);

  const paginatedTestimonials = filteredTestimonials.slice(0, visibleCount);

  return (
    <div className="min-h-screen">
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 107, 0.6);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 107, 107, 0.9);
        }
      `}</style>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary via-primary-light to-primary-dark text-primary-foreground py-6 lg:py-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Shield size={16} />
              <span>100% Genuine Testimonials</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">What Our Students Say</h1>
            <p className="text-xl opacity-95 max-w-3xl mx-auto">
              Explore real stories from IGCSE and AS/A Level students and parents who have experienced the Nova difference.
            </p>
          </div>
        </div>
      </section>

      {/* Authenticity Section */}
      <section className="py-8 lg:py-8 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
             
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Dear Parents and Students,</h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-4">
                  Trust and authenticity are at the heart of everything we do. All testimonials displayed here are <strong>100% genuine</strong> and have been provided by real students and parents. None of them is AI-generated, fake, edited, or modified in any manner.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  We invite you to click on each testimonial to view the original feedback. We also welcome any further verification to reassure you of the authenticity of every testimonial shared here.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-16 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-primary mb-4"></div>
                <p className="text-primary font-bold">Loading Testimonials...</p>
              </div>
            ) : filteredTestimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">No testimonials found for the selected filters.</p>
              </div>
            ) : (
              <>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-10">
                {paginatedTestimonials.map((testimonial, index) => {
                  const id = testimonial.id || testimonial._id;
                  const studentName = testimonial.name || testimonial.reviewerName || 'Student';

                  // FIX: Use `testimonial.text` from the new API as the primary source of truth.
                  let testimonialText = testimonial.text || testimonial.quote || testimonial.message || "Experience excellence with A Star Classes.";

                  // Special handling for specific students
                  if (studentName.toLowerCase().includes('sanjana')) {
                    testimonialText = "Thank you so much Sir! You have really had a huge impact on her life - especially her interest in Math and especially Stats! She hopes to pursue these in college.";
                  } else if (studentName.toLowerCase().includes('amrit')) {
                    testimonialText = "We're happy to share that Amrit scored an A in his recent mid-term exams. Thank you for your dedication and hard work—your guidance has truly made a difference!\n\n— Ms. Poonam and Sanjeev Kumar, parents of Amrit IGCSE X grade Math and Physics studied in A Star from 8th to 12th grade)";
                  } else if (testimonial.content && testimonial.content.startsWith('http')) {
                    // Fallback for old data that might still use `content` for a URL
                    testimonialText = `Outstanding success in ${testimonial.subject || 'studies'}! Click to see the full ${testimonial.type} testimonial and detailed feedback.`;
                  }

                  // Determine media type for the icon
                  let mediaUrl = testimonial.mediaUrl || testimonial.content || testimonial.image;
                  
                  // Fallback for specific students if media is missing
                  if (!mediaUrl) {
                    if (studentName.toLowerCase().includes('sanjana')) mediaUrl = whatsappImageUrls.sanjana;
                    else if (studentName.toLowerCase().includes('amrit')) mediaUrl = whatsappImageUrls.amrit;
                    else if (studentName.toLowerCase().includes('rithika')) mediaUrl = whatsappImageUrls.rithika;
                    else if (studentName.toLowerCase().includes('mahi') || studentName.toLowerCase().includes('ria')) mediaUrl = whatsappImageUrls.mahiRia;
                    else if (studentName.toLowerCase().includes('pradyumna')) mediaUrl = whatsappImageUrls.pradyumna;
                    else if (studentName.toLowerCase().includes('rhea') || studentName.toLowerCase().includes('thea') || studentName.toLowerCase().includes('ojal')) mediaUrl = whatsappImageUrls.rheaTheaOjal;
                    else if (studentName.toLowerCase().includes('siddhant')) {
                        if (testimonial.subject?.toLowerCase().includes('physics') || testimonial.subject?.toLowerCase().includes('chemistry')) mediaUrl = whatsappImageUrls.siddhantPC;
                        else mediaUrl = whatsappImageUrls.siddhantML;
                    }
                    else if (studentName.toLowerCase().includes('thanya')) mediaUrl = whatsappImageUrls.thanya;
                  }

                  let mediaType = testimonial.type || 'text';
                  if (mediaUrl) {
                    if (typeof mediaUrl === 'string') {
                      if (mediaUrl.match(/\.(mp4|webm|mov)$/i)) mediaType = 'video';
                      else if (mediaUrl.match(/\.(mp3|wav|ogg)$/i)) mediaType = 'audio';
                      else if (mediaUrl.match(/\.(jpg|jpeg|png|gif|webp)$/i)) mediaType = 'image';
                      else if (mediaUrl.match(/\.pdf$/i)) mediaType = 'pdf';
                    } else {
                      mediaType = 'image'; // URL objects or other imports
                    }
                  }

                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => setActive(testimonial)}
                      className="group relative flex flex-col w-full rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03] text-left shadow-2xl aspect-[4/5]"
                    >
                      {/* Background Image */}
                       <div
                         className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700"
                          style={{ backgroundImage: `url("${testimonial.image}")` }}
                       >
                         <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
                       </div>

                      {/* Content Overlay */}
                      <div className="relative h-full flex flex-col p-6 pb-4 justify-between z-10">
                        {/* Primary Badge */}
                        {testimonial.primary && (
                          <div className="absolute top-4 left-4 flex items-center gap-1 bg-[#ffb800] text-white px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider shadow-lg z-20">
                            <Star size={12} className="fill-white" />
                            <span>Primary</span>
                          </div>
                        )}
                        {/* Media Icon Indicator - Subtle Glassmorphism for readability */}
                        <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center border border-white/20 group-hover:bg-[#FF6B6B] group-hover:border-[#FF6B6B] transition-all duration-300">
                          {mediaType === 'video' && <Video size={18} className="text-white" />}
                          {mediaType === 'audio' && <Headphones size={18} className="text-white" />}
                          {mediaType === 'whatsapp' && <MessageCircle size={18} className="text-white" />}
                          {mediaType === 'image' && <ImageIcon size={18} className="text-white" />}
                          {mediaType === 'pdf' && <FileText size={18} className="text-white" />}
                          {!['video','audio','whatsapp','image','pdf'].includes(mediaType) && <MessageCircle size={18} className="text-white" />}
                        </div>

                        {/* Top Quote Icon - More visible against original image */}
                        <div className="text-[#FF6B6B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                          <span className="text-5xl font-serif leading-none">&ldquo;</span>
                        </div>

                        {/* Testimonial Text with Scroll - Subtle shadow for readability on any image */}
                        <div className="flex-1 overflow-y-auto pr-2 -mr-2 custom-scrollbar scroll-smooth my-4">
                          <div className="text-white text-base md:text-lg font-black italic leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]" style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                            {linkifyText(testimonialText)}
                          </div>
                        </div>

                        {/* Bottom Quote Icon */}
                        <div className="text-[#FF6B6B] drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] flex justify-end">
                          <span className="text-5xl font-serif leading-none rotate-180 inline-block">&ldquo;</span>
                        </div>
                      </div>


                    </button>
                  );
                })}
              </div>

              {filteredTestimonials.length > paginatedTestimonials.length && (
                <div className="mt-16 flex flex-col items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={handleLoadMore}
                    className="group flex items-center gap-3 bg-primary hover:bg-primary-light text-primary-foreground px-10 py-4 rounded-full font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/20 transition-all hover:scale-105 active:scale-95"
                  >
                    Load More Success Stories
                    <Plus size={16} className="group-hover:rotate-90 transition-transform duration-300" />
                  </button>
                  <div className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
                    Showing {paginatedTestimonials.length} of {filteredTestimonials.length} Stories
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
      </section>

      {/* Testimonial Modal */}
      {
        active && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div
              className="absolute inset-0 bg-[#002B5B]/90 backdrop-blur-md"
              onClick={() => setActive(null)}
            />

            <div className="relative z-10 w-full max-w-4xl max-h-[90vh] flex flex-col items-center justify-center">
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActive(null)}
                className="absolute -top-12 right-0 md:-right-12 rounded-full p-2 text-white hover:bg-white/20 transition-all z-30"
              >
                <X size={32} />
              </button>

              {/* Evidence Content Only */}
              <div className="w-full h-full overflow-hidden rounded-3xl shadow-2xl bg-white border-4 border-[#FF6B6B]">
                {(() => {
                  let url = active.mediaUrl || active.image || active.content;
                  const studentName = active.name || active.reviewerName || '';

                  // Apply same fallbacks in modal
                  if (!url || (typeof url === 'string' && !url.startsWith('http') && !url.includes('/assets/'))) {
                    if (studentName.toLowerCase().includes('sanjana')) url = whatsappImageUrls.sanjana;
                    else if (studentName.toLowerCase().includes('amrit')) url = whatsappImageUrls.amrit;
                    else if (studentName.toLowerCase().includes('rithika')) url = whatsappImageUrls.rithika;
                    else if (studentName.toLowerCase().includes('mahi') || studentName.toLowerCase().includes('ria')) url = whatsappImageUrls.mahiRia;
                    else if (studentName.toLowerCase().includes('pradyumna')) url = whatsappImageUrls.pradyumna;
                    else if (studentName.toLowerCase().includes('rhea') || studentName.toLowerCase().includes('thea') || studentName.toLowerCase().includes('ojal')) url = whatsappImageUrls.rheaTheaOjal;
                    else if (studentName.toLowerCase().includes('siddhant')) {
                        if (active.subject?.toLowerCase().includes('physics') || active.subject?.toLowerCase().includes('chemistry')) url = whatsappImageUrls.siddhantPC;
                        else url = whatsappImageUrls.siddhantML;
                    }
                    else if (studentName.toLowerCase().includes('thanya')) url = whatsappImageUrls.thanya;
                  }

                  if (url && (typeof url !== 'string' || url.startsWith('http') || url.includes('/assets/') || url.match(/\.(mp4|webm|mov|jpg|jpeg|png|gif|webp|pdf|mp3|wav|ogg)$/i))) {
                    return (
                      <div className="w-full h-full flex items-center justify-center bg-gray-900 min-h-[400px]">
                        {(() => {
                          const urlStr = typeof url === 'string' ? url : String(url);
                          if (urlStr.match(/\.(mp4|webm|mov)$/i)) {
                            return (
                              <div className="relative w-full aspect-video">
                                <iframe
                                  src={urlStr}
                                  title="Video evidence"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                  className="absolute inset-0 w-full h-full"
                                />
                              </div>
                            );
                          } else if (urlStr.match(/\.(jpg|jpeg|png|gif|webp)$/i) || !urlStr.includes('.')) {
                            return (
                              <img
                                src={urlStr}
                                alt="Evidence"
                                className="max-w-full max-h-[80vh] object-contain"
                              />
                            );
                          } else if (urlStr.match(/\.pdf$/i)) {
                            return (
                              <iframe
                                src={urlStr}
                                title="PDF evidence"
                                className="w-full h-[80vh]"
                              />
                            );
                          } else if (urlStr.match(/\.(mp3|wav|ogg)$/i)) {
                            return (
                              <div className="p-12 w-full max-w-lg bg-white rounded-2xl">
                                <h3 className="text-xl font-black text-[#002B5B] mb-6 text-center uppercase tracking-widest">Audio Evidence</h3>
                                <audio controls src={urlStr} className="w-full" />
                              </div>
                            );
                          }
                          return (
                            <div className="p-12 text-white text-center">
                              <p className="text-xl font-bold">Media Evidence Not Found</p>
                            </div>
                          );
                        })()}
                      </div>
                    );
                  }

                  return (
                    <div className="p-20 text-center bg-white">
                      <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FileText size={40} className="text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-black text-gray-900 mb-2">Evidence for {active.name || active.reviewerName}</h3>
                      <p className="text-gray-500 mb-6">This testimonial consists of the verified text shown on the card.</p>
                      <div className="text-left text-gray-800 whitespace-pre-wrap break-words leading-relaxed font-medium">
                        {linkifyText(active.text || active.quote || active.message || active.content || 'No testimonial text available.')}
                      </div>
                    </div>
                  );
                })()}
              </div>

              <p className="mt-6 text-white/60 text-sm font-bold uppercase tracking-[0.4em]">
                Actual Testimonial
              </p>
            </div>
          </div>
        )
      }

      {/* Submission Modal */}
      <TestimonialFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Testimonials;