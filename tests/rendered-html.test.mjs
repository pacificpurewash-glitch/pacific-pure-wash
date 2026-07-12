import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("home page publishes Jackson County search signals", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Jackson County Pressure Washing \| Pacific Pure Wash<\/title>/i);
  assert.match(html, /Pressure washing[\s\S]*across Jackson County/i);
  assert.match(html, /97501/);
  assert.match(html, /97530/);
  assert.match(html, /service-area\/jackson-county-or/);
  assert.match(html, /services\/driveway-cleaning/);
  assert.match(html, /"areaServed"/);
});

const landingPages = [
  {
    path: "/services/driveway-cleaning",
    canonical: "https://pacificpurewash.com/services/driveway-cleaning",
    heading: "Driveway pressure washing in Jackson County, Oregon",
  },
  {
    path: "/services/siding-soft-washing",
    canonical: "https://pacificpurewash.com/services/siding-soft-washing",
    heading: "Siding and exterior softwashing in Jackson County, Oregon",
  },
  {
    path: "/services/roof-cleaning",
    canonical: "https://pacificpurewash.com/services/roof-cleaning",
    heading: "Roof cleaning and softwashing in Jackson County, Oregon",
  },
  {
    path: "/service-area/jackson-county-or",
    canonical: "https://pacificpurewash.com/service-area/jackson-county-or",
    heading: "Exterior cleaning throughout Jackson County, Oregon",
  },
];

for (const page of landingPages) {
  test(`${page.path} renders unique canonical local content`, async () => {
    const response = await render(page.path);
    assert.equal(response.status, 200);
    const html = await response.text();
    assert.match(html, new RegExp(`rel=["']canonical["'][^>]+href=["']${page.canonical.replaceAll("/", "\\/")}["']|href=["']${page.canonical.replaceAll("/", "\\/")}["'][^>]+rel=["']canonical["']`, "i"));
    assert.match(html, new RegExp(page.heading.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"));
    assert.match(html, /97501/);
    assert.match(html, /97530/);
    assert.match(html, /application\/ld\+json/i);
  });
}

test("sitemap includes the home, service, and county URLs", async () => {
  const response = await render("/sitemap.xml");
  assert.equal(response.status, 200);
  const xml = await response.text();
  assert.match(xml, /https:\/\/pacificpurewash\.com\//);
  assert.match(xml, /services\/driveway-cleaning/);
  assert.match(xml, /services\/siding-soft-washing/);
  assert.match(xml, /services\/roof-cleaning/);
  assert.match(xml, /service-area\/jackson-county-or/);
});
