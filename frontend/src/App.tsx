import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Error404 from "./pages/404/Error404"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import SignUp from "./pages/signUp/SignUp"

const App = () => {
    return (
        <Router
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}>
            <Routes>
                <Route path="/dashboard" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signUp" element={<SignUp />} />
                <Route path="*" element={<Error404 />} />
            </Routes>
        </Router>
    )
}

export default App
