# Frontend Takehome for Williams Sonoma
## July 29, 2019

Styles used:
- SASS, added `node-sass` to project dependencies and created script `sass` to watch the `/scss` folder and place processed scss in the `/css` folder.

I added the JSON file to a fake endpoint I made on my github, fetching using the Fetch API to asynchronously create DOM elements. If the fetch doesn't work, a different screen renders saying that there was an error. Given more time, I'd add more to this loading screen to make it more engaging or to route the user to more relevant content.

Once the data is fetched, I send the group of objects to a function that renders the body of the page in another file (`components.js`). This file has a series of functions that render different pieces of the DOM, manipulating it based on a user's actions or keystrokes (press `esc` when on the modal!) Given more time, I'd love to add more animations to the tiles showing the products, and make it feel more like a gallery that links out to their respective source pages.

This page is responsive and the items in storage persist through page reloads or window closures.

Given more time, I'd also add routes and unit tests to ensure that each piece renders either expected content, or placeholder content letting the user know more content is coming.