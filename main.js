import { Hono } from "https://deno.land/x/hono/mod.ts";
import { serve } from "https://deno.land/std/http/server.ts";
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";
import renderToString from "https://esm.sh/preact-render-to-string@5.2.0";
import { Router } from "https://esm.sh/wouter-preact@2.11.0";
import { h } from "https://esm.sh/preact@10.7.2";

import { App } from "./App.jsx";

const app = new Hono();

app.get("/static/*", serveStatic({ root: "./" }));

app.get("*", (c) => {
  const rendered = renderToString(
    h(
      Router,
      {
        ssrPath: c.req.path, // Provide current location to wouter
      },
      h(App)
    )
  );

  return c.html(`
    <html>
      <head>
        <title>Deno + Preact SSR</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@exampledev/new.css@1.1.2/new.min.css">
      </head>

      <body>
        <div id="app">${rendered}</div>
        <script type="module" src="/static/client.js"></script>
      </body>
    </html>
  `);
});

serve(app.fetch);
