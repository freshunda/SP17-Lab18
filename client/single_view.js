$(document).ready(function () {
    var id = window.location.pathname.split("/")[2];
    console.log(id);
    $.get("http://localhost:3000/api/chirps/" + id, function (success) {
        console.log(success);
        var newChirp = $("<li class='list-group-item list-group-item-success'></li>");
        var newUl = $("<ul class='list-group'></ul>");
        newChirp.text(success[0].UserName + ": " + success[0].message);
        newUl.append(newChirp);
         $("#chirp-container").append(newUl);
    })

    $("#delbtn").click(function () {
        var r = confirm("Are you sure you want to delete?");
        if (r == true) {
            deleteChirp(id);
            window.location.replace("http://localhost:3000/chirps")
        }
    });

    var updateLoc = window.location.pathname + "/update/";

    $("#editbtn").click(function () {
        $("#edit").attr("href", updateLoc);
    });

    //FUNCTION TO DELETE CHIRPS
    function deleteChirp(id) {
        $.ajax({
            method: "DELETE",
            url: "http://localhost:3000/api/chirps/" + id
        }).then(function (success) {
            console.log(success);
        })
    };
});