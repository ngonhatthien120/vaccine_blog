// Call the module
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const blogRouter = require('./routes/blog');
const Blog = require('./models/Blog');

// Clear valualble
const app = express();

// Connect DB
mongoose
	.connect(
		'mongodb+srv://nhatthien:12345@cluster0.dsdyt.mongodb.net/Thien?retryWrites=true&w=majority'
	)
	.then(console.log('MongoDB connected'))
	.catch((err) => console.log(err));

// Set View engine
app.set('view engine', 'ejs'); // For using EJS

// Set urlencoded for encoding
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// Route(Main)
app.get('/', async (req, res) => {
	let info = await Blog.find(); // array
	res.render('index', { infos: info });
});

// Route(Serve)
app.use('/blogs', blogRouter);

// Run Server
const port = process.env.PORT || 4000;
app.listen(port, () => {
	console.log(`Server is learning on http://localhost:${port}`);
});
