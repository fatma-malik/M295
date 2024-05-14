
if (process.argv.length <= 2) { // checks the number of command-line arguments
    console.log("Usage: node sum.js number1 number2 ...");
    process.exit(1);
}
  
const nummer = process.argv.slice(2).map(Number);
const summe = nummer.reduce((acc, num) => acc + num, 0);

console.log(summe);
  