"use client";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { api } from "../api/api";
import { setUser, clearUser } from "../store/features/auth.slice";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getMe } from "../api/auth.api";


/* ===============================
   REGISTER USER (OTP SEND)
================================ */
export const useRegisterUser = () => {
  return useMutation({
    mutationFn: async (payload) => {
      const res = await api.post("/create", payload);
      return res.data;
    },
  });
};

/* ===============================
   SEND OTP
================================ */
export const useSendOtp = () => {
  return useMutation({
    mutationFn: async ({ email }) => {
      const res = await api.post("/send-otp", { email });
      return res.data;
    },
  });
};

/* ===============================
   VERIFY OTP + LOGIN
================================ */
export const useVerifyOtp = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async ({ email, otp }) => {
      const res = await api.post("/verify-otp", { email, otp });
      return res.data; // { success, user }
    },

    onSuccess: (data) => {
      if (!data?.user) return;

      // 1️⃣ Save user in Redux
      dispatch(setUser(data.user));

      // 2️⃣ Redirect AFTER Redux update
      setTimeout(() => {
        router.replace("/serviced");
      }, 0);
    },
  });
};

export const useOtpLogin = useVerifyOtp;

/* ===============================
   LOGOUT
================================ */
export const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: async () => {
      await api.post("/logout");
    },
    onSuccess: () => {
      dispatch(clearUser());
      router.replace("/");
    },
  });
};

export const useMe = () => {
  const dispatch = useDispatch();

  return useQuery({
    queryKey: ["me"],
    queryFn: getMe,
    retry: 0,
    staleTime: 60_000,
    refetchOnWindowFocus: false,

    onSuccess: (data) => {
      if (data?.user) {
        dispatch(setUser(data.user));
      }
    },

    onError: () => {
      dispatch(clearUser());
    },
  });
};


