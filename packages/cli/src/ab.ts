import Pastel from "pastel";

const app = new Pastel({
  importMeta: import.meta,
  name: "ab",
});

await app.run();
