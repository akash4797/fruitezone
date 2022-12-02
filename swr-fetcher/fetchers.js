import { pocketClient } from "../lib/pocketbase";
export const productFetch = async () => {
  try {
    const records = await pocketClient.records.getFullList(
      "products",
      200 /* batch size */,
      {
        sort: "-created",
      }
    );
    return records;
  } catch (e) {
    console.log(e);
  }
};
