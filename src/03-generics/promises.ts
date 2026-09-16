import fetch from "node-fetch";

// ------------- Generics with Promises --------------------------


//-----------------------------------------------
// JSON Placeholder API - https://jsonplaceholder.typicode.com/

interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Manual check on the first item, just enough to catch an unexpected shape.
function isToDoArray(value: unknown): value is ToDo[] {
  return Array.isArray(value) && value.length > 0 && "id" in value[0] && "completed" in value[0];
}

async function fetchToDos(request: string): Promise<ToDo[]> {
  const response = await fetch(request);
  const body: unknown = await response.json();
  if (!isToDoArray(body)) {
    throw new Error("Unexpected response shape from ToDo API");
  }
  return body;
}

async function main() {

  const todos = await fetchToDos("https://jsonplaceholder.typicode.com/todos");

  const completedTodos = todos
    .filter((todo) => todo.completed)
    .map((todo) => todo.title)
    .slice(0, 5);

  console.log("Completed todos titles ", JSON.stringify(completedTodos));
}

main();
