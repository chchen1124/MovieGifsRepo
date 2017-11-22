    //array of movies/books called topics
    var topics=[$("#meatball").text(),$("#sharktale").text(),$("#lordofrings").text()];
    //happens when buttons of class show are clicked 
    $(".show").on("click", function() {

      //get the attribute of data-tvshow and put it in the queryURL
      var myshow = $(this).attr("data-tvshow");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        myshow + "&api_key=dc6zaTOxFJmzC&limit=5";

      //ajax call will get the results from the response that has been gotten back from the server side
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {

         console.log(response);
         var results=response.data;
         $(".container2").empty();
         //loop through the results (which are the gifs) and display their ratings, also set the src attributes for each image to the still image url
         for(var i = 0; i < results.length; i++) 
         {
          console.log(results[i]);
          var showDiv=$("<div>");
          var p=$("<p>").text("Rating: "+results[i].rating);
          var showImage=$("<img>");
          //sets the src attribute to the still image url
          showImage.attr("src",results[i].images.fixed_height_still.url);
          //set the data-state to still
          showImage.attr("data-state","still");
          //set the data-still attribute to the still image url
          showImage.attr("data-still",results[i].images.fixed_height_still.url);
          //set the data-animate attribute to the animated image url
          showImage.attr("data-animate",results[i].images.fixed_height.url);
          //add new class called new-im
          showImage.addClass("new-im");
          showDiv.append(p);
          showDiv.append(showImage);
          $(".container2").prepend(showDiv);
        // ==================================
         }

      });

    });
//}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Function for creating the buttons
      function renderButtons() {

        // Deleting the tv shows prior to adding new tv shows
        // (this is necessary otherwise you will have repeat buttons)
        $(".container1").empty();

        // Looping through the array of tv shows
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each show in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of show to our button
          a.addClass("show");
          // Adding a data-attribute called data-tvshow
          a.attr("data-tvshow", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-appear-here div
          $(".container1").append(a);
        }
      }
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
       //occurs when the button in the form has been clicked
       $("#add_button").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var topic = $("#enter_something").val().trim();
        // Adding tv show from the textbox to our array
        topics.push(topic);
        // Calling renderButtons which handles the processing of our topics array
        var t=$("<button>");
        t.addClass("show");
        t.attr("data-tvshow",topic);
        t.text(topic);
        $(".container1").append(t); 
      });
//////Shows the info such as the rating of each gif for this specific tv show///////////////////////////////////////////////////////////////////
      function DisplayMoreInfo()
      {
        $(".container2").empty();
        var topico = $(this).attr("data-tvshow");
        var queryURLer = "http://api.giphy.com/v1/gifs/search?q=" +
        topico + "&api_key=dc6zaTOxFJmzC&limit=5";
        $.ajax({
          url: queryURLer,
          method: "GET"
        }).done(function(resp) {
          console.log(resp);
          var laresults=resp.data;
          console.log(resp.data);
          for (var i = 0; i < laresults.length; i++) {
            var laDiv=$("<div>");
            var p=$("<p>").text("Rating: "+laresults[i].rating);
            var laImage=$("<img>");
            laImage.attr("src",laresults[i].images.fixed_height_still.url);
            laImage.attr("data-still",laresults[i].images.fixed_height_still.url);
            laImage.attr("data-animate",laresults[i].images.fixed_height.url);
            laImage.attr("data-state","still");
            laImage.addClass("new-im");
            laDiv.append(p);
            laDiv.append(laImage);  
            $(".container2").prepend(laDiv);
          }
        });
      }
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Adding a click event listener to all elements with a class of "show" and also invoking the DisplayMoreInfo function
      $(document).on("click", ".show", DisplayMoreInfo);

      //function for animating and pausing the giffy images
      $(document).on("click", ".new-im", function(){
          var hey1 = $(this).attr("data-state"); //gets and stores the data-state for a gif  
          var state = $(this).attr("src"); //stores the src attribute in a variable called state
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (hey1 === "still") 
          {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          }
          else 
          {
            $(this).attr("src",$(this).attr("data-still"));
            $(this).attr("data-state","still");
          }
      });