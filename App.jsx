/** @jsxImportSource https://esm.sh/preact */
/** @jsxRuntime automatic */
import { hydrate } from "https://esm.sh/preact";
import { useEffect, useRef, useState } from "https://esm.sh/preact/hooks";
import { Route, useLocation, Link } from "https://esm.sh/wouter-preact@2.11.0";

const Counter = () => {
  const el = useRef(null);

  useEffect(() => {
    el.current.innerText = "yep!";
  }, []);

  return (
    <div>
      <p>
        Hydrated: <code ref={el} />
      </p>
    </div>
  );
};

export const App = () => {
  const [location] = useLocation();

  return (
    <div>
      <h1>Preact + Deno SSR</h1>
      <code>useLocation() = "{location}"</code>

      <Counter />

      <p>
        <Link href="/">Home</Link> <Link href="/about">About</Link>
      </p>

      <Route path="/about">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</Route>
    </div>
  );
};

if (typeof window.document !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}
