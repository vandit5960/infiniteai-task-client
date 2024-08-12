import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signin from "./auth/signin";
import Signup from "./auth/signup";
import Homepage from "./components/homepage";
import { SearchProvider } from "./components/stateProvider";
import Navbar from "./components/navbar";
import UserProduct from "./product/userProduct";
import User from "./user/user";
import UsersProduct from "./userProduct/usersProduct";
import Protected from "./components/protected";

function App() {
  return (
    <SearchProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <Protected>
                <Homepage />
              </Protected>
            }
          />
          <Route
            path="/user"
            element={
              <Protected>
                <User />
              </Protected>
            }
          />
          <Route
            path="/product"
            element={
              <Protected>
                <UserProduct />
              </Protected>
            }
          />
          <Route
            path="/user-product"
            element={
              <Protected>
                <UsersProduct />
              </Protected>
            }
          />
        </Routes>
      </Router>
    </SearchProvider>
  );
}

export default App;
