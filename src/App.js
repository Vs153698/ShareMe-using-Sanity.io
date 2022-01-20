import { Route, Routes, useNavigate } from "react-router-dom";
import Login from './components/Login'
import Home from './container/Home'
import PrivateRoute from "./PrivateRoutes";
function App() {
  return (
    <Routes>
      <Route path = "/login" element={<Login/>}/>
      <Route path = "/*" element={<PrivateRoute><Home/></PrivateRoute>}/>
    </Routes>
  );
}

export default App;
