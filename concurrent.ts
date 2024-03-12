import callOCR from "./base";

import { PAGES } from "./const";

export async function callOCRConcurrently() {
  const promises = Array.from(Array(PAGES)).map((_, idx) => callOCR(idx));

  const result = await Promise.all(promises);

  return result[0];
}
