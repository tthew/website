import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const token = process.env.API_TOKEN;

export default async function getPosts() {
	let posts = [];
	let assets = [];

	try {
		const craft = await fetch(process.env.API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				query: `query {
	wordsEntries {
		... on article_Entry {
			postDate
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

		console.info("⏬ Fetching remote data...");

		const response = await craft.json();

		console.info("✅ Success");

		if (response.errors) {
			let errors = response.errors;
			errors.map((error) => {
				console.log(error.message);
			});
			throw new Error("Aborting: CraftCMS errors");
		}

		posts = response.data.wordsEntries;
		assets = response.data.assets
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

		const postType = item.postType && item.postType.length ? item.postType[0].title : '';
		// console.log({item, postType});

		// const category = categories
		return {
			id: item.id,
			date: item.postDate,
			title: item.title,
			slug: item.slug,
			body,
			rssOnly: item.rssOnly,
			postType
		};
	});

	return formattedPosts;
}
