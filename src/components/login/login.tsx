import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from './api'
import { toast } from "react-toastify";
import { BASE_URL } from "../../constants/constant";

const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    // if user details are set then no login again 
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            navigate("/form-fields");
        }
    }, []);

    const handleLogin = async () => {
        try {
            const { data } = await api.post(`${BASE_URL}/auth/login`, form);

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
                <div className="w-11 h-11 mx-auto mb-5 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold">D</div>
                <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
                    Welcome Back
                </h2>
                <p className="text-sm text-center text-slate-500 mb-7">Sign in to continue to your workspace</p>

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
                    className="w-full mb-4 px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) => {
                        setForm({
                            ...form,
                            password: e.target.value
                        })
                    }}
                    className="w-full mb-6 px-4 py-3 border border-slate-200 rounded-xl text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition duration-200"
                >
                    Login
                </button>

                <p className="text-sm text-center text-gray-600 mt-5">
                    Don’t have an account?
                    <Link to="/register" className="ml-1 text-green-600 font-medium hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
