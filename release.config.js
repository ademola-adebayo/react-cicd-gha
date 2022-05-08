module.exports = {
  branches: ["main"],
  repositoryUrl: "https://github.com/ademola-adebayo/react-cicd-gha",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/github", {
      assets: [
        { path: "build.zip", label: "Build" },
        { path: "coverage.zip", label: "Coverage" }
      ]
    }]
  ]
};
