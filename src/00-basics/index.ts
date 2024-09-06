
// ------------ Type annotations --------------------

let myString: string = "diarmuid o'connor";
let myNumber: number = 1;
// myNumber = 'dog';    // ERROR

myNumber += 1;

console.log(myNumber);

console.log(myString.toUpperCase());

// Excellent Intellisense support.
// let result = myNumber.toUpperCase()   // ERROR

let myBoolean: boolean = true;
// myBoolean += 1      // ERROR

// Intellisense also works at the object properties level (see later)

//------------------------------
// Some useful built-in types
let yearF: RegExp =  /^(19|20)\d{2}/

let data = '2023-xxxxxxxx'
console.log(` ${data} - ${yearF.test(data)}`  )
data = '201-yyyyyyy'
console.log(` ${data} - ${yearF.test(data)}`  )

// ----------------------------------
// ----------------- Array Type -----------------------------
let myNums: number[] = [1, 2, 3, 5];

let myStrings: Array<string> = ["hello", "world"];
//  string[] also works for above array

// myNums.push("three")   // ERROR

// -------------------------------------------------------         /
// ----------------- (Data) Interfaces ------------------------
interface Person {
  first: string;
  last: string;
}

const me: Person = {
  first: "diarmuid",
  last: "o connor",
};

// Hinting support avoids runtime undefined errors
// const firstName = me.

// ERROR - Dynamic object expansion is not supported. See later for alternative.
// me.address = '1 Main street'

interface CAOStudent {
  name: Person;
  id: number;
  subjects: string[];
}

const studentX: CAOStudent = {
  name: { first: "Joe", last: "Bloggs"},
  id: 123456,
  subjects: ["Maths (H)", "Accountancy (O)", "English (H)"],
};

interface SemesterResult {
  moduleName: string;
  grade: number;
}

interface StudentExamProfile {
  name: Person;
  id: number;
  resultss: SemesterResult[];
}

const studentYResults: StudentExamProfile = {
  name: { first: 'Jane', last: 'Bloggs' },
  id: 123456,
  resultss: [
    { moduleName: "Programming", grade: 65 },
    { moduleName: "Databases", grade: 70 },
    // { name: "Operating Systems", grade: 58 },
  ],
};

//-------------------------
// ---------------- Type Aliases ----------------------

type Course = {
  title: string;
  code: string;
  qualification: string;
};

type AcademicEntity = CAOStudent | Course;  // Union type

let entity : AcademicEntity = studentX // No compiler error

function processEntity(entity: AcademicEntity) {
  if ( 'code' in entity) {
    // process Course
  } else {
    // process CAOStudent
  }
}
processEntity(studentX);
processEntity({
  title: "Computer Science",
  code: "AD1234",
  qualification: "BSc",
});

// More on type aliases later

// -----------------------------------------------
// --------------- Type inferencing ---------------------------

// Let the compiler do the work!!  Spare the developer!!

let aString = "hello"; // cmd-k cmd-i

let third = aString.charAt(2);
let len = aString.length;

// aString.pop()   // ERROR - inferred type does not have a pop method.

// Inferencing can work through these HOF expression to 
// determine types for the return values.
const doubled = myNums.map((num) => num * 2);

export const friends: Person[] = [
  { first: "bob", last: "sullivan" },
  { first: "kyle", last: "dwyer" },
  { first: "jane", last: "smith" },
];
const friendsWithS = friends.filter((friend) => friend.last.startsWith("s"));
const firstNames = friends.map((friend) => friend.first);

console.log(friendsWithS);

// -----------------------------------------------------

// Record Utility type for declaring expandable maps
const transactionCodes: Record<string, number> = {
  sale: 10, // event: code
  delivery: 20,
  returnedGoods : 99
};

transactionCodes["reorder"] = 5;
