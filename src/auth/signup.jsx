import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import infiniteai from "../assets/infiniteai.jpeg";
import SearchComponent from "../components/searchComponent";
import countriesData from "../data/country.json";
import stateData from "../data/state.json";
import citiesData from "../data/cities.json";
import axios from "axios";

const Signup = () => {
  const [selectedOption, setSelectedOption] = useState("");
  const [data, setData] = useState({});
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [selectCountry, setSelectCountry] = useState("");
  const [city, setCity] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const [error, setError] = useState({});
  const [isChecked, setIsChecked] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [data, isChecked]);

  const disableButton = async (e) => {
    e.preventDefault();
    if (isChecked) {
      const updatedData = {
        ...data,
        state: state,
        country: country,
        city: city,
      };
  
      setData(updatedData); 
  
      setDisabled(true);
      await handleSubmit(updatedData); 
      setTimeout(() => {
        setDisabled(false);
      }, 5000);
    } else {
      setError({ tc: "Please accept t&c" });
    }
  };
  
  const handleSubmit = async (dataToSubmit) => {

    try {
      const response = await axios.post(
        "http://localhost:4000/auth/signup",
        dataToSubmit
      );
  
      if (response.data) {
        navigate("/signin");
      }
    } catch (err) {
      if (err.response.data) {
        setError(err.response.data);
      }
      console.error(err.response.data);
    }
  };

  useEffect(() => {
    if (selectedOption === "Indian") {
      setCountry("India");
      setSelectCountry("India");
    } else {
      setCountry("");
      setSelectCountry("");
    }
  }, [selectedOption]);

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
            Sign up to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
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
                  onChange={handleChange}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 disabled pl-2"
                />
              </div>

              <div className="text-red-600 mt-1">{error && error?.email}</div>
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
                  required
                  onChange={handleChange}
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-2"
                />
              </div>
              <div className="text-red-600 mt-1">
                {error && error?.password}
              </div>
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
                  onChange={handleChange}
                  required
                  autoComplete="dob"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="text-red-600 mt-1">{error && error?.dob}</div>
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
                  inputMode="numeric"
                  onChange={handleChange}
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
              <div className="text-red-600 mt-1">{error && error?.mobileNumber}</div>
            </div>

            <div>
              <fieldset className="space-y-4">
                <legend className="text-lg font-medium text-gray-900">
                  Select Your Status
                </legend>
                <div className="flex flex-row space-x-4">
                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="indian"
                      name="status"
                      value="Indian"
                      checked={selectedOption === "Indian"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="indian"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      Indian
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="radio"
                      id="nri"
                      name="status"
                      value="NRI"
                      checked={selectedOption === "NRI"}
                      onChange={(e) => setSelectedOption(e.target.value)}
                      className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="nri"
                      className="ml-3 block text-sm font-medium text-gray-700"
                    >
                      NRI
                    </label>
                  </div>
                </div>
              </fieldset>
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
                disable={false}
                onSelect={(item) => {
                  setCountry(item.name);
                }}
                onSelected={selectCountry}
              />
               <div className="text-red-600 mt-1">{error && error?.country}</div>
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
              />
               <div className="text-red-600 mt-1">{error && error?.state}</div>
            </div>

            {/* City Selection */}
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
              />
               <div className="text-red-600 mt-1">{error && error?.city}</div>
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
                value={data.role}
                onChange={handleChange}
                className="block w-full rounded-md border border-gray-300 py-2 px-3 text-gray-900 shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm mt-2"
              >
                <option value="">Select a role</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <div className="text-red-600 mt-1">{error && error?.role}</div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                checked={isChecked}
                onChange={(e) => setIsChecked(e.target.checked)}
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="ml-2 text-sm text-gray-900">
                I agree to the{" "}
                <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  Terms and Conditions
                </a>
              </label>
              <div className="text-red-600 ml-2">{error && error?.tc}</div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isDisabled}
                onClick={disableButton}
                className={`flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 shadow-sm ${
                  isDisabled
                    ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                    : "bg-indigo-600 text-white hover:bg-indigo-500"
                } focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`}
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
