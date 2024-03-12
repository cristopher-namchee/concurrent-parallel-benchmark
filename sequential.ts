import callOCR from "./base";

import { PAGES } from "./const";

export async function callOCRSequentially() {
  const result = [];
  for (let i = 0; i < PAGES; i++) {
    const response = await callOCR(i);

    result.push(response);
  }

  return result[0];
}
