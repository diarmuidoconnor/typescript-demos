

let anyVar : any = "hello world"
anyVar = [1,2,3]

// -------------------------------
let unknownVar: unknown ;
//  let result = unknownVar * 2

if (typeof unknownVar === 'number' ) {
  let result = unknownVar* 2 ;
}