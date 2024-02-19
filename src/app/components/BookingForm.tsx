"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);

  const branches = ["Bangkok", "Phuket", "Chiangmai"];
  const services = ["Hair Styling", "Nail care", "Massage"];
  const employees = ["John", "Emily"];
  const availableTimeSlots = ["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"];

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleBranchSelect = (branch: string) => {
    setSelectedBranch(branch);
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
  };

  const handleEmployeeSelect = (employee: string) => {
    setSelectedEmployee(employee);
  };

  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const renderDropdown = (
    heading: string,
    options: string[],
    selectedOption: string | null,
    onSelect: (option: string) => void
  ) => (
    <div style={{ marginBottom: "20px" }}>
      <h2>{heading}:</h2>
      <select
        className="bg-gray-200 text-gray-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-lg px-3 py-2 me-2"
        onChange={(e) => onSelect(e.target.value)}
        value={selectedOption || ""}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <h2>Date:</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date: Date) => handleDateChange(date)}
          dateFormat="MMMM d, yyyy"
          className="bg-gray-200 text-gray-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-lg px-3 py-2"
        />
      </div>

      {renderDropdown("Branch", branches, selectedBranch, handleBranchSelect)}
      {renderDropdown(
        "Service",
        services,
        selectedService,
        handleServiceSelect
      )}
      {renderDropdown(
        "Employee",
        employees,
        selectedEmployee,
        handleEmployeeSelect
      )}
      {renderDropdown(
        "Time Slot",
        availableTimeSlots,
        selectedTimeSlot,
        handleTimeSlotClick
      )}

      <button
        className="bg-indigo-700 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-lg px-5 py-3 me-2"
        onClick={() => {
          // Add logic for confirming the booking
          console.log("Booking confirmed");
          // Redirect to "/bookings"
          window.location.href = "/bookings";
        }}
        disabled={
          !selectedBranch ||
          !selectedService ||
          !selectedEmployee ||
          !selectedTimeSlot ||
          !selectedDate
        }
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingForm;
