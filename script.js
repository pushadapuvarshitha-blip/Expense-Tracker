let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function saveData() {
    localStorage.setItem("transactions", JSON.stringify(transactions));
}

function updateSummary() {
    let income = 0;
    let expense = 0;

    transactions.forEach(item => {
        if (item.type === "Income") {
            income += item.amount;
        } else {
            expense += item.amount;
        }
    });

    document.getElementById("income").innerText = "₹" + income;
    document.getElementById("expense").innerText = "₹" + expense;
    document.getElementById("balance").innerText = "₹" + (income - expense);
}

function displayData(data = transactions) {

    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach((item, index) => {

        list.innerHTML += `

        <tr>

        <td>${item.title}</td>

        <td>₹${item.amount}</td>

        <td>${item.type}</td>

        <td>

        <button class="delete"
        onclick="deleteTransaction(${index})">

        Delete

        </button>

        </td>

        </tr>

        `;

    });

    updateSummary();
}

function addTransaction() {

    const title = document.getElementById("title").value.trim();

    const amount = Number(document.getElementById("amount").value);

    const type = document.getElementById("type").value;

    if (title === "" || amount <= 0) {

        alert("Please enter valid details.");

        return;

    }

    transactions.push({

        title,
        amount,
        type

    });

    saveData();

    displayData();

    document.getElementById("title").value = "";
    document.getElementById("amount").value = "";

}

function deleteTransaction(index) {

    transactions.splice(index, 1);

    saveData();

    displayData();

}

function searchTransaction() {

    const value = document
        .getElementById("search")
        .value
        .toLowerCase();

    const result = transactions.filter(item =>
        item.title.toLowerCase().includes(value)
    );

    displayData(result);

}

function filterTransaction() {

    const value = document.getElementById("filter").value;

    if (value === "All") {

        displayData();

        return;

    }

    const result = transactions.filter(item =>
        item.type === value
    );

    displayData(result);

}

displayData();