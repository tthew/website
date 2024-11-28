// required packages
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

console.log("API", process.env.API_URL);
// DatoCMS token
const token = process.env.API_TOKEN;
// Authorization: Bearer 99vhAP-gMTebMr37PklK4IZTiZEWLM2T

// get blogposts
// see https://www.datocms.com/docs/content-delivery-api/first-request#vanilla-js-example
export default async function getAllBlogposts() {
	// max number of records to fetch per query
	const recordsPerQuery = 100;

	// number of records to skip (start at 0)
	let recordsToSkip = 0;

	// do we make a query ?
	let makeNewQuery = true;

	// Blogposts array
	let blogposts = [];

	// make queries until makeNewQuery is set to false
	while (makeNewQuery) {
		try {
			// initiate fetch
			const dato = await fetch(process.env.API_URL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					query: `
          query{
            wordsEntries {
              ... on article_Entry {
                dateCreated
                title
                body
                slug
                status
                rssOnly
              }
            }
            }
          `,
				}),
			});

			// store the JSON response when promise resolves
			const response = await dato.json();

			// handle DatoCMS errors
			if (response.errors) {
				let errors = response.errors;
				errors.map((error) => {
					console.log(error.message);
				});
				throw new Error("Aborting: DatoCMS errors");
			}

			console.log({ response });
			// update blogpost array with the data from the JSON response
			blogposts = blogposts.concat(response.data.wordsEntries);
			console.log(blogposts);

			// prepare for next query
			recordsToSkip += recordsPerQuery;

			// stop querying if we are getting back less than the records we fetch per query
			if (response.data.wordsEntries.length < recordsPerQuery) {
				makeNewQuery = false;
			}
		} catch (error) {
			throw new Error(error);
		}
	}

	// format blogposts objects
	const blogpostsFormatted = blogposts.map((item) => {
		return {
			id: item.id,
			date: item.dateCreated,
			title: item.title,
			slug: item.slug,
			// image: item.image.url,
			// imageAlt: item.image.alt,
			body: item.body,
		};
	});

	// return formatted blogposts
	return blogpostsFormatted;
}

// export for 11ty
