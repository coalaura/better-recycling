import { join } from "node:path";
import { writeFileSync } from "node:fs";
import { homedir } from "node:os";
import yauzl from "yauzl";

const base = join(homedir(), "AppData", "Roaming", ".minecraft"),
	version = "1.21.1";

const jar = join(base, "versions", version, `${version}.jar`),
	target = "assets/minecraft/lang/en_us.json";

console.log("Reading jar file...");

yauzl.open(jar, { lazyEntries: true }, (err, zip) => {
	if (err) {
		console.error("Error opening ZIP file:", err);

		return;
	}

	zip.readEntry();

	zip.on("entry", entry => {
		if (entry.fileName === target) {
			zip.openReadStream(entry, (err, readStream) => {
				if (err) {
					console.error("Error opening read stream:", err);

					return;
				}

				let content = "";

				readStream.on("data", chunk => {
					content += chunk.toString("utf-8");
				});

				readStream.on("end", () => {
					console.log("Extracting items...");

					const lang = JSON.parse(content);

					extractItems(lang);
				});

				readStream.on("error", err => {
					console.error("Error reading stream:", err);
				});
			});
		} else {
			zip.readEntry();
		}
	});

	zip.on("error", err => {
		console.error("ZIP error:", err);
	});
});

function extractItems(lang) {
	const items = [];

	for (const key in lang) {
		let item;

		if (key.startsWith("item.minecraft.")) {
			item = key.substring(15);
		} else if (key.startsWith("block.minecraft.")) {
			item = key.substring(16);
		}

		if (item && !item.includes(".")) {
			item = `minecraft:${item}`;

			if (!items.includes(item)) {
				items.push(item);
			}
		}
	}

	items.sort();

	const json = JSON.stringify(items, null, 4);

	writeFileSync("items.json", json, "utf-8");
}
