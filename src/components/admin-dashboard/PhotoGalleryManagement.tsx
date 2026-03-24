import React, { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, Edit2, X, Image, Upload, Link } from 'lucide-react';
import toast from 'react-hot-toast';

const STORAGE_KEY = 'nova_photo_gallery';

const DEFAULT_PHOTOS = [
  { id: 'default-1', title: 'Live Online Teaching Session', description: 'Interactive online classes with expert teachers', imageUrl: '' },
  { id: 'default-2', title: 'Students Learning Together', description: 'Collaborative learning environment', imageUrl: '' },
  { id: 'default-3', title: 'Professional Teaching Setup', description: 'Modern digital teaching infrastructure', imageUrl: '' },
  { id: 'default-4', title: 'Student Achievement', description: 'Celebrating academic excellence', imageUrl: '' },
  { id: 'default-5', title: 'Study Materials', description: 'Comprehensive learning resources', imageUrl: '' },
  { id: 'default-6', title: 'Digital Whiteboard', description: 'Advanced teaching tools and technology', imageUrl: '' },
];

const emptyForm = { title: '', description: '', imageUrl: '' };

export default function PhotoGalleryManagement() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [editId, setEditId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [imageInputMode, setImageInputMode] = useState<'url' | 'upload'>('url');
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setPhotos(JSON.parse(stored));
    } else {
      setPhotos(DEFAULT_PHOTOS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_PHOTOS));
    }
  }, []);

  const save = (updated: any[]) => {
    setPhotos(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) { toast.error('Title is required'); return; }
    if (!form.description.trim()) { toast.error('Description is required'); return; }
    setLoading(true);
    setTimeout(() => {
      if (editId) {
        const updated = photos.map(p => p.id === editId ? { ...p, ...form } : p);
        save(updated);
        toast.success('Photo updated successfully');
      } else {
        const newPhoto = { id: `photo-${Date.now()}`, ...form };
        save([...photos, newPhoto]);
        toast.success('Photo added successfully');
      }
      setForm(emptyForm);
      setEditId(null);
      setShowForm(false);
      setLoading(false);
    }, 300);
  };

  const handleEdit = (photo: any) => {
    setForm({ title: photo.title, description: photo.description, imageUrl: photo.imageUrl });
    setEditId(photo.id);
    setImageInputMode(photo.imageUrl?.startsWith('data:') ? 'upload' : 'url');
    setShowForm(true);
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

  const handleDelete = (id: string) => {
    if (!window.confirm('Delete this photo entry?')) return;
    save(photos.filter(p => p.id !== id));
    toast.success('Photo deleted');
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditId(null);
    setShowForm(false);
    setImageInputMode('url');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="w-full">
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#196d83] mb-1">Photo Gallery Management</h1>
          <p className="text-gray-500 text-sm">Add, edit, or remove photos shown in the public Photo Gallery page.</p>
        </div>
        <button
          onClick={() => { setShowForm(true); setEditId(null); setForm(emptyForm); }}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-white font-semibold transition-all hover:opacity-90"
          style={{ backgroundColor: '#196d83' }}
        >
          <Plus className="w-4 h-4" />
          Add Photo
        </button>
      </div>

      {/* Add/Edit Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-[#196d83]">{editId ? 'Edit Photo' : 'Add New Photo'}</h2>
            <button onClick={handleCancel} className="text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={e => setForm({ ...form, title: e.target.value })}
                placeholder="e.g. Live Online Teaching Session"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#196d83]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Description *</label>
              <input
                type="text"
                value={form.description}
                onChange={e => setForm({ ...form, description: e.target.value })}
                placeholder="e.g. Interactive online classes with expert teachers"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#196d83]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Image</label>
              {/* Toggle */}
              <div className="flex gap-2 mb-3">
                <button
                  type="button"
                  onClick={() => { setImageInputMode('url'); setForm(prev => ({ ...prev, imageUrl: '' })); if (fileInputRef.current) fileInputRef.current.value = ''; }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    imageInputMode === 'url' ? 'bg-[#196d83] text-white border-[#196d83]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Link className="w-3.5 h-3.5" /> Enter URL
                </button>
                <button
                  type="button"
                  onClick={() => { setImageInputMode('upload'); setForm(prev => ({ ...prev, imageUrl: '' })); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    imageInputMode === 'upload' ? 'bg-[#196d83] text-white border-[#196d83]' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
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
                    placeholder="https://example.com/photo.jpg"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#196d83]"
                  />
                  <p className="text-xs text-gray-400 mt-1">Leave blank to use a default gradient placeholder</p>
                </>
              ) : (
                <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                  <div className="flex flex-col items-center gap-1">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">Click to upload image</span>
                    <span className="text-xs text-gray-400">JPG, PNG, GIF, WebP — max 5 MB</span>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </label>
              )}
            </div>
            {form.imageUrl && (
              <div className="mt-2">
                <p className="text-xs font-semibold text-gray-500 mb-1">Preview:</p>
                <div className="relative w-fit">
                  <img src={form.imageUrl} alt="preview" className="h-32 w-auto rounded-lg border object-cover" onError={e => (e.currentTarget.style.display = 'none')} />
                  <button type="button" onClick={() => { setForm(prev => ({ ...prev, imageUrl: '' })); if (fileInputRef.current) fileInputRef.current.value = ''; }} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600">
                    <X className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className="px-5 py-2 rounded-lg text-white font-semibold text-sm transition-all hover:opacity-90 disabled:opacity-60"
                style={{ backgroundColor: '#196d83' }}
              >
                {loading ? 'Saving...' : editId ? 'Update Photo' : 'Add Photo'}
              </button>
              <button type="button" onClick={handleCancel} className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 font-semibold text-sm hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Photo list */}
      {photos.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
          <Image className="mx-auto mb-3 text-gray-300" size={48} />
          <p className="text-gray-500">No photos in gallery yet. Click "Add Photo" to get started.</p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#f0f7fa] text-[#196d83] text-left">
                <th className="px-4 py-3 font-semibold">#</th>
                <th className="px-4 py-3 font-semibold">Preview</th>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Description</th>
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {photos.map((photo, i) => (
                <tr key={photo.id} className="border-t border-gray-100 hover:bg-gray-50 transition">
                  <td className="px-4 py-3 text-gray-500">{i + 1}</td>
                  <td className="px-4 py-3">
                    {photo.imageUrl ? (
                      <img src={photo.imageUrl} alt={photo.title} className="w-16 h-12 object-cover rounded-lg border" onError={e => (e.currentTarget.style.display = 'none')} />
                    ) : (
                      <div className="w-16 h-12 bg-gradient-to-br from-[#196d83] to-[#ddaa2c] rounded-lg flex items-center justify-center">
                        <Image className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-800">{photo.title}</td>
                  <td className="px-4 py-3 text-gray-500 max-w-xs truncate">{photo.description}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleEdit(photo)} className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition" title="Edit">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(photo.id)} className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition" title="Delete">
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

      <p className="mt-4 text-xs text-gray-400">Total {photos.length} photo(s) in gallery. Changes are reflected on the public Photos page immediately.</p>
    </div>
  );
}
