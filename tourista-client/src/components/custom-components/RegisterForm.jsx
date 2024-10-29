import Field from "./Field";

const RegisterForm = () => {
  return (
    <form>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
        <Field htmlFor="full_name" label="Full Name">
          <input
            type="text"
            name="full_name"
            id="full_name"
            placeholder="Enter Your Full Name"
            className="p-2 border border-gray-400 rounded outline-none w-full"
          />
        </Field>
        <Field htmlFor="photo_url" label="Profile Image URL">
          <input
            type="url"
            name="photo_url"
            id="photo_url"
            placeholder="Enter Your Image URL"
            className="p-2 border border-gray-400 rounded outline-none w-full"
          />
        </Field>
        <Field htmlFor="email" label="Email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email Address"
            className="p-2 border border-gray-400 rounded outline-none w-full"
          />
        </Field>
        <Field htmlFor="country_name" label="Country Name">
          <input
            type="text"
            name="country_name"
            id="country_name"
            placeholder="Enter Your Country Name"
            className="p-2 border border-gray-400 rounded outline-none w-full"
          />
        </Field>
        <Field htmlFor="password" label="Password">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter Password"
            className="p-2 border border-gray-400 rounded outline-none w-full"
          />
        </Field>
        <Field htmlFor="confirmPassword" label="Confirm Password">
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Enter Confirm Password"
            className="p-2 border border-gray-400 rounded outline-none w-full"
          />
        </Field>
      </div>
      <div className="text-center mt-4">
        <button className="primary-button" type="submit">
          Register
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
