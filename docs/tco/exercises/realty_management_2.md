# Realty Management - Part 2

This is a continuation of [Realty Management - Part 1](./realty_management.md)

To further expand the functionalities of your application, the realty agency has come back to your company with the following change requests:

## Terminating Tenancies

They want to be able to terminate a tenancy easily, without having to wait for the system to check every single day.

To realize this, create a new **Server Action** bound to the tenancy model, that terminates any tenancy selected from the tree view or opened in a form view.

**Hint:**

```
< CREATE THE SERVER ACTION >
<record id='<CUSTOM_ID>' model='ir.actions.server'>
    ...
    <field name='state'>code</field>
    <field name='code'>
        ...
    </field>
    ...
</record>

< THE SERVER ACTION SHOULD CALL A FUNCTION ON THE TENANCY MODEL>

def action_terminate_tenancies(self):
    ...

```

## Separate Views for Tenancies

The agency wants to have separate views for terminated and draft/ongoing tenancies.

To realize this, create a new **Window Action** that displays only terminated tenancies, and edit the initial action created in [Realty Management - Part 1](./realty_management.md#tenancies) to display only tenancies that are not terminated.

Add the new action under the Tenancies parent menu.

**Hint:**

```
< CREATE THE WINDOW ACTION >
<record id='<CUSTOM_ID>' model='ir.actions.act_window'>
    ...
    <field name='domain'>[('state' '=', ...)]</field>
    ...
</record>
```

No need to create new views. You can use the same view with two different actions.

## Redirect to Agency's portal

The agency has its own website that can be found at the following url: `https://portal.fake-agency.com/`
They want to redirect the user to a page on their portal when click on a button from the **Form** view.
To do this, create two new **URL Actions**, one for tenancies, the other for properties, that redirects the user to the following urls:

-   Tenancies: **<PORTAL_URL>**/tenancies/**<TENANCY_ID>**
-   Properties: **<PORTAL_URL>**/properties/**<PROPERTY_ID>**

**Hint:**

```
< ADD A BUTTON TO THE FORM VIEWS >
...
<div class="oe_button_box">
    <button class="oe_stat_button" type="..." name="..."
            icon="fa-link" string="View on Portal"/>
</div>
...

< CREATE THE URL ACTION >
<record id='<CUSTOM_ID>' model='ir.actions.act_url'>
    ...
    <field name='url'>...</field>
    ...
</record>
```

## Tenancy Cancellation

The agency wishes to have a new button on the **Form** view of the tenancies. The button should read "Cancel".
Upon clicking on the button, the tenancy should be cancelled, i.e: its state should change to 'cancelled', however this should only be possible if the tenancy is neither Terminated nor Draft.

When a tenancy is cancelled, its tenant_ids field should be emptied.

**Hint:**

```
< ADD A BUTTON ON THE HEADER OF THE FORM VIEW >

<form>
    <header>
        <button class="btn-secondary" type="..." action="..."
            icon="fa-trash" string="Cancel"/>
    </header>
    <sheet>
        ...
    </sheet>
</form>

```

When trying to reset the tenant_ids, use either **Magic Numbers** or **Commands** to clear the field.

## Set Default Tenant on Tenancy

The agency wishes to create a new tenant for every new Tenancy created.
To achieve this, we can override the `def create(self, vals)` method on the tenancy model, and use **Magic Numbers** or **Commands** to set the value of the `tenant_ids` field.

The default tenant should have the following values:

-   Name: Default Tenant
-   Email: tenant@agency.test

**Hint:**

```
< OVERRIDE THE CREATE METHOD ON THE TENANCY MODEL >

@api...
def create(self, vals | vals_list)
    ...
    self._assign_default_tenant(vals)
    ...

def _assign_default_tenant(self, vals)
    ...Use Magic Numbers to assign a default tenant on the tenant_ids field in the vals dict

```

**Hint 2:**
This can also be done using the `context` field on the **Window Action**

## New Report for Properties

The agency wants to be able to print a document with the details of any given property(ies).
To achieve this, create a new pdf report for the Properties model, that simply displays the following information:

```
Property Name:
_______________________________________

Construction Date:                  Rent Price:                 Surface:
Number of Rooms:                    Parking Spots:              Furnishing:

Address:
________________________________________

Street:                             City:                       Zip Code:
State:                              Country:

```

**Hint:**

```
< DEFINE A NEW REPORT ACTION >
<record id='<CUSTOM_ID>' model='ir.actions.report'>
    ...
    <field name='report_name'><MODULE_NAME>.property_sheet</field>
    <field name='report_file'><MODULE_NAME>.property_sheet</field>
    ...
</record>

< DEFINE A NEW QWEB TEMPLATE FOR YOUR REPORT >
<template id="property_sheet">
    <t t-call="web.html_container">
        <t t-foreach="docs" t-as="o">
            <t t-call="web.external_layout">
                <div class="page">

                    Define the architecture of your report. In this case,
                    if you want to access data on a record, for example
                    the name of a property, you can simply do:

                    <h1>
                        Property Name: <t t-esc='o.name' />
                    </h1>

                    Because 'docs' contains the list of records selected
                    from a tree/form view, and we loop over docs to get
                    a reference for every property in the 'o' variable

                </div>
            </t>
        </t>
    </t>
</template>

```
