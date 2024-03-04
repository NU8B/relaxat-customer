"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;

    setFormData({ ...formData, [inputName]: inputValue });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address";
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Please enter your password";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!validateForm()) return; // Validate the form before sending request

    try {
      const response = await fetch("http://52.139.168.229:3000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          //Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();

        console.log("Login successful:", data);

        toast.success("Login Successful! Redirecting...", {
          position: "top-center",
          autoClose: 1000,
        });

        setTimeout(() => {
          window.location.href = "/bookings";
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error("Login error:", errorData);

        if (response.status === 401) {
          toast.error("Invalid email or password", {
            position: "top-center",
            autoClose: 4000,
          });
        } else {
          // Handle other error cases
        }
      }
    } catch (error) {
      console.error("Network error:", error);
      toast.error("An error occurred. Please try again.", {
        position: "top-center",
        autoClose: 4000,
      });
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Column with Image */}
      <div className="flex-none">
        {/* Add your image here */}
        <img
          src="/image2.png" // Replace with your image path
          alt="Image"
          className="h-full max-w-none"
        />
      </div>

      {/* Right Column with Sign-in Form */}
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-2 text-center text-3xl font-bold uppercase">
            Relaxat
          </h1>
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="current-email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>
          {/* Sign Up Link */}
          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?{" "}
            <a
              href="/signup"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign Up
            </a>
          </p>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}
