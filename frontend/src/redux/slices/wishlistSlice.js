import { createSlice } from "@reduxjs/toolkit";

const loadWishlistFromStorage = () => {
    try {
        const storedWishlist = localStorage.getItem("wishlist");
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
        console.error("Failed to load wishlist from localStorage", error);
        return [];
    }
};

const saveWishlistToStorage = (wishlist) => {
    try {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
        console.error("Failed to save wishlist to localStorage", error);
    }
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist: loadWishlistFromStorage(),
    },
    reducers: {
        toggleWishlist: (state, action) => {
            const product = action.payload;
            const exists = state.wishlist.some(item => item._id === product._id);
            if (exists) {
                state.wishlist = state.wishlist.filter(item => item._id !== product._id);
            } else {
                state.wishlist.push(product);
            }
            saveWishlistToStorage(state.wishlist);
        },
        addToWishlist: (state, action) => {
            const product = action.payload;
            const exists = state.wishlist.some(item => item._id === product._id);
            if (!exists) {
                state.wishlist.push(product);
                saveWishlistToStorage(state.wishlist);
            }
        },
        removeFromWishlist: (state, action) => {
            const productId = action.payload;
            state.wishlist = state.wishlist.filter(item => item._id !== productId);
            saveWishlistToStorage(state.wishlist);
        },
        clearWishlist: (state) => {
            state.wishlist = [];
            localStorage.removeItem("wishlist");
        }
    }
});

export const { toggleWishlist, addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
