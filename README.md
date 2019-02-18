<p align="center">
  <a href="https://tthew.berlin">
    <img alt="Matt Richards: Web Developer Berlin" src="./src/images/site-logo.png" width="60" />
  </a>
</p>

[React]: https://reactjs.org
[Gatsby]: http://gatsbyjs.org
[Contentful]: https://app.contentful.com/

# tthew-website

This repo contains the source code for the https://tthew.berlin website.

It's built using [React] & [Gatsby] integrated with [Contentful] and was bootstrapped using the [gatsby-starter-default](https://github.com/gatsbyjs/gatsby-starter-default) boilerplate and modified according to my needs.

Feel free to take a poke around.

## Installation

First things first, you need to clone this repo and install it's dependencies:

```sh
$ git clone https://github.com/tthew/website.git
$ cd ./website
$ npm install
```

##  Start developing

In order to get started, you'll need to have a pre configured [Contentful] space and then set the following env variables:

```sh
TTHEW_SITE_CONTENTFUL_SPACE_ID="<SPACE_ID>"
TTHEW_SITE_CONTENTFUL_ACCESS_TOKEN="<ACCESS_TOKEN>"
```

Then launch the dev server:

```sh
gatsby develop
```

This site is now running at `http://localhost:8000`!

For more information check out the [Gatsby] documentation.

# Licenses

All content (text, images, audio, video) is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons Licence" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a>

Code is licensed under the [MIT license](./LICENSE).
