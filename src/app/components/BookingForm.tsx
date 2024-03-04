"use client";
import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Service {
  id: number;
  service_name: string;
  price: number;
  category_id: number;
  category_name: string;
  branches: string[];
}

interface Employee {
  person_id: number;
  first_name: string;
  last_name: string;
  email: string;
  branch_name: string;
  category_name: string;
  // Add any other relevant properties
  // ... other properties
}

const BookingForm = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | null>(null);
  const [selectedBranch, setSelectedBranch] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<any | null>(null);

  const [availableBranches, setAvailableBranches] = useState<any[]>([]);
  const [availableServices, setAvailableServices] = useState<any[]>([]);
  const [availableEmployees, setAvailableEmployees] = useState<any[]>([]);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<number[]>([]);

  // Fetch branches
  useEffect(() => {
    fetch(`http://52.139.168.229:3000/api/v1/branches`)
      .then((response) => response.json())
      .then((data) => {
        const branches = data.data || [];
        if (Array.isArray(branches) && branches.length > 0) {
          const formattedBranches = branches.map((branch) => ({
            id: branch.branch_id,
            branch_name: branch.branch_name,
          }));
          setAvailableBranches(formattedBranches);
        } else {
          console.error("Unexpected branches data format:", data);
        }
      })
      .catch((error) =>
        console.error("Error fetching available branches:", error)
      );
  }, []);

  // Fetch services (based on selected branch)
  useEffect(() => {
    if (selectedBranch) {
      fetch(`http://52.139.168.229:3000/api/v1/services`)
        .then((response) => response.json())
        .then((data) => {
          const services: Service[] = data.data || [];
          const filteredServices = services.filter((service) =>
            service.branches
              .map((branch) => branch.toLowerCase())
              .includes(selectedBranch.toLowerCase())
          );
          setAvailableServices(filteredServices);
        })
        .catch((error) =>
          console.error("Error fetching available services:", error)
        );
    }
  }, [selectedBranch]);

  // Fetch employees (based on branch, service, and date)
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        if (selectedBranch && selectedService && selectedDate) {
          const response = await fetch(
            "http://52.139.168.229:3000/api/v1/staff"
          );

          if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
          }

          const responseData = await response.json();
          const employeeData = responseData.data;

          console.log("Fetched Employee Response Data:", responseData);
          console.log("Actual Employee Data:", employeeData);

          if (!Array.isArray(employeeData)) {
            console.error("Employee data is not an array:", employeeData);
            setAvailableEmployees([]);
            return;
          }

          const selectedServiceData = availableServices.find(
            (service) => service.service_name === selectedService
          );

          if (selectedServiceData) {
            const categoryOfSelectedService = selectedServiceData.category_name;
            const filteredEmployees = employeeData.filter(
              (employee: Employee) => {
                return (
                  employee.branch_name.toLowerCase() ===
                    selectedBranch.toLowerCase() &&
                  employee.category_name === categoryOfSelectedService
                );
              }
            );

            const filteredEmployeeFirstNames = filteredEmployees.map(
              (employee: Employee) => {
                const firstName = employee.first_name || "Unknown";
                return firstName;
              }
            );

            console.log("Filtered Employees:", filteredEmployees);
            console.log(
              "Filtered Employee First Names:",
              filteredEmployeeFirstNames
            );

            setAvailableEmployees(filteredEmployeeFirstNames); // Set array of strings
          } else {
            console.error("Selected service data not found");
            setAvailableEmployees([]);
          }
        }
      } catch (error) {
        console.error("Error fetching available employees:", error);
        setAvailableEmployees([]); // Handle errors gracefully
      }
    };

    fetchEmployees();
  }, [selectedBranch, selectedService, selectedDate, availableServices]);

  // Fetch time slots (based on employee and date)
  useEffect(() => {
    if (selectedEmployee && selectedDate) {
      const staffId = selectedEmployee.person_id;
      const appointmentDate = selectedDate.toISOString().split("T")[0];

      fetch(
        `http://52.139.168.229:3000/api/v1/staff/available?staffId=${staffId}&appointmentDate=${appointmentDate}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data && data.data && data.data.freeHour) {
            setAvailableTimeSlots(data.data.freeHour);
          } else {
            console.error("No available time slots found");
            setAvailableTimeSlots([]);
          }
        })
        .catch((error) =>
          console.error("Error fetching available time slots:", error)
        );
    }
  }, [selectedEmployee, selectedDate]);

  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
    // Reset branch, service, employee, and time slot selections when the date changes
    setSelectedBranch(null);
    setSelectedService(null);
    setSelectedEmployee(null);
    setSelectedTimeSlot(null);
  };

  const handleBranchSelect = (branchName: string) => {
    setSelectedBranch(branchName); // Set the selected branch directly
    // Reset service, employee, and time slot selections when the branch changes
    setSelectedService(null);
    setSelectedEmployee(null);
    setSelectedTimeSlot(null);
  };

  const handleServiceSelect = (serviceName: string) => {
    setSelectedService(serviceName); // Set the selected service directly
    // Reset employee and time slot selections when the service changes
    setSelectedEmployee(null);
    setSelectedTimeSlot(null);
  };

  const handleEmployeeSelect = (employee: string) => {
    setSelectedEmployee(employee);
    // Reset time slot selection when the employee changes
    setSelectedTimeSlot(null);
  };

  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleSubmitBooking = () => {
    // Validate and submit the booking to the API
    if (
      selectedBranch &&
      selectedService &&
      selectedEmployee &&
      selectedTimeSlot &&
      selectedDate
    ) {
      const bookingData = {
        serviceId:
          selectedService && typeof selectedService === "object"
            ? (selectedService as { id: string }).id
            : null,
        customerId: 33, // Replace with the actual customer ID
        appointmentDate: selectedDate
          ? selectedDate.toISOString().split("T")[0]
          : null,
        appointmentTime: selectedTimeSlot,
        staffId:
          selectedEmployee && typeof selectedEmployee === "object"
            ? (selectedEmployee as { person_id: string }).person_id
            : null,
      };

      // POST request to submit the booking
      fetch("http://52.139.168.229:3000/api/v1/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Booking submitted successfully:", data);
          // Redirect to "/bookings" or handle the success case accordingly
          window.location.href = "/bookings";
        })
        .catch((error) => console.error("Error submitting booking:", error));
    }
  };

  // Function to render dropdowns
  const renderDropdown = (
    heading: string,
    options: any[],
    selectedOption: any | null,
    onSelect: (optionName: string) => void
  ) => (
    <div style={{ marginBottom: "20px" }}>
      <h2>{heading}:</h2>
      <select
        className="bg-gray-200 text-gray-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-lg px-3 py-2 me-2"
        onChange={(e) => onSelect(e.target.value)}
        value={selectedOption ? selectedOption : ""}
      >
        <option value="" disabled>
          Select an option
        </option>
        {options.map((option: any) => (
          <option
            key={option.id} // Add a unique key prop here
            value={
              option.branch_name ||
              option.service_name ||
              `${option.first_name} ${option.last_name}`
            }
          >
            {option.branch_name ||
              option.service_name ||
              `${option.first_name} ${option.last_name}`}
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
          minDate={new Date(new Date().getTime() + 24 * 60 * 60 * 1000)} // Set minimum date to the next day
        />
      </div>

      {renderDropdown(
        "Branch",
        availableBranches,
        selectedBranch,
        (branchName) => handleBranchSelect(branchName)
      )}
      {selectedDate !== null && (
        <>
          {renderDropdown(
            "Service",
            availableServices,
            selectedService,
            (serviceName) => handleServiceSelect(serviceName)
          )}
          {renderDropdown(
            "Employee",
            availableEmployees,
            selectedEmployee,
            (employeeName) => handleEmployeeSelect(employeeName)
          )}
          {renderDropdown(
            "Time Slot",
            availableTimeSlots.map((hour) => ({ id: hour, freeHour: hour })),
            selectedTimeSlot,
            handleTimeSlotClick
          )}
        </>
      )}

      <button
        className="bg-indigo-700 text-white focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-lg px-5 py-3 me-2"
        onClick={handleSubmitBooking}
        disabled={
          !selectedBranch ||
          !selectedService ||
          !selectedEmployee ||
          !selectedTimeSlot ||
          selectedDate === null
        }
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingForm;
