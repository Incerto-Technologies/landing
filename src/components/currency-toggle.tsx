import { useState } from 'react';

type Currency = 'USD' | 'EUR' | 'INR';

interface CurrencyToggleProps {
  onCurrencyChange: (currency: Currency) => void;
}

const currencySymbols = {
  USD: '$',
  EUR: '€',
  INR: '₹'
};

const exchangeRates = {
  USD: 1,
  EUR: 0.92, // Example rate
  INR: 83.16 // Example rate
};

export function CurrencyToggle({ onCurrencyChange }: CurrencyToggleProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<Currency>('USD');

  const handleCurrencyChange = (currency: Currency) => {
    setSelectedCurrency(currency);
    onCurrencyChange(currency);
  };

  return (
    <div className="flex items-center justify-center gap-2 mb-12">
      {(Object.keys(currencySymbols) as Currency[]).map((currency) => (
        <button
          key={currency}
          onClick={() => handleCurrencyChange(currency)}
          className={`px-4 py-2 rounded-full md:cursor-pointer text-sm font-medium transition-all ${
            selectedCurrency === currency
              ? 'bg-primary text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {currency}
        </button>
      ))}
    </div>
  );
}

export { type Currency, currencySymbols, exchangeRates }; 