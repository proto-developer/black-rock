"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axiosInstance from "@/utils/axiosInstance";

const ChangePasswordPage = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!currentPassword || !newPassword) {
      toast.error("Please fill in both fields");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axiosInstance.put("/user/updatePassword", {
        currentPassword,
        newPassword,
      });

      if (res.status === 200) {
        toast.success("Passwort erfolgreich geändert");
        router.push("/user");
      } else {
        toast.error(res?.data?.message || "Failed to change password");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to change password"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-black text-white px-4 md:px-6 lg:px-[4.167vw] py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-white font-medium text-[18px]">SK Black Rock</h1>
          <button 
            onClick={handleBack}
            className="text-white hover:text-gray-300 transition-colors"
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8 px-4 md:px-6 lg:px-[4.167vw]">
        <h2 className="font-bold text-[24px]/[150%] mb-8 text-black">
          Change Password
        </h2>

        <div className="bg-white rounded-lg p-8 max-w-2xl shadow-sm">
          {/* Password Fields in Horizontal Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Current Password */}
            <div>
              <label className="block font-medium text-[14px] text-gray-700 mb-2">
                Current Password
              </label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter Current Password"
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2   focus:border-transparent text-[14px]"
              />
            </div>

            {/* New Password */}
            <div>
              <label className="block font-medium text-[14px] text-gray-700 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter New Password"
                className="w-full px-4 py-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 placeholder-black  focus:border-transparent text-[14px]"
              />
            </div>
          </div>

          {/* Save Button - Left Aligned */}
          <div className="flex justify-start">
            <button
              onClick={handleSave}
              disabled={isLoading}
              className="bg-black text-white px-8 py-3 rounded-md font-medium text-[14px] hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordPage;