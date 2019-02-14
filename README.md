# CSS-Tricks Conference Listing Site

https://conferences.css-tricks.com/


## Running Locally

If you wanna spin it up, after an `npm install`, you should be able to run `npm start` to generate and serve the site with hot reload and all that jazz.


## Contributing

Check out /site/conferences/ for a bunch of `.md` files. Tossing a file in there following that format (YYYY-conf-city.md) should do the trick.

Feel free to send me PR (Pull Request) of new conferences.

After I merge in a PR, it will trigger a Netlify build an rebuild the production site. I also set up a Zapier thing to rebuild the site each day, which should remove old conferences as they pass automatically.

I'd also be open to making the design better and adding nice features (sorting? automatic map generation?), but talk to me (chriscoyier@gmail.com) first about it. I just don't wanna waste your time if our ideas don't align.
