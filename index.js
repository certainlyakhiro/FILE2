const { spawn } = require("child_process");
const logger = require("./System/logger");

function startProject() {
	const child = spawn("node", ["main.js"], {
		cwd: __dirname,
		stdio: "inherit",
		shell: true
	});

	child.on("close", (code) => {
		if (code == 2) {
			logger.info("Restarting Project...");
			startProject();
		}
	});
}

startProject();