import { execSync } from 'child_process';

///// VERCEL COMMAND
console.log("--DEPLOY START--");
const command = 'yarn deploy:staging';
const output = execSync(command, { encoding: 'utf8' });
const outputLines = output.split("\n");
const DEPLOY_URL = outputLines[outputLines.length - 1];
console.log("--DEPLOY END--");

// ----------------------------------------------------

///// GITHUB COMMENTS

console.log("--GITHUB_COMMENT START--");

const { GITHUB_TOKEN, GITHUB_REPOSITORY, GITHUB_PR_NUMBER, GITHUB_OWNER } = process.env;
const GH_COMMENT = `
- Deploy URL: [${DEPLOY_URL}](${DEPLOY_URL})
`;

const defaultHeaders = {};
defaultHeaders["authorization"] = `Bearer ${GITHUB_TOKEN}`;
defaultHeaders["accept"] =
  "application/vnd.github+json";
defaultHeaders["content-type"] = "application/json";

console.log("GITHUB_REPOSITORY", GITHUB_REPOSITORY);
console.log("GITHUB_PR_NUMBER", GITHUB_PR_NUMBER);
console.log("GITHUB_TOKEN", GITHUB_TOKEN);
console.log("GITHUB_OWNER", GITHUB_OWNER);

fetch(
  `https://api.github.com/repos/gabrielsd02/${GITHUB_REPOSITORY}/issues/${GITHUB_PR_NUMBER}/comments`,
  {
    headers: defaultHeaders,
    method: "POST",
    body: JSON.stringify({
      body: GH_COMMENT,
    }),
  }
)
  .then(async (response) => {
    if (response.ok) return response.json();
    console.log("erro response:", await response.json())
    throw new Error(response.statusText);
  })
  .catch((err) => {
    console.log("[COMMENT_ON_GITHUB: ERROR]");
    console.log("erro catch",err);
    throw new Error(err);
  })
  .finally(() => {
    console.log("[COMMENT_ON_GITHUB: END]");
  });

console.log("--GITHUB_COMMENT END--");

