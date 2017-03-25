$(document).ready(function () {

    //DISABLED CHIRP BUTTON WHEN INPUT FIELD IS EMPTY
    $("#target").keyup(function () {
        var value = $("#target").val().length;
        if (value > 0) {
            $("#btn").prop("disabled", false);
        } else if (value < 0) {
            $("#btn").prop("disabled", true);
        }
    });
    //BUTTON CLICK TO POST A NEW CHIRP
    $("#btn").click(postChirp);
    //CLIENT GET REQUEST FOR ALL CHIPRS
    $.get("http://localhost:3000/api/chirps", function (success) {
        for (var i = 0; i < success.length; i++) {
            createLi(success[i]);
        }
    });
    //CLIENT GET REQUEST FOR ALL USERS
    $.get("http://localhost:3000/api/users", function (success) {
        for (var i = 0; i < success.length; i++) {
            userList(success[i]);
            // console.log(success[i]);
        }
    });
    //FUNCTION THAT ADDS ALL USERS TO THE DROP-DOWN BOX
    function userList(user) {
        // console.log(user);
        var newOpt = $("<option value=" + user.UserID + ">" + user.Name + "</option>");
        newOpt.text(user.UserName);
        $(".drop-down").append(newOpt);
    }
    //FUNCTION THAT ADDS NEW CHIRPS TO THE PAGE
    function createLi(chirp) {
        var chirpLoc = window.location.pathname + "/" + chirp.id;
        var newLi = $("<a href='"+chirpLoc+"'></a>");
        newLi.text(chirp.UserName + ": " + chirp.message);
        var newList = $("<li class='list-group-item list-group-item-success'></li>");
        newList.append(newLi)
        $(".list-group").append(newList);
    };
    //FUNCTION THAT ADDS NEW CHIPRS
    function postChirp(chirp) {
        var newChirp = {
            message: $("#target").val(),
            userID: Number($("select").val()),
            UserName: $("select").val()
        };
        //CLIENT POST REQUEST TO ADD A NEW CHIRP
        $.ajax({
            method: "POST",
            url: "http://localhost:3000/api/chirps",
            contentType: "application/json",
            data: JSON.stringify(newChirp)
        }).then(function (success) {
            console.log(success);
            //createLi(newChirp);
            //RELOADS THE PAGE
            location.reload();
            //CLEARS THE INPUT FIELD ONCE THE CHIRP HAS BEEN ADDED
            $("#target").val('');
        }), (function (err) {
            console.log("ERROR");
        });
    };
});