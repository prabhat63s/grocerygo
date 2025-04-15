import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { toast } from "sonner";

const EditProfileModal = ({ isEditProfileOpen, setIsEditProfileOpen }) => {
  const { user, updateUserProfile } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    profileImage: null,
    profileUrl: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    if (isEditProfileOpen && user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
        profileImage: null,
        profileUrl: user.profileImage || "",
      });
    }
  }, [isEditProfileOpen, user]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage") {
      setFormData((prev) => ({
        ...prev,
        profileImage: files[0],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const getToken = () => {
    return localStorage.getItem("token") || sessionStorage.getItem("token");
  };

  const updateUserProfileAPI = async (userId, formData, token) => {
    try {
      const updatedFormData = new FormData();
      updatedFormData.append("name", formData.name);
      updatedFormData.append("email", formData.email);
      updatedFormData.append("mobile", formData.mobile);
      if (formData.profileImage) {
        updatedFormData.append("profileImage", formData.profileImage);
      }

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users/profile/update/${userId}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: updatedFormData,
        credentials: "include",
      });

      const data = await response.json();
      return data;
    } catch (err) {
      console.error("Error updating profile:", err);
      throw err;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    const token = getToken();
    if (!token) {
      toast.error("You must be logged in to update your profile.");
      setIsSubmitting(false);
      return;
    }

    try {
      const data = await updateUserProfileAPI(user._id, formData, token);
      if (data?.user) {
        // Update the user context immediately
        updateUserProfile(data.user);

        toast.success("Profile updated successfully!");
        setIsEditProfileOpen(false);
      } else {
        toast.error(data.message || "Failed to update profile.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong, please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {isEditProfileOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white w-full mx-4 md:max-w-[800px] p-6 rounded-lg shadow-lg transform transition-all duration-300 ease-out animate-slideDown">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Edit Profile</h2>
              <button
                onClick={() => setIsEditProfileOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-1 font-medium">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-1"
                    placeholder="Name"
                  />

                  <label className="block mt-4 mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-1"
                    placeholder="Email"
                  />

                  <label className="block mt-4 mb-1 font-medium">Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded px-3 py-1"
                    placeholder="Mobile"
                  />
                </div>

                <div>
                  <label className="block mb-1 font-medium">Profile Image</label>
                  <input
                    type="file"
                    name="profileImage"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 bg-transparent text-gray-700 rounded px-3 py-1 file:mr-3 file:py-1 file:px-4 cursor-pointer file:border-0 file:border-r file:border-gray-100 file:text-sm file:bg-transparent file:text-gray-700"
                  />
                  <img
                    src={
                      formData?.profileImage ? URL.createObjectURL(formData?.profileImage)
                        : formData?.profileUrl
                    }
                    alt="Profile"
                    className="w-24 h-24 rounded-full object-cover mt-4 border"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={() => setIsEditProfileOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`px-4 py-2 rounded text-white ${isSubmitting ? "bg-gray-500" : "bg-black"}`}
                >
                  {isSubmitting ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfileModal;
