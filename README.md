# NextFinder

Secure, storage-agnostic file manager for Next.js.

> **Status: pre-alpha, work in progress.** There is no usable code yet.
> The `nextfinder` package name is reserved for this project.

## Goals

- **Secure by default:** deny-by-default authorization, path jail, upload validation.
- **Bring your own storage:** local disk, S3-compatible, or an external HTTP backend.
- **Bring your own auth:** works with Auth.js, Better Auth, Clerk or any session function you provide.
- **Next.js first, framework-agnostic core.**

## Repository layout

| Path | Description |
|---|---|
| `packages/nextfinder` | The `nextfinder` npm package (placeholder for now) |
| `scripts/` | Repository maintenance scripts |

## Security

Please read [SECURITY.md](./SECURITY.md) and report vulnerabilities privately.

## License

[MIT](./LICENSE)

NextFinder is an independent project and is not affiliated with Vercel or Next.js.
