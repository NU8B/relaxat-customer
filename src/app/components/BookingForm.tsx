"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [selectedEmployee, setSelectedEmployee] = useState<string | null>(null);
  const [staffId, setStaffId] = useState<number | null>(null);
  const [availableBranches, setAvailableBranches] = useState<any[]>([]);
  const [availableServices, setAvailableServices] = useState<any[]>([]);
  const [availableEmployees, setAvailableEmployees] = useState<string[]>([]);
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
      fetch(`http://52.139.168.229:3000/api/v1/staff`)
        .then((response) => response.json())
        .then((data) => {
          const selectedEmployeeData = data.data.find(
            (employee: Employee) => employee.first_name === selectedEmployee
          );

          if (selectedEmployeeData) {
            const staffId = selectedEmployeeData.person_id;
            const appointmentDate = selectedDate.toISOString().split("T")[0];
            console.log(staffId, appointmentDate);
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
        })
        .catch((error) => console.error("Error fetching staff data:", error));
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

  const handleEmployeeSelect = async (employee: string) => {
    setSelectedEmployee(employee);
    setSelectedTimeSlot(null); // Reset time slot selection when the employee changes

    // Fetch staffId based on selected employee
    try {
      const staffId = await fetchStaffId(selectedEmployee);
      if (staffId !== null) {
        setStaffId(staffId); // Assuming you have state to store staffId

        // Fetch available time slots based on staffId and selected date
        const appointmentDate = selectedDate?.toISOString().split("T")[0];
        if (appointmentDate) {
          fetchAvailableTimeSlots(staffId, appointmentDate);
        }
      } else {
        console.error("StaffId is null");
      }
    } catch (error) {
      console.error("Error fetching staffId:", error);
    }
  };

  const fetchStaffId = async (
    selectedEmployee: string | null
  ): Promise<number | null> => {
    try {
      if (selectedEmployee === null) {
        // Handle the case where selectedEmployee is null
        return null;
      }

      const response = await fetch(
        `http://52.139.168.229:3000/api/v1/staff?employee_firstName=${selectedEmployee}`
      );

      if (!response.ok) {
        console.error(
          `Error fetching staffId for ${selectedEmployee}: ${response.status}`
        );
        return null;
      }

      const data: Employee | null = await response.json();

      // Assuming the API returns a single staff object with matching first name
      return data ? data.person_id : null;
    } catch (error) {
      console.error(`Error fetching staffId for ${selectedEmployee}:`, error);
      return null;
    }
  };

  const fetchAvailableTimeSlots = async (
    staffId: number,
    appointmentDate: string
  ) => {
    try {
      const response = await fetch(
        `http://52.139.168.229:3000/api/v1/staff/available?staffId=${staffId}&appointmentDate=${appointmentDate}`
      );

      if (!response.ok) {
        console.error(
          `Error fetching available time slots for staffId ${staffId} and date ${appointmentDate}: ${response.status}`
        );
        setAvailableTimeSlots([]);
        return;
      }

      const data = await response.json();
      if (data && data.data && data.data.freeHour) {
        setAvailableTimeSlots(data.data.freeHour);
      } else {
        console.error("No available time slots found");
        setAvailableTimeSlots([]);
      }
    } catch (error) {
      console.error("Error fetching available time slots:", error);
      setAvailableTimeSlots([]);
    }
  };

  const handleTimeSlotClick = (timeSlot: string) => {
    setSelectedTimeSlot(timeSlot);
  };

  const handleSubmitBooking = async () => {
    console.log("Submit button clicked");

    // Validate and submit the booking to the API
    if (
      selectedBranch &&
      selectedService &&
      selectedEmployee &&
      selectedTimeSlot &&
      selectedDate
    ) {
      console.log("Booking data:", {
        selectedBranch,
        selectedService,
        selectedEmployee,
        selectedTimeSlot,
        selectedDate,
      });

      const selectedServiceData = availableServices.find(
        (service) => service.service_name === selectedService
      );

      if (!selectedServiceData) {
        console.error("Selected service data not found");
        return;
      }

      try {
        // Fetch staffId asynchronously
        const staffId = await fetchStaffId(selectedEmployee);

        if (staffId === null) {
          console.error("StaffId is null");
          return;
        }

        const bookingData = {
          serviceId: selectedServiceData.id,
          customerId: 33, // Replace with the actual customer ID
          appointmentDate: selectedDate
            ? selectedDate.toISOString().split("T")[0]
            : null,
          appointmentTime: `${selectedTimeSlot}:00`,
          staffId: staffId, // Use the fetched staffId
        };

        console.log("Booking data to be submitted:", bookingData);

        const response = await fetch(
          "http://52.139.168.229:3000/api/v1/appointments",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(bookingData),
          }
        );

        if (response.ok) {
          const data = await response.json();

          console.log("Booking submitted successfully:", data);

          toast.success("Booking Successful! Redirecting...", {
            position: "top-center",
            autoClose: 1000,
          });

          // Redirect to "/bookings" or handle the success case accordingly
          window.location.href = "/bookings";
        } else {
          console.error("Error submitting booking:", response.status);
          toast.error("Error submitting booking. Please try again.", {
            position: "top-center",
            autoClose: 3000,
          });
        }
      } catch (error) {
        console.error("Error during booking submission:", error);
        toast.error("Error during booking submission. Please try again.", {
          position: "top-center",
          autoClose: 3000,
        });
      }
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
              option.branch_name || option.service_name || availableEmployees
            }
          >
            {option.branch_name || option.service_name || availableEmployees}
          </option>
        ))}
      </select>
    </div>
  );

  const renderTimeSlotDropdown = (
    heading: string,
    options: string[],
    selectedOption: string | null,
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
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );

  function generateTimeSlots(availableTimeSlots: number[]): string[] {
    const timeSlots = [];

    for (const hour of availableTimeSlots) {
      if (hour >= 0 && hour <= 23) {
        // Basic check for valid hour
        timeSlots.push(`${hour}:00`);
      } else {
        // Handle invalid hour if needed
        console.error("Invalid hour encountered:", hour);
      }
    }

    return timeSlots;
  }

  const timeSlots = generateTimeSlots(availableTimeSlots);

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
          {renderTimeSlotDropdown(
            "Time Slot",
            timeSlots,
            selectedTimeSlot,
            (timeSlot) => handleTimeSlotClick(timeSlot)
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

      <ToastContainer />
    </div>
  );
};

export default BookingForm;
