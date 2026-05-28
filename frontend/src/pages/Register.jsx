import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from "react-router-dom";
import registerImg from "../assets/register.webp";
import { registerUser } from "../redux/slices/authSlice";
import { useSelector, useDispatch } from 'react-redux';
import { mergeCart } from '../redux/slices/cartSlice';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user, guestId, loading } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

    // Get redirect parameter and check if it's checkout or something
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
                        navigate(isCheckoutRedirect ? "/checkout" : "/");
                    })
                    .catch((err) => {
                        console.error("Cart merge failed, navigating anyway:", err);
                        navigate(isCheckoutRedirect ? "/checkout" : "/");
                    });
            } else {
                navigate(isCheckoutRedirect ? "/checkout" : "/");
            }
        }
    }, [user, guestId, cart, navigate, isCheckoutRedirect, dispatch]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(registerUser({ name, email, password })).unwrap();
            alert("Registration Successful! Please login.");
            navigate("/login");
        } catch (error) {
            alert(error || "Registration failed. Try again!");
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
                        Enter your details to create an account
                    </p>

                    <div className="mb-6">
                        <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 mb-2">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 text-sm border border-neutral-300 rounded-none focus:outline-none focus:border-black focus:ring-0 bg-white transition-all"
                            placeholder="Enter your Name"
                            required
                        />
                    </div>

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
                        {loading ? "Loading..." : "Sign Up"}
                    </button>

                    <p className="mt-8 text-center text-xs text-neutral-500 tracking-wide">
                        Already have an account?{" "}
                        <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-black font-bold uppercase tracking-wider hover:underline ml-1">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
            <div className="hidden md:block w-1/2 bg-neutral-100 border-l border-neutral-200">
                <div className="h-full flex flex-col justify-center items-center">
                    <img
                        src={registerImg}
                        alt="Register Account"
                        className="h-[750px] w-full object-cover"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;