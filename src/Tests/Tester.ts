
function greeting(greeting: O['greeting'], name?: O['name'], lastname?: O['greeting'], sfx?: O['sfx']) {
  let obj = {name, lastname, greeting, sfx}
  if (lastname) {
    delete obj.name
  }
  return `${greeting}, ${obj.name || `${obj.sfx} ${obj.lastname}`}!`
}
type O = {
  greeting: string,
  name: string,
  lastname: string
  sfx: 'Mr.' | 'Mrs.' | 'Ms.'
}

const greet = greeting('Hello', 'John', 'Doe', 'Mr.')
console.log(greet)