import { Person, Friend } from "../01-functions/myTypes";

// Background

const someStrings = ["hello", "to", "the", "universe"];
someStrings.sort((a, b) => a.length - b.length);

console.log("The Array sort: ", someStrings);

// ------------- Without Generics -------------------
function stringRanker(
  strings: string[],
  ranker: (s: string) => number
): string[] {
  const result = strings.sort((a, b) => ranker(a) - ranker(b));
  return result;
}

const stringsByLength = stringRanker(
  ["hello", "to", "the", "universe"],
  (str) => str.length
);
console.log("Stribgs sorted by length ", stringsByLength);

function personRanker(
  people: Person[],
  ranker: (p: Person) => number
): Person[] {
  const result = people.sort((a, b) => ranker(a) - ranker(b));
  return result;
}

const joe: Person = {
  first: "Joe",
  last: "Bloggs",
  age: 22,
};

const jill: Person = {
  first: "Jill",
  last: "Bliggs",
  age: 21,
};
const jane: Person = {
  first: "Jane",
  last: "Bliags",
  // age: 30,
};

const peopleByAge = personRanker(
  [joe, jill, jane],
  (p) => (p.age ? p.age : 30) // Due to age being optional
);

console.log("People sorted by age: ", peopleByAge);

// -------------------With Generics -----------------------------

function genericRanker<T>(element: T[], ranker: (e: T) => number): T[] {
  const result = element.sort((a, b) => ranker(a) - ranker(b));
  return result;
}

// Return type is inferred - use cmd-k,i
const peopleByAge2 = genericRanker<Person>([jane, joe, jill], (p) =>
  p.age ? p.age : 30
);

console.log("(Gen) People sorted by age: ", peopleByAge2);

// The string type is inferred for T because of array element's type.
// Use cmd-k cmd-i to confirm
const stringsByLength2 = genericRanker(
  ["hello", "to", "the", "universe"],
  (str) => str.length
);
console.log("(Gen) Strings sorted by length: ", stringsByLength2);

// -------------------------------
// Generics can be applied to interfaces as well.

interface Microphone {
  make: string;
  range: number;
}

interface Speaker {
  manufacturer: string;
  model: string;
  ports: string[];
}

interface Box<T> {
  shelfNo: number;
  content: T[];
}

const box1: Box<Speaker> = {
  shelfNo: 3,
  content: [
    {
      manufacturer: "SubZero",
      model: "SZPA-P15",
      ports: ["USBA", "USBC"],
    },
  ],
};

// Generics can also be applied to classes, type aliaste, etc
