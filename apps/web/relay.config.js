module.exports = {
  src: ".",
  schema: "../api/schema.graphql",
  exclude: ["**/node_modules/**", "**/__generated__/**"],
  extensions: ["ts", "tsx"],
  language: "typescript",
};
