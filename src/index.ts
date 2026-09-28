// Serves Go vanity import paths: go.seanabraham.com/<repo>[/subpkg...] maps to
// github.com/srabraham/<repo>. See `go help importpath` ("Remote import paths").
const GITHUB_USER = "srabraham";

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const [repo] = url.pathname.split("/").filter(Boolean);

    if (!repo) {
      return Response.redirect(`https://github.com/${GITHUB_USER}`, 302);
    }
    if (!/^[A-Za-z0-9._-]+$/.test(repo)) {
      return new Response("Not found\n", { status: 404 });
    }

    const repoURL = `https://github.com/${GITHUB_USER}/${repo}`;

    if (url.searchParams.get("go-get") !== "1") {
      return Response.redirect(repoURL, 302);
    }

    // The import prefix must be the repo root, not the full requested path, so
    // that subpackages like go.seanabraham.com/repo/sub resolve to the same repo.
    const html = `<!DOCTYPE html>
<html><head>
<meta name="go-import" content="${url.host}/${repo} git ${repoURL}">
</head></html>
`;
    return new Response(html, {
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  },
};
