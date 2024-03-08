import Tinypool from "tinypool";

import { LIMIT } from "./const";

const pool = new Tinypool({
  filename: new URL("./base.mjs", import.meta.url).href,
});

export async function callOCRInParallel() {
  const promises = Array.from(Array(LIMIT)).map(() => pool.run({}));

  const result = await Promise.all(promises);

  return result[0];
}
