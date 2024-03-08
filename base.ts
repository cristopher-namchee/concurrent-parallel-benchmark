import { MOCK_RESULT } from "./const";

export default async (idx: number) => {
  console.log(`Calling OCR-${typeof idx === "object" ? idx!["idx"] : idx}`);

  const ocrResult = await fetch(
    "https://40ba5d67-25ee-40f8-9027-4d064f218821.mock.pstmn.io",
    {
      method: "POST",
      body: new FormData(),
    }
  );

  const body = await ocrResult.json();

  const uploadResult = await fetch(
    "https://40ba5d67-25ee-40f8-9027-4d064f218821.mock.pstmn.io/upload",
    {
      method: "POST",
      body: new FormData(),
    }
  );

  return MOCK_RESULT;
};
