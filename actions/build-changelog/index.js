const core = require('@actions/core');
const { GitHub } = require('@actions/github');

console.log(GitHub);

async function run() {
  try {
    const myToken = core.getInput('GITHUB_TOKEN');
    const version = core.getInput('version', { required: true });
    const query = `type:pr+label:${version}`;
    const octokit = new GitHub(myToken);

    const { data: pullRequest } = await octokit.search.issuesAndPullRequests({
      q: query
    });

    let changelog = '';

    pullRequest.items.forEach(function(item) {
      changelog += `- [${item.title}](${item.html_url})\n`;
    });

    core.setOutput('changelog', changelog);
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();