import { useSelector } from 'react-redux';

export const useCurrency = () => {
    const { selectedCurrency, exchangeRate, symbol } = useSelector((state) => state.currency);

    const formatPrice = (priceInUSD) => {
        const val = Number(priceInUSD) || 0;
        const converted = selectedCurrency === 'LKR' ? val * exchangeRate : val;
        return `${symbol} ${converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    };

    const getPrice = (priceInUSD) => {
        const val = Number(priceInUSD) || 0;
        return selectedCurrency === 'LKR' ? val * exchangeRate : val;
    };

    return { selectedCurrency, exchangeRate, symbol, formatPrice, getPrice };
};
