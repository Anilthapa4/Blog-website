
import express from "express";
import bodyParser from "body-parser";
import ejs from "ejs";
import _ from "lodash";//challange 18

const homeStartingContent = "We Welcome You everyone to the daily journal created by chillflat.Here we post some of the article written by us and our friends.Hope you will go through it once and please let us known if you have anything like this so that we will post to it too.Thank You and enjoy the article.";
const aboutContent = "Welcome To Our Daily Journal by Chillflats.We Are Chillflatians and this is our daily journal."
const contactContent = "If You Have any Queries Let us know to earliest.Sorry For the Convenience caused.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    homeContent: homeStartingContent,
    posts: posts
  }//1st posts is name & 2nd posts is array
  );
});
app.get("/about", function (req, res) {
  res.render("about", { abtContent: aboutContent });
});
app.get("/contact", function (req, res) {
  res.render("contact", { cntContent: contactContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});
app.post("/", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    author: req.body.postAuthor
  };

  posts.push(post);

  res.redirect("/");

});

//challange 16/17
app.get("/post/:topic", function (req, res) {

  const requestedTitle = _.lowerCase(req.params.topic);//using lodash for chllge 18

  //this is a routing paramters where we can use routing technique to redirect page to various path using a common name which is specified as :topic.
  posts.forEach(function (post) {

    const storedTitle = _.lowerCase(post.title);

    if (requestedTitle === storedTitle) {
        res.render("post",{
          title:post.title,
          content:post.content,  
          author:post.auhtor  //challange 19
        });
      };
    });
  });











app.listen(3000, function () {
  console.log("Server started on port 3000");
});
