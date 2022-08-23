const core = require("@actions/core");
const github = require("@actions/github");
const glob = require("@actions/glob");
const exec = require("@actions/exec");

const run = async () => {
  const name = core.getInput("name");
  console.log(`Hello ${name}!`);

  const payload = JSON.stringify(github.context.payload, null, 2);
  console.log(`The event payload: ${payload}`);

  await exec.exec("pwd");

  const globber = await glob.create("**/README.md");
  for await (const file of globber.globGenerator()) {
    if (file.includes("node_modules")) {
      continue;
    }

    let stdout = "";
    let stderr = "";

    const options = {
      listeners: {
        stdout: (data) => {
          stdout += data.toString();
        },
        stderr: (data) => {
          stderr += data.toString();
        },
      },
      cwd: file.replace("README.md", ""),
    };

    await exec.exec("tree", ["."], options);

    console.log("stdout: ", stdout);
    console.log("stderr: ", stderr);
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
