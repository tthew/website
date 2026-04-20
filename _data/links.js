import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const token = process.env.LINKS_SERVICE_TOKEN;
const linksServiceUrl = process.env.LINKS_SERVICE_URL

export default async function() {
    if (!linksServiceUrl) {
        console.info("⚠️  Skipping links fetch (no LINKS_SERVICE_URL set) — local dev stub");
        return [];
    }
    let links = [];
    try {
		console.info("⏬ Fetching links...");

        const response = await fetch(linksServiceUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        const data = await response.json();

		console.info("✅ Success");

        links = data.items;
    } catch (error) {
		console.error("⛔️ Error", error);
        // Fail gracefully
    }

    return links;
}