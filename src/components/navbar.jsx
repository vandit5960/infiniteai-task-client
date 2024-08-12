import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import infiniteai from "../assets/infiniteai.jpeg";
import { useSearch } from "./stateProvider";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";

const navigation = [
  { name: "Home", href: "/" },
  { name: "User", href: "/user" },
  { name: "Product", href: "/product" },
  { name: "User-Product", href: "/user-product" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navbar() {
  const { searchTerm, setSearchTerm } = useSearch();
  const { user, setUser } = useSearch();

  const location = useLocation();

  const handleSearchChange = (e) => {
    
    setSearchTerm(e.target.value);
  };

  const navigate = useNavigate();


  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get("http://localhost:4000/auth/logout");
      if (response.data) {
        navigate("/signin");
        setUser("");
      }
    } catch (err) {
    }
  };

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon
                aria-hidden="true"
                className="block h-6 w-6 group-data-[open]:hidden"
              />
              <XMarkIcon
                aria-hidden="true"
                className="hidden h-6 w-6 group-data-[open]:block"
              />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img alt="Your Company" src={infiniteai} className="h-8 w-auto" />
            </div>

            <div className="text-3xl  text-white tracking-wide mr-5 ml-5">
              InfiniteAi
            </div>
            {user && (
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      aria-current={
                        location.pathname === item.href ? "page" : undefined
                      }
                      className={classNames(
                        location.pathname === item.href
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {user && (
            <>
              {location.pathname !=="/"&&<div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search..."
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-white-200 pl-2"
                />
              </div>}
              <button
                onClick={handleLogout}
                className="ml-4 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            </>
          )}
          {!user && (
            <div>
              <button
                onClick={() => navigate("/signin")}
                className="ml-4 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Signin
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="ml-4 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Signup
              </button>
            </div>
          )}
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as={Link}
              to={item.href}
              aria-current={
                location.pathname === item.href ? "page" : undefined
              }
              className={classNames(
                location.pathname === item.href
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white",
                "block rounded-md px-3 py-2 text-base font-medium"
              )}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
