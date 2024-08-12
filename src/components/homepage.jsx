
import { Link } from 'react-router-dom';


const Homepage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8">
          <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-8">User Product Management System</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 opacity-20 bg-[url('/path/to/image.jpg')] bg-cover bg-center rounded-lg"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold mb-4">User Management</h2>
                <p className="mb-6">Efficiently manage user accounts, including add, edit, view, and delete functionalities.</p>
                <Link to="/user">
                  <button className="bg-white text-indigo-700 py-2 px-4 rounded-md font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500">
                    Manage Users
                  </button>
                </Link>
              </div>
            </div>

            <div className="relative bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 opacity-20 bg-[url('/path/to/image2.jpg')] bg-cover bg-center rounded-lg"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold mb-4">Product Management</h2>
                <p className="mb-6">Manage your product listings effortlessly, including adding, updating, and deleting products.</p>
                <Link to="/product">
                  <button className="bg-white text-green-900 py-2 px-4 rounded-md font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-green-500">
                    Manage Products
                  </button>
                </Link>
              </div>
            </div>

         
            <div className="relative bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="absolute inset-0 opacity-20 bg-[url('/path/to/image3.jpg')] bg-cover bg-center rounded-lg"></div>
              <div className="relative z-10">
                <h2 className="text-2xl font-semibold mb-4">User-Product Management</h2>
                <p className="mb-6">Relation of users and products, view ,delete and update the product</p>
                <Link to="/user-product">
                  <button className="bg-white text-blue-800 py-2 px-4 rounded-md font-semibold hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    Manage User-Poduct
                  </button>
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;



