

// Initial array of animals
var animals = ["Dog", "Cat", "Tortoise",];
function displayGiphy() {

    var animal = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=10&api_key=dc6zaTOxFJmzC";

    // Creating an AJAX call for the user animal button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        // Creating a div to hold the animal
        var animalDiv = $("<div class='animal'>");

        // Storing the rating data
        var rating = response.Rated;

        // Creating an element to have the rating displayed
        var pictureRating = $("<p>").text("Rating: " + rating);

        // Displaying the rating
        animalDiv.append(pictureRating);

        // Retrieving the URL for the image
        var imgURL = response.Giphy;

        // Creating an element to hold the image
        var image = $("<img>").attr("src", imgURL);

        // Appending the image
        animalDiv.append(image);

        // Putting the user named animal above the exising animal selected
        $("#animals-view").prepend(animalDiv);
    });

};

// Function for displaying movie data
function renderButtons() {

    // Deleting the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array of movies
    for (var i = 0; i < animals.length; i++) {

        // Then dynamicaly generating buttons for each animal in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
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
$("#add-animal").on("click", function(event) {
    event.preventDefault();
    // This line grabs the input from the textbox
    var animal = $("#animal-input").val().trim();

    // Adding animal from the textbox to our array
    animals.push(animal);

    // Calling renderButtons which handles the processing of the animal array
    renderButtons();
});

// Adding a click event listener to all elements with a class of "animal-btn"
$(document).on("click", ".animal-btn", displayGiphy);

// Calling the renderButtons function to display the intial buttons
renderButtons();






