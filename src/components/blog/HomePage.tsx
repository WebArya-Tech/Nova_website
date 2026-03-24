import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { blogApi, type Blog } from '../../api/blogApi';
import { Spinner, TagBadge } from '../ui';
import { Clock, Heart, MessageCircle, Eye, ArrowRight, BookOpen, PenLine, Bell } from 'lucide-react';
import { format } from 'date-fns';

// Blog Card Component
const BlogCard: React.FC<{ blog: Blog }> = ({ blog }) => {
    const inner = (
        <div className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden flex flex-col h-full
                        shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">

            {/* Image — fixed h-48, object-cover preserves aspect ratio */}
            <div className="w-full h-48 overflow-hidden shrink-0 bg-gray-100">
                {blog.featuredImageUrl ? (
                    <img
                        src={blog.featuredImageUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue-50 to-blue-100">
                        <BookOpen className="w-12 h-12 text-blue-300" />
                        <span className="text-[11px] text-blue-300 font-medium tracking-wide">Nova Tuitions</span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col flex-1 gap-3">

                {/* Tags */}
                {blog.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                        {blog.tags.slice(0, 3).map((tag) => (
                            <TagBadge key={tag} tag={tag} />
                        ))}
                    </div>
                )}

                {/* Title */}
                <h3 className="text-[15px] font-bold text-gray-800 line-clamp-2 leading-snug group-hover:text-[#26719f] transition-colors">
                    {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-500 text-sm line-clamp-2 flex-1 leading-relaxed">
                    {blog.excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between text-xs text-gray-400 pt-3 mt-auto border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 hover:text-red-400 transition-colors cursor-default">
                            <Heart className="w-3.5 h-3.5" /> {blog.likesCount ?? 0}
                        </span>
                        <span className="flex items-center gap-1">
                            <MessageCircle className="w-3.5 h-3.5" /> {blog.commentsCount ?? 0}
                        </span>
                        <span className="flex items-center gap-1">
                            <Eye className="w-3.5 h-3.5" /> {blog.viewsCount ?? 0}
                        </span>
                    </div>
                    {blog.publishedAt && (
                        <span className="flex items-center gap-1 font-medium text-gray-400">
                            <Clock className="w-3.5 h-3.5" />
                            {format(new Date(blog.publishedAt), 'MMM dd, yyyy')}
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

    return blog.slug ? (
        <Link to={`/blogs/${blog.slug}`} className="flex flex-col h-full">
            {inner}
        </Link>
    ) : (
        <div className="flex flex-col h-full">{inner}</div>
    );
};

// ✅ Home Page
export const HomePage: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const response = await blogApi.getBlogs({ size: 6, sort: 'popular' });
                setBlogs(response?.data?.content ?? []);
            } catch {
                setBlogs([]);
            } finally {
                setLoading(false);
            }
        };
        loadBlogs();
    }, []);

    return (
        <div className="overflow-x-hidden">

            {/* ─── Hero Section ─── */}
            <section
                style={{ background: 'linear-gradient(135deg, #1a5a84 0%, #26719f 50%, #3589b8 100%)' }}
                className="text-white relative overflow-hidden"
            >
                {/* Decorative shapes */}
                <div className="absolute inset-0 pointer-events-none" aria-hidden>
                    <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-white/[0.04]" />
                    <div className="absolute -bottom-14 -right-14 w-60 h-60 rounded-full bg-white/[0.04]" />
                    <div className="absolute top-1/3 right-1/4 w-36 h-36 rounded-full bg-white/[0.03]" />
                </div>

                <div className="relative max-w-5xl mx-auto px-6 py-16 md:py-24 text-center">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 md:mb-6 leading-tight tracking-tight">
                        Learn. Grow. Excel.
                    </h1>

                    <p className="text-white/80 text-sm sm:text-base md:text-lg mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed">
                        Tips, strategies and insights to help students ace their boards and beyond.
                    </p>

                    <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center">
                        <Link to="/blogs/all">
                            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white font-bold text-sm px-6 py-3 md:px-7 md:py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200" style={{ color: '#26719f' }}>
                                <BookOpen className="w-4 h-4" />
                                Explore Blogs
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </Link>

                        <Link to="/blogs/submit">
                            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white font-semibold text-sm px-6 py-3 md:px-7 md:py-3.5 rounded-xl hover:bg-white/25 backdrop-blur-sm transition-all duration-200">
                                <PenLine className="w-4 h-4" />
                                Write Your Blog
                            </button>
                        </Link>

                        <Link to="/blogs/subscribe">
                            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white font-semibold text-sm px-6 py-3 md:px-7 md:py-3.5 rounded-xl hover:bg-white/25 backdrop-blur-sm transition-all duration-200">
                                <Bell className="w-4 h-4" />
                                Subscribe
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* ─── Popular Blogs ─── */}
            <section className="bg-gray-50">
                <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">

                    {/* Section header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 md:mb-10">
                        <div>
                            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800">
                                Popular Blogs
                            </h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Most-read articles curated for you
                            </p>
                        </div>

                        <Link
                            to="/blogs/all"
                            className="inline-flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-xl border-2 transition-all duration-200 hover:-translate-y-0.5 self-start sm:self-auto"
                            style={{ color: '#26719f', borderColor: '#26719f' }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#26719f'; e.currentTarget.style.color = 'white'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#26719f'; }}
                        >
                            View all <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Blog grid */}
                    {loading ? (
                        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
                    ) : blogs.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-2xl border border-gray-200 shadow-sm">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 mb-4">
                                <BookOpen className="w-10 h-10" style={{ color: '#26719f' }} />
                            </div>
                            <p className="text-gray-700 text-lg font-bold mb-1">No blogs yet</p>
                            <p className="text-gray-400 text-sm">
                                <Link to="/blogs/submit" className="underline" style={{ color: '#26719f' }}>Be the first to write one!</Link>
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map((blog) => (
                                <BlogCard key={blog.id} blog={blog} />
                            ))}
                        </div>
                    )}
                </div>
            </section>


        </div>
    );
};