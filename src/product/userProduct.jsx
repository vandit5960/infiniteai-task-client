import axios from "axios";
import { useEffect, useState } from "react";
import { useSearch } from "../components/stateProvider";
import ProductModal from "./productModal";
import ProductUpdateModal from "./productUpdateModal";
import Pagination from "../components/pagination";

const UserProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10);
  const [totalRecords, setTotalRecords] = useState();
  const { user, searchTerm } = useSearch();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/product/admin/gets?page=${currentPage}&limit=${pageSize}`,
          { withCredentials: true }
        );
        setProducts(response.data.products);
        setTotalPages(response.data.totalPages);
        setTotalRecords(response.data.totalRecords);
      } catch (err) {
        if (err.response) {
          const status = err.response.status;
          if (status === 405) {
            alert("You are not authorized for this permission");
          }
        }
        console.error(err);
      }
    };
    getData();
  }, [
    user.role,
    user.id,
    updateData,
    isModalVisible,
    isEditModalVisible,
    currentPage,
  ]);

  useEffect(() => {
    if (searchTerm.trim()) {
      const filtered = products.filter((product) =>
        Object.values(product).some((value) =>
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchTerm, products]);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const showEditModal = () => setEditModalVisible(true);
  const handleEditCancel = () => setEditModalVisible(false);

  const handleUpdateProduct = async (e, id) => {
    e.preventDefault();
    const updatedProduct = products.find((product) => product._id === id);
    setUpdateData(updatedProduct);
    showEditModal();
  };

  const handleDeleteProduct = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:4000/product/delete/${id}`, {
        withCredentials: true,
      });
      setProducts(products.filter((product) => product._id !== id));
    } catch (err) {
      if (err.response) {
        const status = err.response.status;
        if (status === 405) {
          alert("You are not authorized for this permission");
        }
      }
      console.error(err);
    }
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      <ProductModal visible={isModalVisible} onClose={handleCancel} />
      <ProductUpdateModal
        visible={isEditModalVisible}
        onClose={handleEditCancel}
        data={updateData}
      />
      <div className="flex justify-between items-center bg-gray-100 p-4 rounded-md shadow-sm">
        <div className="text-3xl font-semibold text-gray-700">
          Product Management
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={showModal}
        >
          Add Product
        </button>
      </div>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Update
              </th>
              <th scope="col" className="px-6 py-3">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr
                key={product._id}
                className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {product.name}
                </th>
                <td className="px-6 py-4">{product.color}</td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">₹{product.price}</td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={(e) => handleUpdateProduct(e, product._id)}
                  >
                    Edit
                  </button>
                </td>
                <td className="px-6 py-4">
                  <button
                    className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    onClick={(e) => handleDeleteProduct(e, product._id)}
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

export default UserProduct;
