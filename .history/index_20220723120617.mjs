import {loadStdlib} from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);

const accAlice =
  await stdlib.newTestAccount(startingBalance);
// console.log(`Hello, Alice test account ${accAlice}`);

console.log('Launching...');
const ctcAlice = accAlice.contract(backend);
console.log(`Alice deployed the contract`)

const voters = []

const newUser = async (who) => {
  const acc =await stdlib.newTestAccount(startingBalance);
  const ctcBob = acc.contract(backend, ctcAlice.getInfo());
  console.log(`${who} attaches to contract`)
  const voterAddress = acc.getAddress()
  voters.push(voterAddress)
}

const getUsers = async () => {
 await newUser("voter 1")
 await newUser("voter 2")
 await newUser("voter 3")
 await newUser("voter 4")
 await newUser("voter 5")
 console.log(voters)
}


console.log('Starting backends...');
await ctcAlice.p.Alice({
    // implement Alice's interact object here
    ready : () => {
      console.log("contract is ready")
      getUsers()
    },
});

console.log('Goodbye, Alice and Bobs!');