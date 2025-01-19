import { readFileSync, readdirSync } from "node:fs";

const json = readFileSync("items.json", "utf8"),
	items = JSON.parse(json);

console.log("Reading recipes...");
const recipes = readdirSync("../data/recycling/recipe");

console.log("Validating recipes...");
for (const recipe of recipes) {
	const contents = readFileSync(`../data/recycling/recipe/${recipe}`, "utf8"),
		data = JSON.parse(contents);

	let ingredients = [];

	if (data.ingredients) {
		ingredients = Array.isArray(data.ingredients) ? data.ingredients : [data.ingredients];
	} else if (data.ingredient) {
		ingredients = Array.isArray(data.ingredient) ? data.ingredient : [data.ingredient];
	}

	for (const ingredient of ingredients) {
		if (!items.includes(ingredient.item)) {
			console.log(`> ${recipe} contains invalid item ${ingredient.item}`);
		}
	}

	if (data.result && !items.includes(data.result.id)) {
		console.log(`> ${recipe} contains invalid result ${data.result.id}`);
	}
}

console.log("Done!");
