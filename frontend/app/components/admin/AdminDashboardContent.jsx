"use client";

import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import DashboardCard from "./DashboardCard";
import { useAllServices } from "../../hooks/userServiceList";
import SalesByCategories from "./SalesByCategories";
import LineChart from "./LineChart";

export default function AdminDashboardContent() {
  const { data, isLoading } = useAllServices();

  const trackRef = useRef(null);
  const tweenRef = useRef(null);

  /* ✅ SAFE SERVICES ARRAY */
  const services = Array.isArray(data?.items) ? data.items : [];

  /* ✅ CATEGORY COUNTS */
  const cards = useMemo(() => {
    const counts = {};

    services.forEach((service) => {
      const category =
        service.category ||
        service.serviceCategory ||
        service.title;

      if (!category) return;

      counts[category] = (counts[category] || 0) + 1;
    });

    return Object.entries(counts).map(([title, count]) => ({
      title,
      value: count,
      services: "Services",
    }));
  }, [services]);

  /* ✅ GSAP AUTO SCROLL (REACT SAFE) */
  useEffect(() => {
    if (!trackRef.current || cards.length === 0) return;

    tweenRef.current?.kill();

    const totalWidth = trackRef.current.scrollWidth / 2;

    tweenRef.current = gsap.to(trackRef.current, {
      x: -totalWidth,
      duration: 30,
      ease: "none",
      repeat: -1,
    });

    return () => tweenRef.current?.kill();
  }, [cards]);

  if (isLoading) {
    return (
      <p className="text-center mt-10 font-semibold">
        Loading dashboard...
      </p>
    );
  }

  return (
    <div className="mt-6 overflow-hidden w-full lg:w-10/12 px-6 lg:px-0 mx-auto">
      <div ref={trackRef} className="flex gap-6 w-max">
        {[...cards, ...cards].map((card, i) => (
          <DashboardCard key={`${card.title}-${i}`} {...card} />
        ))}
      </div>
      <div className="flex gap-5 mt-5">
          <LineChart />
          <SalesByCategories />
      </div>
    </div>
  );
}
