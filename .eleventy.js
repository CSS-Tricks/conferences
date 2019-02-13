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

  config.addFilter("getMonthName", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc"
    }).toFormat("MMMM");
  })

  config.addFilter("doesConfExist", (conferences, monthToTest) => {
    let length = conferences.filter(conf => {
      let month = DateTime.fromJSDate(conf.data.date, {
        zone: "utc"
      }).toFormat("MMMM");
      return month === monthToTest
    }).length
    return length
  })

  config.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: "utc"
    }).toFormat("LLLL d, y");
  });

  config.addFilter("cssmin", function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  config.addPassthroughCopy("site/script");
  config.addPassthroughCopy("apple-touch-icon.png");
  config.addPassthroughCopy("favicon.ico");

  return {
    dir: { input: "site", output: "dist", includes: "_includes" },
    passthroughFileCopy: true,
    templateFormats: ["njk", "md", "css", "js"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
