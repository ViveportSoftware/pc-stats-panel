"use strict";
const STREAMABLE_MODEL_VERSION = "2.1.11";
const ENVIRONMENT = "staging";
const SHARED_ASSETS_PATH =
  "https://stream-stage.viverse.com/assets/streamablemodel/shared-assets/";
const PLAYER_URL = `https://stream-stage.viverse.com/assets/streamablemodel/${STREAMABLE_MODEL_VERSION}/`;
importScripts(`${PLAYER_URL}lib/index-min.js`);
const CACHE_NAME = "model-cache";
self.addEventListener("install", (event) => {
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});
self.addEventListener("fetch", (event) => {
  if (event.request.headers.has("range"))
    if (
      event.request.url.includes("stream.viverse.com") ||
      event.request.url.includes("stream-stage.viverse.com")
    ) {
      event.preventDefault();
      event.respondWith(handleRangeRequest(event.request));
    }
});
async function handleRangeRequest(request) {
  let url = request.url;
  let db = await idb.openDB("files", 1, {
    upgrade(db) {
      db.createObjectStore("files");
    },
  });
  let { start, end } = getRangeIndices(request.headers.get("range"));
  let cachedResponse = await db.get("files", `${url}_${start}_${end}`);
  if (cachedResponse) {
    let data = cachedResponse.slice(0, cachedResponse.byteLength);
    let headers = new Headers();
    headers.append(
      "Content-Range",
      `bytes ${start}-${end ? end : ""}/${cachedResponse.byteLength}`
    );
    return new Response(data, { status: 206, headers: headers });
  } else {
    let networkResponse = await fetch(request);
    if (networkResponse && networkResponse.status === 206) {
      let data = await networkResponse.clone().arrayBuffer();
      await db.put("files", data, `${url}_${start}_${end}`);
      return networkResponse;
    } else return networkResponse;
  }
}
function getRangeIndices(rangeHeader) {
  let [start, end] = rangeHeader.replace(/bytes=/, "").split("-");
  return { start: Number(start), end: end ? Number(end) : null };
}
