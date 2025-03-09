const api = process.env.REACT_APP_API_KEY;

if (!api) {
  throw new Error("REACT_APP_API_KEY is not defined in the environment variables");
}

export const baseURL: string = api;