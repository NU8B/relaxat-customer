"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../ui/nav-bar";
import SideBar from "../ui/side-bar";

interface ProfileCardProps {
  title: string;
  value: string;
  onEdit: () => void;
}

interface EditableProfileCardProps extends ProfileCardProps {
  onSave: (newValue: string) => void;
}

const EditableProfileCard: React.FC<EditableProfileCardProps> = ({
  title,
  value,
  onEdit,
  onSave,
}: EditableProfileCardProps) => {
  const [editedValue, setEditedValue] = useState(value);
  const [error, setError] = useState<string | null>(null);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 8;
  };

  const handleSave = () => {
    if (title === "Email" && !validateEmail(editedValue)) {
      setError("Please enter a valid email address");
      return;
    }

    if (title === "Password" && !validatePassword(editedValue)) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setError(null);
    onSave(editedValue);
    onEdit();
  };

  return (
    <div className="bg-gray-200 shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <div className="flex items-center">
          {title === "Password" ? (
            <>
              <input
                type="password"
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                className="border border-gray-300 p-1 mr-2"
              />
            </>
          ) : (
            <>
              <input
                type={title === "Email" ? "email" : "text"}
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                className="border border-gray-300 p-1 mr-2"
              />
            </>
          )}
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div>{value}</div>
    </div>
  );
};

const ProfileCard: React.FC<ProfileCardProps> = ({
  title,
  value,
  onEdit,
}: ProfileCardProps) => {
  return (
    <div className="bg-gray-200 shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        <button
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          onClick={onEdit}
        >
          Edit
        </button>
      </div>
      <div>{value}</div>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    // Add other user details as needed
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetchUserDetails(token);
    }
  }, []);

  const fetchUserDetails = async (token: string) => {
    try {
      const response = await fetch("http://localhost:3001/user-details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data.user);
      } else {
        console.error("Error fetching user details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/signin";
  };

  const handleEdit = () => {
    setEditing(!editing);
  };

  const handleSave = (field: string, newValue: string) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: newValue,
    }));
    setEditing(false);
  };

  const isSignedIn =
    typeof window !== "undefined" && Boolean(localStorage.getItem("token"));

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="flex gap-[6rem]">
        <SideBar />
        <div className="flex flex-col flex-1 p-8">
          {isSignedIn ? (
            <div className="mt-8">
              {editing ? (
                <>
                  <EditableProfileCard
                    title="First Name"
                    value={userDetails?.firstname || ""}
                    onEdit={handleEdit}
                    onSave={(newValue) => handleSave("firstname", newValue)}
                  />
                  <EditableProfileCard
                    title="Last Name"
                    value={userDetails?.lastname || ""}
                    onEdit={handleEdit}
                    onSave={(newValue) => handleSave("lastname", newValue)}
                  />
                  <EditableProfileCard
                    title="Email"
                    value={userDetails?.email || ""}
                    onEdit={handleEdit}
                    onSave={(newValue) => handleSave("email", newValue)}
                  />
                  <EditableProfileCard
                    title="Password"
                    value={userDetails?.password || ""}
                    onEdit={handleEdit}
                    onSave={(newValue) => handleSave("password", newValue)}
                  />
                </>
              ) : (
                <>
                  <ProfileCard
                    title="First Name"
                    value={userDetails?.firstname || ""}
                    onEdit={handleEdit}
                  />
                  <ProfileCard
                    title="Last Name"
                    value={userDetails?.lastname || ""}
                    onEdit={handleEdit}
                  />
                  <ProfileCard
                    title="Email"
                    value={userDetails?.email || ""}
                    onEdit={handleEdit}
                  />
                  <ProfileCard
                    title="Password"
                    value="**********"
                    onEdit={handleEdit}
                  />
                </>
              )}
              <div className="flex items-center justify-center mt-8">
                <button
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                  onClick={handleSignOut}
                >
                  Sign Out
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center mt-8">
              <p className="text-lg font-bold mb-4">Sign in to view</p>
              <button
                className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={() => {
                  window.location.href = "/signin";
                }}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
