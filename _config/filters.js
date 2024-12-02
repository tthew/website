import { DateTime } from "luxon";
import markdownParser from "markdown-it";
import Prism from "prismjs";
import loadLanguages from "prismjs/components/index.js";
import jsdom from "jsdom";

loadLanguages(["css", "html", "typescript", "jsx", "tsx"]);

const getLanguage = (lang) => {
	if (lang === "typescript") {
		return Prism.languages.tsx;
	}
	return Prism.languages[lang] || Prism.languages.javascript;
};

const markdown = markdownParser({
	html: true,
	linkify: true,
	typographer: true,
	highlight: function (str, lang) {
		if (lang) {
			try {
				return Prism.highlight(str, getLanguage(lang), lang);
			} catch (__) {}
		}

		return ""; // use external default escaping
	},
});

export default function (eleventyConfig) {
	eleventyConfig.addFilter("readableDate", (dateObj, format, zone) => {
		// Formatting tokens for Luxon: https://moment.github.io/luxon/#/formatting?id=table-of-tokens
		return DateTime.fromJSDate(new Date(dateObj), {
			zone: zone || "utc",
		}).toFormat(format || "dd LLLL yyyy");
	});

	eleventyConfig.addFilter("htmlDateString", (dateObj) => {
		// dateObj input: https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
		return DateTime.fromJSDate(dateObj, { zone: "utc" }).toFormat("yyyy-LL-dd");
	});

	// Get the first `n` elements of a collection.
	eleventyConfig.addFilter("head", (array, n) => {
		if (!Array.isArray(array) || array.length === 0) {
			return [];
		}
		if (n < 0) {
			return array.slice(n);
		}

		return array.slice(0, n);
	});

	// Return the smallest number argument
	eleventyConfig.addFilter("min", (...numbers) => {
		return Math.min.apply(null, numbers);
	});

	// Return the keys used in an object
	eleventyConfig.addFilter("getKeys", (target) => {
		return Object.keys(target);
	});

	eleventyConfig.addFilter("filterTagList", function filterTagList(tags) {
		return (tags || []).filter((tag) => ["all", "posts"].indexOf(tag) === -1);
	});

	eleventyConfig.addFilter("getNewestWordsDate", (words) => {
		return words.at(words.length - 1).date;
	});

	eleventyConfig.addFilter("toDate", (str) => {
		return new Date(str);
	});

	eleventyConfig.addFilter("webWords", (words) => {
		return words.filter(({ rssOnly }) => rssOnly !== true);
	});

	eleventyConfig.addFilter("markdown", (content) => {
		return markdown.render(content);
	});

	eleventyConfig.addFilter("blurb", (htmlString) => {
		const dom = new jsdom.JSDOM(htmlString);
		const p = dom.window.document.querySelector("p");
		const textContent = p.textContent;

		if (textContent.length > 200) {
			return textContent.split(0, 200) + "…";
		}

		return textContent;
	});
}
