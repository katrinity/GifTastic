# GifTastic

This assignment makes use of the GIPHY API to make a dynamic web page that populates with gifs of your choice.

This app displays buttons related to an animal and allows  to add search terms to generate additional buttons that when clicked, accesses the GIPHY API and generates 10 static GIPHY images. Click on an image to pause or play the GIF.Every gif is displayed its rating (PG, G, etc.).

Technologies Used
HTML
CSS Bootstrap
JavaScript 
jQuery 
AJAX 

Event listeners on "click" were utilized as follows:
To execute the function that adds topics to the array: $("#addAnimal").on("click", function(event)
To display the gifs to the page by clicking on the topic buttons: $(document).on("click", "#animal", displayAnimal).
To pause and play the gifs by clicking on the Gifs: $(document).on("click", ".AnimalGiphy", pausePlayGifs).


     $(document).ready(function () {
    //Array for searched topics to be added
    var topics = [];

    //Function with AJAX call to GIPHY; Q parameterc for API link set to search term, limit 10 results
    //Create div with respective still and animate image sources with "data-state", "data-still" and "data-animate" attributes
    function displayAnimal() {

        var x = $(this).data("search");
        console.log(x);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=KDVv6bLb02607c7iyb3KqFn200isVt6S";

        console.log(queryURL);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            var results = response.data;
            console.log(results);
            for (var i = 0; i < results.length; i++) {

                var AnimalDiv = $("<div class='col-md-4'>");

                var rating = results[i].rating;
                var defaultAnimatedSrc = results[i].images.fixed_height.url;
                var staticSrc = results[i].images.fixed_height_still.url;
                var AnimalImage = $("<img>");
                var p = $("<p>").text("Rating: " + rating);

                AnimalImage.attr("src", staticSrc);
                AnimalImage.addClass("AnimalGiphy");
                AnimalImage.attr("data-state", "still");
                AnimalImage.attr("data-still", staticSrc);
                AnimalImage.attr("data-animate", defaultAnimatedSrc);
                AnimalImage.append(p);
                AnimalDiv.append(AnimalImage, p);
                $("#gifArea").prepend(AnimalDiv);

            }
        });
    }

Deployed project link https://katrinity.github.io/GifTastic/
