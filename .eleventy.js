const { DateTime } = require('luxon');
const CleanCSS = require('clean-css');
const urlParse = require('url-parse')
const pluginRss = require('@11ty/eleventy-plugin-rss');

module.exports = function(config) {
  config.addCollection('conferences', function(collection) {
    let allConferences = collection.getFilteredByGlob('site/conferences/*.md');
    let futureConferences = allConferences.filter(conf => {
      return conf.data.date >= new Date();
    });
    return futureConferences;
  });

  config.addCollection('pastconferences', function(collection) {
    let allConferences = collection.getFilteredByGlob('site/conferences/*.md');
    let pastConferences = allConferences.filter(conf => {
      return conf.data.date <= new Date();
    });
    return pastConferences;
  });

  config.addCollection('allconferences', function(collection) {
    return collection.getFilteredByGlob('site/conferences/*.md');
  });

  config.addFilter('domainRoot', rootUrl => {
    let domainObj = urlParse(rootUrl);
    return domainObj.hostname;
  });

  config.addFilter('getMonthName', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('MMMM');
  });

  config.addFilter('doesConfExist', (conferences, monthToTest) => {
    let length = conferences.filter(conf => {
      let month = DateTime.fromJSDate(conf.data.date, {
        zone: 'utc'
      }).toFormat('MMMM');
      return month === monthToTest;
    }).length;
    return length;
  });

  config.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('LLLL d, y');
  });

  config.addFilter('htmlTime', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('yyyy-MM-dd');
  });

  config.addFilter('cssmin', function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  config.addPlugin(pluginRss);

  config.addPassthroughCopy('site/script');
  config.addPassthroughCopy('site/images');
  config.addPassthroughCopy('site/admin');
  config.addPassthroughCopy('apple-touch-icon.png');
  config.addPassthroughCopy('favicon.ico');

  return {
    dir: { input: 'site', output: 'dist', includes: '_includes' },
    passthroughFileCopy: true,
    templateFormats: ['njk', 'md', 'css', 'js', 'html', 'yml'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
