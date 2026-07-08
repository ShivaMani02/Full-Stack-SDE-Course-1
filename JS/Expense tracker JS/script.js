// Select DOM elements for the expense tracker
const expenseForm = document.getElementById('expense-form');
const expenseNameInput = document.getElementById('expense-name');
const expenseAmountInput = document.getElementById('expense-amount');
const expenseCategorySelect = document.getElementById('expense-category');
const expenseTableBody = document.getElementById('expense-table-body');
const totalAmountEl = document.getElementById('total-amount');
const alertContainer = document.getElementById('alert-container');

// Array to store expense objects in memory
let expenses = [];

// Load saved expenses from localStorage when the page loads
function loadExpenses() {
  const savedExpenses = localStorage.getItem('expenses');
  if (savedExpenses) {
    expenses = JSON.parse(savedExpenses);
  }
  renderExpenses();
  updateTotal();
}

// Save the current expenses array to localStorage
function saveExpenses() {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Render the expense table rows based on the stored expenses
function renderExpenses() {
  expenseTableBody.innerHTML = '';

  if (expenses.length === 0) {
    expenseTableBody.innerHTML = `
      <tr>
        <td colspan="5" class="text-center text-muted py-4">No Expenses Added</td>
      </tr>
    `;
    return;
  }

  expenses.forEach((expense, index) => {
    expenseTableBody.innerHTML += `
      <tr>
        <th scope="row">${index + 1}</th>
        <td>${expense.name}</td>
        <td>${expense.category}</td>
        <td>$${expense.amount.toFixed(2)}</td>
        <td>
          <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${expense.id}">Delete</button>
        </td>
      </tr>
    `;
  });
}

// Update the total amount display from the expenses array
function updateTotal() {
  const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  totalAmountEl.textContent = `$${total.toFixed(2)}`;
}

// Remove an expense by its id and refresh the table and total
function deleteExpense(expenseId) {
  expenses = expenses.filter((expense) => expense.id !== expenseId);
  saveExpenses();
  renderExpenses();
  updateTotal();
  showAlert('Expense deleted successfully.', 'warning');
}

// Add a new expense to the list with validation and reset the form
function addExpense(event) {
  event.preventDefault();

  const name = expenseNameInput.value.trim();
  const amount = parseFloat(expenseAmountInput.value);
  const category = expenseCategorySelect.value;

  if (!name || !category || isNaN(amount)) {
    showAlert('Please fill in all fields.', 'danger');
    return;
  }

  if (amount <= 0) {
    showAlert('Amount must be greater than 0.', 'danger');
    return;
  }

  const newExpense = {
    id: Date.now().toString(),
    name,
    amount,
    category,
  };

  expenses.push(newExpense);
  saveExpenses();
  renderExpenses();
  updateTotal();
  expenseForm.reset();
  showAlert('Expense added successfully.', 'success');
}

// Display a Bootstrap alert message temporarily
function showAlert(message, type = 'info') {
  alertContainer.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  `;
}

// Handle delete button clicks using event delegation
expenseTableBody.addEventListener('click', (event) => {
  const deleteButton = event.target.closest('.btn-delete');
  if (!deleteButton) return;

  const expenseId = deleteButton.dataset.id;
  deleteExpense(expenseId);
});

// Attach form submit event to add a new expense
expenseForm.addEventListener('submit', addExpense);

// Initialize the tracker on page load
loadExpenses();
