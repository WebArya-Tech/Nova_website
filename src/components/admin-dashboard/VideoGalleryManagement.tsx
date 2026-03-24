import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, Edit2, X, Video, Clock, Upload, Link } from 'lucide-react';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'nova_video_gallery';

const DEFAULT_VIDEOS = [
  { id: 'default-1', title: 'Introduction to Nova Tuitions', description: 'Learn about our teaching methodology and approach', duration: '5:30', videoUrl: '' },
  { id: 'default-2', title: 'Online Class Demo - Mathematics', description: 'Watch how we teach complex math concepts simply', duration: '12:45', videoUrl: '' },
  { id: 'default-3', title: 'Student Success Stories', description: 'Hear from our successful students and parents', duration: '8:20', videoUrl: '' },
  { id: 'default-4', title: 'Physics Concepts Simplified', description: 'Interactive physics teaching demonstration', duration: '15:00', videoUrl: '' },
  { id: 'default-5', title: 'Chemistry Lab Session', description: 'Virtual chemistry experiments and explanations', duration: '10:15', videoUrl: '' },
  { id: 'default-6', title: 'Study Tips for Board Exams', description: 'Expert guidance on exam preparation strategies', duration: '7:50', videoUrl: '' },
];

const emptyForm = { title: '', description: '', duration: '', videoUrl: '' };

export default function VideoGalleryManagement() {
  const [videos, setVideos] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [videoInputMode, setVideoInputMode] = useState<'url' | 'upload'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setVideos(JSON.parse(stored));
    } else {
      setVideos(DEFAULT_VIDEOS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_VIDEOS));
    }
  }, []);

  const save = (updated: any[]) => {
    setVideos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (!form.description.trim()) { toast.error('Description is required'); return; }
    if (!form.duration.trim()) { toast.error('Duration is required (e.g. 5:30)'); return; }
    setLoading(true);
    setTimeout(() => {
      if (editId) {
        const updated = videos.map(v => v.id === editId ? { ...v, ...form } : v);
        save(updated);
        toast.success('Video updated successfully');
      } else {
        const newVideo = { id: `video-${Date.now()}`, ...form };
        save([...videos, newVideo]);
        toast.success('Video added successfully');
      }
      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
      setLoading(false);
    }, 300);
  };

  const handleEdit = (video: any) => {
    setForm({ title: video.title, description: video.description, duration: video.duration, videoUrl: video.videoUrl });
    setEditId(video.id);
    setVideoInputMode(video.videoUrl?.startsWith('data:') || video.videoUrl?.startsWith('blob:') ? 'upload' : 'url');
    setShowForm(true);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('video/')) { toast.error('Please select a valid video file'); return; }
    if (file.size > 100 * 1024 * 1024) { toast.error('Video must be smaller than 100 MB'); return; }
    const reader = new FileReader();
    reader.onload = () => setForm(prev => ({ ...prev, videoUrl: reader.result as string }));
    reader.readAsDataURL(file);
    toast.success('Video loaded — save to apply');
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this video entry?')) return;
    save(videos.filter(v => v.id !== id));
    toast.success('Video deleted');
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
    setVideoInputMode('url');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // Extract YouTube thumbnail if possible
  const getYoutubeThumbnail = (url: string) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://img.youtube.com/vi/${match[1]}/mqdefault.jpg` : null;
  };

  const GRADIENT_COLORS = [
    'from-blue-500 to-blue-600',
    'from-purple-500 to-purple-600',
    'from-green-500 to-green-600',
    'from-orange-500 to-orange-600',
    'from-red-500 to-red-600',
    'from-indigo-500 to-indigo-600',
  ];

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#196d83] mb-1">Video Gallery Management</h1>
          <p className="text-gray-500 text-sm">Add, edit, or remove videos shown in the public Video Gallery page.</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: '#196d83' }}
        >
          <Plus className="w-4 h-4" />
          Add Video
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#196d83]">{editId ? 'Edit Video' : 'Add New Video'}</h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={e => setForm({ ...form, title: e.target.value })}
                  placeholder="e.g. Introduction to Nova Tuitions"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#196d83]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Duration *</label>
                <input
                  type="text"
                  value={form.duration}
                  onChange={e => setForm({ ...form, duration: e.target.value })}
                  placeholder="e.g. 5:30"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#196d83]"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
              <input
                type="text"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="e.g. Learn about our teaching methodology and approach"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#196d83]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Video Source</label>
              {/* Toggle */}
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => { setVideoInputMode('url'); setForm(prev => ({ ...prev, videoUrl: '' })); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    videoInputMode === 'url' ? 'bg-[#196d83] text-white border-[#196d83]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Link className="w-3.5 h-3.5" /> Enter URL
                </button>
                <button
                  type="button"
                  onClick={() => { setVideoInputMode('upload'); setForm(prev => ({ ...prev, videoUrl: '' })); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    videoInputMode === 'upload' ? 'bg-[#196d83] text-white border-[#196d83]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Upload className="w-3.5 h-3.5" /> Upload from Device
                </button>
              </div>

              {videoInputMode === 'url' ? (
                <>
                  <input
                    type="url"
                    value={form.videoUrl.startsWith('data:') ? '' : form.videoUrl}
                    onChange={e => setForm({ ...form, videoUrl: e.target.value })}
                    placeholder="https://www.youtube.com/watch?v=..."
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#196d83]"
                  />
                  <p className="text-xs text-gray-400 mt-1">Paste a YouTube link to auto-generate a thumbnail. Leave blank to use a colour card.</p>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex flex-col items-center gap-1">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">Click to upload video</span>
                    <span className="text-xs text-gray-400">MP4, WebM, OGG — max 100 MB</span>
                  </div>
                  <input ref={fileInputRef} type="file" accept="video/*" className="hidden" onChange={handleFileChange} />
                </label>
              )}

              {form.videoUrl && form.videoUrl.startsWith('data:video') && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">Video Preview:</p>
                  <div className="relative w-fit">
                    <video src={form.videoUrl} controls className="h-28 rounded-lg border" />
                    <button type="button" onClick={() => { setForm(prev => ({ ...prev, videoUrl: '' })); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center hover:bg-red-600">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
              {videoInputMode === 'url' && form.videoUrl && getYoutubeThumbnail(form.videoUrl) && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-gray-500 mb-1">YouTube Thumbnail Preview:</p>
                  <img src={getYoutubeThumbnail(form.videoUrl)!} alt="thumbnail" className="h-24 rounded-lg border" />
                </div>
              )}
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: '#196d83' }}
              >
                {loading ? 'Saving...' : editId ? 'Update Video' : 'Add Video'}
              </button>
              <button type="button" onClick={handleCancel} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Video Cards Preview */}
      {videos.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {videos.map((video, i) => {
            const ytThumb = getYoutubeThumbnail(video.videoUrl);
            const gradient = GRADIENT_COLORS[i % GRADIENT_COLORS.length];
            return (
              <div key={video.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                <div className={`aspect-video relative ${ytThumb ? '' : `bg-gradient-to-br ${gradient}`} flex items-center justify-center`}>
                  {ytThumb ? (
                    <img src={ytThumb} alt={video.title} className="w-full h-full object-cover" />
                  ) : (
                    <Video className="w-10 h-10 text-white opacity-80" />
                  )}
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-0.5 rounded text-xs flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {video.duration}
                  </div>
                </div>
                <div className="p-3 flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm truncate">{video.title}</h3>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{video.description}</p>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => handleEdit(video)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition" title="Edit">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(video.id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition" title="Delete">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {videos.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <Video className="mx-auto mb-3 text-gray-300" size={48} />
          <p className="text-gray-500">No videos in gallery yet. Click "Add Video" to get started.</p>
        </div>
      )}

      <p className="mt-2 text-xs text-gray-400">Total {videos.length} video(s) in gallery. Changes are reflected on the public Videos page immediately.</p>
    </div>
  );
}
