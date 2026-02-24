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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-600 via-blue-500 to-cyan-400 p-4">
            <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                    Welcome Back
                </h2>

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
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
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
                    className="w-full mb-6 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200"
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