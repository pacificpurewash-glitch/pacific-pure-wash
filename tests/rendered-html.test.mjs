import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
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

test("home page publishes Jackson County, Ashland, and Rogue River search signals", async () => {
  const response = await render("/");
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Jackson County Pressure Washing \| Pacific Pure Wash<\/title>/i);
  assert.match(html, /Pressure washing[\s\S]*across Jackson County/i);
  assert.match(html, /97501/);
  assert.match(html, /97530/);
  assert.match(html, /all of Ashland/i);
  assert.match(html, /Rogue River/i);
  assert.match(html, /541-690-8385/);
  assert.match(html, /href=["']tel:\+15416908385["']/i);
  assert.match(html, /"telephone":"\+15416908385"/i);
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
    assert.match(html, /Ashland/i);
    assert.match(html, /Rogue River/i);
    assert.match(html, /application\/ld\+json/i);
  });
}

test("Jackson County coverage explicitly includes all of Ashland and Rogue River", async () => {
  const response = await render("/service-area/jackson-county-or");
  const html = await response.text();

  assert.match(html, /all of Ashland/i);
  assert.match(html, /Rogue River/i);
  assert.match(html, /"addressLocality":"Ashland"/i);
  assert.match(html, /"addressLocality":"Rogue River"/i);
});

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

test("published quote rates stay consistent across service pages", async () => {
  const driveway = await (await render("/services/driveway-cleaning")).text();
  const siding = await (await render("/services/siding-soft-washing")).text();
  const roofing = await (await render("/services/roof-cleaning")).text();
  const serviceArea = await (await render("/service-area/jackson-county-or")).text();

  assert.match(driveway, /\$0\.45 per square foot/);
  assert.match(driveway, /concrete or asphalt/i);
  assert.match(siding, /\$0\.30 per square foot/);
  assert.match(roofing, /\$0\.65 per square foot/);
  assert.match(serviceArea, /roof cleaning is \$0\.65 per square foot/i);
  assert.match(driveway, /\$175 per service/);
  assert.match(siding, /\$175 per service/);
  assert.match(roofing, /\$175 per service/);
  assert.doesNotMatch(roofing, /\$0\.30 per square foot/);
});

test("home offers an honest mobile photo-estimate path", async () => {
  const response = await render("/");
  const html = await response.text();
  const source = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");

  assert.match(html, /Enter square feet/);
  assert.match(html, /Use photos instead/);
  assert.match(html, /Take a photo/);
  assert.match(html, /capture=["']environment["']/i);
  assert.match(html, /cannot reliably show square footage or scale/i);
  assert.match(html, /cannot attach photos[^<]*automatically/i);
  assert.match(source, /No price was calculated from images alone/);
  assert.doesNotMatch(source, /readAsDataURL|data:image|base64/i);
});
