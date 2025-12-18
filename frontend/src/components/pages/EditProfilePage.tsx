import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export const USER_PROPERTY_LENGTH = {
  name: { min: 3, max: 30 },
  username: { min: 3, max: 20 },
};

interface EditProfileFormValues {
  name: string;
  email: string;
  username: string;
  gender: string;
  profilePicture: string;
}

const demoUser: EditProfileFormValues = {
  name: "Siam Hasan",
  email: "siam@example.com",
  username: "siamTy",
  gender: "Male",
  profilePicture: "https://i.pravatar.cc/150?img=12",
};

const EditProfilePage: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<EditProfileFormValues>({
    defaultValues: demoUser,
  });

  const [preview, setPreview] = useState<string>(demoUser.profilePicture);
  const profilePictureValue = watch("profilePicture");

  useEffect(() => {
    if (profilePictureValue) setPreview(profilePictureValue);
  }, [profilePictureValue]);

  const onSubmit = (data: EditProfileFormValues) => {
    console.log("Form submitted:", data);
    alert("Profile updated successfully!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-base-100 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <div>
          <label className="label font-medium">Full Name</label>
          <input
            className="input input-bordered w-full"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: USER_PROPERTY_LENGTH.name.min,
                message: `Name must be at least ${USER_PROPERTY_LENGTH.name.min} characters`,
              },
              maxLength: {
                value: USER_PROPERTY_LENGTH.name.max,
                message: `Name cannot exceed ${USER_PROPERTY_LENGTH.name.max} characters`,
              },
            })}
          />
          {errors.name && <p className="text-error text-sm mt-1">{errors.name.message}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="label font-medium">Email</label>
          <input
            type="email"
            className="input input-bordered w-full"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && <p className="text-error text-sm mt-1">{errors.email.message}</p>}
        </div>

        {/* Username */}
        <div>
          <label className="label font-medium">Username</label>
          <input className="input input-bordered w-full" {...register("username")} />
        </div>

        {/* Gender */}
        <div>
          <label className="label font-medium">Gender</label>
          <select className="select select-bordered w-full" {...register("gender")}>
            <option value="">Unspecified</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Profile Picture */}
        <div>
          <label className="label font-medium">Profile Picture URL</label>
          <input
            type="text"
            className="input input-bordered w-full"
            {...register("profilePicture")}
          />
          <div className="mt-2">
            <p className="text-sm opacity-70 mb-1">Preview:</p>
            <img
              src={preview}
              alt="Profile Preview"
              className="w-24 h-24 rounded-full object-cover border border-base-300"
            />
          </div>
        </div>

        {/* Submit */}
        <div className="mt-4">
          <button type="submit" className="btn btn-primary w-full">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
