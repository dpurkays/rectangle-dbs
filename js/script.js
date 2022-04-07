$("#add_rect").submit(function(event){
    var inputWidth = document.getElementById("width").value;
    var inputHeight = document.getElementById("height").value;

    if(!isNaN(inputWidth) && !isNaN(inputHeight)) {
        alert("Rectangle added successfully");
    }
});

$("#update_rect").submit(function(event){
    event.preventDefault();
    var arr = $(this).serializeArray();
    var data = {}

    $.map(arr, function(n, i){
        data[n['name']] = n['value']
    })

    console.log(arr);

    var request = {
        "url":`http://localhost:3000/rectangles/${data.id}`,
        "method": "PATCH",
        "data":data
    }

    $.ajax(request).done(function(response){
        alert("Rectangle updated!")
    });
});

if(window.location.pathname =="/") {
    $onDelete = $(".table tbody td a.delete");
    $onDelete.click(function() {
        var id = $(this).attr("data-id");

        var request = {
            "url":`http://localhost:3000/rectangles/${id}`,
            "method": "DELETE",
        }
        $.ajax(request).done(function(response){
            alert("Rectangle Deleted!")
        });
        location.reload();
    });
}