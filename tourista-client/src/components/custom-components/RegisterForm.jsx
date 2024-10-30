import useAuth from "@/hooks/useAuth";
import { sendEmailVerification, updateProfile } from "firebase/auth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Field from "./Field";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const { createUser } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [showAnother, setShowAnother] = useState(false);

  const handleRegister = (formData) => {
    let registeredUser;
    createUser(formData.email, formData.password)
      .then((result) => {
        registeredUser = result.user;
        return updateProfile(registeredUser, {
          displayName: formData.full_name,
          photoURL: formData.photo_url,
        });
      })
      .then(() => {
        return sendEmailVerification(registeredUser);
      })
      .then(() => {
        toast.warning("Please Verify Email First!");
        reset();
        navigate("/login");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const password = watch("password");

  return (
    <form onSubmit={handleSubmit(handleRegister)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
        <Field htmlFor="full_name" label="Full Name">
          <input
            {...register("full_name", { required: "Full Name is Required!" })}
            type="text"
            name="full_name"
            id="full_name"
            placeholder="Enter Your Full Name"
            className={`p-2 border ${
              errors.email ? "border-red-600" : "border-gray-400"
            } rounded outline-none w-full`}
          />
          {errors.full_name && (
            <p className="text-red-500">{errors.full_name.message}</p>
          )}
        </Field>
        <Field htmlFor="photo_url" label="Profile Image URL">
          <input
            {...register("photo_url", { required: "Image URL is Required!" })}
            type="url"
            name="photo_url"
            id="photo_url"
            placeholder="Enter Your Image URL"
            className={`p-2 border ${
              errors.photo_url ? "border-red-600" : "border-gray-400"
            } rounded outline-none w-full`}
          />
          {errors.photo_url && (
            <p className="text-red-500">{errors.photo_url.message}</p>
          )}
        </Field>
        <Field htmlFor="email" label="Email">
          <input
            {...register("email", { required: "Email is Required!" })}
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email Address"
            className={`p-2 border ${
              errors.email ? "border-red-600" : "border-gray-400"
            } rounded outline-none w-full`}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </Field>
        <Field htmlFor="country_name" label="Country Name">
          <input
            {...register("country_name", {
              required: "Country Name is Required!",
            })}
            type="text"
            name="country_name"
            id="country_name"
            placeholder="Enter Your Country Name"
            className={`p-2 border ${
              errors.country_name ? "border-red-600" : "border-gray-400"
            } rounded outline-none w-full`}
          />
          {errors.country_name && (
            <p className="text-red-500">{errors.country_name.message}</p>
          )}
        </Field>
        <div className="relative">
          <Field htmlFor="password" label="Password">
            <input
              {...register("password", {
                required: "Password is Required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message:
                    "Password must contain at least one uppercase and one lowercase letter",
                },
              })}
              type={show ? "text" : "password"}
              name="password"
              id="password"
              placeholder="Enter Password"
              className={`p-2 border ${
                errors.password ? "border-red-600" : "border-gray-400"
              } rounded outline-none w-full`}
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </Field>
          <button
            onClick={() => setShow(!show)}
            type="button"
            className="absolute top-[56px] right-2 translate-y-[-50%] outline-none"
          >
            {show ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
        <div className="relative">
          <Field htmlFor="confirmPassword" label="Confirm Password">
            <input
              {...register("confirmPassword", {
                required: "Confirm Password is Required",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              type={showAnother ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Enter Confirm Password"
              className={`p-2 border ${
                errors.confirmPassword ? "border-red-600" : "border-gray-400"
              } rounded outline-none w-full`}
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </Field>
          <button
            onClick={() => setShowAnother(!showAnother)}
            type="button"
            className="absolute top-[56px] right-2 translate-y-[-50%] outline-none"
          >
            {showAnother ? <FaRegEyeSlash /> : <FaRegEye />}
          </button>
        </div>
      </div>
      <div className="text-center mt-4">
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <button className="primary-button" type="submit">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
