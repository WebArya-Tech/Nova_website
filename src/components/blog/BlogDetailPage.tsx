import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogApi, type Blog, type Comment, type ReactionStatus } from '../../api/blogApi';
import { Spinner, TagBadge } from '../ui';
import { Heart, ThumbsDown, MessageCircle, Eye, Clock, ArrowLeft, Send, User, BookOpen } from 'lucide-react';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

const getVisitorKey = (): string => {
    let key = localStorage.getItem('visitorKey');
    if (!key) { key = 'visitor_' + Date.now() + '_' + Math.random().toString(36).slice(2, 9); localStorage.setItem('visitorKey', key); }
    return key;
};

export const BlogDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [comments, setComments] = useState<Comment[]>([]);
    const [commentsLoading, setCommentsLoading] = useState<boolean>(false);
    const [reactionStatus, setReactionStatus] = useState<ReactionStatus | null>(null);
    const [commentForm, setCommentForm] = useState<{ name: string; commentText: string; honeypot: string }>({ name: '', commentText: '', honeypot: '' });
    const [submitting, setSubmitting] = useState<boolean>(false);

    useEffect(() => {
        const loadBlog = async () => {
            setLoading(true);
            try {
                const response = await blogApi.getBlogBySlug(slug);
                setBlog(response.data);
                loadComments(response.data.id);
                loadReactions(response.data.id);
            } catch { toast.error('Blog not found'); }
            finally { setLoading(false); }
        };
        loadBlog();
    }, [slug]);

    const loadComments = async (blogId: number) => {
        setCommentsLoading(true);
        try {
            const r = await blogApi.getComments(blogId, { size: 50 });
            setComments(r?.data?.content ?? []);
        } catch { console.error('Failed to load comments'); }
        finally { setCommentsLoading(false); }
    };

    const loadReactions = async (blogId: number) => {
        try { const r = await blogApi.getReactionStatus(blogId, getVisitorKey()); setReactionStatus(r.data); }
        catch { console.error('Failed to load reactions'); }
    };

    const handleReaction = async (reactionType: 'LIKE' | 'DISLIKE') => {
        if (!blog) return;
        try {
            const r = await blogApi.toggleReaction(blog.id, { reactionType, visitorKey: getVisitorKey() });
            setReactionStatus(r.data);
            setBlog(prev => prev ? { ...prev, likesCount: r.data.likesCount, dislikesCount: r.data.dislikesCount } : prev);
        } catch { toast.error('Failed to react'); }
    };

    const handleComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!blog || !commentForm.name.trim() || !commentForm.commentText.trim()) return;
        setSubmitting(true);
        try {
            await blogApi.postComment(blog.id, commentForm);
            toast.success('Comment posted!');
            setCommentForm({ name: '', commentText: '', honeypot: '' });
            loadComments(blog.id);
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed to post comment';
            toast.error(msg);
        }
        finally { setSubmitting(false); }
    };
    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Spinner size="lg" /></div>;
    if (!blog) return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-6">
            <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center mb-5">
                <BookOpen className="w-10 h-10" style={{ color: '#26719f' }} />
            </div>
            <p className="text-gray-800 text-xl font-bold mb-2">Blog not found</p>
            <p className="text-gray-400 text-sm mb-6">The article you're looking for doesn't exist or has been removed.</p>
            <Link to="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl transition-all" style={{ color: '#26719f' }}>
                <ArrowLeft className="w-4 h-4" /> Back to Blogs
            </Link>
        </div>
    );

    return (
        <div className="bg-gray-50 min-h-screen">

            {/* Breadcrumb bar */}
            <div className="bg-white border-b border-gray-200">
                <div className="max-w-3xl mx-auto px-6 py-3">
                    <Link to="/blogs" className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:opacity-80" style={{ color: '#26719f' }}>
                        <ArrowLeft className="w-4 h-4" /> Back to Blogs
                    </Link>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-6 py-8 md:py-12">

                {/* Article card */}
                <article className="bg-white rounded-2xl border border-gray-200/80 shadow-sm overflow-hidden mb-8">

                    {/* Featured Image — fixed height, aspect-ratio preserved */}
                    {blog.featuredImageUrl && (
                        <div className="w-full h-56 sm:h-64 md:h-80 overflow-hidden shrink-0 bg-gray-100">
                            <img src={blog.featuredImageUrl} alt={blog.title} className="w-full h-full object-cover" />
                        </div>
                    )}

                    <div className="p-6 md:p-8">

                        {/* Tags */}
                        {blog.tags?.length > 0 && (
                            <div className="flex flex-wrap gap-1.5 mb-4">
                                {blog.tags.map((tag) => <TagBadge key={tag} tag={tag} />)}
                            </div>
                        )}

                        {/* Title */}
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-gray-800 mb-5 leading-tight">{blog.title}</h1>

                        {/* Author & meta */}
                        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-gray-400 text-sm mb-6 pb-6 border-b border-gray-100">
                            <span className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'rgba(38,113,159,0.1)' }}>
                                    <User className="w-3.5 h-3.5" style={{ color: '#26719f' }} />
                                </div>
                                <span className="font-medium text-gray-600">{blog.authorName}</span>
                            </span>
                            {blog.publishedAt && (
                                <span className="flex items-center gap-1.5">
                                    <Clock className="w-4 h-4" />
                                    {format(new Date(blog.publishedAt), 'MMMM dd, yyyy')}
                                </span>
                            )}
                            <span className="flex items-center gap-1.5">
                                <Eye className="w-4 h-4" /> {blog.viewsCount ?? 0} views
                            </span>
                        </div>

                        {/* Content */}
                        <div
                            className="prose prose-sm sm:prose max-w-none text-gray-600 leading-relaxed mb-8"
                            ref={(el) => {
                                if (!el) return;
                                el.querySelectorAll('img').forEach(img => {
                                    img.onerror = function () {
                                        const fallback = document.createElement('div');
                                        fallback.className = 'flex items-center justify-center h-32 bg-gray-100 rounded-lg text-gray-400 text-sm';
                                        fallback.textContent = 'Image not available';
                                        this.replaceWith(fallback);
                                    };
                                });
                            }}
                            dangerouslySetInnerHTML={{ __html: blog.contentHtml || '' }}
                        />

                        {/* Reactions */}
                        <div className="flex flex-wrap items-center gap-3 pt-6 border-t border-gray-100">
                            <span className="text-sm text-gray-400 font-medium mr-1">Was this helpful?</span>
                            <button
                                onClick={() => handleReaction('LIKE')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                                    reactionStatus?.userReaction === 'LIKE'
                                        ? 'text-white border-transparent shadow-sm'
                                        : 'border-gray-200 text-gray-500 hover:border-blue-200 hover:bg-blue-50'
                                }`}
                                style={reactionStatus?.userReaction === 'LIKE' ? { background: '#26719f' } : {}}
                            >
                                <Heart className={`w-4 h-4 ${reactionStatus?.userReaction === 'LIKE' ? 'fill-current' : ''}`} />
                                <span>{blog.likesCount ?? 0}</span>
                            </button>
                            <button
                                onClick={() => handleReaction('DISLIKE')}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold transition-all duration-200 ${
                                    reactionStatus?.userReaction === 'DISLIKE'
                                        ? 'bg-red-500 text-white border-red-500 shadow-sm'
                                        : 'border-gray-200 text-gray-500 hover:border-red-200 hover:bg-red-50'
                                }`}
                            >
                                <ThumbsDown className={`w-4 h-4 ${reactionStatus?.userReaction === 'DISLIKE' ? 'fill-current' : ''}`} />
                                <span>{blog.dislikesCount ?? 0}</span>
                            </button>
                        </div>
                    </div>
                </article>

                {/* ─── Comments Section ─── */}
                <section>
                    <h2 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
                        <MessageCircle className="w-5 h-5" style={{ color: '#26719f' }} />
                        Comments
                        <span className="text-gray-400 font-normal text-sm">({comments.length})</span>
                    </h2>

                    {/* Comment Form */}
                    <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 mb-6">
                        <h3 className="text-sm font-bold text-gray-800 mb-4">Leave a Comment</h3>
                        <form onSubmit={handleComment} className="space-y-4">
                            <input
                                type="text"
                                placeholder="Your name *"
                                value={commentForm.name}
                                onChange={(e) => setCommentForm({ ...commentForm, name: e.target.value })}
                                required
                                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all placeholder:text-gray-400"
                            />
                            <input type="text" name="honeypot" value={commentForm.honeypot} onChange={(e) => setCommentForm({ ...commentForm, honeypot: e.target.value })} className="hidden" tabIndex={-1} autoComplete="off" />
                            <textarea
                                placeholder="Write your comment... *"
                                value={commentForm.commentText}
                                onChange={(e) => setCommentForm({ ...commentForm, commentText: e.target.value })}
                                rows={4}
                                required
                                className="w-full px-4 py-3 text-sm border border-gray-200 rounded-xl bg-gray-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-300 transition-all resize-none placeholder:text-gray-400"
                            />
                            <button
                                type="submit"
                                disabled={submitting}
                                className="flex items-center gap-2 text-white text-sm font-bold px-6 py-3 rounded-xl transition-all duration-200 disabled:opacity-60 hover:-translate-y-0.5 shadow-sm hover:shadow-md"
                                style={{ background: '#26719f' }}
                            >
                                <Send className="w-4 h-4" />
                                {submitting ? 'Posting...' : 'Post Comment'}
                            </button>
                        </form>
                    </div>

                    {/* Comments List */}
                    {commentsLoading ? (
                        <div className="flex justify-center py-12"><Spinner /></div>
                    ) : comments.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-gray-200/80">
                            <MessageCircle className="w-10 h-10 text-blue-200 mx-auto mb-3" />
                            <p className="text-gray-400 text-sm">No comments yet. Be the first!</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {comments.map((c) => (
                                <div key={c.id} className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-5 hover:shadow-md transition-shadow duration-200">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0" style={{ background: '#26719f' }}>
                                            {c.name?.charAt(0)?.toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-800 text-sm">{c.name}</p>
                                            {c.createdAt && <p className="text-xs text-gray-400">{format(new Date(c.createdAt), 'MMM dd, yyyy · HH:mm')}</p>}
                                        </div>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed pl-12">{c.commentText}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            </div>
        </div>
    );
};
