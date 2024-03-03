import React from "react";
import NavBar from "../ui/nav-bar";
import SideBar from "../ui/side-bar";
import BookingForm from "../components/BookingForm"; // Make sure to import the correct path to your BookingForm component

export default function Page() {
  return (
    <>
      <NavBar />
      <div className="flex gap-[6rem]">
        <SideBar />

        {/* Center the BookingForm component horizontally */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: "1",
          }}
        >
          <BookingForm />
        </div>
      </div>
    </>
  );
}
