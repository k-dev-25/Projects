import AuthCard from "../components/auth/AuthCard.jsx";
import { auth } from "../services/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuthErrorMessage } from "../utils/getAuthErrorMessage.js";
import { useNavigate } from "react-router";

function Register() {
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    if (!formData.email || !formData.password) {
      return { error: "Email and password are required." };
    }

    try {
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password,
      );
      navigate("/dashboard");
      return { success: true };
    } catch (error) {
      return { error: getAuthErrorMessage(error) };
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <AuthCard title="Register" onSubmit={handleRegister}></AuthCard>
    </div>
  );
}

export default Register;
