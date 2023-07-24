export type SortProps = { sortOrder: string; sortBy: string };

export const sort =
  ({ sortBy, sortOrder }: SortProps) =>
  (
    first: Record<string, string | number | Date>,
    second: Record<string, string | number | Date>
  ) => {
    if (
      sortOrder === "asc"
        ? first[sortBy] < second[sortBy]
        : first[sortBy] > second[sortBy]
    ) {
      return -1;
    }

    if (
      sortOrder === "asc"
        ? first[sortBy] > second[sortBy]
        : first[sortBy] < second[sortBy]
    ) {
      return 1;
    }

    return 0;
  };
