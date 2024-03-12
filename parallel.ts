import Tinypool from "tinypool";

import { PAGES } from "./const";

const pool = new Tinypool({
  filename: new URL("./base.js", import.meta.url).href,
});

export async function callOCRInParallel() {
  const promises = Array.from(Array(PAGES)).map((_, idx) => pool.run({ idx }));

  const result = await Promise.all(promises);

  return result[0];
}
