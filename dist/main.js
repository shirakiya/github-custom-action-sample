const core = require("@actions/core");
const github = require("@actions/github");
const glob = require("@actions/glob");

const run = async () => {
  const name = core.getInput("name");
  console.log(`Hello ${name}!`);

  const globber = await glob.create("**/README.md");
  const files = await globber.glob();
  console.dir(files, { depth: null });

  const payload = JSON.stringify(github.context.payload, null, 2);
  console.log(`The event payload: ${payload}`);
};

const main = async () => {
  try {
    await run();
  } catch (e) {
    core.setFailed(e.message);
  }
};

main();
