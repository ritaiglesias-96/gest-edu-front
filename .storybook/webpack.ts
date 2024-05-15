// Export a function. Accept the base config as the only param.
import path from "path";
import webpack, { Configuration, RuleSetRule } from "webpack";

const introPath = path.resolve(__dirname, "./intro");
const srcPath = path.resolve(__dirname, "../app");

export const webpackFinal = async (config: Configuration) => {
  if (config.resolve?.alias) {
    const alias = config.resolve.alias as { [key: string]: string };
    alias["@"] = srcPath;
  }

  if (config.module?.rules) {
    const rules = config.module.rules as RuleSetRule[];
    rules.forEach((rule) => {
      if ((rule.test as RegExp)?.test(".svg")) rule.exclude = /\.svg$/;
    });
    rules.push(
      {
        test: /\.css$/,
        include: introPath,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              url: true,
              importLoaders: 1,
              modules: { mode: "local" },
            },
          },
        ],
      },
      { test: /\.svg$/i, use: ["@svgr/webpack"] },
      { test: /\.(glsl|hlsl|vert|frag)$/i, type: "asset/source" },
    );
  }

  config.plugins?.push(
    new webpack.ProvidePlugin({ Buffer: ["buffer", "Buffer"] }),
  );

  return config;
};
