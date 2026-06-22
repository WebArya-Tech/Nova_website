import React, { useEffect, useState } from 'react'
import {
  Building2,
  CheckCircle,
  Copy,
  CreditCard,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  Shield,
  Smartphone,
} from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

const bankDetails = {
  bankName: 'HDFC Bank',
  accountName: 'Roshiv and Family HUF',
  accountType: 'Current Account',
  accountNumber: '50200117447440',
  ifscCode: 'HDFC0011107',
  branch: 'H1402, Borewell Rd, opposite to Top In Town Super Market, Nallurhalli, Whitefield, Bengaluru, Karnataka 560066',
  country: 'India',
  state: 'Karnataka',
  city: 'Bengaluru',
  gpayNumber: '+91-8073 982 848',
  upiId: '8073982848@pz',
}

const CopyButton = ({ text, field, copiedField, onCopy }) => (
  <button
    type="button"
    onClick={() => onCopy(text, field)}
    className="ml-2 p-1.5 sm:p-2 rounded-lg hover:bg-primary/5 active:bg-primary/10 transition-colors group relative touch-manipulation min-w-[32px] min-h-[32px] flex items-center justify-center"
    title="Copy to clipboard"
    aria-label="Copy to clipboard"
  >
    {copiedField === field ? (
      <CheckCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-600" />
    ) : (
      <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground group-hover:text-primary" />
    )}
  </button>
)

const DetailRow = ({ label, value, field, icon: Icon, highlight = false, copiedField, onCopy }) => (
  <div className={`flex items-start py-2 sm:py-3 border-b border-border last:border-0 ${highlight ? 'bg-primary/5 -mx-2 sm:-mx-3 px-2 sm:px-3 rounded-lg' : ''}`}>
    <div className="flex-shrink-0 mt-1">
      {Icon && <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />}
    </div>
    <div className={`${Icon ? 'ml-2 sm:ml-3' : ''} flex-1 min-w-0`}>
      <p className="text-xs sm:text-sm text-muted-foreground font-medium">{label}</p>
      <div className="flex items-center mt-1">
        <p className={`text-sm sm:text-base font-semibold break-all ${highlight ? 'text-primary' : 'text-foreground'}`}>{value}</p>
        {field && <CopyButton text={value} field={field} copiedField={copiedField} onCopy={onCopy} />}
      </div>
    </div>
  </div>
)

export default function FeePayment() {
  const [copiedField, setCopiedField] = useState('')

  const copyToClipboard = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedField(field)
      setTimeout(() => setCopiedField(''), 2000)
    } catch {
      setCopiedField('')
    }
  }

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove('opacity-0', 'translate-y-4')
          entry.target.classList.add('opacity-100', 'translate-y-0')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15 })

    document.querySelectorAll('[data-aos]').forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="w-full bg-white">
      <Header />

      <main className="min-h-screen bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">Pay Fees Online</h1>
            <p className="mt-2 text-sm sm:text-base text-muted-foreground">Use bank transfer (NEFT) or UPI / Google Pay to pay.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
            <section className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark p-5 sm:p-6 md:p-8">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-xl">
                    <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-primary-foreground">Bank Transfer</h2>
                    <p className="text-primary-foreground/80 text-xs sm:text-sm">NEFT / RTGS / IMPS</p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                <div className="space-y-1">
                  <DetailRow icon={Building2} label="Bank Name" value={bankDetails.bankName} highlight copiedField={copiedField} onCopy={copyToClipboard} />
                  <DetailRow icon={CreditCard} label="Account Holder Name" value={bankDetails.accountName} highlight copiedField={copiedField} onCopy={copyToClipboard} />
                  <DetailRow label="Account Type" value={bankDetails.accountType} copiedField={copiedField} onCopy={copyToClipboard} />
                  <DetailRow label="Account Number" value={bankDetails.accountNumber} field="accountNumber" highlight copiedField={copiedField} onCopy={copyToClipboard} />
                  <DetailRow label="IFSC Code" value={bankDetails.ifscCode} field="ifscCode" highlight copiedField={copiedField} onCopy={copyToClipboard} />
                </div>

                <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-primary/5 border border-primary/10 rounded-xl">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-primary mb-1">Branch Address</p>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{bankDetails.branch}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-card rounded-2xl shadow-xl overflow-hidden border border-border hover:shadow-2xl transition-shadow duration-300">
              <div className="bg-gradient-to-br from-primary via-primary-light to-primary-dark p-5 sm:p-6 md:p-8">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="bg-white/20 backdrop-blur-sm p-2 sm:p-3 rounded-xl">
                    <Smartphone className="w-6 h-6 sm:w-8 sm:h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-primary-foreground">UPI Payment</h2>
                    <p className="text-primary-foreground/80 text-xs sm:text-sm">Scan & Pay Instantly</p>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-6 md:p-8">
                <div className="p-4 sm:p-6 md:p-8 text-center mb-4 sm:mb-6">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 mx-auto bg-card flex items-center justify-center rounded-lg sm:rounded-xl relative overflow-hidden shadow-xl  ">
                    <img src="/QR.jpeg" alt="UPI QR Code" className="w-full h-full object-contain" />
                  </div>

                  <div className="mt-4 sm:mt-6 space-y-3">
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-left">
                    <p className="text-xs font-semibold text-primary mb-1">Google Pay</p>
                    <p className="text-sm font-bold text-foreground">{bankDetails.gpayNumber}</p>
                  </div>
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-4 text-left">
                    <p className="text-xs font-semibold text-primary mb-1">UPI ID</p>
                    <p className="text-sm font-bold text-foreground">{bankDetails.upiId}</p>
                  </div>
                    <p className="text-foreground font-semibold text-sm sm:text-base mb-2">
                      Scan QR code using any UPI payment app
                    </p>
                    <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground mb-3">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                      <span>100% Secure Payment</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div data-aos="fade-up-right" className="opacity-0 translate-y-4 transition-all duration-500">
            <footer className="rounded-xl sm:rounded-2xl p-6 sm:p-8 border border-border bg-card shadow-sm">
              <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 bg-primary/10 rounded-lg p-3">
                    <Building2 className="w-7 h-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground">Nova Tuitions</h3>
                    <p className="text-sm text-muted-foreground mt-1"></p>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      H1402, Borewell Rd, opposite to Top In Town Super Market, Nallurhalli, Whitefield, Bengaluru, Karnataka 560066
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-4">
                  <a href="tel:+919734895684" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Call Us</p>
                      <p className="text-sm font-semibold text-foreground">+91-734 895 6284</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.256-.464-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">WhatsApp</p>
                      <p className="text-sm font-semibold text-foreground">+91-974 071 2301</p>
                      <p className="text-xs text-muted-foreground">Quick responses available</p>
                    </div>
                  </div>

                  <a href="mailto:novatuitions@ixpoe.com" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-semibold text-foreground">novatuitions@ixpoe.com</p>
                    </div>
                  </a>
                </div>
              </div>
            </footer>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
