# Contributing to NextFinder

Thanks for your interest! The project is **pre-alpha**, so the API is still moving.

## Before you start

- **Questions and ideas:** use GitHub Discussions.
- **Bugs:** open an issue with a minimal reproduction.
- **Security problems:** do **not** open an issue, see [SECURITY.md](./SECURITY.md).
- **Larger changes:** open a discussion first so we can agree on the design.

## Pull requests

- Keep them small and focused: one change per PR.
- Describe what changed and why. Link the related issue.
- Changes that touch path handling, uploads or authorization need extra tests.
- By contributing you agree that your contribution is licensed under the MIT License.

## Releases

Releases are published from GitHub Actions using npm trusted publishing. Maintainers
bump the version in a PR, merge it, then run the **Release** workflow.
