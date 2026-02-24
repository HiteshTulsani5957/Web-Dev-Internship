(() => {
  const STORAGE_KEY = "task7_notes";
  let notes = [];
  let editId = null;

  const noteForm = document.getElementById("noteForm");
  const titleInput = document.getElementById("noteTitle");
  const descInput = document.getElementById("noteDesc");
  const titleError = document.getElementById("noteTitleError");
  const descError = document.getElementById("noteDescError");
  const notesList = document.getElementById("notesList");
  const cancelBtn = document.getElementById("noteCancelBtn");

  const loadNotes = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      notes = stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to parse notes from storage", e);
      notes = [];
    }
  };

  const saveNotes = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch (e) {
      console.error("Failed to save notes", e);
    }
  };

  const renderNotes = () => {
    if (!notesList) return;
    notesList.innerHTML = "";

    if (notes.length === 0) {
      notesList.textContent = "No notes yet.";
      return;
    }

    notes.forEach((note) => {
      const card = document.createElement("div");
      card.className = "note-card";
      card.innerHTML = `
        <h3 class="note-title"></h3>
        <p class="note-desc"></p>
        <p class="note-date"></p>
        <div class="note-actions">
          <button class="btn secondary edit-btn" data-id=""></button>
          <button class="btn danger delete-btn" data-id=""></button>
        </div>
      `;

      card.querySelector(".note-title").textContent = note.title;
      card.querySelector(".note-desc").textContent = note.description;
      card.querySelector(".note-date").textContent =
        new Date(note.created).toLocaleString();
      card.querySelector(".edit-btn").textContent = "Edit";
      card.querySelector(".edit-btn").setAttribute("data-id", note.id);
      card.querySelector(".delete-btn").textContent = "Delete";
      card.querySelector(".delete-btn").setAttribute("data-id", note.id);

      notesList.appendChild(card);
    });

    notesList.querySelectorAll(".edit-btn").forEach((btn) => {
      btn.addEventListener("click", handleEdit);
    });
    notesList.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", handleDelete);
    });
  };

  const clearForm = () => {
    if (!noteForm) return;
    noteForm.reset();
    editId = null;
    titleError.textContent = "";
    descError.textContent = "";
    noteForm.querySelector("button[type='submit']").textContent = "Add Note";
    if (cancelBtn) {
      cancelBtn.style.display = "none";
    }
  };

  const validate = () => {
    let valid = true;
    if (!titleInput || !descInput) return false;
    titleError.textContent = "";
    descError.textContent = "";

    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (title.length < 3) {
      titleError.textContent = "Title must be at least 3 characters.";
      valid = false;
    }
    if (desc === "") {
      descError.textContent = "Description cannot be empty.";
      valid = false;
    }
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const title = titleInput.value.trim();
    const desc = descInput.value.trim();

    if (editId) {
      const idx = notes.findIndex((n) => n.id === editId);
      if (idx !== -1) {
        notes[idx].title = title;
        notes[idx].description = desc;
      }
    } else {
      const note = {
        id: Date.now().toString(),
        title,
        description: desc,
        created: Date.now(),
      };
      notes.push(note);
    }

    saveNotes();
    renderNotes();
    clearForm();
  };

  const handleEdit = (e) => {
    const id = e.target.getAttribute("data-id");
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    editId = id;
    titleInput.value = note.title;
    descInput.value = note.description;
    noteForm.querySelector("button[type='submit']").textContent = "Save Changes";
    if (cancelBtn) {
      cancelBtn.style.display = "inline-block";
    }
  };

  const handleDelete = (e) => {
    const id = e.target.getAttribute("data-id");
    if (!id) return;
    if (!confirm("Are you sure you want to delete this note?")) {
      return;
    }
    notes = notes.filter((n) => n.id !== id);
    saveNotes();
    renderNotes();
    if (editId === id) {
      clearForm();
    }
  };

  if (noteForm) {
    noteForm.addEventListener("submit", handleSubmit);
  }
  if (cancelBtn) {
    cancelBtn.addEventListener("click", clearForm);
  }

  loadNotes();
  renderNotes();
})();