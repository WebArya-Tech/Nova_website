import React, { useState, useEffect, useCallback, useRef } from 'react';
import { blogApi } from '../../api/blogApi';
import { ContentEditor } from '../editor/ContentEditor';
import { PenTool, Mail, CheckCircle, ArrowRight, Save, RotateCcw, Upload, X, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';

const DRAFT_KEY = 'blogpost_draft';

interface BlogFormData {
    authorName: string;
    authorEmail: string;
    authorMobile: string;
    title: string;
    excerpt: string;
    content: string;
    tags: string;
    featuredImageUrl: string;
}

const emptyForm: BlogFormData = {
    authorName: '', authorEmail: '', authorMobile: '',
    title: '', excerpt: '', content: '', tags: '', featuredImageUrl: '',
};

export const SubmitBlogPage: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState<BlogFormData>(emptyForm);
    const [otp, setOtp] = useState<string>('');
    const [hasDraft, setHasDraft] = useState<boolean>(false);
    const [draftSavedAt, setDraftSavedAt] = useState<Date | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [imageLoading, setImageLoading] = useState<boolean>(false);
    const [isDragOver, setIsDragOver] = useState<boolean>(false);
    const autoSaveTimer = useRef<ReturnType<typeof setInterval> | null>(null);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    
    // Check for saved draft on mount
    useEffect(() => {
        try {
            const saved = localStorage.getItem(DRAFT_KEY);
            if (saved) {
                const draft = JSON.parse(saved);
                if (draft.formData && (draft.formData.title || draft.formData.content || draft.formData.excerpt)) {
                    setHasDraft(true);
                    setDraftSavedAt(draft.savedAt ? new Date(draft.savedAt) : null);
                }
            }
        } catch { /* ignore corrupt data */ }
    }, []);

    // Auto-save every 30 seconds when on step 1
    useEffect(() => {
        if (step !== 1) return;
        autoSaveTimer.current = setInterval(() => {
            const hasContent = formData.title || formData.content || formData.excerpt;
            if (hasContent) {
                saveDraft(true);
            }
        }, 30000);
        return () => clearInterval(autoSaveTimer.current);
    }, [step, formData]);

    // Sync image preview with form data
    useEffect(() => {
        if (formData.featuredImageUrl) {
            setImagePreview(formData.featuredImageUrl);
        } else {
            setImagePreview(null);
        }
    }, [formData.featuredImageUrl]);

    const saveDraft = useCallback((silent = false) => {
        try {
            const draft = { formData, savedAt: new Date().toISOString() };
            localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
            setDraftSavedAt(new Date());
            setHasDraft(true);
            if (!silent) toast.success('Draft saved!');
        } catch {
            if (!silent) toast.error('Could not save draft');
        }
    }, [formData]);

    const restoreDraft = () => {
        try {
            const saved = localStorage.getItem(DRAFT_KEY);
            if (saved) {
                const draft = JSON.parse(saved);
                setFormData(draft.formData);
                setHasDraft(false);
                toast.success('Draft restored!');
            }
        } catch { toast.error('Could not restore draft'); }
    };

    const discardDraft = () => {
        localStorage.removeItem(DRAFT_KEY);
        setHasDraft(false);
        setDraftSavedAt(null);
        toast.success('Draft discarded');
    };

    const clearDraft = () => {
        localStorage.removeItem(DRAFT_KEY);
        setDraftSavedAt(null);
    };

    const handleStep1 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); setLoading(true);
        try {
            await blogApi.startSubmission({
                authorName: formData.authorName, authorEmail: formData.authorEmail, authorMobile: formData.authorMobile,
                title: formData.title, excerpt: formData.excerpt, contentHtml: formData.content,
                tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
                featuredImageUrl: formData.featuredImageUrl || null,
            });
            toast.success('OTP sent to your email!'); setStep(2);
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Submission failed';
            toast.error(msg);
        }
        finally { setLoading(false); }
    };

    const handleStep2 = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); setLoading(true);
        try {
            await blogApi.verifySubmission({ email: formData.authorEmail, otp });
            toast.success('Email verified!'); setStep(3);
        }
        catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Invalid OTP';
            toast.error(msg);
        }
        finally { setLoading(false); }
    };

    const handleStep3 = async () => {
        setLoading(true);
        try {
            await blogApi.finishSubmission({ email: formData.authorEmail });
            clearDraft(); // Clear draft on successful submission
            toast.success('Blog submitted!'); setStep(4);
        }
        catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to finalize';
            toast.error(msg);
        }
        finally { setLoading(false); }
    };

    const update = (f: keyof BlogFormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [f]: e.target.value });

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        processImageFile(file);

        // Reset file input for re-upload
        e.target.value = '';
    };

    const processImageFile = (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error('❌ Please select a valid image file (JPG, PNG, GIF, WebP)');
            return;
        }

        // Validate file size (max 5MB)
        const fileSizeMB = file.size / (1024 * 1024);
        if (fileSizeMB > 5) {
            toast.error(`❌ File size is ${fileSizeMB.toFixed(1)}MB. Max allowed is 5MB`);
            return;
        }

        setImageLoading(true);

        // Convert to base64/data URL
        const reader = new FileReader();
        reader.onload = (event) => {
            const dataUrl = event.target?.result;
            if (typeof dataUrl === 'string') {
                setFormData(prev => ({ ...prev, featuredImageUrl: dataUrl }));
                setImagePreview(dataUrl);
                toast.success(`✅ Image uploaded! (${fileSizeMB.toFixed(1)}MB)`);
            }
            setImageLoading(false);
        };
        reader.onerror = () => {
            toast.error('❌ Failed to read image file');
            setImageLoading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleUrlChange = (url: string) => {
        setFormData(prev => ({ ...prev, featuredImageUrl: url }));
        if (url && url.trim()) {
            // Validate URL format
            try {
                new URL(url);
                setImagePreview(url);
            } catch {
                setImagePreview(null);
            }
        } else {
            setImagePreview(null);
        }
    };

    const clearImage = () => {
        setFormData(prev => ({ ...prev, featuredImageUrl: '' }));
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        toast.success('Image removed');
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);

        const files = e.dataTransfer?.files;
        if (files && files.length > 0) {
            const file = files[0];
            processImageFile(file);
        }
    };

    const formatTime = (date: Date | null) => {
        if (!date) return '';
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const inputCls = "w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all placeholder:text-gray-400";

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div style={{ background: 'linear-gradient(135deg, #133f5c 0%, #195276 50%, #1e6590 100%)' }}>
                <div className="max-w-4xl mx-auto px-6 py-16">
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
                            <PenTool className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white">Submit Your Blog</h1>
                    </div>
                    <p className="text-white text-sm ml-[56px]">Share your knowledge with Nova Tuitions students &amp; parents</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-10 my-10 md:py-12 mb-16">
                {/* Draft restore banner */}
                {hasDraft && step === 1 && (
                    <div className="mt-6 mb-8 px-5 py-4 bg-amber-50 border border-amber-200 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-amber-100 flex items-center justify-center shrink-0">
                                <RotateCcw className="w-4.5 h-4.5 text-amber-600" />
                            </div>
                            <div>
                                <p className="text-base font-bold text-gray-800">Unsaved draft found</p>
                                {draftSavedAt && <p className="text-sm text-gray-400 mt-0.5">Last saved at {formatTime(draftSavedAt)}</p>}
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={restoreDraft} className="text-white text-sm font-bold py-3 px-6 rounded-xl transition-all duration-200 hover:-translate-y-0.5 shadow-sm hover:shadow-md" style={{ background: '#195276' }}>
                                Restore
                            </button>
                            <button onClick={discardDraft} className="bg-white border border-gray-200 text-gray-600 text-sm font-bold py-3 px-6 rounded-xl hover:bg-gray-50 transition-all duration-200">
                                Discard
                            </button>
                        </div>
                    </div>
                )}

                {/* Step Indicator */}
                <div className="flex items-center justify-center gap-4 py-8 mb-10">
                    {[
                        { n: 1, label: 'Write' },
                        { n: 2, label: 'Verify' },
                        { n: 3, label: 'Submit' },
                    ].map(({ n, label }, i) => (
                        <React.Fragment key={n}>
                            <div className="flex flex-col items-center gap-1.5">
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-base font-bold transition-all duration-300 ${
                                    step > n ? 'bg-emerald-500 text-white shadow-sm' :
                                    step === n ? 'text-white shadow-lg' :
                                    'bg-white border-2 border-gray-200 text-gray-400'
                                }`} style={step === n ? { background: '#195276' } : {}}>
                                    {step > n ? '✓' : n}
                                </div>
                                <span className={`text-sm font-semibold ${step === n ? 'text-gray-800' : 'text-gray-400'}`}>{label}</span>
                            </div>
                            {i < 2 && <div className={`w-16 sm:w-20 h-0.5 mb-6 rounded-full ${step > n ? 'bg-emerald-400' : 'bg-gray-200'} transition-colors duration-300`} />}
                        </React.Fragment>
                    ))}
                </div>

                {/* Step 1: Write */}
                {step === 1 && (
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 pt-10 md:p-8 md:pt-10">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
                            <h2 className="text-xl sm:text-2xl font-extrabold text-gray-800">Write Your Blog</h2>
                            <button type="button" onClick={() => saveDraft(false)}
                                className="flex items-center gap-2.5 text-sm font-bold px-5 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-all duration-200" style={{ color: '#195276' }}>
                                <Save size={14} /> Save Draft
                                {draftSavedAt && <span className="text-gray-400 font-normal hidden sm:inline">· {formatTime(draftSavedAt)}</span>}
                            </button>
                        </div>
                        <form onSubmit={handleStep1} className="space-y-6">
                            {/* Author info */}
                            <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Full Name *</label>
                                    <input placeholder="John Doe" value={formData.authorName} onChange={update('authorName')} required className={inputCls} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Email *</label>
                                    <input type="email" placeholder="john@example.com" value={formData.authorEmail} onChange={update('authorEmail')} required className={inputCls} />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Mobile *</label>
                                <input placeholder="+91 98765 43210" value={formData.authorMobile} onChange={update('authorMobile')} required className={inputCls} />
                            </div>

                            <hr className="border-gray-100" />

                            {/* Blog content */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Blog Title *</label>
                                <input placeholder="An amazing title..." value={formData.title} onChange={update('title')} required className={inputCls} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Excerpt *</label>
                                <textarea placeholder="Brief summary (2-3 sentences)" rows={3} value={formData.excerpt} onChange={update('excerpt')} required className={`${inputCls} resize-none`} />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Content *</label>
                                <ContentEditor
                                    initialContent={formData.content}
                                    onChange={(html) => setFormData(prev => ({ ...prev, content: html }))}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-2">Tags (comma separated)</label>
                                <input placeholder="study-tips, cbse, math" value={formData.tags} onChange={update('tags')} className={inputCls} />
                            </div>

                            {/* Featured Image */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wide mb-3">Featured Image (optional)</label>

                                {imagePreview && (
                                    <div className="relative w-full rounded-xl overflow-hidden mb-4 border border-gray-200">
                                        <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover"
                                            onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; toast.error('Invalid image URL'); }} />
                                        <button type="button" onClick={clearImage}
                                            className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg transition-all duration-200 hover:scale-105">
                                            <X size={14} />
                                        </button>
                                        <span className="absolute bottom-3 left-3 bg-black/60 text-white text-xs font-medium px-3 py-1 rounded-lg">
                                            ✓ Ready
                                        </span>
                                    </div>
                                )}

                                <div
                                    onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
                                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer mb-4 ${
                                        isDragOver ? 'border-blue-400 bg-blue-50/50' : 'border-gray-200 hover:border-blue-300 bg-gray-50'
                                    }`}
                                >
                                    <ImageIcon className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                                    <p className="text-sm font-semibold text-gray-600">Drag &amp; drop image here</p>
                                    <p className="text-xs text-gray-400 mt-1.5">JPG, PNG, WebP · Max 5MB</p>
                                </div>

                                <div className="flex gap-3">
                                    <button type="button" onClick={() => fileInputRef.current?.click()} disabled={imageLoading}
                                        className="flex items-center gap-2 text-sm font-bold px-5 py-3 rounded-xl transition-all duration-200 disabled:opacity-50 hover:-translate-y-0.5" style={{ background: 'rgba(25,82,118,0.1)', color: '#195276' }}>
                                        {imageLoading ? <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" /> : <Upload size={16} />}
                                        {imageLoading ? 'Processing...' : 'Upload from Device'}
                                    </button>
                                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" disabled={imageLoading} />
                                </div>

                                <div className="mt-4">
                                    <label className="block text-xs text-gray-400 font-medium mb-4">Or paste image URL:</label>
                                    <input type="url" placeholder="https://example.com/image.jpg"
                                        value={formData.featuredImageUrl.startsWith('data:') ? '' : formData.featuredImageUrl}
                                        onChange={(e) => handleUrlChange(e.target.value)}
                                        disabled={imageLoading}
                                        className={`${inputCls} disabled:opacity-50`} />
                                </div>
                            </div>

                            <button type="submit" disabled={loading}
                                className="w-full flex items-center justify-center gap-3 text-white font-bold py-4 rounded-xl transition-all duration-200 disabled:opacity-60 text-sm mt-6 hover:-translate-y-0.5 shadow-sm hover:shadow-md" style={{ background: '#195276' }}>
                                {loading ? 'Sending OTP...' : <><span>Next: Verify Email</span><ArrowRight className="w-4 h-4" /></>}
                            </button>
                        </form>
                    </div>
                )}

                {/* Step 2: Verify OTP */}
                {step === 2 && (
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 sm:p-10 max-w-md mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5" style={{ background: 'rgba(25,82,118,0.1)' }}>
                            <Mail className="w-8 h-8" style={{ color: '#195276' }} />
                        </div>
                        <h2 className="text-xl font-extrabold text-gray-800 mb-2">Check your inbox</h2>
                        <p className="text-gray-500 text-sm mb-8">OTP sent to <strong className="text-gray-700">{formData.authorEmail}</strong></p>
                        <form onSubmit={handleStep2} className="space-y-5">
                            <input placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)}
                                maxLength={6} required
                                className="w-full text-center text-2xl font-bold tracking-widest px-4 py-3.5 border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all" />
                            <button type="submit" disabled={loading}
                                className="w-full text-white font-bold py-3.5 rounded-xl transition-all duration-200 disabled:opacity-60 text-sm hover:-translate-y-0.5 shadow-sm hover:shadow-md" style={{ background: '#195276' }}>
                                {loading ? 'Verifying...' : 'Verify OTP'}
                            </button>
                        </form>
                    </div>
                )}

                {/* Step 3: Confirm */}
                {step === 3 && (
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 sm:p-10 max-w-md mx-auto text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-5">
                            <CheckCircle className="w-9 h-9 text-emerald-500" />
                        </div>
                        <h2 className="text-xl font-extrabold text-gray-800 mb-2">Email Verified!</h2>
                        <p className="text-gray-500 text-sm mb-8">Ready to submit your blog for admin review.</p>
                        <button onClick={handleStep3} disabled={loading}
                            className="text-white font-bold px-8 py-3.5 rounded-xl transition-all duration-200 disabled:opacity-60 text-sm hover:-translate-y-0.5 shadow-sm hover:shadow-md" style={{ background: '#195276' }}>
                            {loading ? 'Submitting...' : 'Finalize Submission'}
                        </button>
                    </div>
                )}

                {/* Step 4: Done */}
                {step === 4 && (
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-8 sm:p-10 max-w-md mx-auto text-center">
                        <div className="text-5xl mb-5">🎉</div>
                        <h2 className="text-2xl font-extrabold text-gray-800 mb-3">Blog Submitted!</h2>
                        <p className="text-gray-500 text-sm mb-8">
                            Your blog is under review. You'll receive an email once it's approved and published.
                        </p>
                        <button onClick={() => { setStep(1); setFormData(emptyForm); }}
                            className="border-2 font-bold px-8 py-3.5 rounded-xl transition-all duration-200 text-sm hover:-translate-y-0.5 hover:shadow-md" style={{ borderColor: '#195276', color: '#195276' }}>
                            Submit Another Blog
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
