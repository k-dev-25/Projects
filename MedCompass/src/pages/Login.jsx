import AuthCard from "../components/auth/AuthCard.jsx";
import { auth } from "../services/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuthErrorMessage } from "../utils/getAuthErrorMessage.js";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    if (!formData.email || !formData.password) {
      return { error: "Email and password are required." };
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate("/dashboard");
      return { success: true };
    } catch (error) {
      return { error: getAuthErrorMessage(error) };
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <AuthCard title="Login" onSubmit={handleLogin}></AuthCard>
    </div>
  );
}

export default Login;
