import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();
const token = process.env.LINKS_SERVICE_TOKEN;
const linksServiceUrl = process.env.LINKS_SERVICE_URL

export default async function() {
    let links = [];
    try {
        const response = await fetch(linksServiceUrl, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            }
        });

        const data = await response.json();
        links = data.items;
    } catch (error) {
        console.error(error);
    }

    return links;
}