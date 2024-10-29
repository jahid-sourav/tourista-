import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Field from "./Field";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const navigate = useNavigate();
  const { loginUser } = useAuth();
  const [error, setError] = useState("");

  const handleLoginUser = (formData) => {
    loginUser(formData.email, formData.password)
      .then((result) => {
        if (!result.user.emailVerified) {
          toast.error("Email is not Verified!");
          return;
        }
        toast.success(`${result.user.displayName} LoggedIn!`);
        reset();
        navigate("/me");
      })
      .catch((err) => setError(err.message));
  };

  return (
    <form onSubmit={handleSubmit(handleLoginUser)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
        <Field htmlFor="email" label="Email">
          <input
            {...register("email", { required: "Email Is Required!" })}
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
            className={`p-2 border ${
              errors.email ? "border-red-500" : "border-gray-400"
            } rounded outline-none w-full`}
          />
          {errors.email && (
            <p className="text-red-600">{errors.email.message}</p>
          )}
        </Field>
        <Field htmlFor="password" label="Password">
          <input
            {...register("password", {
              required: "Password is Required!",
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
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className={`p-2 border ${
              errors.password ? "border-red-500" : "border-gray-400"
            } rounded outline-none w-full`}
          />
          {errors.password && (
            <p className="text-red-600">{errors.password.message}</p>
          )}
          <div className="text-right mt-1">
            <button
              type="button"
              className="underline text-red-500 font-semibold"
            >
              Forget Password
            </button>
          </div>
        </Field>
      </div>
      <div className="text-center mt-2">
        {error && <p className="text-red-500 mb-3">{error}</p>}
        <button className="primary-button" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
