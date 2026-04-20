import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";

const here = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      // server-only throws on import inside client modules in production.
      // In vitest we are not in the React client/server graph; alias it to
      // a no-op so server modules (like lib/content/standards.ts) can be tested.
      "server-only": path.join(here, "test", "server-only-stub.ts"),
      // Resolve our @/ path alias the same way Next does.
      "@": here
    }
  },
  test: {
    environment: "node",
    globals: false,
    include: ["**/*.test.ts"],
    exclude: ["**/node_modules/**", "**/.next/**", "**/content-synced/**"]
  }
});
