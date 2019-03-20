    // DEFINE GLOBAL VARIABLES HERE
    var searchClicked = false;
    $("#search").on('click', function(e) {
        e.preventDefault();
        var searchVal = $("#search-input").val();
        window.location.href = `facts.html?search=${searchVal}&searched=true`;
        searchClicked = true;
        console.log(searchClicked);
    })
