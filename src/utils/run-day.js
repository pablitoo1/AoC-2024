const { exec } = require("child_process");

const dayArg = process.argv[2];
if (!dayArg) {
  console.error("Set day number: npm run day 1");
  process.exit(1);
}

const day = parseInt(dayArg, 10);
if (isNaN(day) || day < 1 || day > 25) {
  console.error("The day number must be a number between 1 and 25.");
  process.exit(1);
}

const paddedDay = day.toString().padStart(2, "0");

const command = `npx ts-node src/day${paddedDay}/day${paddedDay}.ts`;

console.log(`Starting day ${day}...`);

exec(command, (err, stdout, stderr) => {
  if (err) {
    console.error(`Error during starting day ${day}:`, stderr);
    process.exit(err.code);
  }
  console.log(stdout);
});
