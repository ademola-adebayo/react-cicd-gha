module.exports = {
  branches: "main",
  repositoryUrl: "https://github.com/ademola-adebayo/react-cicd-gha",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    "@semantic-release/npm",
    "@semantic-release/github"
  ]
};
