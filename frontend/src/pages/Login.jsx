import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import loginImg from "../assets/login.webp";
import { loginUser } from "../redux/slices/authSlice";
import { mergeCart, fetchCart } from '../redux/slices/cartSlice';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId, loading } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const redirect = new URLSearchParams(location.search).get("redirect") || "/";
    const isCheckoutRedirect = redirect.includes("checkout");

    useEffect(() => {
        const userId = user?._id || user?.id;

        if (user && userId) {
            if (user.role === "admin") {
                navigate("/admin");
                return;
            }

            if (cart && cart.products && cart.products.length > 0 && guestId) {
                dispatch(mergeCart({ guestId, user }))
                    .unwrap()
                    .then(() => {
                        navigate(isCheckoutRedirect ? "/checkout" : redirect);
                    })
                    .catch((err) => {
                        console.error("Cart merge failed, navigating anyway:", err);
                        navigate(isCheckoutRedirect ? "/checkout" : redirect);
                    });
            } else {
                dispatch(fetchCart({ userId })).unwrap().then(() => {
                    navigate(isCheckoutRedirect ? "/checkout" : redirect);
                }).catch((err) => {
                    console.error("Cart fetch failed, navigating anyway:", err);
                    navigate(isCheckoutRedirect ? "/checkout" : redirect);
                });
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, redirect, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginUser({ email, password })).unwrap();

            if (result && result.token) {
                localStorage.setItem("token", result.token);
                localStorage.setItem("userToken", result.token);
            }

        } catch (error) {
            alert(error?.message || error || "Invalid Credentials! Please try again.");
        }
    };

    return (
        <div className="flex bg-white min-h-[750px]">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-8 md:p-12">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-md bg-white p-8 border border-neutral-200 rounded-none shadow-none"
                >
                    <div className="flex justify-center mb-6">
                        <h2 className="text-xl font-black uppercase tracking-widest text-black">ELIX</h2>
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-wider text-center text-black mb-3">Hey there!</h2>
                    <p className="text-xs text-neutral-500 tracking-wide font-medium text-center mb-8">
                        Enter your username and password to Login
                    </p>

                    <div className="mb-6">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-black hover:bg-neutral-800 text-white font-bold py-4 px-6 text-xs uppercase tracking-widest rounded-none transition duration-300 cursor-pointer"
                    >
                        {loading ? "Loading..." : "Sign In"}
                    </button>

                    <p className="mt-8 text-center text-xs text-neutral-500 tracking-wide">
                        Don't have an account?{" "}
                        <Link to={`/register?redirect=${encodeURIComponent(redirect)}`} className="text-black font-bold uppercase tracking-wider hover:underline ml-1">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
            <div className="hidden md:block w-1/2 bg-neutral-100 border-l border-neutral-200">
                <div className="h-full flex flex-col justify-center items-center">
                    <img
                        src={loginImg}
                        alt="Login to Account"
                        className="h-[750px] w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;