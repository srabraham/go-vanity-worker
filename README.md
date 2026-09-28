# go-vanity-worker

Cloudflare Worker that serves Go vanity import paths:
`go.seanabraham.com/<repo>[/subpkg...]` → `github.com/srabraham/<repo>`.

Deploy with `npx wrangler deploy`.
