import { createSlice } from "@reduxjs/toolkit";

const getInitialUserId = () => {
    try {
        const storedUser = localStorage.getItem("userInfo");
        if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
            const parsed = JSON.parse(storedUser);
            return parsed?._id || null;
        }
    } catch (e) {
        console.error(e);
    }
    return null;
};

const loadWishlistFromStorage = (userId) => {
    try {
        const key = userId ? `wishlist_${userId}` : "wishlist_guest";
        const storedWishlist = localStorage.getItem(key);
        return storedWishlist ? JSON.parse(storedWishlist) : [];
    } catch (error) {
        console.error("Failed to load wishlist from localStorage", error);
        return [];
    }
};

const saveWishlistToStorage = (wishlist, userId) => {
    try {
        const key = userId ? `wishlist_${userId}` : "wishlist_guest";
        localStorage.setItem(key, JSON.stringify(wishlist));
    } catch (error) {
        console.error("Failed to save wishlist to localStorage", error);
    }
};

const wishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        wishlist: loadWishlistFromStorage(getInitialUserId()),
    },
    reducers: {
        toggleWishlist: (state, action) => {
            const { product, userId } = action.payload;
            const exists = state.wishlist.some(item => item._id === product._id);
            if (exists) {
                state.wishlist = state.wishlist.filter(item => item._id !== product._id);
            } else {
                state.wishlist.push(product);
            }
            saveWishlistToStorage(state.wishlist, userId);
        },
        clearWishlist: (state) => {
            state.wishlist = [];
        }
    },
    extraReducers: (builder) => {
        builder
            // When user logs in
            .addCase("auth/loginUser/fulfilled", (state, action) => {
                const userId = action.payload?._id;
                state.wishlist = loadWishlistFromStorage(userId);
            })
            // When user registers
            .addCase("auth/registerUser/fulfilled", (state, action) => {
                const userId = action.payload?._id;
                state.wishlist = loadWishlistFromStorage(userId);
            })
            // When user logs out
            .addCase("auth/logout", (state) => {
                state.wishlist = loadWishlistFromStorage(null);
            });
    }
});

export const { toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
