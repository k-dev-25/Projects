import { useState } from "react";
import { useNavigate } from "react-router";

function AuthCard({ title, onSubmit }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!onSubmit) {
      return;
    }

    setLoading(true);

    const payload = {
      email: formData.email.trim(),
      password: formData.password,
    };

    try {
      const result = await onSubmit(payload);

      if (result?.error) {
        setError(result.error);
        return;
      }

      if (result?.success) {
        setFormData({ email: "", password: "" });
      }
    } catch (submitError) {
      setError(
        submitError?.message || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleNav = () => {
    const destination = title === "Login" ? "/register" : "/login";
    navigate(destination, { replace: true });
  };

  return (
    <div className="p-6 w-full max-w-lg bg-white border border-slate-200 rounded-2xl shadow-xl sm:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
          {title}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {title === "Login"
            ? "Sign in to continue to your MedCompass dashboard."
            : "Create your account to start managing your health journey."}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid items-center gap-3 grid-cols-[100px_1fr]">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Email:
          </label>
          <input
            className="px-4 py-2 w-full text-slate-800 placeholder:text-slate-400 border border-slate-300 rounded-lg transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/40"
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grid items-center gap-3 grid-cols-[100px_1fr]">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-700"
          >
            Password:
          </label>
          <input
            className="px-4 py-2 w-full text-slate-800 placeholder:text-slate-400 border border-slate-300 rounded-lg transition-all focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/40"
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-sm text-slate-600">
            <input
              type="checkbox"
              className="h-4 w-4 text-blue-600 border border-slate-300 rounded focus:ring-blue-500"
            />
            Remember me
          </label>
          <button
            type="button"
            className="text-sm font-medium text-blue-700 hover:text-blue-800"
          >
            Forgot password?
          </button>
        </div>
        {error && <p className="mt-2 text-sm text-rose-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="py-2.5 w-full font-semibold text-white bg-blue-600 rounded-lg transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading ? "Please wait..." : title === "Login" ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="mt-5 text-center text-sm text-slate-600">
        {title === "Login"
          ? "New to MedCompass? "
          : "Already have an account? "}
        <button
          type="button"
          className="text-sm font-semibold text-blue-700 hover:text-blue-800"
          onClick={handleNav}
        >
          {title === "Login" ? "Create an account" : "Sign in"}
        </button>
      </p>
    </div>
  );
}

export default AuthCard;
