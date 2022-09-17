# Realty Management - Part 1

[Realty Management - Part 2](./realty_management_2.md)

A Realty management agency has approached your company to implement a property management solution using Odoo. Their requirements are as follows:

## Properties

As in, the buildings, apartments and houses they need to be able to manage. Properties have the following required attributes:

-   Name: A name for the property (Required)
-   Consturction Date: The date on which the property was constructed (Required)
-   Rent: The base rent price for the property (Required)
-   Rooms: A list of rooms available in the property, including kitchens, bathrooms and storage rooms (Required)
-   Parking Spots: The number of parking spots the property has access to (Required)
-   Surface: The total surface of the property, displayed in meters squared (Required)
-   Furnishing: Whether or not the property is furnished (Required)
-   Address: A reference to the property's address, including: Street, City, Zip Code, State, Country (Required)
-   Available for Rent: Wheter the property is available for rent (Required)
-   Is Rented: Whether the property is currently rented. Computed using the following logic: Is there any tenancy active during the current time frame ? (Required)

## Rooms

As in, the rooms that make up the property

-   Name: name of the tenanct (Required)
-   Surface: The surface of the room, displayed in meters squared (Required)

## Tenants

As in, the contacts that occupy the property

-   Name: name of the tenanct (Required)
-   Phone: Phone number of the tenant (Required)
-   Email: email of the tenant (Required)
-   Address: address of the tenant, including: Street, City, Zip Code, State, Country (Required)
-   Date of birth: date on which the tenant was born (Optional)
-   Place of birth: place in which the tenant was born (Optional)
-   Nationality: nationality of the tenant (Optional)

## Tenancies

As in, the contracts that bind tenants and a property over a specified period of time. Tenancies have the following attributes:

-   Property: A reference to the property rented (Required)
-   Tenants: A reference to the persons renting the property (Required)
-   Contract Name: A computed value that is a combination of both the property name and the first tenant's name
-   Start Date: The date on which the contract starts (Required)
-   Date End: The date on which the contract ends (Optional)
-   State: Whether the tenancy is in draft, active, cancelled or terminated (Required). By default should be draft.
-   Tenancy Lines: Reference to the lines of the contract, with the following required attributes:

## Tenancy Lines

As in, the lines of the contracts binding tenants to properties.

-   Product: The product to which the line is linked to. typically Rent or Bills (Required)
-   Quantity: The number of products sold (Required)
-   Price: The unit price of each product (Required)
-   Total Amount: computed value of quantity \* price (Computed)

## Notes

For the sake of this exercise let's assume the following:

-   Properties, Tenancies and Tenants are new custom models in the system. Create the appropriate models, views ans access rights.
-   Tenants are res.partner records, where only additional fields need to be added. Once those fields are added to the python model, also add them to the existing partner form view
-   Tenancies are created in draft mode by default. They should have a button that changes their state to 'Active' that can only be used if the Start Date and End Date are both defined correctly (Date End > Date Start)
-   For a tenancy to be terminated, we need to create a new scheduled action that will check every day whether a tenancy has reached its end date or not. For this, we need to create a new ir.cron record.
-   Make the new views & actions accessible via a new menu item that should read: Realty Management
