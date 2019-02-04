const { DateTime } = require("luxon");
const NunjucksInspect = require("nunjucks-inspect");

module.exports = function(config) {
  config.addCollection("conferences", function(collection) {
    let allConferences = collection.getFilteredByGlob("site/conferences/*.md");
    let futureConferences = allConferences.filter(conf => {
      return conf.data.date >= new Date();
    });
    return futureConferences;
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
  config.addPassthroughCopy("js");

  return {
    dir: { input: "site", output: "dist", includes: "_includes" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "css", "js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
