"use client";
import { useState } from "react";
import Image from "next/image";
import UserOtpLoginForm from "./Form";
import EmployeeLoginForm from "./EmployeeLoginForm";
import FormFooter from "./FormFooter";
import BriefCasse from "../../../public/assets/brief_blue.png";
import BriefHeading from "../../../public/assets/brief_heading.png";

const LoginForm = ({ handleClick }) => {
  const [loginType, setLoginType] = useState("user"); 
  // "user" | "employee"

  return (
    <div className="w-full md:w-6/12 min-h-screen flex flex-col justify-center items-center md:items-end gap-1">
      {/* ================= CARD ================= */}
      <div className="bg-beige w-11/12 lg:max-w-lg h-[420px] lg:h-[500px] rounded-3xl">
        <div className="w-5/6 mx-auto pt-2">

          {/* ===== LOGO ===== */}
          <div className="flex items-center gap-1 pt-4">
            <div className="flex justify-center items-center">
              <Image src={BriefCasse} alt="logo" className="w-6 rounded" />
              
            </div>
            <div className="w-20 h-7 mt-3">
              {/* <Image src={BriefHeading} alt="heading" /> */}
              <p className="text-[1.1rem] font-anton text-normal text-custom-blue mt-[-3px]">Briefcasse</p>
            </div>
          </div>

          {/* ===== TEXT ===== */}
          <div className="mt-3">
            <p className="text-xl font-anton font-normal text-custom-blue">Welcome to BriefCasse</p>
            <p className="text-sm text-letter1 font-anton font-normal mt-1">
              Login to continue
            </p>
          </div>

          {/* ===== LOGIN TYPE SWITCH ===== */}
          <div className="flex gap-3 mt-5">
            <button
              type="button"
              onClick={() => setLoginType("user")}
              className={`px-4 py-1 rounded-full text-sm font-lato font-bold ${
                loginType === "user"
                  ? "bg-custom-blue text-white"
                  : "bg-white text-letter1"
              }`}
            >
              User Login
            </button>

            <button
              type="button"
              onClick={() => setLoginType("employee")}
              className={`px-4 py-1 rounded-full text-sm font-lato font-bold ${
                loginType === "employee"
                  ? "bg-custom-blue text-white"
                  : "bg-white text-letter1"
              }`}
            >
              Employee / Admin
            </button>
          </div>

          {/* ===== FORM RENDER ===== */}
          <div className="mt-6">
            {loginType === "user" ? (
              <UserOtpLoginForm handleClick={handleClick} />
            ) : (
              <EmployeeLoginForm />
            )}
          </div>
        </div>
      </div>

      {/* ================= FOOTER ================= */}
      <div className="bg-beige w-11/12 lg:max-w-lg h-[80px] lg:h-[135px] rounded-3xl">
        <div className="h-full flex items-center justify-center">
          <FormFooter />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
