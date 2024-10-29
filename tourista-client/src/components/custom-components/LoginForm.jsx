import Field from "./Field";

const LoginForm = () => {
  return (
    <form>
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-6">
        <Field htmlFor="email" label="Email">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter Your Email"
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
        <button className="primary-button" type="submit">
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
