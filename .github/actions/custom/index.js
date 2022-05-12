const core = require("@actions/core");
const github = require("@actions/github");

(async () => {
  const token = core.getInput("token");
  const owner = core.getInput("owner");
  const repo = core.getInput("repo");
  const run_id = core.getInput("run_id");
  const attempt_number = core.getInput("attempt_number");

  // const assignees = core.getInput("assignees");

  // const octokit = github.getOctokit(token);

  // const response = await octokit.rest.actions.getWorkflowRunAttempt({
  //   owner,
  //   repo,
  //   run_id,
  //   attempt_number
  // });

  // const { data } = response;

  const { context = {} } = github;

  // core.setOutput("DATA", JSON.stringify(data));
  core.setOutput("repo", repo);
  core.setOutput("owner", owner);
  core.setOutput("run_id", run_id);
  core.setOutput("attempt_number", attempt_number);

  core.startGroup("Logging github");
  console.log(JSON.stringify(github, null, "\t"));
  core.endGroup();

  core.startGroup("Logging github context");
  console.log(JSON.stringify(context, null, "\t"));
  core.endGroup();
})();
