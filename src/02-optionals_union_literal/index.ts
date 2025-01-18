// ? denotes an optional element

// --------- Optional data structure properties -------------------
interface User {
  id: string;
  name: string;
  email?: string;
  social?: {
    facebook: string;
    twitter?: string;
    instragram?: string;
  };
  status: boolean;
}

const joe: User = {
  name: "Joe Bloggs",
  id: "1234",
  status: true,
  social: {
    facebook: "url",
  },
};

const jane: User = {
  name: "Jane Bloggs",
  id: "4321",
  email: "email address",
  status: false,
};

const jill: User = {
  name: "Jill Bloggs",
  id: "4321",
  email: "email address",
  status: true,
  social: {
    facebook: "url",
    twitter: "handle",
  },
};

// -----------------------
// Optional function parameter

function printIngredient(
  ingredient: string,
  quantity: string,
  extraInfo?: string
) {
  console.log(
    `${quantity} ${ingredient} ${extraInfo ? extraInfo : "No extra details"}`
  );
}

printIngredient("Flour", "1C");
printIngredient("Granular Sugar", "2TS", "Can substitute with Castar Sugar");

// Required parameters cannot follow optional ones
// function addWithCallback2(x: number, y?: string, callback: () => void) {
//   console.log([x, y]);
//   callback?.();
// }

//  --------------------------------------------------
//  -------------- More on Type Aliases --------------------
// It allows more readable code with clearer intent.
// Improves DRY principle.

// Union Types
type SocialHandles = {
  facebook: string;
  twitter?: string;
  instragram?: string;
};

type Address = {
  street: string;
  town: string;
};

// Suppose a user's contact is eithe email or social media.
type Contact = SocialHandles | Address;

interface UserV2 {
  id: string;
  name: string;
  contact: Contact; // ********
  status: boolean;
}

const kyle: UserV2 = {
  name: "Joe Bloggs",
  id: "1234",
  status: true,
  contact: {
    facebook: "url",
  },
};

const jenny: UserV2 = {
  name: "Jenny Bloggs",
  id: "1234",
  contact: {
    street: "1 Main Street",
    town: "Tramore",
  },
  status: false,
};

const getContact = (user: UserV2): string => {
  if ("street" in user.contact) {
    const contact = user.contact;
    return `The address is: ${JSON.stringify(contact)}`;
  }
  const contact = user.contact;
  return `The social handles are: ${JSON.stringify(contact)}`;
};

console.log(getContact(kyle));

// ------------------------------------------
// Literal type
type Department = "Engineering" | "Sales" | "Accounts";

type StaffMember = UserV2 & { department: Department };

const company: StaffMember[] = [
  { ...jenny, department: "Engineering" },
  { ...kyle, department: "Sales" },
];
const getStaffNames = (department: Department): string[] => {
  return company
    .filter((staff) => staff.department === department)
    .map((staff) => staff.name);
};

console.log(getStaffNames("Engineering"));
