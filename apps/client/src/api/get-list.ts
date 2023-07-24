import { sort } from "./sort";

export const getList = (url: URL, data: Record<string, any>[]) => {
  const sortBy = url.searchParams.get("sortBy");
  const sortOrder = url.searchParams.get("sortOrder");
  const pageInString = url.searchParams.get("page");
  const limitInString = url.searchParams.get("limit");

  const computedData =
    sortBy && sortOrder ? data.sort(sort({ sortBy, sortOrder })) : data;

  const page = Number(pageInString);
  const limit = Number(limitInString);

  const startIndex = page * limit;
  const endIndex = startIndex + limit;

  return {
    totalCount: computedData.length,
    items: computedData.slice(startIndex, endIndex),
  };
};
