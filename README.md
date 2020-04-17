# PUBG Events Website
https://events.pubg.com/

## Running Locally

If you wanna spin it up, after an `npm install`, you should be able to run `npm start` to generate and serve the site with hot reload and all that jazz.

## Contributing

### Adding an Event

Check out /site/conferences/ for a bunch of `.md` files. Tossing a file in there following that format (YYYY-conf-city.md) should do the trick.

Feel free to send me PR (Pull Request) of new conferences.

Note:

- To be listed, events need to be about front-end.
- Events need to provide a custom Code of Conduct, and not just link to confcodeofconduct.com, because that provides nothing actionable for an attendee with a problem.

After a PR is merged, it will trigger a Netlify build that rebuilds the production site. 
