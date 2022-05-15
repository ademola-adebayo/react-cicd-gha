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

    /**
     * We need to fetch the list of files that were
     * changed in the Pull Request
     * and store them in a varible.
     * We use octokit.paginate() to automatically loop over
     * all the pages of the reaults.
     */
    const { data: changedFiles } = await octokit.rest.pulls.listFiles({
      owner,
      repo,
      pull_number: pr_number,
    });

    /**
     * Contains the sum of all the additions, deletions and changes
     * in all the files in the Pull Request
     */
    let diffData = {
      additions: 0,
      deletions: 0,
      changes: 0,
    };

    diffData = changedFiles.reduce((acc, file) => {
      acc.additions += file.additions;
      acc.deletions += file.deletions;
      acc.changes += file.changes;

      return acc;
    }, diffData);
  } catch (error) {
    core.setFailed(error.message);
  }
};

main();
