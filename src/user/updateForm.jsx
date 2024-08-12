import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchComponent from "../components/searchComponent";
import countriesData from "../data/country.json";
import stateData from "../data/state.json";
import citiesData from "../data/cities.json";
import axios from "axios";

const UpdateForm = ({ userData, onClose }) => {
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [error, setError] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    setData(userData);
    setCountry(userData?.country || "");
    setState(userData?.state || "");
    setCity(userData?.city || "");
  }, [userData]);

  useEffect(() => {
    setError("");
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      ...data,
      country: country,
      state: state,
      city: city,
    };

    try {
      const response = await axios.post(
        "http://localhost:4000/users/update",
        updatedData,
        { withCredentials: true }
      );

      if (response.data) {
        onClose();
      }
    } catch (err) {
      if (err.response.data) {
        setError(err.response.data);
      }
      console.error(err.response.data);
    }
  };

  const handleChange = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-1 py-1 lg:px-8">
        <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
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
                  value={data.email || ""}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled pl-2"
                />
              </div>
              <div className="text-red-600 mt-1">{error && error?.email}</div>
            </div>

            <div>
              <label
                htmlFor="dob"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date of Birth
              </label>
              <div className="mt-2">
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  value={
                    data.dob
                      ? new Date(data.dob).toISOString().substring(0, 10)
                      : ""
                  }
                  onChange={handleChange}
                  required
                  autoComplete="dob"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="mobileNumber"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Mobile Number
              </label>
              <div className="mt-2">
                <input
                  id="mobileNumber"
                  name="mobileNumber"
                  type="text"
                  value={data.mobileNumber || ""}
                  onChange={handleChange}
                  inputMode="numeric"
                  pattern="[0-9]*"
                  required
                  autoComplete="off"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) {
                      e.preventDefault();
                    }
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="country"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Country
              </label>
              <SearchComponent
                placeholder="Select Country"
                data={countriesData}
                filterType="country"
                onSelect={(item) => setCountry(item.name)}
                onSelected={country}
              />
            </div>

            <div>
              <label
                htmlFor="state"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                State
              </label>
              <SearchComponent
                disable={!country}
                placeholder="Select State"
                data={stateData}
                filterType="state"
                filterValue={country}
                onSelect={(item) => {
                  setState(item.name);
                  setCity(""); 
                }}
                onSelected={state}
              />
            </div>

            <div>
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                City
              </label>
              <SearchComponent
                disable={!state}
                placeholder="Select City"
                data={citiesData}
                filterType="city"
                filterValue={state}
                onSelect={(item) => setCity(item.name)}
                onSelected={city}
              />
            </div>

            <div className="relative inline-block text-left w-full mt-2">
              <label
                htmlFor="city"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Role
              </label>
              <select
                name="role"
                value={data.role || ""}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm mt-2"
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <div className="text-red-600 mt-1">{error && error?.role}</div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isDisabled}
                onClick={handleSubmit}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm ${
                  isDisabled
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateForm;
