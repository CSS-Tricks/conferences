module.exports = function(config) {
  config.addCollection("conferences", function(collection) {
    return collection.getFilteredByGlob("site/conferences/*.md");
  });

  return {
    dir: {
      input: "site",
      output: "dist"
    },
    templateFormats: ["njk", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
