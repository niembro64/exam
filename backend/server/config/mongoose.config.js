const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/assignment_authors", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log("Established a connection to the assignment_authors DB"))
	.catch(err => console.log("Something went wrong when connecting to the assignment_authors DB", err));