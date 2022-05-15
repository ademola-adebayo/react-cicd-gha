const core = require("@actions/core");
const github = require("@actions/github");

const main = async () => {
  try {
    /**
     * We need to fetch all the inputs that were provided to our action
     * and store them in variables for us to use.
     */
    const owner = core.getInput("owner", { required: true });
    const repo = core.getInput("repo", { required: true });
    const pr_number = core.getInput("pr_number", { required: true });
    const token = core.getInput("token", { required: true });

    /**
     * Now we need to create an instance of Octokit which will use to call
     * Github's REST API endpoints.
     * We will pass the token as an argument to the constructor. This token
     * will be used to authenticate our request.
     */
    const octokit = new github.getOctokit(token);
  } catch (error) {
    core.setFailed(error.message);
  }
};
