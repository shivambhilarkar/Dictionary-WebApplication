// pixabay api for searching images
// dictionaryapi for searching words

const express = require("express");
const { json } = require("express/lib/response");
const app = express();
const request = require("request");

app.use("/public", express.static("public")); //to apply the css
// app.set("views", __dirname + "/views");

app.get("/", function (req, res) {
  //   res.send("we are on home page");
  res.render("blankpage.ejs");
});

app.get("/search", function (req, res) {
  const search_word = req.query.searchterm;

  let image_url = "";
  let image_url2 = "";
  let image_url3 = "";
  let image_url4 = "";
  let image_url5 = "";
  // searching images
  request(
    "https://pixabay.com/api/?key=25087537-8e68b5931a3c489c05d69a7fb&q=" +
      search_word,
    function (error, response, body) {
      var data = JSON.parse(body);
      if (data.hits.length > 5) {
        image_url = data.hits[1].previewURL;
        image_url2 = data.hits[2].previewURL;
        image_url3 = data.hits[3].previewURL;
        image_url4 = data.hits[4].previewURL;
        image_url5 = data.hits[5].previewURL;
        console.log(image_url);
      }
    }
  );
  console.log(image_url);
  // searching word
  request(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + search_word,
    function (error, response, body) {
      if (error) {
        console.log("there was error!!!");
      } else {
        var data = JSON.parse(body);
        // console.log(req.query.searchterm);
        // console.log(data[0].meanings[0].definitions[0].definition);
        // console.log(data[0].meanings[0].definitions[0].example);
        // console.log(data[0].phonetics[0].audio);
        // res.send(data);
        if (data.title === "No Definitions Found") {
          res.render("Notfoundpage.ejs");
        } else {
          res.render("homepage.ejs", {
            searchWord: req.query.searchterm.toString().toUpperCase(),
            wordMeaning: data[0].meanings[0].definitions[0].definition,
            wordExample: data[0].meanings[0].definitions[0].example,
            wordVoice: data[0].phonetics[0].audio,
            imageURL: image_url,
            imageURL2: image_url2,
            imageURL3: image_url3,
            imageURL4: image_url4,
            imageURL5: image_url5,
          });
        }
      }
    }
  );
});

app.listen(3000, function () {
  console.log("server is started");
});
