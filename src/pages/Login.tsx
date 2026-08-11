import { useNavigate } from "react-router-dom";
import AuthPage from "../sections/Auth";

export default function Login() {
    const navigate = useNavigate();
    return <AuthPage onAuthSuccess={() => navigate("/dashboard")} />;
}