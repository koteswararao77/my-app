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
        <div className="skeuo-auth min-h-screen flex items-center justify-center bg-slate-50 p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(129,140,248,.18),transparent_30%),radial-gradient(circle_at_85%_80%,rgba(96,165,250,.15),transparent_32%)]" />
            <div className="skeuo-auth-card w-full max-w-md bg-white p-8 sm:p-10 rounded-2xl shadow-[0_20px_60px_rgba(30,41,59,.10)] border border-slate-100 relative">

                {/* Logo / Header */}
                <div className="text-center mb-8">
                    <div className="w-11 h-11 mx-auto mb-5 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">D</div>
                    <h2 className="text-2xl font-bold text-slate-900">
                        Create Account
                    </h2>
                    <p className="text-slate-500 text-sm mt-2">
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
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
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                    />
                </div>

                {/* Register Button */}
                <button
                    onClick={handleRegister}
                    className="w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold shadow-lg shadow-indigo-200 hover:bg-indigo-700 active:scale-[0.99] transition duration-200"
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
