const { DateTime } = require("luxon");
const NunjucksInspect = require("nunjucks-inspect");

module.exports = function(config) {
  config.addCollection("conferences", function(collection) {
    return collection.getFilteredByGlob("site/conferences/*.md");
  });

  config.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc"
    }).toFormat("LLLL d, y");
  });

  config.addFilter("inspect", function(obj) {
    return new NunjucksInspect(obj);
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
