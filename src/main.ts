import * as core from "@actions/core"
import * as github from "@actions/github"
import * as glob from "@actions/glob"
import * as exec from "@actions/exec"

const run = async () => {
  const name = core.getInput("name")
  console.log(`Hello ${name}!`)

  const payload = JSON.stringify(github.context.payload, null, 2)
  console.log(`The event payload: ${payload}`)

  await exec.exec("pwd")

  const globber = await glob.create("**/README.md")
  for await (const file of globber.globGenerator()) {
    if (file.includes("node_modules")) {
      continue
    }

    let stdout = ""
    let stderr = ""

    const options: exec.ExecOptions = {
      listeners: {
        stdout: (data) => {
          stdout += data.toString()
        },
        stderr: (data) => {
          stderr += data.toString()
        },
      },
      cwd: file.replace("README.md", ""),
    }

    await exec.exec("tree", ["."], options)

    console.log("stdout: ", stdout)
    console.log("stderr: ", stderr)
  }
}

const main = async () => {
  try {
    await run()
  } catch (e) {
    if (e instanceof Error) {
      core.setFailed(e.message)
    } else {
      console.error(e)
      core.setFailed("See console.error message.")
    }
  }
}

main()
