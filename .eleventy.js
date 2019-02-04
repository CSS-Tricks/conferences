const { DateTime } = require("luxon");
const CleanCSS     = require("clean-css");

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

  config.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // config.addPassthroughCopy("css");
  // config.addPassthroughCopy("script");

  return {
    dir: { input: "site", output: "dist", includes: "_includes" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "css", "js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
