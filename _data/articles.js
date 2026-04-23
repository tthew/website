import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const token = process.env.API_TOKEN;

export default async function getPosts() {
	if (!process.env.API_URL) {
		console.info("⚠️  Skipping words fetch (no API_URL set) — local dev stub");
		return [];
	}
	let posts = [];
	let assets = [];

	try {
		console.info("⏬ Fetching articles...");

		const craft = await fetch(process.env.API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				query: `query {
	wordsEntries(rssOnly:false
	) {
		... on article_Entry {
			postDate
			dateUpdated
			title
			body
			slug
			status
			rssOnly
			postType {
				title
			}
		}
	}

	assets(volume: "images")  {
		id
		url @transform(width: 1544 mode:"fit")
		alt
		
	}
}
          `,
			}),
		});


		const response = await craft.json();

		console.info("✅ Success");

		if (response.errors) {
			let errors = response.errors;
			errors.map((error) => {
				console.log(error.message);
			});
			throw new Error("Aborting: CraftCMS errors");
		}

		posts = response.data.wordsEntries.filter(artcile => !artcile.rssOnly);
		assets = response.data.assets
		console.log({posts: posts.map(p => p.title)})
	} catch (error) {
		console.error("⛔️ Error");
		throw new Error(error);
	}

	const formattedPosts = posts.map((item) => {
		const assetTags = item.body.match((/\{asset\:(\d.*)\}/gm));
		let body = item.body;

		if (assetTags) {
			for (const assetMatch of assetTags) {
				const [, , id] = assetMatch.match(/\{(asset:(\d+))\}/);
				const asset = assets.find((asset) => `${asset.id}` === id);
				if (asset) {
					body = body.replaceAll(`{asset:${id}}`, `![${asset.alt || ''}](${asset.url})`);
				}
			}
		}

		const postType = "article";

		return {
			id: item.id,
			date: item.postDate,
			dateUpdated: item.dateUpdated || item.postDate,
			title: item.title,
			slug: item.slug,
			body,
			rssOnly: item.rssOnly,
			postType
		};
	});

	return formattedPosts;
}
