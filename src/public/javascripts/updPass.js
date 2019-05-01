function check(input) {
    var pass1 = document.getElementById('newPass1')
    var pass2 = document.getElementById('newPass2') 
    if (pass1.value != pass2.value) pass2.setCustomValidity('Password Must be Matching!');
    else pass2.setCustomValidity('');
}

$(() => {
    $("#upButton").click(e => {
        if(document.forms["formUpdatePass"].checkValidity()){
            e.preventDefault()
            var contentRaw = $("#formUpdatePass").serializeArray()
            var content = {prevPass: contentRaw[0].value, newPass: contentRaw[1].value}
            $.ajax({
                type: "PUT",
                contentType: "application/json",
                url: url + "users/updPass/" + $("#user_id").val(),
                data: JSON.stringify(content),
                success: redirect => window.location.href = redirect,
                error: e => alert(JSON.stringify(e))
            })
        }
    })
})