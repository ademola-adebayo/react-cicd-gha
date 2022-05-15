const core = require("@actions/core");
const github = require("@actions/github");
const { Octokit } = require("@octokit/core");

const { context } = require("@actions/github");

async function run() {
  try {
    /**
     * We need to fetch all the inputs that were provided to our action
     * and store them in variables for us to use.
     */
    const owner = core.getInput("owner", { required: true });
    const repo = core.getInput("repo", { required: true });
    const run_id = core.getInput("run_id", { required: true });
    const attempt_number = core.getInput("attempt_number", { required: true });
    const token = core.getInput("token", { required: true });

    /**
     * Now we need to create an instance of Octokit which will use to call
     * Github's REST API endpoints.
     * We will pass the token as an argument to the constructor. This token
     * will be used to authenticate our request.
     */
    const octokit = new github.getOctokit(token);

    // const response = await octokit.rest.actions.getWorkflowRunAttempt({
    //   owner,
    //   repo,
    //   run_id,
    //   attempt_number,
    // });

    await octokit.rest.actions.getWorkflowRunAttempt({
      owner,
      repo,
      run_id,
      attempt_number,
    });

    console.log("OWNER =>", owner);
    console.log("REPO =>", repo);
    console.log("RUN ID =>", run_id);
    console.log("ATTEMPT NUMBER =>", attempt_number);

    // console.log(JSON.stringify(response, null, "\t"));

    // core.setOutput("status", status);
    core.setOutput("conclusion", conclusion);
    core.setOutput("started_at", started_at);
    core.setOutput("completed_at", completed_at);
    // core.setOutput("response", JSON.stringify(data));

    core.startGroup("Logging github");
    console.log(JSON.stringify(github, null, "\t"));
    core.endGroup();
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
