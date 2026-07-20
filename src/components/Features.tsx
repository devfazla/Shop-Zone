import React from "react";
import { Truck, ShieldCheck, RefreshCw, Headphones } from "lucide-react";

export default function Features() {
  const featureList = [
    {
      id: "feat-1",
      icon: <Truck className="h-6 w-6 text-brand-purple" />,
      title: "Free Shipping",
      desc: "On orders over $100",
    },
    {
      id: "feat-2",
      icon: <ShieldCheck className="h-6 w-6 text-brand-purple" />,
      title: "Secure Payment",
      desc: "100% secure payment",
    },
    {
      id: "feat-3",
      icon: <RefreshCw className="h-6 w-6 text-brand-purple" />,
      title: "Easy Returns",
      desc: "30 days return policy",
    },
    {
      id: "feat-4",
      icon: <Headphones className="h-6 w-6 text-brand-purple" />,
      title: "24/7 Support",
      desc: "Dedicated support",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-100/80 border border-slate-100 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 lg:divide-x divide-slate-100 overflow-hidden">
        {featureList.map((item) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 p-6 sm:p-7 hover:bg-slate-50/50 transition-colors duration-300"
          >
            <div className="flex-shrink-0 h-12 w-12 rounded-xl bg-brand-purple-light/50 flex items-center justify-center">
              {item.icon}
            </div>
            <div>
              <h4 className="text-[15px] font-bold text-slate-800 leading-tight">
                {item.title}
              </h4>
              <p className="text-[12px] sm:text-[13px] text-slate-400 font-medium mt-0.5">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
