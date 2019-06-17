const { DateTime } = require('luxon');
const CleanCSS = require('clean-css');
const urlParse = require('url-parse')
const pluginRss = require('@11ty/eleventy-plugin-rss');
const slugify = require('slugify');

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

  config.addFilter("firstLine", firstString => {
    let partString = firstString.split(/[ ,]+/);
    let ret = "";
    if( partString[ 0 ] ) {
      ret += partString[ 0 ];
    }
    if( partString[ 1 ] ) {
      ret += " " + partString[ 1 ];
    }
    return ret;
  });

  config.addFilter("secondLine", firstString => {
    let partString = firstString.split(/[ ,]+/);
    let ret = "";
    if( partString[ 2 ] ) {
      ret += " " + partString[ 2 ];
    }
    if( partString[ 3 ] ) {
      ret += " " + partString[ 3 ];
    }
    return ret;
  });

    config.addFilter("thirdLine", firstString => {
    let partString = firstString.split(/[ ,]+/);
    let ret = "";
    if( partString[ 4 ] ) {
      ret += " " + partString[ 4 ];
    }
    if( partString[ 5 ] ) {
      ret += " " + partString[ 5 ];
    }
    return ret;
  });

  config.addFilter('htmlTime', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('yyyy-MM-dd');
  });

  config.addFilter('cssmin', function(code) {
    return new CleanCSS({}).minify(code).styles;
  });

  // override the slug filter to be more restrictive
  // eg. for confereces with parenthesis or Script'19
  slugify.extend(
    {"'": '-'},
    {'(': ''},
    {')': ''},
  )
  config.addFilter('slug', function(value) {
    return slugify(value, {
      replacement: "-",
      lower: true
    });
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
