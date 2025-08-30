const input = document.getElementById("todoInput");
const button = document.getElementById("hinzufuegen");
const liste = document.getElementById("todoListe");

let todos = [];

// 1. Aufgabe hinzufügen
button.addEventListener("click", () => {
  const text = input.value.trim();
  if (text === "") return;

  const neueAufgabe = {
    text: text,
    erledigt: false
  };

  todos.push(neueAufgabe);
  input.value = "";
  speichereTodos();
  zeigeTodos();
});

// 2. Enter-Taste auch zum Hinzufügen
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    button.click();
  }
});

// 3. Aufgaben anzeigen
function zeigeTodos() {
  liste.innerHTML = "";

  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.classList.toggle("done", todo.erledigt);

    const span = document.createElement("span");
    span.textContent = todo.text;
    span.style.cursor = "pointer";
    span.addEventListener("click", () => {
      todos[index].erledigt = !todos[index].erledigt;
      speichereTodos();
      zeigeTodos();
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "🗑️";
    delBtn.addEventListener("click", () => {
      todos.splice(index, 1);
      speichereTodos();
      zeigeTodos();
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    liste.appendChild(li);
  });
}

// 4. Speicherfunktionen
function speichereTodos() {
  localStorage.setItem("meineTodos", JSON.stringify(todos));
}

function ladeTodos() {
  const gespeichert = localStorage.getItem("meineTodos");
  if (gespeichert) {
    todos = JSON.parse(gespeichert);
    zeigeTodos();
  }
}

// 5. Direkt beim Start laden
ladeTodos();
