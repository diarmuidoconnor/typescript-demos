import fetch from "node-fetch";

// ------------- Generics with Promises --------------------------

// Random User API - https://randomuser.me/

type RandomUser = {
  gender: "male" | "female";
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: string;
    city: string;
    country: string;
  };
  email: string;
  login: Object;
  dob: Object;
  registered: [Object];
  phone: string;
  cell: string;
  id: Object;
  picture: string;
  nat: string;
};

interface RandomUserResponse {
  results: RandomUser[];
}

async function fetchRandomUsers(request: string): Promise<RandomUserResponse> {
  const response = await fetch(request);
  // The as operator casts external values to an internal type.
  const body = (await response.json()) as RandomUserResponse;
  return body;
}

const users = await fetchRandomUsers("https://randomuser.me/api/?results=6");
const usersName_And_Location = users.results.map((user) => {
  return ` ${user.name.first} ${user.name.last} from ${user.location.country} `;
});
console.log("Random users ", usersName_And_Location);

//-----------------------------------------------
// JSON Placeholder API - https://jsonplaceholder.typicode.com/

interface ToDo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

async function fetchToDos(request: string) {
  const response = await fetch(request);
  const body = (await response.json()) as ToDo[];
  return body;
}

const todos = await fetchToDos("https://jsonplaceholder.typicode.com/todos");

const completedTodos = todos
  .filter((todo) => todo.completed)
  .map((todo) => todo.title)
  .slice(0, 5);

console.log("Completed todos titles ", JSON.stringify(completedTodos));
