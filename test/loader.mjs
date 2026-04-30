// test/loader.mjs
export async function resolve(specifier, context, defaultResolve) {
  return defaultResolve(specifier, context);
}
export async function getFormat(url, context, defaultGetFormat) {
  return defaultGetFormat(url, context);
}
export async function getSource(url, context, defaultGetSource) {
  return defaultGetSource(url, context);
}
