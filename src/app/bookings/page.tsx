"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../ui/nav-bar";
import SideBar from "../ui/side-bar";

interface Appointment {
  appointment_id: number;
  appointment_date: string;
  appointment_time: string;
  staff_name: string;
  service_name: string;
  branch_name: string;
}

const AppointmentCard: React.FC<Appointment> = ({
  appointment_id,
  appointment_date,
  appointment_time,
  staff_name,
  service_name,
  branch_name,
}) => (
  <div className="border p-4 my-4 relative">
    <p>
      <strong>Service:</strong> {service_name}
    </p>
    <p>
      <strong>Branch:</strong> {branch_name}
    </p>
    <p>
      <strong>Date:</strong> {appointment_date}
    </p>
    <p>
      <strong>Time:</strong> {appointment_time}
    </p>
    <p>
      <strong>Staff:</strong> {staff_name}
    </p>
    {/* Add Cancel button if the appointment is upcoming */}
    {Date.now() < new Date(appointment_date).getTime() && (
      <button className="bg-red-700 text-white px-4 py-2 rounded absolute top-2 right-2">
        Cancel Booking
      </button>
    )}
  </div>
);

const Page: React.FC = () => {
  const [appointments, setAppointments] = useState<{
    upComingAppointments: Appointment[];
    finishedAppointments: Appointment[];
    reviewedAppointments: Appointment[];
  }>({
    upComingAppointments: [],
    finishedAppointments: [],
    reviewedAppointments: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://52.139.168.229:3000/api/v1/appointments?customerId=33"
        );
        const data = await response.json();
        setAppointments(data.data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs once when the component mounts

  return (
    <>
      <NavBar />
      <div className="flex gap-[6rem]">
        <SideBar />
        <div className="flex-1">
          <section>
            <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold mb-4">Upcoming Appointments</h1>
              <button
                className="bg-indigo-700 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-lg px-5 py-3 me-2"
                onClick={() => {
                  window.location.href = "/book";
                }}
              >
                Book
              </button>
            </div>
            {appointments.upComingAppointments.length > 0 && (
              <div>
                {appointments.upComingAppointments.map((appointment, index) => (
                  <AppointmentCard key={index} {...appointment} />
                ))}
              </div>
            )}
          </section>
          <section>
            {appointments.finishedAppointments.length > 0 && (
              <div>
                <h1 className="text-3xl font-bold my-4">
                  Finished Appointments
                </h1>
                {appointments.finishedAppointments.map((appointment, index) => (
                  <AppointmentCard key={index} {...appointment} />
                ))}
              </div>
            )}
          </section>
          <section>
            {appointments.reviewedAppointments.length > 0 && (
              <div>
                <h1 className="text-3xl font-bold my-4">
                  Reviewed Appointments
                </h1>
                {appointments.reviewedAppointments.map((appointment, index) => (
                  <AppointmentCard key={index} {...appointment} />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Page;
