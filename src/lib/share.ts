export const encodeState = (json: unknown) => {
  try {
    return encodeURIComponent(JSON.stringify(json));
  } catch {
    return '';
  }
};

