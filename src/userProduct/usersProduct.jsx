import { useEffect, useState } from "react";
import axios from "axios";
import ProductModal from "../product/productModal";
import ProductUpdateModal from "../product/productUpdateModal";
import { useSearch } from "../components/stateProvider";
import Pagination from "../components/pagination";

const UsersProduct = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [updateData, setUpdateData] = useState();
  const [groupedProducts, setGroupedProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState();
  const { user } = useSearch();




  const getGroupedProducts = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/product/grouped?page=${currentPage}&limit=2`,
        { withCredentials: true }
      );
      setTotalRecords(response.data.totalRecords);
      setGroupedProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      console.error("Error fetching grouped products:", err);
    }
  };

  useEffect(() => {
    getGroupedProducts();
  }, [
    currentPage,
    user.role,
    user.id,
    updateData,
    isModalVisible,
    isEditModalVisible,
  ]);

  const showModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);
  const showEditModal = () => setEditModalVisible(true);
  const handleEditCancel = () => setEditModalVisible(false);

  const handleUpdateProduct = async (e, id) => {
    e.preventDefault();
    let foundProduct = null;
    for (const [email, products] of Object.entries(groupedProducts)) {
      const product = products.find((p) => p._id === id);
      if (product) {
        foundProduct = product;
        break;
      }
    }

    if (foundProduct) {
      setUpdateData(foundProduct);
      showEditModal();
    } else {
      console.error("Product not found");
    }
  };

  const handleDeleteProduct = async (e, id) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:4000/product/delete/${id}`, {
        withCredentials: true,
      });
      getGroupedProducts(); 
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
          User Product Management
        </div>

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
          onClick={showModal}
        >
          Add Product
        </button>
      </div>
      <div>
        {groupedProducts.map(([email, products]) => (
          <div key={email} className="mb-8">
            <h3 className="text-xl font-semibold ml-2">User Email: {email}</h3>
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th className="px-6 py-3">Product Name</th>
                  <th className="px-6 py-3">Color</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Update</th>
                  <th className="px-6 py-3">Delete</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td className="px-6 py-4">{product.name}</td>
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
        ))}
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

export default UsersProduct;
