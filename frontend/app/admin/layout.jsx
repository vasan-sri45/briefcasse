"use client";

import { useAuthGuard } from "../components/route/useAuthGuard";
import AdminNavbar from "../components/navbar/AdminNavbar";

export default function AdminLayout({ children }) {
  // 🔐 Protect ALL admin pages here
  const { loading } = useAuthGuard(["admin"]);

  // ⏳ Wait until auth is resolved
  if (loading) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />

      <main className="pt-6 px-6">
        {children}
      </main>
    </div>
  );
}
