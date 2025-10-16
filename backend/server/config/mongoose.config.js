const mongoose = require("mongoose");
const fs = require("fs");

// Get Windows host IP for WSL2 compatibility
let mongoHost = "127.0.0.1";
try {
	const resolvConf = fs.readFileSync("/etc/resolv.conf", "utf8");
	const match = resolvConf.match(/nameserver\s+(\S+)/);
	if (match) {
		mongoHost = match[1];
		console.log(`Using Windows host IP for MongoDB: ${mongoHost}`);
	}
} catch (err) {
	console.log("Could not read resolv.conf, using 127.0.0.1");
}

const mongoUrl = `mongodb://${mongoHost}:27017/assignment_exam`;

mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Established a connection to the assignment_exam DB"))
	.catch(err => console.log("Something went wrong when connecting to the assignment_exam DB", err));