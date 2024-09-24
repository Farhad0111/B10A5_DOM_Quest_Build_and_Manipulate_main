// DOM Elements
const donationSection = document.querySelector('.flex.flex-col.space-y-6');
const historySection = document.querySelector('.history-section');
const donationButtons = document.querySelectorAll('.donate-btn');
const balanceDisplay = document.querySelector('.balance');
const historyButton = document.querySelector('.history-btn');
const donationButton = document.querySelector('.donation-btn');
const successModal = document.getElementById('successModal');
const closeModalButton = document.getElementById('closeModal');

let accountBalance = 5500; // Initial account balance
let transactionHistory = [];

// Function to update balance display
function updateBalanceDisplay() {
    balanceDisplay.textContent = `${accountBalance} BDT`;
}

// Function to toggle between donation and history sections
donationButton.addEventListener('click', () => {
    donationSection.classList.remove('hidden');
    historySection.classList.add('hidden');
    setActiveButton(donationButton, historyButton);
});

historyButton.addEventListener('click', () => {
    donationSection.classList.add('hidden');
    historySection.classList.remove('hidden');
    renderHistory();
    setActiveButton(historyButton, donationButton);
});

// Function to set active button styles
function setActiveButton(activeButton, inactiveButton) {
    activeButton.classList.remove('bg-gray-200', 'text-black');
    activeButton.classList.add('bg-green-500', 'text-white');
    inactiveButton.classList.remove('bg-green-500', 'text-white');
    inactiveButton.classList.add('bg-gray-200', 'text-black');
}

// Function to handle donation
donationButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const donationInput = button.previousElementSibling; // Get the input field
        const donationAmount = parseFloat(donationInput.value);

        // Validate the input
        if (isNaN(donationAmount) || donationAmount <= 0) {
            alert('Please enter a valid donation amount.');
            return;
        }

        if (donationAmount > accountBalance) {
            alert('Insufficient balance for this donation.');
            return;
        }

        // Process donation
        accountBalance -= donationAmount;
        const currentDonation = button.previousElementSibling.previousElementSibling.querySelector('.donation-amount');
        currentDonation.textContent = `${parseFloat(currentDonation.textContent) + donationAmount} BDT`;
        donationInput.value = ''; // Clear input

        // Record transaction
        recordTransaction(donationAmount, `Donation for ${button.closest('.flex').querySelector('h3').textContent}`);
        updateBalanceDisplay();
        showSuccessModal(); // Show the success modal

        // Automatically close modal after 3 seconds (optional)
        setTimeout(() => {
            successModal.classList.add('hidden');
        }, 3000);
    });
});

// Function to record transaction history
function recordTransaction(amount, name) {
    const now = new Date();
    transactionHistory.push({
        date: now.toLocaleString(),
        amount: amount,
        name: name
    });
}

// Function to render transaction history
function renderHistory() {
    historySection.innerHTML = ''; // Clear previous history
    transactionHistory.forEach(transaction => {
        const transactionItem = document.createElement('div');
        transactionItem.textContent = `${transaction.date}: Donated ${transaction.amount} BDT to ${transaction.name}`;
        historySection.appendChild(transactionItem);
    });
}

// Function to show success modal
function showSuccessModal() {
    successModal.classList.remove('hidden');
}

// Event listener for closing the modal
closeModalButton.addEventListener('click', () => {
    successModal.classList.add('hidden'); // Only hide modal without affecting the balance
});

// Event listeners for hover effects
donationButton.addEventListener('mouseover', () => setActiveButton(donationButton, historyButton));
historyButton.addEventListener('mouseover', () => setActiveButton(historyButton, donationButton));

// Event listeners for mouse out effects
donationButton.addEventListener('mouseout', () => resetButtonStyles());
historyButton.addEventListener('mouseout', () => resetButtonStyles());

// Function to reset button styles based on the active section
function resetButtonStyles() {
    if (!donationSection.classList.contains('hidden')) {
        setActiveButton(donationButton, historyButton);
    } else {
        setActiveButton(historyButton, donationButton);
    }
}

// Initial display update and set default active button
updateBalanceDisplay();
setActiveButton(donationButton, historyButton); // Default active button set to Donation





