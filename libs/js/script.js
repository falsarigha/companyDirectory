$(window).on("load", function() {
    $("loader-container").hide();
});

var searchBar = $("#searchBar").val();
var location;
var department;
var id;

$(document).ready(function() {
    getResult();
    filter();
    getDepartment();
    getLocation();
    searchBar();
// populate select department

    function getDepartment(){
        $.ajax({
            url:"libs/php/getAllDepartments.php",
            type: "POST",
            dataType: "json",
            success: function (result) {

                let departmentResult = result.data

                //sidebar


                $.each(departmentResult, function (index) {

                $("#selectDepartments").append(
                    $("<option>", {
                    value: result.data[index].id,
                    text: result.data[index].name,

                    }),
                );
                //var department = result.data[index].id;
                // console.log(department);
                });

                //modal Add

                $.each(departmentResult, function (index) {

                    $("#departmentSelectAdd").append(
                    $("<option>", {
                        value: result.data[index].id,
                        text: result.data[index].name,

                    }),
                    );
                });

                //modal Edit

                $.each(departmentResult, function (index) {

                    $("#departmentSelectEdit").append(
                    $("<option>", {
                        value: result.data[index].id,
                        text: result.data[index].name,

                    }),
                    );
                });
            },
            error: function (request, status, error) {
                console.log(request,status,error);
            },

        });
    }

// populate select location
    function getLocation(){
        $.ajax({
            url:"libs/php/getAllLocations.php",
            type: "POST",
            dataType: "json",
            success: function (result) {

                let locationResult = result.data

                //sidebar

                $.each(locationResult, function (index) {
                $("#selectLocations").append(
                    $("<option>", {
                    value: result.data[index].id,
                    text: result.data[index].name,

                    }),
                );
                //var location = result.data[index].id;
                //   console.log(location);
                });

                //modal add
                $.each(locationResult, function (index) {
                    $("#locationSelectAdd").append(
                    $("<option>", {
                        value: result.data[index].id,
                        text: result.data[index].name,

                    }),
                    );
                });

                //modal edit
                $.each(locationResult, function (index) {
                    $("#locationSelectEdit").append(
                    $("<option>", {
                        value: result.data[index].id,
                        text: result.data[index].name,

                    }),
                    );
                });

            },
            error: function (request, status, error) {
                console.log(request,status,error);
            },

        });
    }
// get all results
    function getResult() {

    var output;
    $.ajax({
        url:"libs/php/getAll.php",
        method: "POST",
        dataType: "json",
        success: function(result){

            let databaseData= result.data;

             console.log(databaseData);

            $.each(databaseData, function(key, value){

            output += "<tr id="+value.id+">";
            output += "<td class=\"names\">"+value.lastName+ ' ' +value.firstName+"</td>";
            output += "<td>"+value.email+"</td>";
            output += "<td>"+value.location+"</td>";
            output += "<td>"+value.department+"</td>";
            output += "<td><button type=\"button\" data-bs-toggle=\"modal\" data-bs-target=\"#editEmployee\" class='editBtn'><i class=\"edit far fa-edit\"></i></button>" +
                "<button type=\"button\" data-bs-toggle=\"modal\" data-bs-target=\"#removeCard\" class= remove><i class=\"delete fas fa-trash-alt\"></i></button></td>";
            output += "</tr>";



            });
            $('#myTable').html(output);

            // edit employee

            $('.editBtn').click(function() {

               //find id of record
                var id =$(this).closest('tr').attr('id');
                //console.log(id);

                $.ajax({
                    url:"libs/php/getAllPersonnel.php",
                    method: "POST",
                    dataType: "json",
                    data:{
                        id: id,

                    },
                    success: function(result){
                        console.log(result.data[0])
                        
                        firstName = result.data[0]['firstName']
                        lastName = result.data[0]['lastName']
                        var email = result.data[0]['email']
                        var departmentID = result.data[0]['departmentID']
                        var locationID = result.data[0]['locationID']

                        $('#firstNameEdit').val(firstName);
                        $('#lastNameEdit').val(lastName);
                        $('#emailEdit').val(email);
                        $('#departmentSelectEdit').val(departmentID);
                        $('#locationSelectEdit').val(locationID);

                    },error: function (request, status, error) {
                        console.log(request,status,error);
                    },


                })
            })

            //remove employee
            $('.remove').click(function() {
                var id =$(this).closest('tr').attr('id');
                console.log(id);
                $('.btnRemove').click(function() {

                    //find id of record
                
                $.ajax({
                    url:"libs/php/deletePeronnelByID.php",
                    method: "POST",
                    dataType: "json",
                    data:{
                        id: id,

                    },
                    success: function(result){
                        console.log(result.data)
                        if (result.status.name == "ok") {
                            console.log("Employee updated");
                            $("#removeCard").modal("hide");
                            $(document).ready(function () {
                                location.reload();
                            });
                        }
                    },
                    error: function (request, status, error) {
                        console.log(request,status,error);
                    },
                })
            })
        })
        },
        error: function (request, status, error) {
            console.log(request,status,error);
        },
    })





//Update Employee
$('.btnUpdate').on('click', function(){

    //alert($('#editEmployee #emailEdit').val())
    // alert($('#editEmployee #lastNameEdit').val())
    // alert($('#editEmployee #firstNameEdit').val());
    var firstName = $('#editEmployee #firstNameEdit').val();
    var lastName = $('#editEmployee #lastNameEdit').val();
    var email = $('#editEmployee #emailEdit').val();
    var departmentID = $('select[id=departmentSelectEdit] option').filter(':selected').val();
    var locationID = $('select[id=locationSelectEdit] option').filter(':selected').val();

    $.ajax({
        url:"libs/php/editPersonnel.php",
        method: "POST",
        dataType: "json",
        data:{
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            departmentID: departmentID,
            locationID: locationID

        },
        success: function(result){
            console.log(result.data)
            if (result.status.name == "ok") {
                console.log("Employee updated");
                $("#editEmployee").modal("hide");
                $(document).ready(function () {
                    location.reload();
                });
            }
        },
        error: function (request, status, error) {
            console.log(request,status,error);
        },
    })
});
    //add Employee
    $('.btdAdd').on('click', function(){

    var firstName = $('#addEmployee #firstNameEdit').val();
    var lastName = $('#addEmployee #lastNameEdit').val();
    var email = $('#addEmployee #emailEdit').val();
    var departmentID = $('select[id=departmentSelectAdd] option').filter(':selected').val();
    var locationID = $('select[id=locationSelectAdd] option').filter(':selected').val();

    $.ajax({
        url:"libs/php/editPersonnel.php",
        method: "POST",
        dataType: "json",
        data:{
            id: id,
            firstName: firstName,
            lastName: lastName,
            email: email,
            departmentID: departmentID,
            locationID: locationID

        },
        success: function(result){
            console.log(result.data)
            if (result.status.name == "ok") {
                console.log("Employee updated");
                $("#editEmployee").modal("hide");
                $(document).ready(function () {
                    location.reload();
                });
            }
        },
        error: function (request, status, error) {
            console.log(request,status,error);
        },
    })
    })

}

//search bar live filter input
    function searchBar(){
    $("#searchBar").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
    }

    function filter(){
// apply filter based on Location

        var selLocation = $('select[name=selectLocations]');
        var selDepartment = $('select[name=selectDepartments]');

        selLocation.on("change", function() {
            var value = $(this).find('option:selected').text();
            $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().indexOf(value) > -1)
            if(selDepartment){
                $('select[name=selectDepartments]').prop("selectedIndex", 0);
            }
            });
        });

    // apply filterr based on Department


        selDepartment.on("change", function() {
            var value = $(this).find('option:selected').text();
            $("#myTable tr").filter(function() {
            $(this).toggle($(this).text().indexOf(value) > -1)
            if(selLocation){
                $('select[name=selectLocations]').prop("selectedIndex", 0);
            }
            });
        });


    }
    // function filter(){

    // $('select[name=selectLocations]').add($('select[name=selectDepartments]')).change(function(){
    //     var value = $(this).find('option:selected').text();


    //                 $("#myTable tr").filter(function() {
    //                 $(this).toggle($(this).text().indexOf(value) > -1)

    //                 });

    // })
    // }



    $('.reset').on('click', function(){
        getResult();
        $('select[name=selectDepartments]').prop("selectedIndex", 0);
        $('select[name=selectLocations]').prop("selectedIndex", 0);
        $('#searchBar').val('');
    })
});
