module.exports = {
  branches: ['main'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    [
      '@semantic-release/exec',
      {
        // Ensure that we overwrite .VERSION instead of appending
        verifyReleaseCmd: 'echo "Releasing version ${nextRelease.version}" && echo NEXT_VERSION=${nextRelease.version} > .VERSION',
      },
    ],
    [
      '@semantic-release/gitlab',
      {
        assets: 'release/*.tgz',
      },
    ],
    [
      '@semantic-release/npm',
      {
        npmPublish: false,
      },
    ],
    '@semantic-release/git',
  ],
  preset: 'angular',
};
