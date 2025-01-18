const { readFileSync, writeFileSync } = require("node:fs");

const variants = [
		"blackstone",
		"andesite",
		"stone",
		"cobblestone",
        "mossy_cobblestone",
        "smooth_stone",
		"granite",
		"diorite",
		"cobbled_deepslate",
		"sandstone",
		"red_sandstone",
		"cut_red_sandstone",
		"cut_sandstone",
		"polished_andesite",
		"polished_granite",
		"polished_diorite",
		"blackstone",
		"polished_blackstone",
        "polished_deepslate",
        "smooth_quartz",
        "quartz",
        "smooth_sandstone",
        "smooth_red_sandstone",
        "tuff",
        "polished_tuff",
        "prismarine",
        "dark_prismarine",
        "purpur",
        ["end_stone_brick", "end_stone_bricks"],
        ["prismarine_brick", "prismarine_bricks"],
        ["deepslate_brick", "deepslate_bricks"],
        ["deepslate_tile", "deepslate_tiles"],
        ["tuff_brick_slab", "tuff_bricks"],
		["brick", "bricks"],
        ["stone_brick", "stone_bricks"],
        ["mossy_stone_brick", "mossy_stone_bricks"],
		["nether_brick", "nether_bricks"],
		["red_nether_brick", "red_nether_bricks"],
        ["polished_blackstone_brick", "polished_blackstone_bricks"]
	],
	input = "{variant}_stairs",
	output = "{variant}";

for (const variant of variants) {
    const inputVariant = Array.isArray(variant) ? variant[0] : variant,
        outputVariant = Array.isArray(variant) ? variant[1] : variant;

	const inputItem = input.replace("{variant}", inputVariant),
		outputItem = output.replace("{variant}", outputVariant);

	const path = `./data/recycling/recipe/crafting_recycle_${inputItem}.json`;

	const recipe = {
		type: "minecraft:crafting_shapeless",
		category: "building",
		ingredients: [
			{
				item: `minecraft:${inputItem}`,
			},
			{
				item: `minecraft:${inputItem}`,
			},
		],
		result: {
			id: `minecraft:${outputItem}`,
			count: 2,
		},
	};

	writeFileSync(path, JSON.stringify(recipe, null, 4));
}
