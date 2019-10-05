# Game Library CMS React App

Using FaunaDB to store data, IGDB for game data, Netlify for hosting, Netlify Identity, and Netlify functions for...functions.

Probably also React-Material-UI or some other pattern library to build this thing.

## Notes

### 2019-10-05

Got the connection with FaunaDB/Netlify functions working (locally at least). Running `netlify dev` to start both CRA and the functions server locally, with a proxy in package.json so function requests can be root relative rather than absolute. Next up is a function to connect to the IGDB api for search, and then this puppy is rollin!