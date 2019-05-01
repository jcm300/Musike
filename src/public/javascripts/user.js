$(()=> {
    $("#upButton").click(e => {
        e.preventDefault()
        var contentRaw = $("#formUpdate").serializeArray()
        var content = {} 
        $.map(contentRaw, function(n, i){
            content[n['name']] = n['value'];
        })
        $.ajax({
            type: "PUT",
            contentType: "application/json",
            url: url + "users/" + $("#user_id").val(),
            data: JSON.stringify(content),
            success: redirect => window.location.href = redirect,
            error: e => alert(JSON.stringify(e))
        })
    })

    $("#delete").click( e => {
        e.preventDefault()
        $.ajax({
            type: "DELETE",
            contentType: "application/json",
            url: url + "users/" + $("#delete").val(),
            success: redirect => window.location.href = redirect,
            error: e => alert(JSON.stringify(e))
        })
    })
})