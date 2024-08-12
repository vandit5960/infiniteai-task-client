import axios from "axios";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination";
import { useSearch } from "../components/stateProvider";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [filteredUsers, setFilteredUser] = useState([]);
  const [itemsPerPage] = useState(10);

  const { user, searchTerm } = useSearch();

  useEffect(() => {
    if (searchTerm.trim()) {
      const filteredUsers = users?.filter((user) => 
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUser(filteredUsers);
    } else {
      setFilteredUser(users);
    }
  }, [searchTerm, users]);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/users/user?page=${currentPage}&limit=${itemsPerPage}`,
        { withCredentials: true }
      );

      if (response.data) {
        const currentUserId = user.userId;
        const filteredUser = response.data.users.filter(
          (user) => user._id !== currentUserId
        );
        setUsers(filteredUser);
        setTotalRecords(response.data.totalRecords-1);
        setTotalPages(response.data.totalPages);
      }
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]);


  return (
    <>
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
        <div className="text-3xl font-semibold text-gray-700">
          Users Details
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                DOB
              </th>
              <th scope="col" className="px-6 py-3">
                State
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                City
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user.email}
                </th>
                <td className="px-6 py-4">
                  {new Date(user.dob).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">{user.state}</td>
                <td className="px-6 py-4">{user.country}</td>
                <td className="px-6 py-4">{user.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        totalRecords={totalRecords}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalPages={totalPages}
      />
    </>
  );
};

export default Users;
