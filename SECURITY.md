# Security Policy

NextFinder deals with file uploads, file access and authorization, so security
reports are taken seriously.

## Supported versions

The project is pre-alpha (0.x). Only the latest published version receives
security fixes.

## Reporting a vulnerability

**Please do not open a public issue for security problems.**

Report privately through GitHub:
<https://github.com/nextfinderjs/nextfinder/security/advisories/new>

Please include:

- the affected package and version,
- a description of the issue and its impact,
- steps to reproduce or a proof of concept,
- a suggested fix, if you have one.

## What to expect

- We will acknowledge your report on a best-effort basis, usually within a few days.
- We follow coordinated disclosure: we fix first, then publish an advisory.
- You will be credited in the advisory unless you prefer to stay anonymous.

## In scope

- Path traversal or path jail escapes
- Authorization bypass
- Upload validation bypass (type, size, content)
- SSRF or token leakage in the external HTTP adapter
- Stored XSS or content sniffing through served files
- Weaknesses in this repository's release pipeline (supply chain)

## Out of scope

- Vulnerabilities in third-party services you connect (S3 providers, auth providers)
- Issues that require a malicious or already-compromised maintainer account
- Missing best-practice headers on a site you operate yourself
