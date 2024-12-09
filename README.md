# tthew-website

This is the repo for my [personal website](https://ma.tthew.berlin).

Built with the web platform first on top of [11ty](http://11ty.dev).

## Getting Started

1. Make a directory and navigate to it:

```
mkdir website
cd website
```

2. Clone this Repository

```
git clone https://github.com/tthew/website.git 
```

Review `eleventy.config.js` and `_data/metadata.js` to configure the site’s options and data.

3. Install dependencies

```
npm install
```

4. Run Eleventy

Generate a production-ready build to the `_site` folder:

```
npx @11ty/eleventy
```

Or build and host on a local development server:

```
npx @11ty/eleventy --serve
```