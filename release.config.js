module.exports = {
  "branches": ["main"],
  // repositoryUrl: "https://github.com/ademola-adebayo/react-cicd-gha",
  "plugins": [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/changelog",
    ["@semantic-release/npm", { "npmPublish": false}],
    "@semantic-release/github"
    ["@semantic-release/git",
    {
      "assets": ["package.json", "package-lock.json", "compiled/index.js", "CHANGELOG.md"],
      "message": "chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}"
    }],
    "@semantic-release/github"
  ]
};
