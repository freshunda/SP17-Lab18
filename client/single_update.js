$(document).ready(function () {
    var id = window.location.pathname.split("/")[2];
    $.get("http://localhost:3000/api/chirps/" + id, function (success) {
        $("#usr").text("User: " + success[0].UserName);
        $("#msg").val(success[0].message);
    })

    $("#updatebtn").click(function () {
        updateChirp(id);
        window.location.replace("http://localhost:3000/chirps/" + id)
    })
});

function updateChirp(id) {
    var chngChirp = {
        userID: id,
        message: $("#msg").val()
    }
    $.ajax({
        method: "PUT",
        url: "http://localhost:3000/api/chirps/" + id,
        contentType: 'application/json',
        data: JSON.stringify(chngChirp)
    }).then(function (success) {
    })
};