document.addEventListener('DOMContentLoaded', () => {
    const itemInput = document.getElementById('itemInput');
    const addBtn = document.getElementById('addBtn');
    const itemList = document.getElementById('itemList');

    function addItem() {
        const value = itemInput.value.trim();
        if (value === '') {
            alert('Item cannot be empty');
            return;
        }
        const li = document.createElement('li');
        li.textContent = value;
        const delBtn = document.createElement('button');
        delBtn.textContent = 'Remove';
        delBtn.addEventListener('click', () => {
            itemList.removeChild(li);
        });
        li.appendChild(delBtn);
        itemList.appendChild(li);
        itemInput.value = '';
        itemInput.focus();
    }

    addBtn.addEventListener('click', addItem);
    itemInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') addItem();
    });
});