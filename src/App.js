/** @format */

import "./App.css";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./Authentication/ProtectedRoute";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import Home from "./Pages/Home/Home";
function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/register' exact element={<Register />} />
        <Route path='/login' exact element={<Login />} />

        <Route
          path='/'
          exact
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
