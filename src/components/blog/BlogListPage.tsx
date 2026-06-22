import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { blogApi, type Blog, type ArchiveYear } from '../../api/blogApi';
import { Spinner, TagBadge, Pagination } from '../ui';
import { Clock, Heart, MessageCircle, Eye, Search, BookOpen, SlidersHorizontal, Calendar, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';

interface SortOption {
    value: string;
    label: string;
}

const SORT_OPTIONS: SortOption[] = [
    { value: 'recent', label: 'Latest' },
    { value: 'popular', label: 'Popular' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'most_commented', label: 'Most Discussed' },
];

interface FetchParams {
    page?: number;
    size?: number;
    sort?: string;
    search?: string;
    year?: string;
    month?: string;
}

interface PaginationState {
    page: number;
    totalPages: number;
    totalElements: number;
}

export const BlogListPage: React.FC = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [search, setSearch] = useState<string>('');
    const [sort, setSort] = useState<string>('recent');
    const [year, setYear] = useState<string>('');
    const [month, setMonth] = useState<string>('');
    const [pagination, setPagination] = useState<PaginationState>({ page: 0, totalPages: 0, totalElements: 0 });
    const [pageSize, setPageSize] = useState<number>(9);
    const [archive, setArchive] = useState<ArchiveYear[]>([]);

    const fetchBlogs = useCallback(async (params: FetchParams = {}) => {
        setLoading(true);
        try {
            const currentSize = params.size !== undefined ? params.size : pageSize;
            const queryParams: Record<string, string | number> = {
                page: params.page || 0,
                size: currentSize,
                sort: params.sort || sort,
            };
            const searchVal = params.search !== undefined ? params.search : search;
            if (searchVal) queryParams.search = searchVal;
            const yearVal = params.year !== undefined ? params.year : year;
            const monthVal = params.month !== undefined ? params.month : month;
            if (yearVal) queryParams.year = Number(yearVal);
            if (monthVal) queryParams.month = Number(monthVal);
            const response = await blogApi.getBlogs(queryParams);
            setBlogs(response?.data?.content ?? []);
            setPagination({ page: response?.data?.page ?? 0, totalPages: response?.data?.totalPages ?? 0, totalElements: response?.data?.totalElements ?? 0 });
        } catch (err) { console.error('Failed to load blogs', err); setBlogs([]); }
        finally { setLoading(false); }
    }, [sort, search, pageSize, year, month]);

    const fetchArchive = async () => {
        try {
            const response = await blogApi.getArchive();
            const data = response?.data;
            setArchive(Array.isArray(data) ? data : []);
        } catch (err) { console.error('Failed to load archive', err); }
    };

    useEffect(() => { fetchBlogs(); fetchArchive(); }, []);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); fetchBlogs({ search, page: 0 }); };
    const handleSortChange = (s: string) => { setSort(s); fetchBlogs({ sort: s, page: 0 }); };
    const handlePageChange = (p: number) => { fetchBlogs({ page: p }); };
    const handleYearMonthChange = (y: string, m: string) => { setYear(y); setMonth(m); fetchBlogs({ year: y, month: m, page: 0 }); };
    const clearFilters = () => { setSearch(''); setSort('recent'); setYear(''); setMonth(''); fetchBlogs({ search: '', sort: 'recent', year: '', month: '', page: 0 }); };

    const years = archive.map((a) => a.year);
    const monthsForYear: number[] = year ? archive.find((a) => a.year === Number(year))?.months?.map((m) => m.month) || [] : [];
    const hasFilters = search || year || month || sort !== 'recent';

    return (
        <div className="bg-bg-secondary min-h-screen">
            {/* Page Header */}
            <div className="bg-gradient-to-br from-primary to-primary-light text-white">
                <div className="max-w-6xl mx-auto px-6 py-14">
                    <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-blue-200 hover:text-white mb-3 transition-colors">
                        <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    <h1 className="text-3xl font-bold mb-2">All Blogs</h1>
                    <p className="text-blue-100 text-sm">Browse all articles, tips and insights from Nova Tuitions</p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
                {/* Search + Filters Card */}
                <div className="bg-white rounded-2xl border border-blue-100 shadow-sm px-6 py-7 mb-10">
                    {/* Search bar */}
                    <form onSubmit={handleSearch} className="flex gap-4 mb-6">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-tertiary pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Search articles by title or content..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3.5 text-sm border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                            />
                        </div>
                        <button type="submit" className="bg-primary text-white text-sm font-semibold px-6 py-3.5 rounded-xl hover:bg-primary-dark transition-colors">
                            Search
                        </button>
                        {hasFilters && (
                            <button type="button" onClick={clearFilters} className="text-sm text-red-500 hover:text-red-600 border border-red-200 px-5 py-3.5 rounded-xl hover:bg-red-50 transition-colors">
                                Clear
                            </button>
                        )}
                    </form>

                    {/* Sort + Archive filters */}
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal className="w-4 h-4 text-text-tertiary" />
                            <span className="text-xs text-text-tertiary font-medium uppercase tracking-wide">Sort:</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {SORT_OPTIONS.map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => handleSortChange(option.value)}
                                    className={`px-5 py-3 rounded-lg text-sm font-medium transition-all ${sort === option.value
                                        ? 'bg-primary text-white shadow-sm'
                                        : 'bg-bg-secondary text-text-secondary border border-border-primary hover:border-primary/40'
                                    }`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>

                        {years.length > 0 && (
                            <>
                                <div className="flex items-center gap-2 ml-2">
                                    <Calendar className="w-4 h-4 text-text-tertiary" />
                                    <select value={year} onChange={(e) => handleYearMonthChange(e.target.value, '')}
                                        className="text-sm border border-border-primary rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                                        <option value="">All Years</option>
                                        {years.map(y => <option key={y} value={y}>{y}</option>)}
                                    </select>
                                </div>
                                {year && (
                                    <select value={month} onChange={(e) => handleYearMonthChange(year, e.target.value)}
                                        className="text-sm border border-border-primary rounded-lg px-4 py-3 text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white">
                                        <option value="">All Months</option>
                                        {monthsForYear.map(m => (
                                            <option key={m} value={m}>{new Date(2000, m - 1).toLocaleString('default', { month: 'long' })}</option>
                                        ))}
                                    </select>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <Spinner size="lg" />
                ) : blogs.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-2xl border border-blue-100">
                        <BookOpen className="w-14 h-14 text-blue-200 mx-auto mb-4" />
                        <p className="text-text-primary font-semibold text-lg">No articles found</p>
                        <p className="text-text-tertiary text-sm mt-1">Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <>
                        <p className="text-text-tertiary text-sm mb-5 font-medium">
                            {pagination.totalElements} article{pagination.totalElements !== 1 ? 's' : ''} found
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {blogs.map((blog) => (
                                <Link to={`/blogs/${blog.slug}`} key={blog.id} className="flex flex-col">
                                    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm overflow-hidden flex flex-col h-full hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 group">
                                        <div className="w-full h-52 overflow-hidden shrink-0 bg-gradient-to-br from-blue-50 to-blue-100">
                                            {blog.featuredImageUrl ? (
                                                <img src={blog.featuredImageUrl} alt={blog.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <BookOpen className="w-12 h-12 text-blue-300" />
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5 flex flex-col flex-1 space-y-3">
                                            <h3 className="text-base font-semibold text-text-primary line-clamp-2 leading-snug">{blog.title}</h3>
                                            <p className="text-text-secondary text-sm line-clamp-2 flex-1">{blog.excerpt}</p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {blog.tags?.slice(0, 3).map((tag) => <TagBadge key={tag} tag={tag} />)}
                                            </div>
                                            <div className="flex items-center justify-between text-xs text-text-tertiary pt-3 border-t border-border-secondary">
                                                <div className="flex items-center gap-3">
                                                    <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{blog.likesCount ?? 0}</span>
                                                    <span className="flex items-center gap-1"><MessageCircle className="w-3.5 h-3.5" />{blog.commentsCount ?? 0}</span>
                                                    <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{blog.viewsCount ?? 0}</span>
                                                </div>
                                                {blog.publishedAt && <span>{format(new Date(blog.publishedAt), 'MMM dd, yyyy')}</span>}
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                        <Pagination
                            page={pagination.page}
                            totalPages={pagination.totalPages}
                            onPageChange={handlePageChange}
                            pageSize={pageSize}
                            onPageSizeChange={(newSize) => { setPageSize(newSize); fetchBlogs({ page: 0, size: newSize }); }}
                            pageSizeOptions={[9, 18, 27, 45]}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
