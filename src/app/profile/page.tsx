"use client";
import React from "react";
import NavBar from "../ui/home/nav-bar";
import SideBar from "../ui/home/side-bar";

interface ProfileCardProps {
  title: string;
  value: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  value,
}: ProfileCardProps) => {
  return (
    <div className="bg-gray-200 shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
          Edit
        </button>
      </div>
      <div>{value}</div>
    </div>
  );
};

const Page: React.FC = () => {
  return (
    <>
      <NavBar />
      <div className="flex gap-[6rem]">
        <SideBar />
        <div className="flex flex-col flex-1 p-8">
          <div className="mt-8">
            <ProfileCard title="Name" value="Adam Smasher" />
            <ProfileCard title="Phone number" value="OXX-XXX-XXXX" />
            <ProfileCard title="Email" value="Adam_Smasher@email.com" />
            <ProfileCard title="Password" value="**********" />
          </div>
          {/* Red Sign Out Button */}
          <button
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-8"
            onClick={() => {
              window.location.href = "/signin";
            }}
          >
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
