const { DateTime } = require('luxon');
const CleanCSS = require('clean-css');
const urlParse = require('url-parse');
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

  config.addFilter('getConferenceYears', conferences => {
    let result = conferences.reduce((years, conf) => {
      let current_year = DateTime.fromJSDate(conf.data.date, {
        zone: 'utc'
      }).year;
      if (years.indexOf(current_year) === -1) {
        years.push(current_year);
      }
      return years;
    }, []);
    result.sort();
    return result;
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

  config.addFilter('checkDate', (dateObj, month, year) => {
    let current_month = DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('MMMM');
    let current_year = DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).year;
    return current_month === month && current_year === year;
  });

  config.addFilter('doesConfExist', (conferences, monthToTest, yearToTest) => {
    let length = conferences.filter(conf => {
      let month = DateTime.fromJSDate(conf.data.date, {
        zone: 'utc'
      }).toFormat('MMMM');
      let year = DateTime.fromJSDate(conf.data.date, {
        zone: 'utc'
      }).year;
      return month === monthToTest && year === yearToTest;
    }).length;
    return length;
  });

  config.addFilter('readableDate', dateObj => {
    return DateTime.fromJSDate(dateObj, {
      zone: 'utc'
    }).toFormat('LLLL d, y');
  });

  config.addFilter('firstLine', firstString => {
    let partString = firstString.split(/[ ,]+/);
    let ret = '';
    if (partString[0]) {
      ret += partString[0];
    }
    if (partString[1]) {
      ret += ' ' + partString[1];
    }
    return ret;
  });

  config.addFilter('secondLine', firstString => {
    let partString = firstString.split(/[ ,]+/);
    let ret = '';
    if (partString[2]) {
      ret += ' ' + partString[2];
    }
    if (partString[3]) {
      ret += ' ' + partString[3];
    }
    return ret;
  });

  config.addFilter('thirdLine', firstString => {
    let partString = firstString.split(/[ ,]+/);
    let ret = '';
    if (partString[4]) {
      ret += ' ' + partString[4];
    }
    if (partString[5]) {
      ret += ' ' + partString[5];
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
  slugify.extend({ "'": '-' }, { '(': '' }, { ')': '' });
  config.addFilter('slug', function(value) {
    return slugify(value, {
      replacement: '-',
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
    templateFormats: ['njk', 'md', 'css', 'html'],
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk'
  };
};
