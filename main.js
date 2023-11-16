import { Hono } from "https://deno.land/x/hono/mod.ts";
import { serve } from "https://deno.land/std/http/server.ts";
import { serveStatic } from "https://deno.land/x/hono/middleware.ts";

import { h } from "preact";
import renderToString from "preact-render-to-string";
import { Router } from "wouter-preact";

import { App } from "./App.jsx";

const { imports: importMap } = JSON.parse(await Deno.readTextFile("./deno.jsonc"));

const app = new Hono();

app.get("/static/*", serveStatic({ root: "./" }));

app.get("*", (c) => {
  const { search } = new URL(c.req.url);

  const rendered = renderToString(
    h(
      Router,
      {
        ssrPath: c.req.path, // Provide current location to wouter
        ssrSearch: search,
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
        <script type="importmap">
          {
            "imports": ${JSON.stringify(importMap)}
          }
        </script>
        <script type="module" src="/static/client.js"></script>
      </body>
    </html>
  `);
});

serve(app.fetch);
