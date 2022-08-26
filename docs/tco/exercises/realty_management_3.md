# Realty Management - Part 3

This is a continuation of [Realty Management - Part 2](./realty_management_3.md)

The realty agency has come back to your company one last time to improve the security of their application:

## New Security Groups

To better manage the responsabilities and permissions of their employees, the agency wants to separate their system users
into three new groups: Property Managers, Tenancy Managers & Tenancy Agents.

Property Managers can read, write, create and unlink both Properties & Tenancies
Tenancy Managers and Tenancy Agents are only able read, write, create and unlink Tenancies.

These new groups should be grouped under a new **Realty Management** category.

**Hint:**

```
< CREATE CATEGORY >
<record id='<CATEGORY_ID>' model='ir.module.category'>
    <field name='name'>Realty Management</field>
        ...
</record>

< CREATE GROUPS >
<record id='<GROUP_1_ID>' model='res.groups'>
    <field name='name'>Tenancy Managers</field>
    <field name='category_id' ref='<MODULE_NAME>.<CATEGORY_ID>' />
        ...
</record>

<record id='<GROUP_2_ID>' model='res.groups'>
    <field name='name'>Tenancy Agents</field>
    <field name='category_id' ref='<MODULE_NAME>.<CATEGORY_ID>' />
        ...
</record>

<record id='<GROUP_3_ID>' model='res.groups'>
    <field name='name'>Property Managers</field>
    <field name='category_id' ref='<MODULE_NAME>.<CATEGORY_ID>' />
    <field name='implied_ids' ref='...' />
        ...
</record>

< UPDATE ACCESS RIGHTS >
Update the ir.model.access.csv file in your security folder to use the correct groups.

```

## Only Tenancy Managers can Validate Tenancies

The agency wants only Tenancy Managers, and by extension property managers, to be able to validate tenancies.
To achieve this, define a new view that inherits the base tenancy form view and make the **Validate** button only
visible to users with the correct group.

**Hint:**

```
< INHERIT THE FORM VIEW >
<record id='<CUSTOM_ID>' model='ir.ui.view'>
    ...
    <field name='inherit_id' ref='<MODULE_NAME>.<INITIAL_FORM_VIEW>' />
    <field name='groups_id' eval='[(4, ref("<MODULE_NAME>.<GROUP_ID>"))]'/>
    ...
</record>
```

It is also recommended to add a check on the python side to make sure Tenancies can only be validated by the correct group. To achieve this, use the following function available on any user record to check their groups:

```
from odoo.exceptions import UserError
...
if not user.has_group('<MODULE_NAME>.<GROUP_ID>'):
    raise UserError('...')
...
```

## Tenancy Agents can only see their own Tenancies

To implement further security, the agency wishes to allow Tenancy Agents to only be able to view, write, create and unlink their own tenancies.

To achieve this, add a new field on the Tenancy model, where a user can be specified. By default, the value of the field
should be `this.env.user`, and only Tenancy Managers can change its value.

Once the field has been added, create new record rules to limit the access on the Tenancy Model.

**Hint:**

```
< ADD A NEW FIELD TO THE TENANCY MODEL >
...
user_id = fields.Many2one("res.users", string="Agent", default=lambda self: self.env.user)
...

< CREATE THE RECORD RULE >
<record id='<CUSTOM_ID>' model='ir.rule'>
    <field name='name'>Tenancies: Agents can only manage their own tenancies</field>
    <field name='model_id' ref='model_realty_tenancy' />
    <field name='domain_force'>[('user_id', '=', user.id)]</field>
    <field name='groups' eval='...' />
    ...
        Set then permissions
    ...
</record>
```

## Define a Sequence for Tenancies

To implement a better, more scalable naming convention for your tenancies, the agency wishes to define a new
sequence that will be used to name your tenancies automatically.

To achieve this, define a new ir.sequence record and use it to initialize the name of your tenancy.

**Hint:**

```
< ADD A NEW SEQUENCE >
<record id='<CUSTOM_ID>' model='ir.sequence'>
    <field name='name'>Realty Tenancy</field>
    <field name='model_id' ref='model_realty_tenancy' />
    <field name='code'>realty.tenancy</field>
    <field name='prefix'>TEN/%(year)s/</field>
    <field name='padding' eval='...' />
    ...
</record>

< OVERRIDE THE CREATE METHOD >

@api.model_create_multi
def create(self, vals_list)
    ...
    # the Name field should be readonly, and its value only set once the tenancy is created
    vals['name'] = self.env.ref('<MODULE_NAME>.<SEQUENCE_ID>').next_by_id()
    # OR
    vals['name'] = self.env['ir.sequence'].next_by_code('realty.tenancy')
    ...
```

## New Report for Tenancies

The agency wants to be able to print a document with the details of any given tenancy(ies).
To achieve this, create a new pdf report for the Tenancies model. The report should display all relevant information
about the tenancy.

If the tenancy is ongoing, the title of the report should be displayed in green.
If the tenancy is still in draft, the title of the report should be: 'Draft Tenancy' in gray.
If the tenancy is neither ongoing nor in draft, the title should be displayed in blue.

Print whatever information you think is pertinent, including the tenants, rents and dates.

You can check the Invoice report defined in `odoo/addons/account/views/report_invoice.xml` to get an idea of what
your report should look like. No need to be as complex, however. Keep it simple.

**Hint:**

```
< DEFINE A NEW REPORT ACTION >
<record id='<CUSTOM_ID>' model='ir.actions.report'>
    ...
    <field name='report_name'><MODULE_NAME>.tenancy_contract</field>
    <field name='report_file'><MODULE_NAME>.tenancy_contract</field>
    ...
</record>

< DEFINE A NEW QWEB TEMPLATE FOR YOUR REPORT >
<template id="tenancy_contract">
    <t t-call="web.html_container">
        <t t-foreach="docs" t-as="o">
            <t t-call="web.external_layout">
                <div class="page">

                    Define the architecture of your report.

                    You can use Bootstrap css classes to customize the look & feel.
                    For example: To change the color of a paragraph, use text-success, text-info and so on.

                </div>
            </t>
        </t>
    </t>
</template>

```
