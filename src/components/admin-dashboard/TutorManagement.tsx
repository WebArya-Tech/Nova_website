import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, Edit2, X, Upload, Link, User } from 'lucide-react';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'nova_tutors';

const DEFAULT_TUTORS = [
  {
    id: 'default-1',
    name: 'B. Aishwarya',
    role: 'Chemistry Teacher',
    bio: 'B. Aishwarya, M.Sc. Chemistry (NIT Rourkela) and GATE-qualified (AIR 390), is a highly experienced Chemistry educator known for her strong conceptual clarity, exam-focused teaching, and proven success in guiding students across CBSE, ICSE, ISC, and state board curricula.',
    imageUrl: '',
    order: 1,
  },
  {
    id: 'default-2',
    name: 'Ms. Balasaritha P',
    role: 'Physics and Mathematics Teacher',
    bio: 'Ms. Balasaritha P, Ph.D. in Physics and NET-qualified (AIR 132), is an experienced Physics and Mathematics educator known for her clear, exam-oriented teaching and proven success in guiding CBSE, ICSE, ISC, and NIOS students to excel in board examinations.',
    imageUrl: '',
    order: 2,
  },
  {
    id: 'default-3',
    name: 'Ms. Ramya Rajamani',
    role: 'Math, Physics, Statistics Teacher',
    bio: 'With 19+ years of experience, Ms. Ramya is an accomplished Mathematics, Statistics, and Physics educator who blends strong conceptual teaching with real-world applications to help Indian board students excel.',
    imageUrl: '',
    order: 3,
  },
  {
    id: 'default-4',
    name: 'Mr. Ram G. Mohan',
    role: 'Math and Physics Teacher',
    bio: 'An IIT Delhi alumnus with 10+ years of teaching and rich industry experience, Mr. Ram is a highly effective Physics and Mathematics faculty known for clarity, discipline, and board-focused mentoring.',
    imageUrl: '',
    order: 4,
  },
  {
    id: 'default-5',
    name: 'Mr. K. V. Bala Subramanyam (Mr. Balu)',
    role: 'Physics Teacher',
    bio: 'With 15+ years of experience, Mr. Balu is a result-oriented Physics educator renowned for simplifying complex concepts and helping CBSE, ICSE, ISC, and State Board students score high.',
    imageUrl: '',
    order: 5,
  },
  {
    id: 'default-6',
    name: 'Mr. Shambhu M. G',
    role: 'Biology Teacher',
    bio: 'An M.Sc. Biotechnology graduate with 15+ years of experience, Mr. Shambhu is a highly regarded Biology educator known for his student-friendly teaching and strong emphasis on conceptual understanding for Indian board exams.',
    imageUrl: '',
    order: 6,
  },
  {
    id: 'default-7',
    name: 'Mr. Rakesh',
    role: 'Chemistry and Science Teacher',
    bio: 'A gold medalist M.Sc. Chemistry graduate with 8+ years of experience, Mr. Rakesh is a dedicated Chemistry, Math, and Science educator who helps Indian board students build strong fundamentals and achieve excellent results.',
    imageUrl: '',
    order: 7,
  },
  {
    id: 'default-8',
    name: 'Ms. Salai Kulamani Birlasekar',
    role: 'English and Communication Skills Teacher',
    bio: 'An M.Phil English educator with 12+ years of experience, Ms. Birlasekar specializes in strengthening grammar, writing, and literature skills for CBSE, ICSE, ISC, and State Board students.',
    imageUrl: '',
    order: 8,
  },
  {
    id: 'default-9',
    name: 'Ms. Neha Aggarwal',
    role: 'Mathematics Teacher and Subject Matter Expert',
    bio: 'A CSIR NET-qualified Mathematics educator, Ms. Neha specializes in guiding CBSE and ICSE students of Classes 9–12 with a strong focus on conceptual clarity, structured problem-solving, and exam readiness.',
    imageUrl: '',
    order: 9,
  },
];

const emptyForm = { name: '', role: '', bio: '', imageUrl: '', order: 0 };

export default function TutorManagement() {
  const [tutors, setTutors] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ ...emptyForm });
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<'url' | 'upload'>('url');
  const [viewBio, setViewBio] = useState<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setTutors(JSON.parse(stored));
      } catch {
        initDefaults();
      }
    } else {
      initDefaults();
    }
  }, []);

  const initDefaults = () => {
    setTutors(DEFAULT_TUTORS);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_TUTORS));
  };

  const save = (updated: any[]) => {
    setTutors(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { toast.error('Name is required'); return; }
    if (!form.role.trim()) { toast.error('Role/Subject is required'); return; }
    if (!form.bio.trim()) { toast.error('Bio is required'); return; }
    setLoading(true);
    setTimeout(() => {
      if (editId) {
        const updated = tutors.map(t => t.id === editId ? { ...t, ...form } : t);
        save(updated);
        toast.success('Tutor updated successfully');
      } else {
        const maxOrder = tutors.reduce((m, t) => Math.max(m, t.order || 0), 0);
        const newTutor = { id: `tutor-${Date.now()}`, ...form, order: maxOrder + 1 };
        save([...tutors, newTutor]);
        toast.success('Tutor added successfully');
      }
      setForm({ ...emptyForm });
      setEditId(null);
      setShowForm(false);
      setImageInputMode('url');
      if (fileInputRef.current) fileInputRef.current.value = '';
      setLoading(false);
    }, 300);
  };

  const handleEdit = (tutor: any) => {
    setForm({ name: tutor.name, role: tutor.role, bio: tutor.bio, imageUrl: tutor.imageUrl, order: tutor.order });
    setEditId(tutor.id);
    setImageInputMode(tutor.imageUrl?.startsWith('data:') ? 'upload' : 'url');
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this tutor?')) return;
    save(tutors.filter(t => t.id !== id));
    toast.success('Tutor deleted');
  };

  const handleCancel = () => {
    setForm({ ...emptyForm });
    setEditId(null);
    setShowForm(false);
    setImageInputMode('url');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) { toast.error('Please select a valid image file'); return; }
    if (file.size > 5 * 1024 * 1024) { toast.error('Image must be smaller than 5 MB'); return; }
    const reader = new FileReader();
    reader.onload = () => setForm(prev => ({ ...prev, imageUrl: reader.result as string }));
    reader.readAsDataURL(file);
  };

  const sortedTutors = [...tutors].sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#196d83] mb-1">Tutor Management</h1>
          <p className="text-gray-500 text-sm">Add, edit, or remove tutors shown on the public Tutors page.</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm({ ...emptyForm, order: tutors.length + 1 }); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: '#196d83' }}
        >
          <Plus className="w-4 h-4" />
          Add Tutor
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#196d83]">{editId ? 'Edit Tutor' : 'Add New Tutor'}</h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. Ms. Ramya Rajamani"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#196d83]"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1">Role / Subject *</label>
                <input
                  type="text"
                  value={form.role}
                  onChange={e => setForm({ ...form, role: e.target.value })}
                  placeholder="e.g. Math, Physics, Statistics Teacher"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#196d83]"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Bio / Description *</label>
              <textarea
                value={form.bio}
                onChange={e => setForm({ ...form, bio: e.target.value })}
                placeholder="Write a short biography about the tutor..."
                rows={4}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#196d83]"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Display Order</label>
              <input
                type="number"
                value={form.order}
                onChange={e => setForm({ ...form, order: Number(e.target.value) })}
                min={1}
                placeholder="e.g. 1"
                className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#196d83]"
              />
              <p className="text-xs text-gray-400 mt-1">Lower number = shown first in carousel</p>
            </div>

            {/* Photo upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Tutor Photo</label>
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => { setImageInputMode('url'); setForm(prev => ({ ...prev, imageUrl: '' })); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${imageInputMode === 'url' ? 'bg-[#196d83] text-white border-[#196d83]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                >
                  <Link className="w-3.5 h-3.5" /> Enter URL
                </button>
                <button
                  type="button"
                  onClick={() => { setImageInputMode('upload'); setForm(prev => ({ ...prev, imageUrl: '' })); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${imageInputMode === 'upload' ? 'bg-[#196d83] text-white border-[#196d83]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                >
                  <Upload className="w-3.5 h-3.5" /> Upload from Device
                </button>
              </div>

              {imageInputMode === 'url' ? (
                <>
                  <input
                    type="url"
                    value={form.imageUrl.startsWith('data:') ? '' : form.imageUrl}
                    onChange={e => setForm({ ...form, imageUrl: e.target.value })}
                    placeholder="https://example.com/teacher.jpg"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#196d83]"
                  />
                  <p className="text-xs text-gray-400 mt-1">Leave blank to use a default avatar placeholder</p>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex flex-col items-center gap-1">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">Click to upload photo</span>
                    <span className="text-xs text-gray-400">JPG, PNG, WebP — max 5 MB</span>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              )}

              {form.imageUrl && (
                <div className="mt-2 flex items-center gap-3">
                  <img src={form.imageUrl} alt="preview" className="w-16 h-16 rounded-full object-cover border-2 border-[#196d83]" onError={e => (e.currentTarget.style.display = 'none')} />
                  <button type="button" onClick={() => { setForm(prev => ({ ...prev, imageUrl: '' })); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="p-1 bg-red-50 text-red-500 rounded-full hover:bg-red-100">
                    <X className="w-3.5 h-3.5" />
                  </button>
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
                {loading ? 'Saving...' : editId ? 'Update Tutor' : 'Add Tutor'}
              </button>
              <button type="button" onClick={handleCancel} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tutor Cards */}
      {sortedTutors.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <User className="mx-auto mb-3 text-gray-300" size={48} />
          <p className="text-gray-500">No tutors found. Click "Add Tutor" to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f0f7fa] text-[#196d83] text-left">
                <th className="px-4 py-3 font-semibold">Order</th>
                <th className="px-4 py-3 font-semibold">Photo</th>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Role / Subject</th>
                <th className="px-4 py-3 font-semibold">Bio</th>
                <th className="px-4 py-3 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedTutors.map((tutor) => (
                <tr key={tutor.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-500 font-medium">{tutor.order}</td>
                  <td className="px-4 py-3">
                    {tutor.imageUrl ? (
                      <img src={tutor.imageUrl} alt={tutor.name} className="w-12 h-12 rounded-full object-cover border" onError={e => (e.currentTarget.style.display = 'none')} />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#196d83] to-[#ddaa2c] flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-semibold text-gray-800 whitespace-nowrap">{tutor.name}</td>
                  <td className="px-4 py-3 text-gray-600 max-w-[160px]">{tutor.role}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs">
                    <span className="line-clamp-2">{tutor.bio}</span>
                    {tutor.bio && tutor.bio.length > 80 && (
                      <button onClick={() => setViewBio(tutor)} className="text-xs text-[#196d83] hover:underline mt-1 block">Read more</button>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(tutor)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(tutor.id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-400">Total {tutors.length} tutor(s). Changes are reflected on the public Tutors page immediately.</p>

      {/* Bio Read More Modal */}
      {viewBio && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setViewBio(null)}>
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-lg w-full" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                {viewBio.imageUrl ? (
                  <img src={viewBio.imageUrl} alt={viewBio.name} className="w-12 h-12 rounded-full object-cover border" />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#196d83] to-[#ddaa2c] flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                )}
                <div>
                  <h3 className="text-lg font-bold text-[#196d83]">{viewBio.name}</h3>
                  <p className="text-sm text-gray-500">{viewBio.role}</p>
                </div>
              </div>
              <button onClick={() => setViewBio(null)} className="p-1.5 rounded-lg hover:bg-gray-100">
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>
            <p className="text-gray-700 leading-relaxed">{viewBio.bio}</p>
          </div>
        </div>
      )}
    </div>
  );
}
