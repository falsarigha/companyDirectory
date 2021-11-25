# COMPANY DIRECTORY

SUMMARY

Single page application that works well either on desktop and mobile and tablet.

The company directory allows you to perform CRUD operation across the table of employees, locations and department.

The technologies used are: HTML5, CSS3, Bootstrap, JavaScript, JQuery, AJAX, PHP and MySQL

AVAILABLE ACTION

Display Table of :

✓ Employees(Default)
✓ Locations
✓ Departments

Once the application is loaded, by default are displayed the
employees records.
The user can navigate through different table with the dedicated buttons.

Filter system:

✓ Department
✓ Employees(input)
✓ Locations

A filter system helps the user to specify their search.
It is possible to use either the search bar on the top right
corner, or the dedicated dropdown menu for location and
department allocated on the sidebar.

✓ Reset button

At the end of the sidebar is situated the reset button.
Once clicked, reset all the filter and restore the default table.

Add:

✓ Employees
✓ Locations
✓ Departments

On the top right corner are situated the three add buttons, the employee, the location and the department.
Once is clicked, a modal will appear and it will display empty
input fields.
To add a new record all of the field must be filled out, and
unique, if not an error will show.

Edit:

✓ Employees
✓ Locations
✓ Departments

At the end of each rows, for all records, are display an
edit button which corresponds to that row.
Once clicked, a modal will appear and it will display filled
inputs with the related information.
To edit a new record all of the fields must be filled out and
unique, if not an error will show.

Delete:

✓ Employees
✓ Locations
✓ Departments

At the end of each rows, for all records, are display a
delete button which corresponds to that row.
Once clicked, a modal will appear to confirm if the user
wants to delete that record.
If the department or location has dependencies the record
cannot be removed.

STRESS TEST:

After performing a stress test the following errors were found:

\1. ONCE THE RESET BUTTON WAS CLICKED, IT WAS CAUSIGN TO DUPLICATE LOCATION AND DEPARTMENT ENTRY.

\2. NULL WOULD APPEAR IN THE RECORDS.

\3. INPUTs FIELD WASN’T SET FOR CAPITAL LETTER CAUSING INCONSISTENCY IN THE DATABASE

\4. WHEN THE USER EDITED AN EMPLOYEE IT WAS CAUSING THE CREATION OF AN EMPTY FIELD FOR THAT DEPARTMENT AND A NEW EMPTY FIELD IN LOCATION.

After a careful revision all the errors have been identified and fixed.
