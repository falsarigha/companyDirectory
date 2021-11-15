$(window).on("load", function() {
    $("loader-container").hide();
});

var searchBar = $("#searchBar").val();
var location;
var department;


$(document).ready(function() {
// populate select department
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
          var department = result.data[index].id;
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

// populate select location
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
          var location = result.data[index].id;
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

// get all results

$.ajax({
    url:"libs/php/getAll.php",
    method: "POST",
    dataType: "json",
    success: function(result){

        let databaseData= result.data;
        
        // console.log(databaseData);
        
        $.each(databaseData, function(key, value){
        // console.log(value.lastName);
        $("#tableResult").append("<tr><td>" + value.firstName + " " + value.lastName + "</td><td>" +
            value.email + "</td><td>" + value.location + "</td><td>" + value.department + 
            "</td><td><button type=\"button\" data-bs-toggle=\"modal\" data-bs-target=\"#editEmployee\"><i class=\"edit far fa-edit\"></i></button>" +
                "<button><i class=\"delete fas fa-trash-alt\"></i></button></td>");
            
        });

        if(!searchBar){
            let input = searchBar.toUpperCase();
            let regex = new RegExp(input, 'i');
            let output;
            $('#SearchBar').keydown( function(){
                $.each(databaseData, function(key, val){
                    if((val.id.input(regex != -1) || val.name.input(regex) != -1)){
                        output += "<tr>";
                        output += "<td id='"+key+"'>"+val.id+"</td>";
                        output += "<td id='"+key+"'>"+val.name+"</td>";
                        output += "</tr>";
                        
                    };
                });
            })
            $('tbody').html(output);
        }
        
    }
})
});

//get result from search bar
// var inputBar = ;
// var location = ;
// var department = ;

// let getDepartment = null;


// $(".searchBar").on("click", function() {
//     input = searchBar.toUpperCase();

//     if(!input){
//     $.ajax({
//         url: "libs/php/getAllPersonnel.php",
//         method:"POST",
//         dataType: "json",
//         data: {
//             firstName: input,
//             // location: $('#selectDepartments option:selected').val(),
//             // department: $('#selectLocations option:selected').val(),
             
//         },
//         success: function(result){
//             let dataSearch = result.data;
            
//             console.log(dataSearch);
            
//             $("#tableResult").empty();
            
//             $.each(dataSearch, function(key, value){
//                 console.log(value.firstName);
//                 $("#tableResult").append("<tr><td>" + value.firstName + " " + value.lastName + "</td><td>" +
//                     value.email + "</td><td>" + value.location + "</td><td>" + value.department + 
//                     "</td><td><button type=\"button\" data-bs-toggle=\"modal\" data-bs-target=\"#editEmployee\"><i class=\"edit far fa-edit\"></i></button>" +
//                         "<button><i class=\"delete fas fa-trash-alt\"></i></button></td>");
                    
//                 })
//         }

    
//     })
//         } else {
//             $("#tableResult").empty();
//             alert('Error input not valid');
//         }
// });

