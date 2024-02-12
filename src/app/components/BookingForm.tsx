"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookingForm = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
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
    setCurrentStep(1); // Move to the next step after selecting the date.
  };

  const handleBranchSelect = (branch: string) => {
    setSelectedBranch(branch);
    setCurrentStep(2); // Move to the next step after selecting the branch.
  };

  const handleServiceSelect = (service: string) => {
    setSelectedService(service);
    setCurrentStep(3); // Move to the next step after selecting the service.
  };

  const handleEmployeeSelect = (employee: string) => {
    setSelectedEmployee(employee);
    setCurrentStep(4); // Move to the next step after selecting the employee.
  };

  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
    // You can add logic here to handle booking, such as making an API request to book the selected time slot.
    // You can also display a confirmation message to the user.
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => handleDateChange(date)}
            dateFormat="MMMM d, yyyy"
            customInput={
              <button
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
                onClick={() => setSelectedDate(null)}
              >
                {selectedDate ? (
                  <span style={{ fontSize: "1.5em" }}>
                    Selected Date: {selectedDate?.toLocaleDateString()}
                  </span>
                ) : (
                  <span style={{ fontSize: "1.5em" }}>Select a Date</span>
                )}
              </button>
            }
          />
        );
      case 1:
        return (
          <>
            <h1 style={{ marginBottom: "10px" }}>Select Branch:</h1>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {branches.map((branch) => (
                <li key={branch}>
                  <button
                    className={`${
                      selectedBranch === branch
                        ? "bg-indigo-700 text-white"
                        : "bg-gray-200 text-gray-700"
                    } focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-0.5 me-2`}
                    onClick={() => handleBranchSelect(branch)}
                    disabled={selectedBranch !== null}
                  >
                    {branch}
                  </button>
                </li>
              ))}
            </ul>
          </>
        );
      case 2:
        return (
          <>
            <h3 style={{ marginBottom: "10px", marginTop: "20px" }}>
              Select Service:
            </h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {services.map((service) => (
                <li key={service}>
                  <button
                    className={`${
                      selectedService === service
                        ? "bg-indigo-700 text-white"
                        : "bg-gray-200 text-gray-700"
                    } focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-0.5 me-2`}
                    onClick={() => handleServiceSelect(service)}
                    disabled={selectedService !== null}
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </>
        );
      case 3:
        return (
          <>
            <h3 style={{ marginBottom: "10px", marginTop: "20px" }}>
              Select Employee:
            </h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {employees.map((employee) => (
                <li key={employee}>
                  <button
                    className={`${
                      selectedEmployee === employee
                        ? "bg-indigo-700 text-white"
                        : "bg-gray-200 text-gray-700"
                    } focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-0.5 me-2`}
                    onClick={() => handleEmployeeSelect(employee)}
                    disabled={selectedEmployee !== null}
                  >
                    {employee}
                  </button>
                </li>
              ))}
            </ul>
          </>
        );
      case 4:
        return (
          <>
            <h3 style={{ marginBottom: "10px", marginTop: "20px" }}>
              Available Time Slots:
            </h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {availableTimeSlots.map((slot) => (
                <li
                  key={slot}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "2px",
                  }}
                >
                  <span style={{ flex: 1 }}>{slot}</span>
                  <button
                    className={`${
                      selectedTimeSlot === slot
                        ? "bg-indigo-700 text-white"
                        : "bg-gray-200 text-gray-700"
                    } focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-0.5 me-2`}
                    onClick={() => handleTimeSlotClick(slot)}
                    disabled={selectedTimeSlot !== null}
                  >
                    {selectedTimeSlot === slot ? "Selected" : "Book"}
                  </button>
                </li>
              ))}
            </ul>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {renderStepContent()}
      {selectedTimeSlot && (
        <div>
          <h3 style={{ textDecoration: "underline" }}>Confirmation</h3>
          <p>Selected Date: {selectedDate?.toLocaleDateString()}</p>
          <p>Selected Time Slot: {selectedTimeSlot}</p>
          <p>Selected Branch: {selectedBranch}</p>
          <p>Selected Service: {selectedService}</p>
          <p>Selected Employee: {selectedEmployee}</p>

          {/* Buttons for canceling booking and navigating to /schedule */}
          <div style={{ marginTop: "20px" }}>
            <button
              className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
              onClick={() => {
                // Add logic for canceling the booking (if needed)
                console.log("Booking canceled");
                window.location.href = "/book";
              }}
            >
              Cancel Booking
            </button>
            <button
              className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5"
              onClick={() => {
                // Add logic for navigating to /schedule
                // You may use a routing library (e.g., React Router) for navigation
                window.location.href = "/schedule";
              }}
            >
              Go to Schedule
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
