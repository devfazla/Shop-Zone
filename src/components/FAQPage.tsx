import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronDown, Search, ArrowRight, MessageCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

interface FAQPageProps {
  onContactClick?: () => void;
}

export default function FAQPage({ onContactClick }: FAQPageProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", name: "All Questions" },
    { id: "shipping", name: "Shipping & Logistics" },
    { id: "payments", name: "Pricing & Billing" },
    { id: "returns", name: "Warranty & Returns" },
    { id: "accounts", name: "Profile & Security" },
  ];

  const faqs: FAQItem[] = [
    {
      category: "shipping",
      question: "How long does overnight delivery take and how much does it cost?",
      answer: "Overnight delivery is processed same-day for orders made before 2:00 PM EST. The average delivery time is 12-24 hours. Free overnight shipping is automatically applied to all purchases over $100; otherwise, a flat standard rate of $9.99 applies.",
    },
    {
      category: "shipping",
      question: "Do you ship internationally to any location?",
      answer: "Yes, ShopZone partners with DHL Express and FedEx to deliver packages to over 180 countries globally. International custom fees, taxes, and duties are pre-calculated at checkout so there are no surprise fees at your doorstep.",
    },
    {
      category: "payments",
      question: "What secure payment methods do you support?",
      answer: "We support major international credit/debit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, Google Pay, and Klarna slice-it financing. All payment processors are certified Level 1 PCI Compliant.",
    },
    {
      category: "payments",
      question: "How do I download or view my purchase tax invoices?",
      answer: "Every order triggers an automated email invoice containing PDF attachments. You can also view, filter, and export tax invoices from the order history panel in your ShopZone Account profile page.",
    },
    {
      category: "returns",
      question: "What is your 30-Day returns policy?",
      answer: "We offer a zero-hassle 30-day money-back guarantee. If you are not completely satisfied with your purchase, you can request a prepaid return shipping label from our returns wizard. Items must be in their original packaging and unused condition.",
    },
    {
      category: "returns",
      question: "How long does it take to process my refund?",
      answer: "Once our logistical warehouse receives and logs your returned item, we process the full refund within 2 business days. The credit should appear on your original payment statement in 3 to 7 working days, depending on your bank.",
    },
    {
      category: "accounts",
      question: "How do I update my billing address or password?",
      answer: "Simply log in, click on your profile avatar or account menu, and navigate to settings. From there, you can securely modify passwords, multi-factor authentication, addresses, and credit card profiles.",
    },
    {
      category: "accounts",
      question: "Is my personal data safe with ShopZone?",
      answer: "Absolutely. We encrypt all sensitive user data in transit and at rest using modern AES-256 protocols. We never sell, rent, or distribute personal identity details to third-party marketing services or networks.",
    },
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesTab = activeTab === "all" || faq.category === activeTab;
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      {/* FAQ Header */}
      <div className="text-center mb-12 sm:mb-16">
        <span className="text-[11px] font-extrabold text-brand-purple uppercase tracking-widest bg-brand-purple/10 px-3 py-1.5 rounded-full mb-4 inline-block">
          Support Center
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight mb-4">
          Frequently Asked Questions
        </h1>
        <p className="text-base text-slate-500 font-medium max-w-xl mx-auto">
          Can't find what you are looking for? Filter questions by category, input queries into search, or send us a message.
        </p>
      </div>

      {/* Dynamic Search Box */}
      <div className="relative mb-10 max-w-2xl mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setExpandedIndex(null); // Close open answers on search
          }}
          placeholder="Search for questions, keywords, terms..."
          className="w-full bg-white border border-slate-200/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-purple focus:ring-1 focus:ring-brand-purple transition-all shadow-sm font-semibold"
        />
      </div>

      {/* Category Tabs Selector */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 scrollbar-none max-w-full border-b border-slate-100">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveTab(cat.id);
              setExpandedIndex(null);
            }}
            className={`px-4.5 py-2.5 rounded-xl text-[13px] font-bold cursor-pointer transition-all whitespace-nowrap border ${
              activeTab === cat.id
                ? "bg-brand-purple border-brand-purple text-white shadow-md shadow-brand-purple/15"
                : "bg-white border-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-50"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* FAQ Items Accordion list */}
      <div className="space-y-4 mb-16">
        <AnimatePresence mode="popLayout">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isExpanded = expandedIndex === idx;
              return (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  className="bg-white border border-slate-150/65 rounded-2xl overflow-hidden shadow-xs hover:border-slate-300/60 transition-all duration-300"
                >
                  <button
                    onClick={() => toggleExpand(idx)}
                    className="w-full text-left px-5 sm:px-6 py-4.5 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  >
                    <div className="flex items-center space-x-3.5">
                      <HelpCircle className="h-5 w-5 text-brand-purple flex-shrink-0" />
                      <span className="text-sm sm:text-base font-extrabold text-slate-900 leading-tight">
                        {faq.question}
                      </span>
                    </div>
                    <div className={`h-8 w-8 rounded-lg bg-slate-50/80 border border-slate-100 flex items-center justify-center flex-shrink-0 text-slate-500 transition-transform duration-300 ${isExpanded ? "rotate-180 bg-brand-purple/5 border-brand-purple/10 text-brand-purple" : ""}`}>
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-5 sm:px-6 pb-5 border-t border-slate-100 pt-4 bg-slate-50/20">
                          <p className="text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 bg-slate-50/30 border border-dashed border-slate-200 rounded-3xl"
            >
              <HelpCircle className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 font-extrabold text-base mb-1">
                No matching answers found
              </p>
              <p className="text-slate-400 text-xs font-semibold max-w-sm mx-auto">
                We couldn't find any results matching "{searchQuery}". Try modifying keywords or choosing another category.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Support Box */}
      <div className="bg-brand-purple/5 border border-brand-purple/10 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center space-x-4">
          <div className="h-12 w-12 rounded-xl bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
            <MessageCircle className="h-6 w-6 text-brand-purple" />
          </div>
          <div className="space-y-0.5 text-center sm:text-left">
            <h4 className="text-base font-bold text-slate-900">
              Still have unaddressed questions?
            </h4>
            <p className="text-xs text-slate-500 font-semibold leading-relaxed">
              Our 24/7 dedicated support staff is here to help with order logistics anytime.
            </p>
          </div>
        </div>

        <button
          onClick={() => onContactClick?.()}
          className="inline-flex items-center space-x-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-black text-xs tracking-wider px-6 h-11 rounded-xl shadow-lg shadow-brand-purple/10 transition-all cursor-pointer flex-shrink-0"
        >
          <span>CONTACT SUPPORT</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
