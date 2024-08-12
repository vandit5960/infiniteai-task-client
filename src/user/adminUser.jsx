import axios from "axios";
import { useEffect, useState } from "react";
import { useSearch } from "../components/stateProvider";
import UserUpdateModal from "./userUpdateModal";
import Pagination from "../components/pagination";

const AdminUser = () => {
  const [users, setAdminUser] = useState([]);
  const [filteredUser, setFilteredUser] = useState([]);
  const [updateData, setUpdateData] = useState(null);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [itemsPerPage] = useState(10);

  const { searchTerm, user } = useSearch();

 
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

  const showEditModal = () => {
    setEditModalVisible(true);
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
    setUpdateData(null);
  };

  const getData = async () => {
    try {
      const url = `http://localhost:4000/users/admin?page=${currentPage}&limit=${itemsPerPage}`;
      const response = await axios.get(url, {
        withCredentials: true,
      });
      if (response.data) {
        const currentUserId = user.userId;
        const filteredUserList = response.data.users.filter(
          (user) => user._id !== currentUserId
        );
        setAdminUser(filteredUserList);
        setFilteredUser(filteredUserList);
        setTotalPages(response.data.totalPages);
        setTotalRecords(response.data.totalRecords - 1);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteUser = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:4000/users/delete/${id}`, {
        withCredentials: true,
      });
      await getData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateUser = (e, id) => {
    e.preventDefault();
    const userToUpdate = filteredUser.find((user) => user._id === id);
    setUpdateData(userToUpdate);
    showEditModal();
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    getData();
  }, [currentPage]);

  return (
    <>
      <UserUpdateModal
        visible={isEditModalVisible}
        onClose={handleEditCancel}
        data={updateData}
        setData={setUpdateData}
      />
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
        <div className="text-3xl font-semibold text-gray-700">
          AdminUser Details
        </div>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">Email</th>
              <th scope="col" className="px-6 py-3">DOB</th>
              <th scope="col" className="px-6 py-3">State</th>
              <th scope="col" className="px-6 py-3">Country</th>
              <th scope="col" className="px-6 py-3">City</th>
              <th scope="col" className="px-6 py-3">Role</th>
              <th scope="col" className="px-6 py-3">Update</th>
              <th scope="col" className="px-6 py-3">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredUser?.map((user) => (
              <tr
                key={user._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {user?.email}
                </th>
                <td className="px-6 py-4">
                  {new Date(user?.dob).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="px-6 py-4">{user?.state}</td>
                <td className="px-6 py-4">{user?.country}</td>
                <td className="px-6 py-4">{user?.city}</td>
                <td className="px-6 py-4">{user?.role}</td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={(e) => handleUpdateUser(e, user._id)}
                  >
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={(e) => handleDeleteUser(e, user._id)}
                  >
                    Delete
                  </button>
                </td>
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

export default AdminUser;
