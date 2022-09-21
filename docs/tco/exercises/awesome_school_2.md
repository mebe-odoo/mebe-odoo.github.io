# Awesome School - Part 2

This is a continuation of [Awesome School - Part 1](./awesome_school.md)

To further expand the functionalities of your application, the organization has come back to your company with the following change requests:

## Student Information

The base fields available on the `res.partner` model are not enough to fill out all the information required for the students.

To amend that, add two new fields on the model: **Date of Birth** and **Place of Birth**.

**Hint:**

```
< INHERIT THE RES.PARTNER MODEL >

Class ResPartner(models.Model):
    _inherit = ...

< EXTEND THE FORM VIEW FOR RES.PARTNER TO ADD THE TWO NEW FIELDS >
<record id='<CUSTOM_ID>' model='ir.ui.view'>
    ...
    <field name='inherit_id' ref='base.view_partner_form'/>
    <field name='arch' type='xml'>
        ...
    </field>
    ...
</record>

```

## Study Sessions

The organization wishes to be able to manage study sessions for different classrooms.
To achieve this, create a new `awesome.classroom.session` model which should have the following attributes:

- Date Start: Date at which the session started
- Date End: Date at which the session ended
- Subject: The subject of the study session. Can be one of Science, Physics, Mathematics, Art, English, Arabic, Other

The Classroom should hold a reference to all the study sessions linked to it, and a button should be shown on the form
view of the Classroom to see all the study sessions or create new ones.

Also, create a new Server Action linked to the Classrooms that allows automatically create a new Study Session linked
to each Classroom selected

**Hint:**

```
< CREATE THE NEW MODEL >

Class StudySession(models.Model):
    _name = '...'
    _description = '...'

Also create the views, the action, security and menuitem
```

## Add a Constraint on Study Sessions

No two study sessions can take place on the same period. i.e: A study session cannot have a start date that is 
greater than or equal to another's start date, and lesser than or equal to another's end date.

**Hint:**

```
< ADD A CONSTRAINT >
@api.constrains
def _constrain_study_period(self)
    ...

```

## Add a Constraint on Classrooms

No two classrooms can have the same teacher.

**Hint:**

```
< ADD A CONSTRAINT >
_sql_constraint = [...]

```

