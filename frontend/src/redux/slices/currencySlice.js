import { createSlice } from "@reduxjs/toolkit";

const getInitialCurrency = () => {
    const stored = localStorage.getItem("selectedCurrency");
    return stored || "USD";
};

const getInitialSymbol = (currency) => {
    return currency === "LKR" ? "Rs." : "$";
};

const initialState = {
    selectedCurrency: getInitialCurrency(),
    exchangeRate: 300,
    symbol: getInitialSymbol(getInitialCurrency())
};

const currencySlice = createSlice({
    name: "currency",
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            const currency = action.payload;
            state.selectedCurrency = currency;
            state.symbol = currency === "LKR" ? "Rs." : "$";
            localStorage.setItem("selectedCurrency", currency);
        }
    }
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
