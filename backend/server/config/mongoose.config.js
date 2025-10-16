const mongoose = require("mongoose");

// Use environment variable or default to localhost
// Production EC2 will use its own localhost MongoDB
// Local dev can set MONGODB_URI if needed
const mongoUrl = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/assignment_exam';

mongoose.connect(mongoUrl, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log('Connected to MongoDB at', mongoUrl))
	.catch(err => console.error('Mongo connect error:', err));