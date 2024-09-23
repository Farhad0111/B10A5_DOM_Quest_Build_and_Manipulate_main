// Initial balance
let balance = 1000;

// Toggle between donation and history sections
document.querySelector('.history-btn').addEventListener('click', () => {
  document.querySelector('.donation-cards').style.display = 'none';
  document.querySelector('.history-section').style.display = 'block';
  toggleActive('history');
});

document.querySelector('.donation-btn').addEventListener('click', () => {
  document.querySelector('.donation-cards').style.display = 'flex';
  document.querySelector('.history-section').style.display = 'none';
  toggleActive('donation');
});

function toggleActive(active) {
  document.querySelector('.donation-btn').classList.remove('active');
  document.querySelector('.history-btn').classList.remove('active');
  
  if (active === 'donation') {
    document.querySelector('.donation-btn').classList.add('active');
  } else {
    document.querySelector('.history-btn').classList.add('active');
  }
}

// Donation functionality
document.querySelectorAll('.donate-btn').forEach((button, index) => {
  button.addEventListener('click', () => {
    let donationInput = document.querySelectorAll('.donation-input')[index];
    let donationAmount = parseFloat(donationInput.value);
    
    if (isNaN(donationAmount) || donationAmount <= 0) {
      alert('Invalid amount');
      return;
    }
    
    if (donationAmount > balance) {
      alert('Insufficient balance');
      return;
    }

    balance -= donationAmount;
    document.querySelector('.balance').innerText = `Balance: ${balance}`;
    
    let currentDonation = document.querySelectorAll('.donation-amount')[index];
    currentDonation.innerText = parseFloat(currentDonation.innerText) + donationAmount;

    // Add to history
    addToHistory(`Donated $${donationAmount} to ${document.querySelectorAll('.donation-card h3')[index].innerText}`);
    showSuccessModal();
  });
});

// Add to history
function addToHistory(message) {
  let historySection = document.querySelector('.history-section');
  let date = new Date().toLocaleString();
  historySection.innerHTML += `<p>${date} - ${message}</p>`;
}

// Modal functionality
document.getElementById('closeModal').addEventListener('click', () => {
  document.getElementById('successModal').style.display = 'none';
});

function showSuccessModal() {
  document.getElementById('successModal').style.display = 'block';
}
