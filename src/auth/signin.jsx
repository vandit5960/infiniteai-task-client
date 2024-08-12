import { useState, useEffect } from "react";
import infiniteai from "../assets/infiniteai.jpeg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../components/stateProvider";

const Signin = () => {
  const [data, setData] = useState({});
  const [isDisabled, setDisabled] = useState(false);
  const [error, setError] = useState("");

  const { user, setUser } = useSearch();

  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [data]);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/signin",
        data,
        {
          withCredentials: true,
        }
      );
      if (response.data) {
        setUser(response.data);
        navigate("/");
      }
    } catch (err) {
      if (err.response.data) {
        setError("Invalid Creditals");
      }
      console.error(err);
    }
  };

  const disableButton = (e) => {
    e.preventDefault();
    setDisabled(true);
    handleSubmit();
    setTimeout(() => {
      setDisabled(false);
    }, 5000);
  };

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src={infiniteai}
            className="mx-auto h-10 w-auto"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={disableButton} className="space-y-6">
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
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
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
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={handleChange}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
              </div>
              <div className="text-red-600 mt-1">{error && error}</div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isDisabled}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm ${
                  isDisabled
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signin;
