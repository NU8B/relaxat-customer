"use client";
import React from "react";
import NavBar from "../ui/home/nav-bar";
import SideBar from "../ui/home/side-bar";

interface BookingProps {
  service: string;
  branch: string;
  date: string;
  time: string;
  staff: string;
}

// Component for displaying a booking
const Booking: React.FC<BookingProps> = ({
  service,
  branch,
  date,
  time,
  staff,
}) => (
  <div className="border p-4 my-4 relative">
    <button className="bg-red-700 text-white px-4 py-2 rounded absolute top-2 right-2">
      Cancel Booking
    </button>
    <p>
      <strong>Service:</strong> {service}
    </p>
    <p>
      <strong>Branch Name:</strong> {branch}
    </p>
    <p>
      <strong>Date:</strong> {date}
    </p>
    <p>
      <strong>Time:</strong> {time}
    </p>
    <p>
      <strong>Staff:</strong> {staff}
    </p>
  </div>
);

const Page: React.FC = () => {
  const branches = ["Bangkok", "Phuket", "Chiangmai"];
  const services = ["Hair Styling", "Nail care", "Massage"];
  const employees = ["John", "Emily"];
  const availableTimeSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"];

  const upcomingBookings: BookingProps[] = [
    {
      service: "Hair Styling",
      branch: "Bangkok",
      date: "8th February, 2024",
      time: "16:00",
      staff: "Mr. John Doe",
    },
    {
      service: "Nail care",
      branch: "Phuket",
      date: "12th February, 2024",
      time: "14:30",
      staff: "Ms. Jane Smith",
    },
  ];

  const pastBookings: BookingProps[] = [
    {
      service: "Massage",
      branch: "Chiangmai",
      date: "5th February, 2024",
      time: "14:30",
      staff: "Ms. Emily Smith",
    },
    {
      service: "Hair Styling",
      branch: "Bangkok",
      date: "3rd February, 2024",
      time: "11:00",
      staff: "Mr. Robert Johnson",
    },
  ];

  return (
    <>
      <NavBar />
      <div className="flex gap-[6rem]">
        <SideBar />
        <div className="flex-1">
          <section>
            {upcomingBookings.length > 0 && (
              <h1 className="text-3xl font-bold mb-4">Upcoming Bookings</h1>
            )}
            {upcomingBookings.map((booking, index) => (
              <Booking key={index} {...booking} />
            ))}
          </section>
          <section>
            {pastBookings.length > 0 && (
              <h1 className="text-3xl font-bold my-4">Past Bookings</h1>
            )}
            {pastBookings.map((booking, index) => (
              <Booking key={index} {...booking} />
            ))}
          </section>
          <div className="text-center mt-8">
            <button
              className="bg-indigo-700 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-lg px-5 py-3 me-2"
              onClick={() => {
                window.location.href = "/book";
              }}
            >
              Book
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
