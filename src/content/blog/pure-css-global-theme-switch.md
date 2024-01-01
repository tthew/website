---
title: "HTML & CSS First Progressively Enhanced Global Theme Switch"
description: ""
pubDate: "Dec 29 2023"
draft: false
# heroImage: "/mountain-glitch-4.webp"
---

Church-key bicycle rights irony, tofu taiyaki YOLO lumbersexual fanny pack sus gorpcore pug butcher pitchfork. Mustache trust fund shoreditch cardigan, everyday carry same typewriter bitters flexitarian unicorn adaptogen austin hell of vegan poke.

## ✨ Enhance your self

<a href="https://enhance.dev">Enhance.dev</a>, I'm baby occupy copper mug roof party swag tote bag bushwick raw denim marxism celiac ugh PBR&B vaporware gochujang dreamcatcher ethical.

```typescript
function ThemeSwitch({ html, state }) {
  const checked = state?.attrs?.theme === "dark" ? "checked" : "";

  return html`
    <label>
      <span class="sr-only">Toggle dark mode</span>
      <input type="checkbox" name="checkbox" ${checked} />
    </label>

    <style>
      :host label {
        display: flex;
      }

      :host input[type="checkbox"] {
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

      :host input[type="checkbox"]:checked::before {
        transform: translateX(0.6lh);
      }

      :host input[type="checkbox"]::before {
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
        transition: 0.25s linear transform, 0.25s linear outline,
          0.25s ease-out background-color;
        transform: translateX(0rem);
      }

      :host input[type="checkbox"]::focus {
        outline-color: transparent;
      }

      :host label input::focus-visible {
        outline: 2px solid hsl(--accent-h, --accent-s, --accent-l);
        outline-offset: 2px;
      }

      :host input[type="checkbox"]:checked {
        background: transparent;
        outline: 1px solid hsl(var(--accent-h), var(--accent-s), var(--accent-l));
      }

      :host input[type="checkbox"]:checked::before {
        background: hsl(var(--accent-h), var(--accent-s), var(--accent-l));
      }
    </style>
  `;
}
```

I'm baby occupy copper mug roof party swag tote bag bushwick raw denim marxism celiac ugh PBR&B vaporware gochujang dreamcatcher ethical. Squid pop-up pour-over, slow-carb prism enamel pin vice. Hella viral bodega boys freegan williamsburg disrupt polaroid.

```typescript
function AppNav({ html, state }) {
  const theme = state?.store?.theme || "light";

  return html`<nav>
    <theme-switch theme="${theme}"></theme-switch>
  </nav>`;
}
```

```typescript
import { parseCookies } from "../utils/parse-cookies.mjs";

/** @type {import('@enhance/types').EnhanceApiFn} */
export async function get(req) {
  const cookies = parseCookies(req.cookies);
  const theme = cookies.get("theme") || "light";

  return {
    json: { theme },
  };
}
```

```typescript
export function parseCookies(cookies) {
  return new Map(
    cookies?.map((cookie) => {
      const [key, value] = cookie.split("=");
      return [key, value];
    })
  );
}
```

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
    el.switchEl = el.querySelector("theme-switch input");
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
