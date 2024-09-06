// Utility types.
// See https://www.typescriptlang.org/docs/handbook/utility-types.html

interface TechUser {
  name: string;
  id: number;
  programming: string[];
  email?: string;
}

// Make everything optional - use cmd-k, cmd-i to confirm
type TechUserOptionals = Partial<TechUser>;

const merge = (user: TechUser, overrides: TechUserOptionals): TechUser => {
  return {
    ...user,
    ...overrides,
  };
};

console.log(
  merge(
    {
      name: "Diarmuid",
      id: 2,
      programming: ['JS', 'TS'],
      email: "diarmuid@wit.ie",
    },
    {
      email: "diarmuid@setu.ie",
    }
  )
);

// Make every property mandatory
type FullTechUser = Required<TechUser>;


// Pick a subset of the proerties
type JustEmailAndName = Pick<TechUser, "email" | "name">;

function createUser(user_init: JustEmailAndName): TechUser {
  return {
    ...user_init,
    id: Math.floor(Math.round(10)) * (1000 - 1) + 1, 
    programming: []
  };
}
console.log(
  createUser({
    name: "Diarmuid",
    email: "diarmuid@wit.ie",
  })
);

// All properties except .....
type TechUserProgramming = Omit<TechUser, "id" | "email"  >;

// Record<KeyType, ValueType> - Construct an object type whose keys 
// are of type KeyType and the values are of type ValueType.
type TechUserMapById = Record<TechUser["id"], TechUserProgramming>

const mapById = (users: TechUser[]): TechUserMapById => {
  return users.reduce((acc, user) => {
    const { id, email, ...rest } = user;
    return {
      ...acc,
      [id]: rest,
    };
  }, {});
};

console.log(
  mapById([
    {
      id: 1,
      name: "Mr. Foo",
      programming: ['Python', 'Java']
    },
    {
      id: 2,
      name: "Mrs. Baz",
      programming: ['Kotlin']
    },
  ])
);
