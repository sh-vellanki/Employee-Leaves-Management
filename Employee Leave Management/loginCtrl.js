var URL = "https://fir-1c7de-default-rtdb.firebaseio.com";
function checkIsNull(value) {
    return value === "" || value === undefined || value === null ? true : false;
}
function loginUser() {
    let requestBody = {
        "emailId": $("#emailId").val(),
        "password": $("#pwdId").val()
    }
    if (checkIsNull($("#emailId").val()) || checkIsNull($("#pwdId").val())) {
        alert("Please fill Required Data");
    } else {
        $.ajax({
            type: 'get',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            url: URL + "/leaveApplyRegister.json",
            data: JSON.stringify(requestBody),
            success: function (lresponse) {
                let loginUserList = [];
                for (let i in lresponse) {
                    let data = lresponse[i];
                    data["userId"] = i;
                    loginUserList.push(data);
                }
                //if (typeof (Storage) !== "undefined") {
                // Store
                let isValid = false;
                for (let i = 0; i < loginUserList.length; i++) {
                    if (loginUserList[i].emailId == $("#emailId").val() && loginUserList[i].password == $("#pwdId").val()) {
                        isValid = true;
                        localStorage.setItem("userId", loginUserList[i].userId);
                        localStorage.setItem("admin", loginUserList[i].admin);
                        window.location.href = "leaveApplySystem.html";

                    }
                }
                if (!isValid) {
                    alert("User not found");
                }

                //}
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
}
function registerUser() {

    if (checkIsNull($("#userNameId").val()) || checkIsNull($("#dobId").val()) || checkIsNull($("#userEmailId").val())
        || checkIsNull($("#passwordId").val()) || checkIsNull($("#contactId").val()) || checkIsNull($("input[name='genderRadio']:checked").val())
        || checkIsNull($("#dojId").val()) || checkIsNull($("#designationId").val())) {
        alert("Please fill all the required data");
    } else {
        let requestBody = {
            "userName": $("#userNameId").val(),
            "designationId": $("#designationId").val(),
            "dob": $("#dobId").val(),
            "dojId": $("#dojId").val(),
            "emailId": $("#userEmailId").val(),
            "password": $("#passwordId").val(),
            "contactNum": $("#contactId").val(),
            "gender": $("input[name='genderRadio']:checked").val(),
            "admin": $('#admin').is(":checked")
        }
        $.ajax({
            type: 'post',
            contentType: "application/json",
            dataType: 'json',
            cache: false,
            cache: false,
            url: URL + "/leaveApplyRegister.json",
            data: JSON.stringify(requestBody),
            success: function (lresponse) {
                $('#regModelId').modal('hide');
                alert("Registerd sucessfully!!!");
            }, error: function (error) {
                alert("Something went wrong");
            }
        });
    }
}
function resetData() {
    $("#userNameId").val("");
    $("#dobId").val("");
    $("#userEmailId").val("");
    $("#passwordId").val("");
    $("#contactId").val("");
    $("input[type=radio][name=genderRadio]").prop("checked", false);
    $("#designationId").val("");
    $("#dojId").val("")

}
$(document).ready(function () {
    $('#regModelId').on('hidden.bs.modal', function (e) {
        resetData();
    })
});
