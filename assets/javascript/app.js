//var x = $(this).data("search");
//console.log(x);

//var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=KDVv6bLb02607c7iyb3KqFn200isVt6S";
//var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + x + "&api_key=KDVv6bLb02607c7iyb3KqFn200isVt6S";

//console.log(queryURL);

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
                AnimalImage.append(AnimalImage);
                $("#gifArea").prepend(AnimalDiv);

            }
        });
    }

    //Submit button click event takes search term from form input, trims and pushes to topics array, displays button
    $("#addAnimal").on("click", function (event) {
        event.preventDefault();
        var newAnimal = $("#AnimalInput").val().trim();
        topics.push(newAnimal);
        console.log(topics);
        $("#AnimalInput").val('');
        displayButtons();
    });

    //Function iterates through topics array to display button with array values in "myButtons" section of HTML
    function displayButtons() {
        $("#myButtons").empty();
        for (var i = 0; i < topics.length; i++) {
            var a = $('<button class="btn btn-primary">');
            a.attr("id", "animal");
            a.attr("data-search", topics[i]);
            a.text(topics[i]);
            $("#myButtons").append(a);
        }
    }


    displayButtons();

    //Click event on button with id of "animal" executes displayAnimal function
    $(document).on("click", "#animal", displayAnimal);

    //Click event on gifs with class of "AnimalGiphy" executes pausePlayGifs function
    $(document).on("click", ".AnimalGiphy", pausePlayGifs);

    //Function accesses "data-state" attribute and depending on status, changes image source to "data-animate" or "data-still"
    function pausePlayGifs() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

});
