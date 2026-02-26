// script.js - fetches a list of users from a public API and displays them in the list

const loadBtn = document.getElementById('loadBtn');
const userList = document.getElementById('userList');

loadBtn.addEventListener('click', async () => {
  loadBtn.disabled = true;
  loadBtn.textContent = 'Loading...';
  userList.innerHTML = '';

  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const users = await response.json();

    users.forEach((user) => {
      const li = document.createElement('li');
      li.textContent = `${user.name} (${user.email})`;
      userList.appendChild(li);
    });
  } catch (error) {
    const li = document.createElement('li');
    li.textContent = 'Failed to load users: ' + error.message;
    userList.appendChild(li);
    console.error(error);
  } finally {
    loadBtn.disabled = false;
    loadBtn.textContent = 'Load Users';
  }
});
