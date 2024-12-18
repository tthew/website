import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const token = process.env.API_TOKEN;

// get words
export default async function getAllBlogposts() {
	// max number of records to fetch per query
	const recordsPerQuery = 100;

	// number of records to skip (start at 0)
	let recordsToSkip = 0;

	// do we make a query ?
	let makeNewQuery = true;

	// Blogposts array
	let blogposts = [];
	let assets = [];

	// make queries until makeNewQuery is set to false
	while (makeNewQuery) {
		try {
			// initiate fetch
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

			// store the JSON response when promise resolves
			const response = await craft.json();

			console.info("✅ Success");

			// handle CraftCMS errors
			if (response.errors) {
				let errors = response.errors;
				errors.map((error) => {
					console.log(error.message);
				});
				throw new Error("Aborting: CraftCMS errors");
			}

			// update blogpost array with the data from the JSON response
			blogposts = blogposts.concat(response.data.wordsEntries);
			assets = response.data.assets

			// prepare for next query
			recordsToSkip += recordsPerQuery;

			// stop querying if we are getting back less than the records we fetch per query
			if (response.data.wordsEntries.length < recordsPerQuery) {
				makeNewQuery = false;
			}
		} catch (error) {
			console.error("⛔️ Error");
			throw new Error(error);
		}
	}

	// format blogposts objects
	const blogpostsFormatted = blogposts.map((item) => {
		const assetTags = item.body.match((/\{asset\:(\d.*)\}/gm));
		let body = item.body;

		if (assetTags) {
			for (const assetMatch of assetTags) {
				const [,,id] = assetMatch.match(/\{(asset:(\d+))\}/);
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

	return blogpostsFormatted;
}
