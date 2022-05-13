const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/core");

async function run() {
  try {
    const token = core.getInput("token");
    const owner = core.getInput("owner");
    const repo = core.getInput("repo");
    const run_id = core.getInput("run_id");
    const attempt_number = core.getInput("attempt_number");

    // const octokit = github.getOctokit(token);
    // const response = await octokit.rest.actions.getWorkflowRunAttempt({
    //   owner,
    //   repo,
    //   run_id,
    //   attempt_number,
    // });
    const octokit = new Octokit({ auth: token });
    const response = await octokit.request(
      "GET /repos/{owner}/{repo}/actions/runs/{run_id}/attempts/{attempt_number}",
      {
        owner,
        repo,
        run_id,
        attempt_number,
      }
    );
    console.log("OWNER =>", owner);
    console.log("REPO =>", repo);

    // console.log(JSON.stringify(response.data, null, "\t"));

    // const { context } = github;

    core.setOutput("repo", repo);
    core.setOutput("owner", owner);
    core.setOutput("run_id", run_id);
    core.setOutput("attempt_number", attempt_number);
    // core.setOutput("big_data", JSON.stringify(response.data));

    core.startGroup("Logging github");
    console.log(JSON.stringify(github, null, "\t"));
    core.endGroup();
  } catch (error) {
    core.setFailed(error.message);
    console.error(error);
  }
}

run();
