---
title: "HTML & CSS First Progressively Enhanced Global Theme Switch"
description: ""
pubDate: "Jan 2024"
draft: false
heroImage: "/mountain-glitch-4.webp"
---

## Table of contents

## 📝 HTML Web Components (Custom Elements)

The web has come a long way since its humble beginnings and some of its more recent features are particularly impressive.

Instead of needing to reach for frameworks we now have at our fingertips an enormous amount of power through the native web platform web.

One perfect example of this is leveraging a simple "HTML Web Component" and the `:has()` CSS selector to control the theme of page. This is global state management folk, admittedly in it's simplest of interpretations, but we'll get in to that more a bit further on. Before we get into all that though, take a look at the following HTML & CSS. Toggling the checkbox on and off will change the foreground and background of the page.

<p class="codepen" data-height="300" data-default-tab="html,result" data-slug-hash="VwReeVp" data-user="lucidmoon" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/lucidmoon/pen/VwReeVp">
  Untitled</a> by Matt Richards (<a href="https://codepen.io/lucidmoon">@lucidmoon</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Let's take a look at that more closely, first up we defined a custom element `<theme-switch>` which contains a label and a checkbox input:

```html
<theme-switch>
  <label>
    <span>Toggle dark mode</span>
    <input type="checkbox" data-theme-switch-input />
  </label>
</theme-switch>
```

Next up the CSS. Here we configure some custom properties (CSS variables) set the `--fg` and `--bg` properties to `--dark` and `--light` respectively, apply the foreground and background properties to the body element, and then finally we make use of the `:has()` selector to then override the `--fg` and `--bg` properties if the input is checked, reversing the colour scheme.

```css
:root {
  --dark: #000;
  --light: #fff;
  --fg: var(--dark);
  --bg: var(--light);
}

body {
  background: var(--bg);
  color: var(--fg);
}

body:has(theme-switch input[data-theme-switch-input]:checked) {
  --fg: var(--light);
  --bg: var(--dark);
}
```

Obviously this is a simple example, but it should give you a good enough idea of the potential we're unleashing here. This is global state management, with a few lines of HTML & CSS, no javascript required.

How could we take things further?

Well first up, we could make the switch look a bit more like, you know, a switch.

## 💅 Make it pretty

Before we diving into our own custom solution, it's worth pausing to note the work being done on [Webkit to bring this UI pattern to the web platform](https://webkit.org/blog/14885/release-notes-for-safari-technology-preview-185/), with `<input type="checkbox" switch />` support landing in Safari Technology Preview 185.

With all said and done, and with browser support remaining limited to Safari TP at the time of writing, we're going roll our own solution with CSS.

This is what we're going to be building:

<p class="codepen" data-height="300" data-theme-id="dark" data-default-tab="result" data-slug-hash="PoLZNoa" data-user="lucidmoon" style="height: 300px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/lucidmoon/pen/PoLZNoa">
  Untitled</a> by Matt Richards (<a href="https://codepen.io/lucidmoon">@lucidmoon</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>

Building upon the same HTML & CSS we used in the previous `<theme-switch>` example, we can acheive the desired look and feel with an additional sprinkling of CSS:

```css
/* 1 */
theme-switch input[data-theme-switch-input] {
  appearance: none;
  position: relative;
  display: inline-block;
  background: lightgrey;
  height: 1.2lh;
  width: 2lh;
  vertical-align: middle;
  border-radius: 33px;
  box-shadow: 0px 1px 3px #0003 inset;
  transition: 0.25s linear;
  font-size: 1.5rem;
}

/* 2 */
theme-switch input[data-theme-switch-input] {
  content: "";
  display: block;
  width: 0.9lh;
  height: 0.9lh;
  background: var(--back);
  border-radius: 1.2rem;
  position: absolute;
  top: 0.13lh;
  left: calc(1lh * 0.155);
  box-shadow: 0px 1px 3px #003;
  opacity: 1;
  outline: none;
  transform: translateX(0rem);
}

/* 3 */
@media (prefers-reduced-motion: no-preference) {
  theme-switch input[data-theme-switch-input]::before {
    transition: 0.25s linear transform, 0.25s linear outline,
      0.25s ease-out background-color;
  }
}

/* 4 */
theme-switch input[data-theme-switch-input]:focus {
  outline-color: transparent;
}

theme-switch input[data-theme-switch-input]:focus-visible {
  outline: 2px solid blue;
  outline-offset: 2px;
}

/* 5 */
theme-switch input[data-theme-switch-input]:checked {
  background: none;
  outline: 1px solid #fff;
}

theme-switch input[data-theme-switch-input]:checked::before {
  transform: translateX(0.8lh);
  background: #fff;
}
```

1. Make the `input` look like the switch container
2. Style the `::before` psudeo selector to look like the toggle button
3.
4. Apply some focus styles
5. Finally we style the `input:checked` state

And there we have it. A custom global theme select switch, that actually looks like a switch that allows us to control global state with HTML and CSS and no drop of Javascript. Not too shabby.

## ✨ _Enhance_, Progressively

Ok so, cool trick, but where else could we take this?

There are a couple of things we could do to enhance the experience, _progressively_, based on the capabilities of the device being used and the user's preferences.

Wouldn't it be nice, for example, if we could also persist the state of the theme toggle somehow, so that when the user returns to the website, their preference is automatically applied?

What if the user prefers darkmode at the OS level, or prefers to view websites with reduced motion? Could we use these preferences to serve the user exactly the kind of experience that they prefer?

The answer to both of those questions is emphatically _yes_ and that's exactly what we're going to do!

Fortunately for us, the web platform supports all of these use cases:

1. We can use a CSS media query to control the reduced motion experience
2. We can use a sprikling of Javascript to read the prefers-dark-mode media query and set the correct theme accordingly
3. ...and we can use a cookie to persist the `<theme-switch>` state and combined with some client-side Javascript and server side rendering

For the Javascript parts we're going to be making use of the web component APIs so that we can turn our our custom `<theme-switch>` element into a proper full blown Web Component.

But for the server-side rendering part, we're going to need a server.

We could write our own custom SSR implementation in any of a number of languages of our choosing, and that might even be fun, but what if there were a tool that could help us?

Enter <a href="https://enhance.dev">Enhance.dev</a>.

Enhance is an "HTML First Full Stack Web Framework". It provides a low surface area, convention based API not disimilar to other meta frameworks like NextJS and astro do, but rather than being desinged (or even coupled to in the case of Next) for use with javascript frameworks, Enhance pushes an HTML first, web component progressive enhancement approach instead, and it provides us with all the tools we need to achieve our goals.

### 🔧 Enhance your self

To <a href="https://enhance.dev/docs/#get-started">get started</a>, we're first going to need to create a new enhance project:

```sh
npx "@enhance/cli@latest" new ./theme-switch -y
```

Once we've done that, we need to change into the `./theme-switch` directiory, install the node dependencies and then fire up the dev server:

```sh
cd ./theme-switch
npm i
npm start
```

Your `app/` directory should now look like this:

```sh
app
└── pages ............. file-based routing
    └── index.html

```

The first thing we're going to need is an `elements/` directory, so we can go ahead and create that, and then once that's done, we can go ahead and create a file named `theme-switch.mjs` and place it in the elements directory.

The `app/` directory should now look like this:

```sh
app
└── elements .......... HTML custom element pure functions
    └── theme-switch.mjs
└── pages ............. file-based routing
    └── index.html

```

Then inside `app/elements/theme-switch.mjs` we write the following render function code:

```typescript
function ThemeSwitch({ html }) {
  return html`
    <label>
      <span class="sr-only">Toggle dark mode</span>
      <input type="checkbox" name="checkbox" />
    </label>
  `;
}
```

Now let's head over to `app/pages/index.html` and replace the entire contents of the file with the following:

```html
<style scope="global">
  :root {
    --dark: var(--gray-900);
    --light: whitesmoke;
  }

  body:not(body:has(theme-switch[theme="dark"])),
  body:not(body:has(theme-switch input[data-theme-switch-input]:checked)) {
    --fore: var(--dark);
    --back: var(--light);
  }

  body:has(theme-switch[theme="dark"]),
  body:has(theme-switch input[data-theme-switch-input]:checked) {
    --fore: var(--light);
    --back: var(--dark);
  }

  body {
    background: var(--back);
    color: var(--fore);
  }

  .sr-only:not(:focus):not(:active) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
</style>

<theme-switch></theme-switch>
```

Taking a quick look at the CSS, we can see that we have a similar setup to our previous examples, with the addition of an `.sr-only` utility class which we can use to hide visual content outside of a screen reader context. That's one of our goals solved already ✅.

Before moving on, let's add the styling to the custom element too:

```typescript
function ThemeSwitch({ html, state }) {
  return html`
    <label>
      <span class="sr-only">Toggle dark mode</span>
      <input type="checkbox" data-theme-switch-input />
    </label>

    <style>
      :host label {
        display: flex;
      }

      :host input[data-theme-switch-input] {
        appearance: none;
        position: relative;
        display: inline-block;
        background: lightgrey;
        height: 1lh;
        width: 1.75lh;
        vertical-align: middle;
        border-radius: 33px;
        box-shadow: 0px 1px 3px #0003 inset;
        transition: 0.25s linear;
      }

      :host input[data-theme-switch-input]:checked::before {
        transform: translateX(0.6lh);

      :host input[data-theme-switch-input]::before {
        content: "";
        display: block;
        width: calc(1lh * 0.8);
        height: calc(1lh * 0.8);
        background: var(--back);
        border-radius: 1.2rem;
        position: absolute;
        top: calc(1lh * 0.09);
        left: calc(1lh * 0.155);
        box-shadow: 0px 1px 3px #0003;
        opacity: 1;
        outline: none;
        transform: translateX(0rem);
      }

      @media (prefers-reduced-motion: no-preference) {
        :host input[data-theme-switch-input]::before {
          transition: 0.25s linear transform, 0.25s linear outline,
            0.25s ease-out background-color;
        }
      }

      :host input[data-theme-switch-input]:focus {
        outline-color: transparent;
      }

      :host label input:focus-visible {
        outline: 2px solid hsl(--accent-h, --accent-s, --accent-l);
        outline-offset: 2px;
      }

      :host input[data-theme-switch-input]:checked {
        background: transparent;
        outline: 1px solid hsl(var(--accent-h), var(--accent-s), var(--accent-l));
      }

      :host input[data-theme-switch-input]:checked::before {
        background: hsl(var(--accent-h), var(--accent-s), var(--accent-l));
      }
    </style>
  `;
}
```

If we now jump over to <a href="http://localhost:3333">http://localhost:3333</a> we should see our custom `<theme-switch></theme-switch>` element being rendered in the browser, and interacting with it should change the page's theme.

#### 🧙‍♀️ _What magic is this?_

_At server-render, before returning the HTML to the browser, Enhance parses the HTML for custom elements and then tries to find a corresponding render function file with the a matching filename located in the `elements/` directory, e.g. if it finds `<theme-switch></theme-switch>` it'll look for a file called `elements/theme-switch.mjs`, call the render function, and inject the returned HTML before returning the whole HTML file to the browser to render_.

### 🍪 Delicious Morsels!

To persist the selected theme preference, we're going to be leveraging cookies.

To do so, there are two sides of the problem to solve:

1. The cookie parsing & server-side rendering part
2. and the setting the cookie when the user changes their preference

For the first part we're going to make use of the Enhance API, er, API, and for the second we're going to be leveraging some Javascript to write a web component.

Let's start with the server-side first.

Let's create an `app/api/` directory in our project, and then add an `index.mjs` file with the following contents:

```typescript
/** @type {import('@enhance/types').EnhanceApiFn} */

export async function get(req) {
  const cookies = parseCookies(req.cookies);
  const theme = cookies.get("theme") || "light";

  return {
    json: { theme },
  };
}

function parseCookies(cookies) {
  return new Map(
    cookies?.map((cookie) => {
      const [key, value] = cookie.split("=");
      return [key, value];
    })
  );
}
```

The `app/` directory should look like this:

```sh
app
└── api ............... API routes
    └── index.mjs
└── elements .......... HTML custom element pure functions
    └── theme-switch.mjs
└── pages ............. file-based routing
    └── index.html
```

Similar to how Enhance matches custom elements with filenames in the `app/elements/` directory, Enhance also tries to match page routes with api routes, and if it finds a matching one exporting a `get()` function, then it'll call that function and returned `json` data available to our custom element render functions through the `state.store` value via the `state` argument that the render function accepts as it's second argument.

Let's create a new `AppNav` render function in `app/elements/app-nav.mjs` which will serve as a wrapper to our `<theme-switch>` in order for us to grab the `theme` value from `state.store` and apply it as a `theme` attribute on the scheme switch:

```typescript
function AppNav({ html, state }) {
  const theme = state?.store?.theme || "light";

  return html`<nav>
    <theme-switch theme="${theme}"></theme-switch>
  </nav>`;
}
```

Now everytime the index route is rendered, the `get` API call will check the headers the browser sends for the theme cookie, and if it finds one, it'll return the value to our server-side render functions, or fall back to `light` if it doesn't find one.

Then in our `AppNav` custom element render function, we try to grab the theme from the `state.store` and set that as the `theme` attribute on our `<theme-switch>` element.

One thing we shouldn't forget though is that we still need to update our `app/pages/index.html` and replace the `<theme-switch>` with our new `<app-nav>` element:

```diff
- <theme-switch></theme-switch>
+ <app-nav></app-nav>
```

Great, so now have the server-side part of the setup solved, next we're going to write some Javascript to help turn our custom element into a full blown Web Component, which we can use to encapsulate the additional progressive enhancements we've still yet to solve.

We could do all of this in vanilla Javascript, but as we're having so much fun with Enhance, let's checkout `@enhance/element`, which provides a bit of boilerplate & syntactical around writing and registering web components.

Before using `@enhance/element`, we're going to need to install the dependency into our project:

```sh
npm i @enhance/element
```

Now let's create an `app/components/` directory inside our project folder and add a new file to it named `theme-switch.mjs` with the following contents:

```typescript
import enhance from "@enhance/element";
import ThemeSwitch from "../elements/theme-switch.mjs";

enhance("theme-switch", {
  render: ThemeSwitch,
  attrs: ["theme"],
  connected: async (el) => {
    const { matches: prefersDarkmode } = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    this.setTheme = setTheme.bind(el);
    el.switchEl = el.querySelector(
      "theme-switch input[data-theme-switch-input]"
    );
    el.switchEl.addEventListener("change", this.setTheme);

    const theme = await window.cookieStore.get("theme");

    if (theme?.value === "light") {
      return;
    }

    if (prefersDarkmode) {
      el.switchEl.checked = true;
    }
  },
  disconnected: (el) => {
    el.switchEl.removeEventListener("change", this.setTheme);
  },
  setTheme(e) {
    const theme = e.target.checked ? "dark" : "light";
    this.setAttribute("theme", theme);
    document.cookie = `theme=${theme}; path=/`;
  },
});
```

The `app/` directory should now look like this:

```sh
app
└── api ............... API routes
    └── index.mjs
└── components......... Web Components
    └── theme-switch.mjs
└── elements .......... HTML custom element pure functions
    └── app-nav.mjs
    └── theme-switch.mjs
└── pages ............. file-based routing
    └── index.html
```

And lastly we need to create a `browser/` directory and add an `index.mjs` file to it with the following contents:

```js
import "../components/theme-switch.mjs";
```

Our final `app/` directory structure should look like this:

```sh
app
└── api ............... API routes
    └── index.mjs
└── browser ........... Browser bundle
    └── index.mjs
└── components......... Web Components
    └── theme-switch.mjs
└── elements .......... HTML custom element pure functions
    └── app-nav.mjs
    └── theme-switch.mjs
└── pages ............. file-based routing
    └── index.html
```

Now if we head back over to the dev server in our web browser, when we change our preference by toggling the checkbox/switch in the UI, our web compoennt will take care of setting the cookie value, then if we refresh the page, our preference is persisted and we're presented with the last theme preference we set.

## 🚀 Demo

<iframe width="100%" height="800px" src="https://make-mnr.begin.app/"></iframe>

You can check out the <a href="https://make-mnr.begin.app/">full demo here</a> and the <a href="https://github.com/tthew/enhance-theme-switch">full code over on Github</a>.
