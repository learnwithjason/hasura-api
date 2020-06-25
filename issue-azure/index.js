const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

module.exports = async function (context, req) {
  const body = req.body;

  const ghResponse = await octokit.issues.create({
    owner: 'jlengstorf',
    repo: 'hasura-api',
    title: `${body.event.data.new.title} (from Azure Functions)`,
    body: body.event.data.new.content,
  });

  console.log(ghResponse);

  context.res = {
    body: ghResponse,
  };
};
