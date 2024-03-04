"use client";
import React, { useState, FormEvent, ChangeEvent } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignupPage() {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Form submitted!");
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();

    if (isEmailValid && isPasswordValid) {
      try {
        const response = await fetch(
          "http://52.139.168.229:3000/api/v1/signup",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              firstName: formData.firstName,
              lastName: formData.lastName,
              email: formData.email,
              password: formData.password,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log("Signup successful:", data);

          // Show success notification
          toast.success("Successful! Redirecting to Sign In...", {
            position: "top-center",
            autoClose: 1000,
          });

          // Redirect to Sign In after a delay
          setTimeout(() => {
            console.log("Redirection initiated to /signin");
            window.location.href = "/signin";
          }, 1000);
        } else {
          const errorData = await response.json();
          console.error("Signup error:", errorData);

          // Handle specific error cases
          if (response.status === 500) {
            toast.error(
              "This email is already registered. Please use a different email.",
              {
                position: "top-center",
                autoClose: 4000,
              }
            );
          }
        }
      } catch (error) {
        // ... handle network or other errors
        console.error("Network error:", error);
      }
    }
  };

  const [formData, setFormData] = useState({
    firstName: "", // Add firstName
    lastName: "", // Add lastName
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

    if (inputName === "firstName") {
      setFormData({
        ...formData,
        firstName: inputValue,
      });
    } else if (inputName === "lastName") {
      setFormData({
        ...formData,
        lastName: inputValue,
      });
    } else if (inputName === "password") {
      setFormData({
        ...formData,
        password: inputValue,
      });
    } else if (inputName === "email") {
      setFormData({
        ...formData,
        email: inputValue,
      });
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors({ ...errors, email: "Please enter a valid email address" });
      return false;
    } else {
      setErrors({ ...errors, email: "" });
      return true;
    }
  };

  const validatePassword = () => {
    if (formData.password.length < 8) {
      setErrors({
        ...errors,
        password: "Password must be at least 8 characters long",
      });
      return false;
    } else {
      setErrors({ ...errors, password: "" });
      return true;
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

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-2 text-center text-3xl font-bold uppercase">
            Relaxat
          </h1>
          <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                First Name
              </label>
              <div className="mt-2">
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="current-firstName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Last Name
              </label>
              <div className="mt-2">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="current-lastName"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={handleChange}
                />
              </div>
            </div>

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
                {/* Show error message */}
                {errors && errors.email && (
                  <p className="text-red-500 text-sm">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
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
                {/* Show error message */}
                {errors.password && (
                  <p className="text-red-500 text-sm">{errors.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <a
              href="/signin"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
