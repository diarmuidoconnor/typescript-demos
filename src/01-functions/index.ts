import { Person } from "./myTypes";

//-------------- Function parameter and return types ------------------
function addNumbers(a: number, b: number): number {
  return a + b;
}
export default addNumbers;

// Often TS can infers the return type - try cmd-k, cmd-i
function addNumbersInfer(a: number, b: number) {
  return a + b;
}

// -------------------------------------------------
// ----------------- Arrow functions ---------------------------------

export const addStrings = (str1: string, str2: string): string =>
  `${str1} ${str2}`;

// axis is a union type - string OR Regular Expression
export const rotate = (source: string, axis: string | RegExp) => {
  let chars = '';
  if (typeof axis === "object") {
    const match = source.match(axis);
    if (match) {
      chars = match[0];
    }
  } else {
    chars = axis
  }
  const parts = source.split(axis);
  return parts.reverse().join(chars)
};
// Test
let source = "abc12defghi"
console.log(`${source} -->  ${rotate(source, /\d{2}/)}` );
source = "doconnor@setu.ie"
console.log(`${source} -->  ${rotate(source, '@')}` );

// void is the return type when nothing is returned
export const addAndShow = ( num1: number, num2: number): void => {
  console.log(addNumbers(num1, num2));
};

// -------------------------------------------------------------------
// ----------------- Higher Order Functions ---------------------

export function printToConsole(
  text: string,
  callback: (s: string) => string  // Declaring the callback's type.
): void {
  const response = callback(text);
  console.log(response);
}

printToConsole("hello world", (s: string) => {
  return s.toUpperCase();
});

//  printToConsole('hello world',
//     (n: number) => {
//        return n < 5
//     }   // ERROR
// ) 

export function arrayMutate(
  numbers: number[],
  mutate: (num: number) => number
): number[] {
  return numbers.map(mutate);
}

console.log(arrayMutate([1, 2, 3], (num) => num * 10));

const selectiveDecrement = (n: number) => {
  return n > 100 ? n - n * 0.1 : n;
};

console.log(arrayMutate([110, 20, 300], selectiveDecrement));

// Declaring a custom type for a function signature.
type MutationFunction = (v: number) => number;

// Type aliases allow cleaner syntax for declaring callback.
export function arrayMutate2(
  numbers: number[],
  mutate: MutationFunction
): number[] {
  return numbers.map(mutate);
}
console.log(arrayMutate2([1, 2, 3], (num) => num * 100));

// -----------------------------------------------------------------------
// Use cmd-k,cmd-i to suggest return type.
// May need to set target in tsconfig for Promise to be recognised
export const fetchData = (url: string) => {
  return Promise.resolve(`Data from ${url}`);
};

export const fetchPerson = (url: string): Promise<Person> => {
  const result: Person = {
    first: "diarmuid",
    last: "o connor",
  };
  return Promise.resolve(result);
};
