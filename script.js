const form = document.getElementById("registrationForm");
const tableBody = document.getElementById("userTableBody");
const dobInput = document.getElementById("dob");

const today = new Date();

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

// Minimum date of birth: 55 years ago
const minDob = new Date(
  today.getFullYear() - 55,
  today.getMonth(),
  today.getDate(),
);

// Maximum date of birth: 18 years ago
const maxDob = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate(),
);

dobInput.min = formatDate(minDob);
dobInput.max = formatDate(maxDob);

function getUsers() {
  const users = localStorage.getItem("users");

  if (users === null) {
    return [];
  }

  return JSON.parse(users);
}

function displayUsers() {
  const users = getUsers();

  tableBody.innerHTML = "";

  users.forEach(function (user) {
    const row = document.createElement("tr");

    row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.password}</td>
            <td>${user.dob}</td>
            <td>${user.acceptedTerms}</td>
        `;

    tableBody.appendChild(row);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("terms").checked;

  const selectedDate = new Date(dob);

  if (selectedDate < minDob || selectedDate > maxDob) {
    alert("Age must be between 18 and 55 years.");
    return;
  }

  const user = {
    name: name,
    email: email,
    password: password,
    dob: dob,
    acceptedTerms: acceptedTerms,
  };

  const users = getUsers();

  users.push(user);

  localStorage.setItem("users", JSON.stringify(users));

  displayUsers();

  form.reset();
});

displayUsers();
