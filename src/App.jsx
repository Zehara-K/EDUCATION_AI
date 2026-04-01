import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./DashBoard";
import Chatbot from "./components/chatbot/Chat";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chatbot" element={<Chatbot />} />   {/* ✅ Correct */}
                <Route path="*" element={<div>Page Not Found</div>} />
            </Routes>
        </BrowserRouter>
    );
}
