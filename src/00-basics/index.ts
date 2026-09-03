
// ------------ Type annotations --------------------

let myString: string = "diarmuid o'connor";
let myNumber: number = 1;
// myNumber = 'dog';    // ERROR

myNumber += 1;

console.log(myNumber);

console.log(myString.toUpperCase());

// Excellent code completion support.
// let result = myNumber.toUpperCase()   // ERROR

// Live Compiler error reporting 
let myBoolean: boolean = true;
// myBoolean += 1      // ERROR

//------------------------------
// Some useful built-in types
let yearF: RegExp =  /^(19|20)\d{2}/

let data : string = '2023-xxxxxxxx'
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
// ----------------- Interface Data Types ------------------------
interface Name {
  first: string;
  last: string;
}

const me: Name = {
  first: "diarmuid",
  last: "o connor",
};

// Code completion avoids runtime undefined errors
// const firstName = me.

// ERROR - Dynamic object expansion is not supported. See later for alternative.
// me.address = '1 Main street'

interface Student {
  name: Name;
  id: number;
  subjects: string[];
}

const studentX: Student = {
  name: { first: "Joe", last: "Bloggs"},
  id: 123456,
  subjects: ["Cloud Computing", "AI", "Web Development"],
};

interface Grade {
  moduleName: string;
  grade: number;
}

interface StudentExamProfile {
  name: Name;
  id: number;
  resultss: Grade[];
}

const semesterResults: StudentExamProfile = {
  name: { first: 'Jane', last: 'Bloggs' },
  id: 123456,
  resultss: [
    { moduleName: "Programming", grade: 65 },
    { moduleName: "Databases", grade: 70 },
    // { name: "Operating Systems", grade: 58 },  //ERROR
  ],
};

//-------------------------
// ---------------- Type Aliases ----------------------

type Course = {
  title: string;
  code: string;
  qualification: string;
};

type AcademicEntity = Student | Course;  // Union type

let entity : AcademicEntity = studentX // No compiler error

function processAE(entity: AcademicEntity) {
  if ( 'code' in entity) {
    // process Course
  } else {
    // process CAOStudent
  }
}
processAE(studentX);
processAE({
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

export const friends: Name[] = [
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
