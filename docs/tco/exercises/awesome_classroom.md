# Awesome School - Part 1

A private educational organization has approached your company to implement a school management solution using Odoo. Their requirements are as follows:

## Schools

The organization manages different schools in real life. To implement this feature into our solution, create a new model called `awesome.school` with the following attributes :

-   Name: A name for the school (Required)
-   Supervisor: The penson in charge of supervising the school (Required)
-   Establishment Date: The date on which the school was established
-   street: The street on which the school is located (Required)
-   Street 2: Continuation of the street
-   City: The city in which the school is located (Required)
-   Zip: The zipcode of the school
-   State: The country's state in which the school is located (Required)
-   Country: The country in which the school is located (Required)

## Classrooms

Each school has different classrooms, to accomodate this, create a new model called `awesome.classroom` with the following attributes:

-   Name: The name of the classroom. Can be a unique identification code by classroom (Required)
-   Capacity: Defines how many students the classroom can accomodate, should default to 10
-   Teacher: The person in charge of the classroom (Required)
-   Students: List of the students that are part of the classroom

## Notes

For the sake of this exercise let's assume the following:

-   The Technical name of your app should be `awesome_school`
-   The General name of your app should be `Awesome School`

-   Schools, Classrooms are new custom models in the system. Create the appropriate models, views ans access rights.
-   The Supervisor, Teacher and Students are `res.partner` records.
-   Classrooms should be linked to the school through a Many2many field on the school itself.
-   Students should be linked to the classroom through a Many2many field on the classroom itself.

-   Make the new views & actions accessible via a new menu item that should read: Awesome School
-   Classrooms should be displayed on the form view of the Schools as an embedded tree view. Feel free to set the classrooms field & views inside a notebook/page

-   Establishment Date should be invisible if no Supervisor is set
-   Street 2 should be read-only if Street is empty
-   Zip should be read-only if City is empty
-   State should be read-only if Country is empty
