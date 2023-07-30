import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { UserContext } from "../../UserContext";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  async function handleLoginSubmit(ev) {
    ev.preventDefault();

    try {
      const response = await axios.post("/login", { email, password });
      console.log(response);
      alert("Login successful");
      setUser(response.data);
      if (props.setShowLoginModal) props.setShowLoginModal(false);
      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  }

  return (
    <>
      <div className="relative text-center p-4">
        {props.showCloseButton && (
          <button
            className="absolute top-2 left-2 p-2 hover:bg-neutral-100 rounded-full"
            onClick={() => props.setShowLoginModal(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
        <div className="font-semibold text-lg">Log in</div>
      </div>
      <div className="border"></div>

      <div className="p-4 pt-2 sm:mx-0 sm:w-full sm:max-w-full">
        <h3 className="font-[650] text-xl py-4">Welcome to Airbnb</h3>
        <form className="space-y-6" method="POST" onSubmit={handleLoginSubmit}>
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
                autoComplete="email"
                required
                className="block h-10 w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
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
              <div className="text-sm">
                <a
                  href="#"
                  className="font-semibold text-primary hover:text-primaryHover"
                >
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block h-10 w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex h-10 w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primaryHover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Log in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link
            to={"/register"}
            className="font-semibold leading-6 text-primary hover:text-primaryHover"
            onClick={() => {
              setShowLoginModal(false);
            }}
          >
            Register Now
          </Link>
        </p>
      </div>
    </>
  );
}
