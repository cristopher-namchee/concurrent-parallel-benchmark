import { MOCK_RESULT } from "./const";

const delay = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

export default async (idx: number) => {
  // Let's say that OCR receipt took 1s
  await delay(1000);

  // and saving the result to S3 took 200ms
  // await delay(200);

  return MOCK_RESULT;
};
