const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/core");

const { context } = require("@actions/github");

// const myoctokit = github.getOctokit(token);

async function run() {
  try {
    const token = core.getInput("token");
    const owner = core.getInput("owner");
    const repo = core.getInput("repo");
    const run_id = core.getInput("run_id");
    const attempt_number = core.getInput("attempt_number");

    const octokit = new github.getOctokit(token);
    const { data } = await octokit.rest.actions.getWorkflowRunAttempt({
      owner,
      repo,
      run_id,
      attempt_number,
    });

    console.log("OWNER =>", owner);
    console.log("REPO =>", repo);
    console.log("RUN ID =>", run_id);
    console.log("ATTEMPT NUMBER =>", attempt_number);

    console.log(JSON.stringify(data, null, "\t"));

    // core.setOutput("repo", repo);
    // core.setOutput("owner", owner);
    // core.setOutput("run_id", run_id);
    // core.setOutput("attempt_number", attempt_number);
    // core.setOutput("response", JSON.stringify(response.data));

    core.startGroup("Logging github");
    console.log(JSON.stringify(github, null, "\t"));
    core.endGroup();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
