import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from './api'
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/constant";

const Register = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleRegister = async () => {
        try {
            const { data } = await api.post(`${BASE_URL}/auth/register`, form);

            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            navigate("/form-fields");
        } catch (error: any) {
            toast.error(error.response?.data?.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 p-4">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-10 rounded-3xl shadow-2xl border border-white/30">

                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-800">
                        Create Account
                    </h2>
                    <p className="text-gray-500 text-sm mt-2">
                        Start managing your account today
                    </p>
                </div>

                {/* Full Name */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Full Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                name: e.target.value
                            })
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition shadow-sm"
                    />
                </div>

                {/* Email */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Email Address
                    </label>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                email: e.target.value
                            })
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition shadow-sm"
                    />
                </div>

                {/* Password */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600 mb-2">
                        Password
                    </label>
                    <input
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={form.password}
                        onChange={(e) => {
                            setForm({
                                ...form,
                                password: e.target.value
                            })
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition shadow-sm"
                    />
                </div>

                {/* Register Button */}
                <button
                    onClick={handleRegister}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition duration-200"
                >
                    Create Account
                </button>

                {/* Footer */}
                <p className="text-sm text-center mt-6 text-gray-500">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Register;