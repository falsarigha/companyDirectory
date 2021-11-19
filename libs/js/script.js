$(window).on("load", function() {
    $("loader-container").hide();
});

var searchBar = $("#searchBar").val();
var locationResult;
var departmentResult;
var id;
var output;
var departmentResultString;
var locationResultID;
var locationResultString;


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

                departmentResult = result.data

                $.each(departmentResult, function (index) {
                    //sidebar
                $("#selectDepartments").append(
                    $("<option>", {
                    value: result.data[index].id,
                    text: result.data[index].name,

                    }),
                );
                //modal Add
                $("#departmentSelectAdd").append(
                    $("<option>", {
                        value: result.data[index].id,
                        text: result.data[index].name,

                    }),
                    );
                    //modal Edit
                    $("#departmentSelectEdit").append(
                        $("<option>", {
                            value: result.data[index].id,
                            text: result.data[index].name,
    
                        }),
                    );
                        //modal delete
                        $("#departmentSelectRemove").append(
                            $("<option>", {
                                value: result.data[index].id,
                                text: result.data[index].name,
        
                            }),
                        );

                        
                
                });
                //remove previous option filter bar
                var usedNames = {};
                $("select[name='selectDepartments'] > option").each(function () {
                    if(usedNames[this.text]) {
                        $(this).remove();
                    } else {
                        usedNames[this.text] = this.value;
                    }
                });

                //remove previous option filter modal add
                var usedNameFilter = {};
                $("select[name='selectDepartmentFilter'] > option").each(function () {
                    if(usedNameFilter[this.text]) {
                        $(this).remove();
                    } else {
                        usedNameFilter[this.text] = this.value;
                    }
                });

                var usedNameFilterD = {};
                $("select[name='deaprtmentFilter'] > option").each(function () {
                    if(usedNameFilterD[this.text]) {
                        $(this).remove();
                    } else {
                        usedNameFilterD[this.text] = this.value;
                    }
                });

                var usedNameFilterDe = {};
                $("select[name='deaprtmentFilterD'] > option").each(function () {
                    if(usedNameFilterDe[this.text]) {
                        $(this).remove();
                    } else {
                        usedNameFilterDe[this.text] = this.value;
                    }
                });
                
                var departmentData = []
                $.each(departmentResult, function (index) {
                    departmentResultString +=  " " + departmentResult[index].locationID +" "+ departmentResult[index].name;
                    

                });
                
                departmentData.push(departmentResult);
                console.log(departmentResult)
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

                locationResult = result.data

                //sidebar

                $.each(locationResult, function (index) {
                $("#selectLocations").append(
                    $("<option>", {
                    value: locationResult[index].id,
                    text: locationResult[index].name,

                    }),
                );
                    //modal add
                $("#addSelectLocation").append(
                    $("<option>", {
                        value: locationResult[index].id,
                        text: locationResult[index].name,

                    }),
                );
                    //modal edit
                    $("#locationSelectEdit").append(
                        $("<option>", {
                            value: locationResult[index].id,
                            text: locationResult[index].name,
    
                        }),
                    );
                    //modal addDepartmentLocation
                    $("#locationSelectAdd").append(
                        $("<option>", {
                            value: locationResult[index].id,
                            text: locationResult[index].name,
    
                            
                        }),
                    );
                        //modal removeLocation
                    $("#locationSelectRemove").append(
                        $("<option>", {
                            value: locationResult[index].id,
                            text: locationResult[index].name,
    
                            
                        }),
                    );
                   //remove previous option filter bar
                    var usedNamesL= {};
                    $("select[name='selectLocations'] > option").each(function () {
                        if(usedNamesL[this.text]) {
                            $(this).remove();
                        } else {
                            usedNamesL[this.text] = this.value;
                        }
                    });

                    //remove previous option filter modal add
                    var usedNameFilterL = {};
                    $("select[name='selectLocationsFilter'] > option").each(function () {
                        if(usedNameFilterL[this.text]) {
                            $(this).remove();
                        } else {
                            usedNameFilterL[this.text] = this.value;
                        }
                    });

                    var usedNameFilterLo = {};
                    $("select[name='locationFilter'] > option").each(function () {
                        if(usedNameFilterLo[this.text]) {
                            $(this).remove();
                        } else {
                            usedNameFilterLo[this.text] = this.value;
                        }
                    });

                    var usedNameFilterLoc = {};
                    $("select[name='deliteLocationFilter'] > option").each(function () {
                        if(usedNameFilterLoc[this.text]) {
                            $(this).remove();
                        } else {
                            usedNameFilterLoc[this.text] = this.value;
                        }
                    });

                    var usedNameFilterLoco = {};
                    $("select[name='LocationFilterD'] > option").each(function () {
                        if(usedNameFilterLoco[this.text]) {
                            $(this).remove();
                        } else {
                            usedNameFilterLoco[this.text] = this.value;
                        }
                    });

                    var usedNameFilterLoca = {};
                    $("select[name='LocationFilterDo'] > option").each(function () {
                        if(usedNameFilterLoca[this.text]) {
                            $(this).remove();
                        } else {
                            usedNameFilterLoca[this.text] = this.value;
                        }
                    });
                });
                
                
                $.each(locationResult, function (index) {
                    locationResultID += " " + locationResult[index].id;
                    locationResultString += " " + locationResult[index].name;
                });

                
            },
            error: function (request, status, error) {
                console.log(request,status,error);
            },

        });
    }

    
// get all results
    function getResult() {

    
    $.ajax({
        url:"libs/php/getAll.php",
        method: "POST",
        dataType: "json",
        success: function(result){

            let databaseData= result.data;

            //console.log(databaseData);

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

            // edit button employee

            $('.editBtn').click(function() {

               //find id of record and use as global
                window.id =$(this).closest('tr').attr('id');
                console.log(id);

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

            //remove button employee
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
                            
                            //reload page
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





    //Edit Employee modal button
    $('.btnUpdate').on('click', function(){

        var firstName = $('#editEmployee #firstNameEdit').val();
        var lastName = $('#editEmployee #lastNameEdit').val();
        var email = $('#editEmployee #emailEdit').val();
        var departmentID = $('select[id=departmentSelectEdit] option').filter(':selected').val();
        var locationID = $('select[id=locationSelectEdit] option').filter(':selected').val();

        var locationName = $('select[id=locationSelectEdit] option').filter(':selected').text();
        var departmentName = $('select[id=departmentSelectEdit] option').filter(':selected').text();
        var outputRow = "<tr id="+id+"><td class=\"names\">"+lastName+" "+firstName+"</td><td>"+email+"</td><td>"+locationName+"</td><td>"+departmentName+"</td>"
        if((output.includes(outputRow))){
                            
            $('.editEmployee').modal('hide');
            $('.modalErrorUpdate').modal('show');
            
            
            
        }else{           
        
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

                        // console.log(departmentName)
                        // console.log(locationID)
                        // console.log(locationName)
                        // console.log(email)
                        // console.log(lastName)
                        // console.log(firstName)
                    }
                },
                error: function (request, status, error) {
                    console.log(request,status,error);
                },
            })
        }
    });

    //add Employee
    $('.btnAdd').on('click', function(){
            
            var firstName = $('#addEmployee #firstNameAdd').val();
            var lastName = $('#addEmployee #lastNameAdd').val();
            var email = $('#addEmployee #emailAdd').val();
            var departmentID = $('select[id=departmentSelectAdd] option').filter(':selected').val();
             var locationName = $('select[id=addSelectLocation] option').filter(':selected').text();
            console.log(locationName)
            //check if employee already exist
            if((output.includes(lastName +" "+ firstName)) && (output.includes(email))){
                            
                $('.modalAdd').modal('hide');
                $('.modalError').modal('show');

                //console.log((output.includes(lastName +" "+ firstName)) && (output.includes(email)))
                
                
            }else{           
            
                $.ajax({
                    url:"libs/php/insertPersonnel.php",
                    method: "POST",
                    dataType: "json",
                    data:{
                        
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        departmentID: departmentID,
                        locationName: locationName
                        

                    },
                    success: function(result){

                        if (result.status.name == "ok") {

                            console.log("Employee Added");
                            
                            $(".modalAdd").on("hidden.bs.modal", function(){
                                $(".modal-body").html("");
                            });
                            
                            
                        }
                        $(document).ready(function () {
                            location.reload();
                        });

                    },
                    error: function (request, status, error) {
                        console.log(request,status,error);
                    }
                })
            }
    })
    //department
    
    $('#btnAddDepartment').click(function(){
        var departmentNameInput= $('#addDepartment #departmentAdd').val();
        var locationName = $('select[id=locationSelectAdd] option').filter(':selected').val();
        var locationText = $('select[id=locationSelectAdd] option').filter(':selected').text();
                
        if(departmentResultString.includes(departmentNameInput) && (departmentResultString.includes(locationText))){
           
            $('.modalDepartment').modal('hide');
            $('.modalErrorDepartment').modal('show');
        
        } else{
            $.ajax({
                url:"libs/php/insertDepartment.php",
                        method: "POST",
                        dataType: "json",
                        data:{
                            
                            name: departmentNameInput,
                            locationID: locationName,
                            
                            

                        },success: function(result){

                            if(result.status.name == "ok"){

                                console.log("add")
                            }

                            $(".modalDepartment").on("hidden.bs.modal", function(){
                                $(".modal-body").html("");
                            });
                            $(document).ready(function () {
                                location.reload();
                            });
                        },
                        error: function (request, status, error) {
                            console.log(request,status,error);
                        }
            })
        }
        
    })
    
    //remove department
    $('#removeDepartment').click(function(){
        var departmentInputID = $('select[id=departmentSelectRemove] option').filter(':selected').val();
        console.log(departmentInputID)
        $.ajax({
            url:"libs/php/deleteDepartmentByID.php",
                    method: "POST",
                    dataType: "json",
                    data:{
                        
                        id: departmentInputID,
                        

                    },success: function(result){

                        if(result.status.name == "ok"){

                            console.log("removed")
                        }

                        $(".modalDepartment").on("hidden.bs.modal", function(){
                            $(".modal-body").html("");
                        });
                        $(document).ready(function () {
                            location.reload();
                        });
                    },
                    error: function (request, status, error) {
                        console.log(request,status,error);
                    }
        })
    })
    
    // add Location
    $('.btnAddLocation').click(function(){
        var locationAddInput = $('#addLocation #locationAdd').val();
        console.log(locationResultString.includes(locationAddInput));

        if(locationResultString.includes(locationAddInput)){

            $('.modalLocation').modal('hide');
            $('.modalErrorLocation').modal('show');

        } else {
            $.ajax({
                url:"libs/php/insertLocation.php",
                        method: "POST",
                        dataType: "json",
                        data:{
                            
                            name: locationAddInput,
                            
    
                        },success: function(result){
    
                            if(result.status.name == "ok"){
    
                                console.log("removed location")
                            }
    
                            $(".modalLocation").on("hidden.bs.modal", function(){
                                $(".modal-body").html("");
                            });
                            $(document).ready(function () {
                                location.reload();
                            });
                        },
                        error: function (request, status, error) {
                            console.log(request,status,error);
                        }
                })
        }
    })
    //remove Location
    $('#removeLocation').click(function(){
        var locationInputID = $('select[id=locationSelectRemove] option').filter(':selected').val();
        console.log(locationInputID)
        $.ajax({
            url:"libs/php/deleteLocation.php",
                    method: "POST",
                    dataType: "json",
                    data:{
                        
                        id: locationInputID,
                        

                    },success: function(result){

                        if(result.status.name == "ok"){

                            console.log("removed")
                        }

                        $(".modalLocation").on("hidden.bs.modal", function(){
                            $(".modal-body").html("");
                        });
                        $(document).ready(function () {
                            location.reload();
                        });
                    },
                    error: function (request, status, error) {
                        console.log(request,status,error);
                    }
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

    // apply filter based on Department


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
   
    $('.reset').on('click', function(){
        getResult();
        $('select[name=selectDepartments]').prop("selectedIndex", 0);
        $('select[name=selectLocations]').prop("selectedIndex", 0);
        $('#searchBar').val('');
    })
});
