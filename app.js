const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('from');
const toCurrency = document.getElementById('to');
const convertBtn = document.getElementById('convert-btn');
const resultText = document.getElementById('result-text');

const API_URL = 'https://api.frankfurter.app/currencies';

let currencies = {};

// Fetch all available currencies
async function fetchCurrencies() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    currencies = data;
    populateDropdowns();
  } catch (error) {
    console.error('Error fetching currencies:', error);
  }
}

// Populate dropdowns with currencies
function populateDropdowns() {
  for (const currency in currencies) {
    const option1 = document.createElement('option');
    option1.value = currency;
    option1.textContent = `${currency} - ${currencies[currency]}`;
    fromCurrency.appendChild(option1);

    const option2 = document.createElement('option');
    option2.value = currency;
    option2.textContent = `${currency} - ${currencies[currency]}`;
    toCurrency.appendChild(option2);
  }
}

// Convert currency
async function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = parseFloat(amount.value);

  if (isNaN(amountValue)) {
    alert('Please enter a valid amount');
    return;
  }

  if (from === to) {
    resultText.textContent = `Result: ${amountValue.toFixed(2)} ${to}`;
    return;
  }

  try {
    const response = await fetch(`https://api.frankfurter.app/latest?amount=${amountValue}&from=${from}&to=${to}`);
    const data = await response.json();
    const convertedAmount = data.rates[to];
    resultText.textContent = `Result: ${convertedAmount.toFixed(2)} ${to}`;
  } catch (error) {
    console.error('Error converting currency:', error);
  }
}

// Event listener for the convert button
convertBtn.addEventListener('click', convertCurrency);

// Fetch currencies when the page loads
fetchCurrencies();