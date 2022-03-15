export function isEmpty(value) {
  return (
    value === null ||
    value === undefined ||
    (typeof value === "object" && Object.entries(value).length === 0) ||
    (typeof value === "string" && value.trim().length === 0)
  );
}
