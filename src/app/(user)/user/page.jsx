"use client";
import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ProfilePic from "../../../assets/images/profile.jpg";
import EditPen from "../../../assets/icons/EditPen";
import LoadingBackdrop from "@/features/common/LoadingBackdrop";
import {
  useGetUserProfile,
  useUpdateUserProfilePicture,
} from "@/hooks/user/profile";
import { toast } from "sonner";

const Page = () => {
  const { data, isPending, refetch } = useGetUserProfile();
  const fileInputRef = useRef(null);
  const router = useRouter();
  const { mutate: updateProfilePicture, isPending: isUploading } =
    useUpdateUserProfilePicture(() => {
      refetch(); // Refetch profile after successful upload
    });

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Bild muss kleiner als 5 MB sein");
      return;
    }

    updateProfilePicture(file);
  };

  // Removed handleChangePassword, using Link instead

  return (
    <>
      {(isPending || isUploading) && <LoadingBackdrop />}
      <div className="py-4 md:py-9 px-4 md:px-6 lg:px-[4.167vw]">
        {/* Header with Change Password Link */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-bold md:text-[24px]/[150%] text-[20px]/[150%]">
            Willkommen zurück, {data?.user?.firstName} {data?.user?.lastName}
          </h2>
          <Link
            href="/user/changePassword"
            className="bg-black text-white px-4 py-2 font-medium text-[14px] hover:bg-gray-800 transition-colors"
          >
            Change password
          </Link>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* left */}
          <div className="p-5 md:p-[20px_16px] bg-white md:w-[263px] w-full">
            <h6 className="font-semibold text-[18px]/[150%] mb-3">
              Persönliche Informationen
            </h6>
            <div className="flex flex-col items-center mb-3">
              <div className="relative inline-block mb-[18px]">
                <Image
                  className="rounded-full size-[72px] z-0"
                  src={data?.user?.profilePicture?.url || ProfilePic}
                  alt="Profilbild"
                  width={72}
                  height={72}
                />
                <div
                  className="absolute bottom-[-6px] right-[-3px] z-10 rounded-full size-[30px] flex items-center justify-center shadow-[0_5px_30px_0_#19191940] bg-white cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <EditPen className="size-[20px]" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleProfilePicChange}
                  className="hidden"
                />
              </div>
              <h5 className="font-semibold text-[16px]/[150%]">
                {data?.user?.firstName} {data?.user?.lastName}
              </h5>
            </div>
            <div className="flex flex-col gap-6">
              <hr className="border-1 border-[#E2E8F0]" />
              <div className="flex justify-between">
                <p className="font-semibold text-[13px]/[100%] text-[#7E7E7E]">
                  Geburtsdatum
                </p>
                <p className="font-medium text-[13px]/[100%]">
                  {new Date(data?.user?.dob).toLocaleDateString("de-DE", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-[13px]/[100%] text-[#7E7E7E]">
                  Geschlecht
                </p>
                <p className="font-medium text-[13px]/[100%]">
                  {data?.user?.gender}
                </p>
              </div>
              <div className="flex justify-between">
                <p className="font-semibold text-[13px]/[100%] text-[#7E7E7E]">
                  Land
                </p>
                <p className="font-medium text-[13px]/[100%]">
                  {data?.user?.country}
                </p>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="p-5 bg-white md:w-[312px] w-full flex flex-col gap-6">
            <h6 className="font-semibold text-[18px]/[150%]">
              Ihre Klarna-Investmentdetails
            </h6>
            <div className="flex gap-6 justify-between">
              <div>
                <p className="font-medium text-[12px]/[100%] mb-1.5">
                  Ihre Klarna-Anteile
                </p>
                <h4 className="font-semibold text-[20px]/[150%]">
                  {data?.user?.shares}
                </h4>
              </div>
              <div>
                <p className="font-medium text-[12px]/[100%] mb-1.5">
                  Aktueller Klarna-Preis
                </p>
                <h4 className="font-semibold text-[20px]/[150%]">
                  € {data?.user?.klarnaPrice}
                </h4>
              </div>
            </div>
            <hr className="border-1 border-[#E2E8F0]" />
            <div className="flex gap-6 justify-between">
              <div>
                <p className="font-medium text-[12px]/[100%] mb-1.5">
                  Gesamtwert
                </p>
                <h4 className="font-semibold text-[20px]/[150%]">
                  € {data?.user?.totalShareValue}
                </h4>
              </div>
              <div>
                <p className="font-medium text-[12px]/[100%] mb-1.5">
                  Klarna-Kaufpreis
                </p>
                <h4 className="font-semibold text-[20px]/[150%]">
                  € {data?.user?.klarnaPurchasePrice}
                </h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;