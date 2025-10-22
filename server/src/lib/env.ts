export const env: Record<string, string> = {
  ...Object.entries(process.env).reduce((acc, [key, value]) => {
    acc[key] = value ?? ""; // replace undefined with empty string
    return acc;
  }, {} as Record<string, string>),
  PORT: process.env.PORT ?? "4002",
  MONGO_URI: process.env.MONGO_URI ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "fallback-secret",
};