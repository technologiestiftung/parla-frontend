module.exports = {
	extends: "@technologiestiftung/semantic-release-config",
	npmPublish: false,
	branches: [{ name: "main" }],
	plugins: [
		"@saithodev/semantic-release-backmerge",
		{
			backmergeBranches: ["staging"],
		},
	],
};
