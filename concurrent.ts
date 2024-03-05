import { callOCR } from "./base";

import { LIMIT } from "./const";

export async function callOCRConcurrently() {
  const promises = Array.from(Array(LIMIT)).map(() => callOCR());

  const result = await Promise.all(promises);

  return result[0];
}
