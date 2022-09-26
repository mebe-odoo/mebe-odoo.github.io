# Realty Management - Part 4

Part 1: [Realty Management - Part 1](./realty_management.md)
Part 2: [Realty Management - Part 2](./realty_management_2.md)
Part 3: [Realty Management - Part 3](./realty_management_3.md)

One more requirement remains to be implemented before the Realty Management app can be pushed into production.

In order to adapt their own workflow to the existing app, the agency wishes to make use of the **Approvals** app available in Odoo 
to restrict the confirmation of a Tenancy until an approval request has been approved.


## Add an Approval Request Category Through XML Data

It is possible to create a new approval category and set the default approvers there. Those approvers
will be copied over to any new approval request that has the new category.

**Hint:**

```
< CREATE THE APPROVAL REQUEST CATEGORY >
<record id='<CUSTOM_ID>' model='approval.category'>
    <field name="name">...</field>
    <field name="approval_minimum">...</field>
    ...
</record>
```

## Trigger an Approval Request When Creating a Tenancy

