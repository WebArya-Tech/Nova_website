import api from './api';
import { AxiosResponse } from 'axios';

/* ─── Types ─── */

export interface BlogListParams {
    page?: number;
    size?: number;
    sort?: string;
    search?: string;
    year?: number;
    month?: number;
}

export interface Blog {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    contentHtml?: string;
    featuredImageUrl?: string;
    tags?: string[];
    authorName?: string;
    authorEmail?: string;
    likesCount?: number;
    dislikesCount?: number;
    commentsCount?: number;
    viewsCount?: number;
    publishedAt?: string;
    createdAt?: string;
}

export interface PaginatedResponse<T> {
    content: T[];
    page: number;
    totalPages: number;
    totalElements: number;
}

export interface ArchiveMonth {
    month: number;
}

export interface ArchiveYear {
    year: number;
    months: ArchiveMonth[];
}

export interface ReactionData {
    reactionType: 'LIKE' | 'DISLIKE';
    visitorKey: string;
}

export interface ReactionStatus {
    userReaction: 'LIKE' | 'DISLIKE' | null;
    likesCount: number;
    dislikesCount: number;
}

export interface Comment {
    id: number;
    name: string;
    commentText: string;
    createdAt?: string;
}

export interface CommentFormData {
    name: string;
    commentText: string;
    honeypot: string;
}

export interface SubmissionData {
    authorName: string;
    authorEmail: string;
    authorMobile: string;
    title: string;
    excerpt: string;
    contentHtml: string;
    tags: string[];
    featuredImageUrl?: string | null;
}

export interface SubscriptionData {
    email: string;
}

/* ─── Public API ─── */

export const blogApi = {
    // Public endpoints
    getBlogs: (params: BlogListParams): Promise<AxiosResponse<PaginatedResponse<Blog>>> =>
        api.get('/api/blogs', { params }),

    getBlogBySlug: (slug: string): Promise<AxiosResponse<Blog>> =>
        api.get(`/api/blogs/${slug}`),

    getArchive: (): Promise<AxiosResponse<ArchiveYear[]>> =>
        api.get('/api/blogs/archive'),

    // Reactions
    toggleReaction: (blogId: number, data: ReactionData): Promise<AxiosResponse<ReactionStatus>> =>
        api.post(`/api/blogs/${blogId}/reaction`, data),

    getReactionStatus: (blogId: number, visitorKey: string): Promise<AxiosResponse<ReactionStatus>> =>
        api.get(`/api/blogs/${blogId}/reaction`, { params: { visitorKey } }),

    // Comments
    getComments: (blogId: number, params?: { size?: number }): Promise<AxiosResponse<PaginatedResponse<Comment>>> =>
        api.get(`/api/blogs/${blogId}/comments`, { params }),

    postComment: (blogId: number, data: CommentFormData): Promise<AxiosResponse> =>
        api.post(`/api/blogs/${blogId}/comments`, data),

    // Subscription
    startSubscription: (data: SubscriptionData): Promise<AxiosResponse> =>
        api.post('/api/blogs/subscribe/start', data),

    verifySubscription: (params: { email: string; otp: string }): Promise<AxiosResponse> =>
        api.post('/api/blogs/subscribe/verify-otp', null, { params }),

    unsubscribe: (params: { email: string }): Promise<AxiosResponse> =>
        api.post('/api/blogs/subscribe/unsubscribe', null, { params }),

    // Submission (3-step)
    startSubmission: (data: SubmissionData): Promise<AxiosResponse> =>
        api.post('/api/blogs/submission/start', data),

    verifySubmission: (data: { email: string; otp: string }): Promise<AxiosResponse> =>
        api.post('/api/blogs/submission/verify', data),

    finishSubmission: (data: { email: string }): Promise<AxiosResponse> =>
        api.post('/api/blogs/submission/finish', data),
};

/* ─── Admin API ─── */

export const adminApi = {
    getAdminBlogs: (params?: BlogListParams): Promise<AxiosResponse> =>
        api.get('/api/admin/blogs', { params }),

    getBlogById: (id: number): Promise<AxiosResponse> =>
        api.get(`/api/admin/blogs/${id}`),

    approveBlog: (id: number, data?: Record<string, unknown>): Promise<AxiosResponse> =>
        api.post(`/api/admin/blogs/${id}/approve`, data),

    rejectBlog: (id: number, data?: Record<string, unknown>): Promise<AxiosResponse> =>
        api.post(`/api/admin/blogs/${id}/reject`, data),

    editBlog: (id: number, data: Partial<Blog>): Promise<AxiosResponse> =>
        api.patch(`/api/admin/blogs/${id}`, data),

    deleteBlog: (id: number): Promise<AxiosResponse> =>
        api.delete(`/api/admin/blogs/${id}`),

    getPendingComments: (params?: { page?: number; size?: number }): Promise<AxiosResponse> =>
        api.get('/api/admin/comments/pending', { params }),

    hideComment: (id: number): Promise<AxiosResponse> =>
        api.post(`/api/admin/comments/${id}/hide`),

    unhideComment: (id: number): Promise<AxiosResponse> =>
        api.post(`/api/admin/comments/${id}/unhide`),

    deleteComment: (id: number): Promise<AxiosResponse> =>
        api.delete(`/api/admin/comments/${id}`),

    getSubscribers: (params?: { page?: number; size?: number }): Promise<AxiosResponse> =>
        api.get('/api/admin/subscribers', { params }),
};
