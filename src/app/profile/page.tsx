"use client";
import React, { useState, useEffect } from "react";
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
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isEditing) {
      setEditedValue(value); // Reset input when entering edit mode
    }
  }, [isEditing, value]);

  const handleSave = () => {
    setError(null);
    onSave(editedValue);
    setIsEditing(false); // Exit edit mode after save
  };

  return (
    <div className="bg-gray-200 shadow-md rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">{title}</h2>
        {title !== "Email" && (
          <div className="flex items-center">
            {isEditing ? (
              <>
                <input
                  type={title === "Password" ? "password" : "text"}
                  value={editedValue}
                  onChange={(e) => setEditedValue(e.target.value)}
                  placeholder="Enter new name"
                  className="border border-gray-300 p-1 mr-2"
                />
                <button
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  onClick={handleSave}
                >
                  Save
                </button>
              </>
            ) : (
              <button
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
        )}
      </div>
      {error && <p className="text-red-500">{error}</p>}
      <div>{isEditing ? editedValue : value}</div>
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
        {title !== "Email" && (
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={onEdit}
          >
            Edit
          </button>
        )}
      </div>
      <div>{value}</div>
    </div>
  );
};

const ProfilePage: React.FC = () => {
  const [userDetails, setUserDetails] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);

  useEffect(() => {
    if (!editing) {
      fetchUserDetails();
    }
  }, [editing]); // Fetch user details on component mount and when not in edit mode

  const fetchUserDetails = async () => {
    try {
      const response = await fetch(
        "http://52.139.168.229:3000/api/v1/customers/33",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setUserDetails(data.data);
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
    window.location.href = "/signin";
  };

  const handleEdit = (field: string) => {
    setEditing(field);
  };

  const handleSave = async (field: string, newValue: string) => {
    try {
      // Update the server with the new values
      const response = await fetch(
        "http://52.139.168.229:3000/api/v1/customers/33",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            firstName:
              field === "first_name" ? newValue : userDetails.first_name,
            lastName: field === "last_name" ? newValue : userDetails.last_name,
          }),
        }
      );

      if (response.ok) {
        // If the server update is successful, update the local state
        setUserDetails((prevDetails) => ({
          ...prevDetails,
          first_name:
            field === "first_name" ? newValue : prevDetails.first_name,
          last_name: field === "last_name" ? newValue : prevDetails.last_name,
        }));
        setEditing(null); // Exit edit mode
      } else {
        console.error("Error updating user details:", response.statusText);
      }
    } catch (error) {
      console.error("Error updating user details:", error);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <NavBar />
      <div className="flex gap-[6rem]">
        <SideBar />
        <div className="flex flex-col flex-1 p-8">
          <div className="mt-8">
            <EditableProfileCard
              title="First Name"
              value={editing === "first_name" ? "" : userDetails.first_name}
              onEdit={() => handleEdit("first_name")}
              onSave={(newValue) => handleSave("first_name", newValue)}
            />
            <EditableProfileCard
              title="Last Name"
              value={editing === "last_name" ? "" : userDetails.last_name}
              onEdit={() => handleEdit("last_name")}
              onSave={(newValue) => handleSave("last_name", newValue)}
            />

            <ProfileCard
              title="Email"
              value={userDetails.email}
              onEdit={() => {}}
            />
            <div className="flex items-center justify-center mt-8">
              <button
                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
