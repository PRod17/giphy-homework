

// Initial array of animals
var animals = ["Dog", "Cat", "Tortoise",];
function displayGiphy() {
    console.log("displayGiphy function fired");
    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=dc6zaTOxFJmzC";

    // Creating an AJAX call for the user animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var data = response.data;
        console.log(data);

        for (var i = 0; i < data.length; i++) {
            // Creating a div to hold the animal
            var animalDiv = $("<div class='col-12 col-md-4'>");

            // Storing the rating data
            var rating = data[i].rating;
            console.log(rating);

            // Creating an element to have the rating displayed
            var gifRating = $("<p>").text("Rating: " + rating);

            // Displaying the rating
            animalDiv.append(gifRating);

            // Retrive still image
            var stillURL = response.data[i].images.fixed_width_still.url;

            // Retrieving the URL for the image
            var imgURL = response.data[i].images.fixed_width.url;
            console.log(imgURL);
            // Retrieving still URL
            // var fixedURL = response.data[i].images.fixed_width_still.url;
            // console.log(fixedURL)
            // Creating an element to hold the image
            var image = $("<img>").attr("src", imgURL);
            image.attr("src", stillURL);
            image.attr("data-still", stillURL);
            image.attr("data-animate", imgURL);
            image.attr("data-state", "still");
            image.attr("class", "gifs");

            // Appending the image
            animalDiv.append(image);

            // Putting the user named animal above the exising animal selected
            $("#animal-view").prepend(animalDiv);
        }
    });

};

// Function for displaying animal data
function renderButtons() {

    // Deletes animals before adding new animals

    $("#buttons-view").empty();

    // Looping through the array of animals
    for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each animal in the array
        var a = $("<button>");
        // Adding a class of animal-btn to our button
        a.addClass("animal-btn");
        // Adding a data-attribute
        a.attr("data-name", animals[i]);
        // Providing the initial button text
        a.text(animals[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
};

// This function handles events where an animal button is clicked
$("#add-animal").on("click", function (event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding animal from the textbox to our array
    animals.push(animal);

    // Calling renderButtons which handles the processing of the animal array
    renderButtons();
});
// on.click to change state of gif
$(document).on("click",".gifs", function() {
    console.log("click workin");
var state = $(this).attr("data-state");

if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
} else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
}
});


// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayGiphy); {

   

};

// Calling the renderButtons function to display the intial buttons
renderButtons();






