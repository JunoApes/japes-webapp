import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import react from "@vitejs/plugin-react";
import nodePolyfills from "rollup-plugin-polyfill-node";
import { defineConfig, loadEnv } from "vite";
import checker from "vite-plugin-checker";
import { createHtmlPlugin } from "vite-plugin-html";
import tsconfigPaths from "vite-tsconfig-paths";

// function renderChunks (deps) {
//   const chunks = {};
//   for (const key of Object.keys(deps)) {
//     if ([
//       'react',
//       'react-router-dom',
//       'react-dom',
//     ].includes(key)) {
//       continue;
//     }

//     chunks[key] = [
//       key,
//     ];
//   }

//   return chunks;
// }

export default defineConfig(({ mode }) => {
  const environment = loadEnv(mode, "env");

  return {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
      rollupOptions: {
        // output: {
        //   manualChunks: {
        //     vendor: [
        //       'react',
        //       'react-router-dom',
        //       'react-dom',
        //     ],
        //     ...renderChunks(dependencies),
        //   },
        // },
        plugins: [nodePolyfills()],
      },
      sourcemap: false,
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: "globalThis",
        },
        plugins: [
          NodeGlobalsPolyfillPlugin({
            buffer: true,
            process: true,
          }),
          // NodeModulesPolyfillPlugin(),
        ],
        target: "esnext",
      },
    },
    plugins: [
      react({
        include: ["**/*.tsx", "**/*.ts"],
      }),
      tsconfigPaths(),
      createHtmlPlugin({
        inject: {
          data: {
            ...environment,
            MODE: mode,
          },
        },
        minify: true,
      }),
      checker({
        typescript: true,
      }),
    ],
    resolve: {
      alias: [
        {
          find: "util",
          replacement:
            "./node_modules/rollup-plugin-node-polyfills/polyfills/util.js",
        },
        {
          find: "stream",
          replacement:
            "./node_modules/rollup-plugin-node-polyfills/polyfills/stream.js",
        },
        // {
        //   find: 'process',
        //   replacement: './node_modules/rollup-plugin-node-polyfills/polyfills/process-es6.js',
        // },
        {
          find: "crypto-addr-codec",
          replacement: "./node_modules/crypto-addr-codec/dist/index.js",
        },
        // {
        //   find: 'buffer',
        //   replacement: './node_modules/rollup-plugin-node-polyfills/polyfills/buffer-es6.js',
        // },
      ],
    },
    server: {
      hmr: true,
    },
  };
});
