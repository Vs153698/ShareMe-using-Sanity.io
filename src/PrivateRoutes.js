import { Navigate } from "react-router-dom"

const PrivateRoute = ({children}) => {
    const currentuser = localStorage.getItem('user')
    return currentuser ? children : <Navigate to='/login'/>
}

export default PrivateRoute