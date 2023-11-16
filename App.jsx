/** @jsxImportSource preact */
/** @jsxRuntime automatic */
import { hydrate } from "preact";
import { useEffect, useRef } from "preact/hooks";
import { Route, useLocation, Link, useSearch, useRouter } from "wouter-preact";

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
  const search = useSearch();
  const router = useRouter();

  return (
    <div>
      <h1>Preact + Deno SSR</h1>
      <p>
        <code>useLocation() = "{location}"</code>
        <br />
        <code>useSearch() = "{search}"</code>
        <br />
        <code>useRouter().base = "{router.base}"</code>
        <br />
      </p>

      <Counter />

      <p>
        <Link href="/">Home</Link>
        {" / "}
        <Link href="/about" asChild>
          <a className="about-link">About</a>
        </Link>
      </p>

      <Route path="/about">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam</Route>
    </div>
  );
};

if (typeof window.document !== "undefined") {
  hydrate(<App />, document.getElementById("app"));
}
