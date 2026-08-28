import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, MessageSquare, Check, Sparkles, Github, Twitter, Linkedin, Instagram, Facebook, Globe } from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, subject, message }),
      });

      const data = await response.json();

      if (response.ok && (data.success || response.status === 200)) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        setError(data.error || "An error occurred while sending your message. Please try again.");
      }
    } catch (err: any) {
      console.error("Submission error:", err);
      setError("Failed to connect to the mail service. Please check your network connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    {
      icon: <Phone className="h-5 w-5 text-brand-purple" />,
      title: "Direct Hotline",
      description: "Want to discuss a project, freelance opportunity, or full-time position?",
      detail: "+880 184 585 5131",
      actionLabel: "Call Support Line",
      actionHref: "tel:+8801845855131",
    },
    {
      icon: <Mail className="h-5 w-5 text-brand-purple" />,
      title: "Professional Email",
      description: "Describe your project requirements with free consultation.",
      detail: "hello@devfazla.com",
      actionLabel: "Send Email",
      actionHref: "mailto:hello@devfazla.com",
    },
    {
      icon: <MapPin className="h-5 w-5 text-brand-purple" />,
      title: "Current Location",
      description: "Available for remote work globally",
      detail: "Bangladesh",
      actionLabel: "View Region",
      actionHref: "https://maps.google.com/?q=Bangladesh",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <span className="text-[11px] font-extrabold text-brand-purple uppercase tracking-widest bg-brand-purple/10 px-3 py-1.5 rounded-full mb-4 inline-block">
          Get in Touch
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          We love hearing from our community.
        </h1>
        <p className="text-base text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Need help placing an order, tracking shipping details, or proposing wholesale solutions? Drop us a line and our dedicated team will respond within minutes!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Contact Form Block */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-900/5 p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-brand-purple" />
          
          <div className="flex items-center space-x-3 mb-8">
            <div className="h-10 w-10 rounded-xl bg-brand-purple/10 flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-brand-purple" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                Send us a direct message
              </h2>
              <p className="text-xs text-slate-400 font-semibold mt-0.5">
                Expected reply time: Under 15 Minutes
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!isSubmitted ? (
              <motion.form
                key="contact-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Name field */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Alexis Carter"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold"
                    />
                  </div>

                  {/* Email field */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="alexis@domain.com"
                      className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                    Inquiry Subject (Optional)
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Order cancellation, custom order request, etc."
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold"
                  />
                </div>

                {/* Message text area */}
                <div className="space-y-2">
                  <label className="block text-xs font-black text-slate-500 uppercase tracking-wider">
                    Message Content
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    rows={5}
                    placeholder="Write detailed inquiry descriptions here..."
                    className="w-full bg-slate-50 border border-slate-200/80 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-purple focus:bg-white focus:ring-1 focus:ring-brand-purple transition-all font-semibold resize-none"
                  />
                </div>

                {/* Error message */}
                {error && (
                  <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl text-rose-600 text-xs sm:text-sm font-semibold leading-relaxed">
                    {error}
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-purple hover:bg-brand-purple-dark text-white font-black text-xs sm:text-sm tracking-widest h-12 rounded-xl shadow-lg shadow-brand-purple/10 flex items-center justify-center space-x-2.5 cursor-pointer transition-all disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>SEND DISPATCH MESSAGE</span>
                      <Send className="h-4 w-4" />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="contact-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 px-4"
              >
                <div className="h-16 w-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xs border border-emerald-100">
                  <Check className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-2">
                  Message Sent Successfully!
                </h3>
                <p className="text-sm text-slate-500 font-semibold mb-6 max-w-md mx-auto">
                  Thank you for reaching out! Your message was delivered successfully. A ShopZone specialist is reviewing your inquiry and will follow up with you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="inline-flex items-center space-x-2 border border-slate-200 hover:border-slate-300 text-slate-600 font-bold text-xs tracking-wider px-5 py-2.5 rounded-xl transition-all cursor-pointer bg-white shadow-xs"
                >
                  <Sparkles className="h-4 w-4 text-brand-purple" />
                  <span>SEND ANOTHER MESSAGE</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Contact Info Cards */}
        <div className="lg:col-span-5 space-y-6">
          {contactCards.map((card, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex items-start space-x-4"
            >
              <div className="h-10 w-10 rounded-xl bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                {card.icon}
              </div>
              <div className="space-y-2">
                <h3 className="text-base font-bold text-slate-900">{card.title}</h3>
                <p className="text-xs text-slate-400 font-semibold leading-relaxed">
                  {card.description}
                </p>
                <span className="block text-sm font-extrabold text-slate-800 font-mono">
                  {card.detail}
                </span>
                <a
                  href={card.actionHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-block text-xs font-extrabold text-brand-purple hover:text-brand-purple-dark hover:underline transition-colors mt-1"
                >
                  {card.actionLabel}
                </a>
              </div>
            </div>
          ))}

          {/* Social Profiles Card */}
          <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300">
            <h3 className="text-base font-bold text-slate-900 mb-1">Official Social Channels</h3>
            <p className="text-xs text-slate-400 font-semibold mb-4">
              Follow and message us across our verified social profiles <span className="font-mono text-brand-purple font-bold">@devfazla</span>
            </p>
            <div className="flex items-center space-x-2.5 flex-wrap gap-y-2">
              <a
                href="https://github.com/devfazla"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-brand-purple hover:text-white text-slate-600 border border-slate-100 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                title="GitHub: @devfazla"
                aria-label="devfazla GitHub"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="https://x.com/devfazla"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-brand-purple hover:text-white text-slate-600 border border-slate-100 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                title="X: @devfazla"
                aria-label="devfazla X"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="https://linkedin.com/in/devfazla"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-brand-purple hover:text-white text-slate-600 border border-slate-100 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                title="LinkedIn: @devfazla"
                aria-label="devfazla LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/devfazla"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-brand-purple hover:text-white text-slate-600 border border-slate-100 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                title="Instagram: @devfazla"
                aria-label="devfazla Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://facebook.com/devfazla"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-brand-purple hover:text-white text-slate-600 border border-slate-100 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                title="Facebook: @devfazla"
                aria-label="devfazla Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://devfazla.com"
                target="_blank"
                rel="noopener noreferrer"
                className="h-10 w-10 rounded-xl bg-slate-50 hover:bg-brand-purple hover:text-white text-slate-600 border border-slate-100 flex items-center justify-center transition-all cursor-pointer shadow-xs"
                title="Website: devfazla.com"
                aria-label="devfazla Website"
              >
                <Globe className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
