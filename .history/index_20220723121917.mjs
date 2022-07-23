import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

const accAlice = await stdlib.newTestAccount(startingBalance);
// console.log(`Hello, Alice test account ${accAlice}`);

console.log('Launching...');
const ctcAlice = accAlice.contract(backend);
console.log(`Alice deployed the contract`)

const users = []

const newUser = async (who) => {
  const acc =await stdlib.newTestAccount(startingBalance);
  const ctcBob = acc.contract(backend, ctcAlice.getInfo());
  console.log(`${who} attaches to contract`)
  const userAddress = acc.getAddress()
  users.push(userAddress)
}

const getUsers = async () => {
 await newUser("Faith")
 await newUser("Charlie")
 await newUser("Smith")
 await newUser("Pearl")
 await newUser("Akin")
  console.log(users);
}


console.log('Starting the backend');
await ctcAlice.p.Alice({
    // implement Alice's interact object here
    ready : () => {
      console.log("contract is ready")
      getUsers()
    },
});

console.log('Goodbye, Alice and Bobs!');