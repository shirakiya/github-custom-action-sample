const core = require("@actions/core");
const github = require("@actions/github");
const glob = require("@actions/glob");

const run = async () => {
  const name = core.getInput("name");
  console.log(`Hello ${name}!`);

  const payload = JSON.stringify(github.context.payload, null, 2);
  console.log(`The event payload: ${payload}`);

  const globber = await glob.create("**/README.md");
  for await (const file of globber.globGenerator()) {
    if (file.includes("node_modules")) {
      continue;
    }
    console.log("found README.md: ", file);
  }
};

const main = async () => {
  try {
    await run();
  } catch (e) {
    core.setFailed(e.message);
  }
};

main();
