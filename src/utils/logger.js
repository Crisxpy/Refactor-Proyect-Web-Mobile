export function log(message, level = "info", data = null) {
  const timestamp = new Date().toISOString();
  const entry = { timestamp, level, message, data };
  console.log(JSON.stringify(entry));
  return entry;
}
