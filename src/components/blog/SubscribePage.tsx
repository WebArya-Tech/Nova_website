import React, { useState } from 'react';
import { blogApi } from '../../api/blogApi';
import { Mail, CheckCircle, XCircle, Bell } from 'lucide-react';
import toast from 'react-hot-toast';

type Step = 'subscribe' | 'verify' | 'done' | 'unsubscribe';

export const SubscribePage: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [otp, setOtp] = useState<string>('');
    const [step, setStep] = useState<Step>('subscribe');
    const [loading, setLoading] = useState<boolean>(false);

    const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); setLoading(true);
        try { await blogApi.startSubscription({ email }); toast.success('OTP sent!'); setStep('verify'); }
        catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed';
            toast.error(msg);
        }
        finally { setLoading(false); }
    };

    const handleVerify = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); setLoading(true);
        try { await blogApi.verifySubscription({ email, otp }); toast.success('Subscribed!'); setStep('done'); }
        catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Invalid OTP';
            toast.error(msg);
        }
        finally { setLoading(false); }
    };

    const handleUnsubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); setLoading(true);
        try { await blogApi.unsubscribe({ email }); toast.success('Unsubscribed'); setEmail(''); setStep('subscribe'); }
        catch (err: unknown) {
            const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message || 'Failed';
            toast.error(msg);
        }
        finally { setLoading(false); }
    };

    const inputCls = "w-full px-4 py-3 text-sm border border-border-primary rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors";
    const btnCls = "w-full bg-primary text-white font-semibold py-3 rounded-xl hover:bg-primary-dark transition-colors disabled:opacity-60 text-sm";

    return (
        <div className="min-h-screen" >
            {/* Header */}
            <div  className='mb-10'   style={{ background: 'linear-gradient(135deg, #133f5c 0%, #195276 50%, #1e6590 100%)' }}>
                <div className="max-w-xl mx-auto px-6 py-12 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/20 mb-4">
                        <Bell className="w-7 h-7 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2 text-white">Stay Updated</h1>
                    <p className="text-white text-sm">Get notified when new articles are published by Nova Tuitions</p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 mt-12 py-12">
                {step === 'subscribe' && (
                    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8">
                        <h2 className="text-lg font-bold text-text-primary mb-1">Subscribe to Blog Updates</h2>
                        <p className="text-text-tertiary text-sm mb-6">Enter your email to receive new blog notifications.</p>
                        <form onSubmit={handleSubscribe} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-4">Email Address</label>
                                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputCls} />
                            </div>
                            <button type="submit" disabled={loading} className={btnCls}>
                                {loading ? 'Sending OTP...' : 'Subscribe'}
                            </button>
                        </form>
                        <div className="mt-5 pt-5 border-t border-border-secondary text-center">
                            <button onClick={() => setStep('unsubscribe')} className="text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                                Want to unsubscribe?
                            </button>
                        </div>
                    </div>
                )}

                {step === 'verify' && (
                    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8 text-center">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/10 mb-4">
                            <Mail className="w-7 h-7 text-primary" />
                        </div>
                        <h2 className="text-lg font-bold text-text-primary mb-1">Check your inbox</h2>
                        <p className="text-text-secondary text-sm mb-6">
                            We sent an OTP to <strong>{email}</strong>
                        </p>
                        <form onSubmit={handleVerify} className="space-y-4 max-w-xs mx-auto">
                            <input placeholder="Enter 6-digit OTP" value={otp} onChange={(e) => setOtp(e.target.value)} maxLength={6} required
                                className={`${inputCls} text-center text-2xl font-bold tracking-widest`} />
                            <button type="submit" disabled={loading} className={btnCls}>
                                {loading ? 'Verifying...' : 'Verify & Activate'}
                            </button>
                        </form>
                        <button onClick={() => setStep('subscribe')} className="mt-4 text-sm text-text-tertiary hover:text-text-secondary transition-colors">
                            ← Use different email
                        </button>
                    </div>
                )}

                {step === 'done' && (
                    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 mb-4">
                            <CheckCircle className="w-9 h-9 text-emerald-500" />
                        </div>
                        <h2 className="text-xl font-bold text-text-primary mb-2">You're in!</h2>
                        <p className="text-text-secondary text-sm">
                            You'll receive email updates whenever a new blog is published on Nova Tuitions.
                        </p>
                    </div>
                )}

                {step === 'unsubscribe' && (
                    <div className="bg-white rounded-2xl border border-blue-100 shadow-sm p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                                <XCircle className="w-5 h-5 text-red-500" />
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-text-primary">Unsubscribe</h2>
                                <p className="text-text-tertiary text-xs">We'll stop sending you email updates</p>
                            </div>
                        </div>
                        <form onSubmit={handleUnsubscribe} className="space-y-4">
                            <div>
                                <label className="block text-xs font-semibold text-text-secondary uppercase tracking-wide mb-1.5">Your Email</label>
                                <input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required className={inputCls} />
                            </div>
                            <button type="submit" disabled={loading}
                                className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-colors disabled:opacity-60 text-sm">
                                {loading ? 'Processing...' : 'Confirm Unsubscribe'}
                            </button>
                        </form>
                        <div className="mt-4 text-center">
                            <button onClick={() => setStep('subscribe')} className="text-sm text-primary hover:text-primary-dark transition-colors">
                                ← Back to Subscribe
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
