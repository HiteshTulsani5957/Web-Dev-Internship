// simple validation example: ensure name is not empty

window.addEventListener('DOMContentLoaded', () => {
    const nameElement = document.getElementById('name');
    if (!nameElement.textContent.trim()) {
        nameElement.textContent = 'Unnamed';
    }
});