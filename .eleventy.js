module.exports = function(config) {
  config.addCollection("conferences", function(collection) {
    return collection.getFilteredByGlob("site/conferences/*.md");
  });

  config.addPassthroughCopy("css");

  return {
    dir: { input: "site", output: "dist", includes: "_includes" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "css"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
