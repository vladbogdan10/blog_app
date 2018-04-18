var bodyParser = require("body-parser"),
    mongoose   = require("mongoose"),
    express    = require("express"),
    app        = express();

// APP CONFIG
mongoose.connect("mongodb://localhost:27017/blog_app");
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

// MONGOOSE/MODEL CONFIG
var blogSchema = new mongoose.Schema({
  title: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now()}
});

var Blog = mongoose.model("Blog", blogSchema);

// Blog.create(
//   {
//   title: "Just a post",
//   image: "https://images.unsplash.com/photo-1471115853179-bb1d604434e0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d1c8cc988efddbda8746281871c0c8bf&auto=format&fit=crop&w=1559&q=80",
//   body: "Just testing if the blog post works."
    
//   }, function(err, blog) {
//     if(err) {
//       console.log(err);
//     } else {
//       console.log("Newly created post: ");
//       console.log(blog);
//     }
//   });

// RESTUL ROUTES
app.get("/", function(req, res) {
  res.redirect("/blogs");
});


app.get("/blogs", function(req, res) {
  Blog.find({}, function(err, blogs) {
    if (err) {
      console.log("ERROR!");
    } else {
      res.render("index", {blogs: blogs});
    }
  });
});

app.listen(3000, function() {
  console.log("Server has started!!!");
});