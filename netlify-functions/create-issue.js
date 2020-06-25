const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({
  auth: process.env.GITHUB_ACCESS_TOKEN,
});

exports.handler = async (event) => {
  const body = JSON.parse(event.body);

  const ghResponse = await octokit.issues.create({
    owner: 'jlengstorf',
    repo: 'hasura-api',
    title: `${body.event.data.new.title} (from Netlify Functions)`,
    body: body.event.data.new.content,
  });

  console.log(ghResponse);

  return {
    statusCode: 200,
    body: JSON.stringify(ghResponse),
  };
};
