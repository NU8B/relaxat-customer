"use client";
import React, { useState } from "react";
import NavBar from "../ui/home/nav-bar";
import SideBar from "../ui/home/side-bar";

interface StarRatingProps {
  value: number;
  onClick: (value: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ value, onClick }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex items-center">
      <div className="flex-1" />
      <div className="flex items-center">
        {stars.map((star) => (
          <span
            key={star}
            onClick={() => onClick(star)}
            style={{
              cursor: "pointer",
              fontSize: "3em",
              color: star <= value ? "gold" : "gray",
            }}
          >
            &#9733;
          </span>
        ))}
      </div>
    </div>
  );
};

const ReviewPage = () => {
  const [reviewText, setReviewText] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [starRating, setStarRating] = useState(0);

  const handleSubmitReview = () => {
    // Add logic here to submit the review (e.g., send data to the server)
    // For now, we'll just log the review details to the console
    console.log("Review Text:", reviewText);
    console.log("Branch:", selectedBranch);
    console.log("Service:", selectedService);
    console.log("Employee:", selectedEmployee);
    console.log("Star Rating:", starRating);
  };

  return (
    <>
      <NavBar />
      <div className="flex gap-[6rem]">
        <SideBar />
        <div className="flex flex-col flex-1 p-8">
          <h1 className="text-2xl font-bold mb-4">Write a Review</h1>
          <textarea
            rows={10}
            cols={50}
            placeholder="Type your review here..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="border border-gray-300 rounded p-4 mb-4" // Double the padding
          />

          <div className="mb-4 flex items-center">
            <label htmlFor="branch" className="mr-2 sr-only">
              Select Branch:
            </label>
            <select
              id="branch"
              value={selectedBranch}
              onChange={(e) => setSelectedBranch(e.target.value)}
              className="border border-gray-300 rounded p-2 mr-4"
            >
              <option value="">Select Branch</option>
              <option value="Bangkok">Bangkok</option>
              <option value="Phuket">Phuket</option>
              <option value="Chiang Mai">Chiang Mai</option>
            </select>

            <label htmlFor="service" className="mr-2 sr-only">
              Select Service:
            </label>
            <select
              id="service"
              value={selectedService}
              onChange={(e) => setSelectedService(e.target.value)}
              className="border border-gray-300 rounded p-2 mr-4"
            >
              <option value="">Select Service</option>
              <option value="Hair Styling">Hair Styling</option>
              <option value="Nail care">Nail care</option>
              <option value="Massage">Massage</option>
            </select>

            <label htmlFor="employee" className="mr-2 sr-only">
              Select Employee:
            </label>
            <select
              id="employee"
              value={selectedEmployee}
              onChange={(e) => setSelectedEmployee(e.target.value)}
              className="border border-gray-300 rounded p-2 mr-4"
            >
              <option value="">Select Employee</option>
              <option value="John">John</option>
              <option value="Emily">Emily</option>
            </select>

            <StarRating
              value={starRating}
              onClick={(value) => setStarRating(value)}
            />
          </div>

          <button
            onClick={() => {
              window.location.href = "/review";
              handleSubmitReview();
            }}
            className="bg-indigo-700 text-white hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-4"
          >
            Submit Review
          </button>
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
