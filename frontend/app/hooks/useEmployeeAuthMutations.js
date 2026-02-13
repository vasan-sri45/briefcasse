"use client";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { api } from "../api/api";
import { setUser } from "../store/features/auth.slice";

export const useEmployeeLogin = () => {
  const dispatch = useDispatch();
  const qc = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, password }) => {
      const res = await api.post("/employee/login", {
        email,
        password,
      });
      return res.data; // { user }
    },

    onSuccess: (data) => {
      const user = data?.user;
      if (!user) return;

      // ✅ SAME redux flow as OTP login
      dispatch(setUser(user));
      

      qc.invalidateQueries({ queryKey: ["me"] });

      // ✅ ROLE BASED REDIRECT
      if (user.role === "admin") {
        router.replace("/admin/dashboard");
      } else {
        router.replace("/employee");
      }
    },
  });
};

export const useGetEmployees = () => {
  const user = useSelector((state) => state.auth.user);

  return useQuery({
    queryKey: ["employees"],
    enabled: user?.role === "admin",     // 🔥 only runs for admins

    queryFn: async () => {
      const res = await api.get("/employee/get");
      return res.data; // { success, users }
    },

    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });
};


export const getMe = async () => {
  try {
    // 1️⃣ Try user
    const res = await api.get("/user");
    return { user: res.data.user };
  } catch (err) {
    // 2️⃣ If not user, try employee
    const res = await api.get("/employee");
    return { user: res.data.user };
  }
};


