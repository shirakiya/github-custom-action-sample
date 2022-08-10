const core = require("@actions/core");
const github = require("@actions/github");

const main = () => {
  const name = core.getInput("name");
  console.log(`Hello ${name}!`);

  const payload = JSON.stringify(github.context.payload, null, 2);
  console.log(`The event payload: ${payload}`);
};

try {
  main();
} catch (e) {
  core.setFailed(e.message);
}
