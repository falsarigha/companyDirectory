$(window).on("load", function() {
    $('#loader-container').fadeOut('slow',function(){$(this).remove();});
});


var searchBar = $("#searchBar").val();
var locationResult;
var departmentResult;
var id;
var idLocation;
var idDepartment;
var output;
var firstName;
var outputLocation;
var outputDepartment;
var departmentResultString;
var locationResultID;
var locationResultString;

function capitalizeFirstLetter(string){
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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

                // //remove previous option filter modal add
                // var usedNameFilter = {};
                // $("select[name='selectDepartmentFilter'] > option").each(function () {
                //     if(usedNameFilter[this.text]) {
                //         $(this).remove();
                //     } else {
                //         usedNameFilter[this.text] = this.value;
                //     }
                // });

                // var usedNameFilterD = {};
                // $("select[name='deaprtmentFilter'] > option").each(function () {
                //     if(usedNameFilterD[this.text]) {
                //         $(this).remove();
                //     } else {
                //         usedNameFilterD[this.text] = this.value;
                //     }
                // });

                // var usedNameFilterDe = {};
                // $("select[name='deaprtmentFilterD'] > option").each(function () {
                //     if(usedNameFilterDe[this.text]) {
                //         $(this).remove();
                //     } else {
                //         usedNameFilterDe[this.text] = this.value;
                //     }
                // });
                
                var departmentData = []
                $.each(departmentResult, function (index) {
                    departmentResultString +=  " " + departmentResult[index].locationID +" "+ departmentResult[index].name;
                    

                });
                
                departmentData.push(departmentResult);
                //console.log(departmentResult)
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
                        //modal editDepLocation
                        $("#locationSelectDepartmentEdit").append(
                            $("<option>", {
                                value: locationResult[index].id,
                                text: locationResult[index].name,
        
                                
                            }),
                        );
                    //     //remove previous option filter bar
                    // var usedNamesLD= {};
                    // $("select[name='LocationFilterDL'] > option").each(function () {
                    //     if(usedNamesLD[this.text]) {
                    //         $(this).remove();
                    //     } else {
                    //         usedNamesLD[this.text] = this.value;
                    //     }
                    // });
                   //remove previous option filter bar
                    var usedNamesL= {};
                    $("select[name='selectLocations'] > option").each(function () {
                        if(usedNamesL[this.text]) {
                            $(this).remove();
                        } else {
                            usedNamesL[this.text] = this.value;
                        }
                    });

                    //console.log(usedNamesL)
                    //remove previous option filter modal add
                    var usedNameFilterL = {};
                    $("select[name='selectLocationsFilter'] > option").each(function () {
                        if(usedNameFilterL[this.text]) {
                            $(this).remove();
                        } else {
                            usedNameFilterL[this.text] = this.value;
                        }
                    });

                    // var usedNameFilterLo = {};
                    // $("select[name='locationFilter'] > option").each(function () {
                    //     if(usedNameFilterLo[this.text]) {
                    //         $(this).remove();
                    //     } else {
                    //         usedNameFilterLo[this.text] = this.value;
                    //     }
                    // });

                    // var usedNameFilterLoc = {};
                    // $("select[name='deliteLocationFilter'] > option").each(function () {
                    //     if(usedNameFilterLoc[this.text]) {
                    //         $(this).remove();
                    //     } else {
                    //         usedNameFilterLoc[this.text] = this.value;
                    //     }
                    // });

                    var usedNameFilterLoco = {};
                    $("select[name='LocationFilterD'] > option").each(function () {
                       
                        if(usedNameFilterLoco[this.text] || usedNameFilterLoco[this.text]) {
                            $(this).remove();
                        } else {
                            usedNameFilterLoco[this.text] = this.value;
                        }
                    });

                    // var usedNameFilterLoca = {};
                    // $("select[name='LocationFilterDo'] > option").each(function () {
                    //     if(usedNameFilterLoca[this.text]) {
                    //         $(this).remove();
                    //     } else {
                    //         usedNameFilterLoca[this.text] = this.value;
                    //     }
                    // });
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

    //get Departments
    $.ajax({
        url:"libs/php/getDepartmentAndLocations.php",
        method: "POST",
        dataType: "json",
        success: function(result){

            let departmentData= result.data;

            console.log(departmentData);
            
            $.each(departmentData, function(key, value){
                
                
                //console.log(value)
                outputDepartment += "<tr id="+value.id+" class='text-start'>";
                outputDepartment += "<td class=\"departmentNames\">"+value.name+"</td>";
                outputDepartment += "<td>"+(value.locationName|| "")+"</td>";
                outputDepartment += "<td><button type=\"button\" title=\"Edit\" data-bs-toggle=\"modal\" data-bs-target=\"#editDepartment\" class='editBtn editBtnDepartment'><i class=\"edit far fa-edit\"></i></button>" +
                    "<button type=\"button\" title=\"Delete\" data-bs-toggle=\"modal\" data-bs-target=\".modalRemove\" class= 'remove removeDepartment'><i class=\"delete fas fa-trash-alt\"></i></button></td>";
                outputDepartment += "</tr>";

                

            });
            //if it remove it
            var slice = outputDepartment.slice(9);
            console.log(slice)
            $('#myTableDepartment').html(slice)

        },error: function (request, status, error) {
            console.log(request,status,error);
        }
    })
    
    //get Locations
    $.ajax({
        url:"libs/php/getAllLocations.php",
        method: "POST",
        dataType: "json",
        success: function(result){

            let locationData= result.data;

            //console.log(locationData);

            $.each(locationData, function(key, value){
                
                

                outputLocation += "<tr id="+value.id+" class='text-start'>";
                outputLocation += "<td class=\"locationNames\">"+(value.name || "")+"</td>";
                outputLocation += "<td><button type=\"button\" title=\"Edit\" data-bs-toggle=\"modal\" data-bs-target=\".modalLocationEdit\" id='editBtnLocation' class='editBtn editBtnLocation'><i class=\"edit far fa-edit\"></i></button>" +
                "<button type=\"button\" title=\"Delete\" data-bs-toggle=\"modal\" data-bs-target=\".modalRemoveLocation\" class= 'remove removeLocation'><i class=\"delete fas fa-trash-alt\"></i></button></td>";
                outputLocation += "</tr>";



            });
            var sliceLocation = outputLocation.slice(9);
            console.log(outputLocation)
            $('#myTableLocation').html(sliceLocation);
            
        },error: function (request, status, error) {
            console.log(request,status,error);
        }
    })
    
    //get employee 
    $.ajax({
        url:"libs/php/getAll.php",
        method: "POST",
        dataType: "json",
        success: function(result){

            let databaseData= result.data;

            //console.log(databaseData);

            $.each(databaseData, function(key, value){
                

                output += "<tr id="+value.id+" class='text-start'>";
                output += "<td class=\"names\">"+value.lastName+ ', ' +value.firstName+"</td>";
                output += "<td>"+value.email+"</td>";
                output += "<td>"+(value.location ||"")+"</td>";
                output += "<td>"+(value.department|| "")+"</td>";
                output += "<td><button type=\"button\" title=\"Edit\" data-bs-toggle=\"modal\" data-bs-target=\"#editEmployee\" id='editBtn' class='editBtn'><i class=\"edit far fa-edit\"></i></button>" +
                    "<button type=\"button\" title=\"Delete\" data-bs-toggle=\"modal\" data-bs-target=\"#removeCard\" class= 'remove removeEmployee'><i class=\"delete fas fa-trash-alt\"></i></button></td>";
                output += "</tr>";



            });
            var sliceEmployee = output.slice(9);
            console.log(sliceEmployee)
            $('#myTable').html(sliceEmployee);

            // edit button employee

            $('#tableResult #editBtn').click(function() {
                $('#errorEmpty').hide();
               //find id of record and use as global
                window.id =$(this).closest('tr').attr('id');
                console.log(id);

                $.ajax({
                    url:"libs/php/getPersonnelByID.php", // to check
                    method: "POST",
                    dataType: "json",
                    data:{
                        id: id,

                    },
                    success: function(result){
                        console.log(result.data.personnel)
                        
                        window.firstName = result.data.personnel[0]['firstName']
                        window.lastName = result.data.personnel[0]['lastName']
                        var email = result.data.personnel[0]['email']
                        var departmentID = result.data.personnel[0]['departmentID']
                        //var locationID = result.data.personnel[0]['locationID']

                        $('#firstNameEdit').val(firstName);
                        $('#lastNameEdit').val(lastName);
                        $('#emailEdit').val(email);
                        $('#departmentSelectEdit').val(departmentID);
                        //$('#locationSelectEdit').val(locationID);

                    },error: function (request, status, error) {
                        console.log(request,status,error);
                    }


                })
            })

            //remove button employee
            $('.removeEmployee').click(function() {
                var id =$(this).closest('tr').attr('id');
                console.log(id);
                $.ajax({
                    url:"libs/php/getPersonnelByID.php",
                    method: "POST",
                    dataType: "json",
                    data:{
                        id: id,

                    },success: function(result){
                        var names = result.data.personnel[0]['lastName'] + " "+ result.data.personnel[0]['firstName']
                        console.log(names)
                        $('#removeCard #removeRecordEmployee').text(names)
                    },error: function (request, status, error) {
                        console.log(request,status,error);
                    }
                })
               
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
        //var locationID = $('select[id=locationSelectEdit] option').filter(':selected').val();

        var locationName = $('select[id=locationSelectEdit] option').filter(':selected').text();
        var departmentName = $('select[id=departmentSelectEdit] option').filter(':selected').text();
        var outputRow = "<tr id="+id+" class='text-start'><td class=\"names\">"+lastName+" "+firstName+"</td><td>"+email+"</td><td>"+locationName+"</td><td>"+departmentName+"</td>";
        var outputRowEmail = "<tr id="+id+" class='text-start'><td class=\"names\">"+lastName+" "+firstName+"</td><td>"+email+"</td><td>";
        //console.log($('select[id=departmentSelectEdit] option').filter(':selected').val('selectADepartment'))
        console.log(departmentID)
        
        if((output.includes(outputRow)) || (output.includes(outputRowEmail)) ){
                            
            $('.editEmployee').modal('hide');
            $('.modalErrorUpdate').modal('show');
            
            
            
        }else{           
        
            if(firstName && lastName  && email && !($('select[id=departmentSelectEdit]')[0].selectedIndex === 0)){
                
                
            $.ajax({
                url:"libs/php/editPersonnel.php",
                method: "POST",
                dataType: "json",
                data:{
                    id: id,
                    firstName: capitalizeFirstLetter(firstName),
                    lastName: capitalizeFirstLetter(lastName),
                    email: email,
                    departmentID: departmentID,
                    

                },
                success: function(result){
                    console.log(result.data)
                    if (result.status.name == "ok") {
                        console.log("Employee updated");
                        
                    
                        $('#editEmployee').on('click','.saveEmployee',function(){
                            $('#errorEmpty').hide();
                            $("#editEmployee").modal("hide");
                        })
                        $(document).ready(function () {
                            location.reload();
                        });

                    }
                },
                error: function (request, status, error) {
                    console.log(request,status,error);
                },
            })} else{
                $('.modalAddE').show();
                $('.modalAddE #errorEmpty').show();

                $('.editEmployee').show()
                
                $('.modalAddE').on('click','.cancelEmployee',function(){
                    $('#errorEmpty').hide();
                })
            }
        }
    });
    
    $('#addEmployees').click(function() {
        $('#errorEmptyAdd').hide();
    })
    //add Employee
    $('.btnAdd').on('click', function(){
            
            var firstName = $('#addEmployee #firstNameAdd').val();
            var lastName = $('#addEmployee #lastNameAdd').val();
            var email = $('#addEmployee #emailAdd').val();
            var departmentID = $('select[id=departmentSelectAdd] option').filter(':selected').val();
             var locationName = $('select[id=addSelectLocation] option').filter(':selected').text();
            console.log(locationName);
            console.log((output.includes(lastName +", "+ firstName)));
            console.log((output.includes(email)));
            console.log(output)
            
            //check if employee already exist
            if((output.includes(lastName +", "+ firstName)) && (output.includes(email))){
                            
                $('.modalAdd #errorEmptyAdd').show();

                //console.log((output.includes(lastName +" "+ firstName)) && (output.includes(email)))
                
                
            }else{           
                if(firstName && lastName  && email && !($('select[id=departmentSelectAdd]')[0].selectedIndex === 0)){
                $.ajax({
                    url:"libs/php/insertPersonnel.php",
                    method: "POST",
                    dataType: "json",
                    data:{
                        
                        firstName: capitalizeFirstLetter(firstName),
                        lastName: capitalizeFirstLetter(lastName),
                        email: email,
                        departmentID: departmentID,
                        
                        

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
                })}else{
                    $('.modalAdd').show();
                    $('.modalAdd #errorEmptyAdd').show();

                     $('.modalAdd').show()
                
                    $('.modalAdd').on('click','.cancelEmployeeAdd',function(){
                        $('#errorEmptyAdd').hide();
                    })
                }
            }
    })
    //add department
    
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
                            
                            name: capitalizeFirstLetter(departmentNameInput),
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
    //edit Department btnmodal
    $('#tableResultDepartment').on('click',' .editBtnDepartment',function(){
        
        
        window.idDepartment =$(this).closest('tr').attr('id');
        console.log(idDepartment)
        
        
        $.ajax({
            url:"libs/php/getDepAndLocByID.php", // to check
            method: "POST",
            dataType: "json",
            data:{
                id: idDepartment,

            },
            success: function(result){
                console.log(result.data)
                
                departmentName = result.data[0]['name']
                locationDepID = result.data[0]['locationID']
                

                $('#editDepartment #departmentEdit').val(departmentName);
                $('#editDepartment #locationSelectDepartmentEdit').val(locationDepID);
                
                console.log(departmentName)
                console.log(locationDepID)

            },error: function (request, status, error) {
                console.log(request,status,error);
            }


        })
        
    })
    //edit submit department modal
    $('#btnAddDepartmentEdit').click(function(){
       
        var departmentEditInputName =  $('#editDepartment #departmentEdit').val();
        var departmentSelectEditID =  $('select[id=locationSelectDepartmentEdit] option').filter(':selected').val();
        var departmentSelectEditName =  $('select[id=locationSelectDepartmentEdit] option').filter(':selected').text();
        console.log(idDepartment)
        $.ajax({
            url:"libs/php/editDepartmentAndLocation.php",
                method: "POST",
                dataType: "json",
                data:{
                    id: idDepartment,
                    name: capitalizeFirstLetter(departmentEditInputName),
                    locationID: departmentSelectEditID,
                    locationName: departmentSelectEditName
                    

                },success: function(result){

                    if(result.status.name == "ok"){

                        console.log(departmentEditInputName);
                        console.log(departmentSelectEditID);
                        console.log(departmentSelectEditName)
                        
                        $("#editDepartment").modal("hide");
                
                    
                        $(document).ready(function () {
                            location.reload();
                        });
                    }

                    
                },
                error: function (request, status, error) {
                    console.log(request,status,error);
                }
            })
        
        })
    
    //remove department
    $('#tableResultDepartment').on('click','.removeDepartment',function(){
        $('#removeRecordDepartment').hide();
        var idDepartment =$(this).closest('tr').attr('id');
        console.log(idDepartment)
        $.ajax({
            url:"libs/php/getDepartmentByID.php", // to check
            method: "POST",
            dataType: "json",
            data:{
                id: idDepartment,

            },
            success: function(result){
                console.log(result.data)
                
                departmentIDinput = result.data[0]['id']
                
                
                
                
                $('#departmentSelectRemove').val(departmentIDinput);
                
                console.log(departmentIDinput)
                

            },error: function (request, status, error) {
                console.log(request,status,error);
            }


        })
        $('#removeDepartment').click(function(){
            var departmentInputID = $('select[id=departmentSelectRemove] option').filter(':selected').val();
            //console.log(departmentInputID)
            $.ajax({
                url:"libs/php/checkCountDepartmentID.php",
                    method: "POST",
                    dataType: "json",
                    data:{
                        
                        id: departmentInputID,
                        
    
                    },success: function(result){
                        console.log(result.data[0]['pc'])
                        if(result.data[0]['pc'] == 0){
    
                            $.ajax({
                                url:"libs/php/deleteDepartmentByID.php",
                                    method: "POST",
                                    dataType: "json",
                                    data:{
                                        
                                        id: departmentInputID,
                                        
                    
                                    },success: function(result){
    
                                        console.log("delete successfull")
                                        $(".modalRemove").modal("hide")
                                        
                                        
                                        $(document).ready(function () {
                                            location.reload();
                                        });
    
                                 },error: function (request, status, error) {
                                    console.log(request,status,error);
                                 }
                                })
                        } else{
                            
                            
                            $('.modalText #removeRecordDepartment').show()
                            $('.modalRemove').on('click','.closeDepartment',function(){
                                $('#removeRecordDepartment').hide();
                            })
                        }
    
                        
                    },
                    error: function (request, status, error) {
                        console.log(request,status,error);
                    }
            })

        })
    })
    
    
    // add Location
    $('.btnAddLocation').click(function(){
        var locationAddInput = $('#addLocation #locationAdd').val();
        //console.log(locationResultString.includes(locationAddInput));

        if(locationResultString.includes(locationAddInput)){

            $('.modalLocation').modal('hide');
            $('.modalErrorLocation').modal('show');

        } else {
            $.ajax({
                url:"libs/php/insertLocation.php",
                        method: "POST",
                        dataType: "json",
                        data:{
                            
                            name: capitalizeFirstLetter(locationAddInput),
                            
    
                        },success: function(result){
    
                            if(result.status.name == "ok"){
    
                                //console.log("location added")
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
    //edit Location btnmodal
    $('#tableResultLocation').on('click',' .editBtnLocation',function(){
        
        
        window.idLocation =$(this).closest('tr').attr('id');
        
        
        
        $.ajax({
            url:"libs/php/getLocationByID.php", // to check
            method: "POST",
            dataType: "json",
            data:{
                id: idLocation,

            },
            success: function(result){
                console.log(result.data)
                
                locationName = result.data[0]['name']
                

                $('#editLocation #locationEdit').val(locationName);
                //console.log(locationName)

            },error: function (request, status, error) {
                console.log(request,status,error);
            }


        })
        
    })

    //edit submit modal
    $('.btnAddLocationEdit').click(function(){
       
        var locationEditInput =  $('#editLocation #locationEdit').val();
        //console.log(locationEditInput)
        $.ajax({
            url:"libs/php/editLocation.php",
                method: "POST",
                dataType: "json",
                data:{
                    id: idLocation,
                    name: capitalizeFirstLetter(locationEditInput),
                    

                },success: function(result){

                    if(result.status.name == "ok"){

                        // console.log(idLocation);
                        // console.log(locationEditInput);
                        // console.log("location edited")
                        
                        $("#editLocation").modal("hide");
                
                    
                    $(document).ready(function () {
                        location.reload();
                    });
                    }

                    
                },
                error: function (request, status, error) {
                    console.log(request,status,error);
                }
            })
        
        })
    //remove Location
    // $('#removeLocation').click(function(){
    //     var locationInputID = $('select[id=locationSelectRemove] option').filter(':selected').val();
    //     console.log(locationInputID)
    //     $.ajax({
    //         url:"libs/php/deleteLocation.php",
    //                 method: "POST",
    //                 dataType: "json",
    //                 data:{
                        
    //                     id: locationInputID,
                        

    //                 },success: function(result){

    //                     if(result.status.name == "ok"){

    //                         console.log("removed")
    //                     }

    //                     $(".modalLocation").on("hidden.bs.modal", function(){
    //                         $(".modal-body").html("");
    //                     });
    //                     $(document).ready(function () {
    //                         location.reload();
    //                     });
    //                 },
    //                 error: function (request, status, error) {
    //                     console.log(request,status,error);
    //                 }
    //     })
    // })

    //remove location
    $('#tableResultLocation').on('click','.removeLocation',function(){
        $('#removeRecordLocation').hide();
        var idLocation =$(this).closest('tr').attr('id');
        console.log(idLocation)
        $.ajax({
            url:"libs/php/getLocationByID.php", // to check
            method: "POST",
            dataType: "json",
            data:{
                id: idLocation,

            },
            success: function(result){
                console.log(result.data)
                
                locationIDinput = result.data[0]['id']
                
                
                
                
                $('#locationSelectRemove').val(locationIDinput);
                
                console.log(locationIDinput)
                

            },error: function (request, status, error) {
                console.log(request,status,error);
            }


        })
        $('#removeLocation').click(function(){
            var locationInputID = $('select[id=locationSelectRemove] option').filter(':selected').val();
            console.log(locationInputID)
            $.ajax({
                url:"libs/php/checkCountLocationID.php",
                    method: "POST",
                    dataType: "json",
                    data:{
                        
                        id: locationInputID,
                        
    
                    },success: function(result){
                        console.log(result.data[0]['pc'])
                        if(result.data[0]['pc'] == 0){
    
                            $.ajax({
                                url:"libs/php/deleteLocation.php",
                                    method: "POST",
                                    dataType: "json",
                                    data:{
                                        
                                        id: locationInputID,
                                        
                    
                                    },success: function(result){
    
                                        console.log("delete successfull")
                                        $(".modalRemoveLocation").modal("hide")
                                        
                                        
                                        $(document).ready(function () {
                                            location.reload();
                                        });
    
                                 },error: function (request, status, error) {
                                    console.log(request,status,error);
                                 }
                                })
                        } else{
                            
                            
                            $('.modalMiddle #removeRecordLocation').show()
                            $('.modalRemoveLocation').on('click','.closeLocation',function(){
                                $('#removeRecordLocation').hide();
                            })
                        }
    
                        
                    },
                    error: function (request, status, error) {
                        console.log(request,status,error);
                    }
            })

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
        $("#myTableDepartment tr").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
        $("#myTableLocation tr").filter(function() {
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
            $("#myTableDepartment tr").filter(function() {
                $(this).toggle($(this).text().indexOf(value) > -1)
            });
            $("#myTableLocation tr").filter(function() {
                $(this).toggle($(this).text().indexOf(value) > -1)
            });
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
            $("#myTableDepartment tr").filter(function() {
                $(this).toggle($(this).text().indexOf(value) > -1)
            });
            $("#myTableLocation tr").filter(function() {
                $(this).toggle($(this).text().indexOf(value) > -1)
            });
            if(selLocation){
                $('select[name=selectLocations]').prop("selectedIndex", 0);
            }
            });
        });


    }
   
    $('.reset').on('click', function(){
        $("#searchBar").val(" ").trigger("keyup");
        $("#searchBar").val("").trigger("keyup");
        $('select[name=selectDepartments]').prop("selectedIndex", 0);
        $('select[name=selectLocations]').prop("selectedIndex", 0);
        $('#searchBar').val('');
    })
});
