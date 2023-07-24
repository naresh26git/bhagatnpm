# DB Schema

## List of Tables

1. users
2. departments
3. designations
4. grade_sets
5. personal_info
6. address_types
7. addresses
8. family_details
9. leave_types
10. leaves
11. query_types
12. query_sub_types
13. queries
14. payrolls
15. time_sheets

### Design

![DB Design](/docs/db-design.png)

### Shared between all tables

#### Shared Fields

| data        | table         | type   | required | key type      | default |
| ----------- | ------------- | ------ | -------- | ------------- | ------- |
| createdAt   | created_at    | date   | true     | -             | now     |
| createdById | created_by_id | number | true     | fk - users.id | -       |
| updatedAt   | updated_at    | date   | true     | -             | now     |
| updatedById | updated_by_id | number | true     | fk - users.id | -       |

### users Table

#### users Fields

| data     | table    | type             | required | key type | default  |
| -------- | -------- | ---------------- | -------- | -------- | -------- |
| id       | id       | number           | true     | pk       | -        |
| name     | name     | string           | true     | -        | -        |
| username | username | string           | true     | -        | -        |
| password | password | string           | true     | -        | -        |
| role     | role     | role enum        | true     | -        | employee |
| mobile   | mobile   | string           | false    | -        | -        |
| email    | email    | string           | false    | -        | -        |
| status   | status   | user status enum | false    | -        | active   |

### departments Table

#### departments Fields

| data | table | type   | required | key type | default |
| ---- | ----- | ------ | -------- | -------- | ------- |
| id   | id    | number | true     | pk       | -       |
| name | name  | string | true     | -        | -       |

### designations Table

#### designations Fields

| data         | table         | type   | required | key type            | default |
| ------------ | ------------- | ------ | -------- | ------------------- | ------- |
| id           | id            | number | true     | pk                  | -       |
| departmentId | department_id | number | true     | fk - departments.id | -       |
| name         | name          | string | true     | -                   | -       |

### grade_sets Table

#### grade_sets Fields

| data | table | type   | required | key type | default |
| ---- | ----- | ------ | -------- | -------- | ------- |
| id   | id    | number | true     | pk       | -       |
| name | name  | string | true     | -        | -       |

### personal_info Table

#### personal_info Fields

| data                   | table                     | type   | required | key type             | default |
| ---------------------- | ------------------------- | ------ | -------- | -------------------- | ------- |
| id                     | id                        | number | true     | pk                   | -       |
| userId                 | user_id                   | number | true     | fk - users.id        | -       |
| firstName              | first_name                | string | true     | -                    | -       |
| middleName             | middle_name               | string | false    | -                    | -       |
| lastName               | last_name                 | string | true     | -                    | -       |
| fullName               | full_name                 | string | true     | -                    | -       |
| dateOfBirth            | date_of_birth             | date   | true     | -                    | -       |
| dateOfJoining          | date_of_joining           | date   | true     | -                    | -       |
| departmentId           | department_id             | number | true     | fk - departments.id  | -       |
| designationId          | designation_id            | number | true     | fk - designations.id | -       |
| gradeSetId             | grade_set_id              | number | true     | fk - grade_sets.id   | -       |
| reportingManagerUserId | reporting_manager_user_id | number | true     | fk - users.id        | -       |

### address_types Table

#### address_types Fields

| data | table | type   | required | key type | default |
| ---- | ----- | ------ | -------- | -------- | ------- |
| id   | id    | number | true     | pk       | -       |
| name | name  | string | true     | -        | -       |

### addresses Table

#### addresses Fields

| data          | table           | type   | required | key type              | default |
| ------------- | --------------- | ------ | -------- | --------------------- | ------- |
| id            | id              | number | true     | pk                    | -       |
| userId        | user_id         | number | true     | fk - users.id         | -       |
| addressTypeId | address_type_id | number | true     | fk - address_types.id | -       |
| street        | street          | string | true     | -                     | -       |
| city          | city            | string | true     | -                     | -       |
| state         | state           | string | true     | -                     | -       |
| country       | country         | string | true     | -                     | -       |
| pincode       | pincode         | string | true     | -                     | -       |

### family_details Table

#### family_details Fields

| data             | table             | type                   | required | key type      | default |
| ---------------- | ----------------- | ---------------------- | -------- | ------------- | ------- |
| id               | id                | number                 | true     | pk            | -       |
| userId           | user_id           | number                 | true     | fk - users.id | -       |
| relationshipType | relationship_type | relationship type enum | true     | -             | -       |
| name             | name              | string                 | true     | -             | -       |
| dateOfBirth      | date_of_birth     | date                   | true     | -             | -       |

### leave_types Table

#### leave_types Fields

| data        | table        | type   | required | key type | default |
| ----------- | ------------ | ------ | -------- | -------- | ------- |
| id          | id           | number | true     | pk       | -       |
| name        | name         | string | true     | -        | -       |
| daysAlloted | days_alloted | number | true     | -        | -       |

### leaves Table

#### leaves Fields

| data        | table         | type              | required | key type            | default |
| ----------- | ------------- | ----------------- | -------- | ------------------- | ------- |
| id          | id            | number            | true     | pk                  | -       |
| userId      | user_id       | number            | true     | fk - users.id       | -       |
| leaveTypeId | leave_type_id | number            | true     | fk - leave_types.id | -       |
| fromDate    | from_date     | date              | true     | -                   | -       |
| toDate      | to_date       | date              | true     | -                   | -       |
| remarks     | remarks       | string            | false    | -                   | -       |
| status      | status        | leave status enum | true     | -                   | pending |

### query_types Table

#### query_types Fields

| data | table | type   | required | key type | default |
| ---- | ----- | ------ | -------- | -------- | ------- |
| id   | id    | number | true     | pk       | -       |
| name | name  | string | true     | -        | -       |

### query_sub_types Table

#### query_sub_types Fields

| data        | table         | type   | required | key type            | default |
| ----------- | ------------- | ------ | -------- | ------------------- | ------- |
| id          | id            | number | true     | pk                  | -       |
| queryTypeId | query_type_id | number | true     | fk - query_types.id | -       |
| name        | name          | string | true     | -                   | -       |

### queries Table

#### queries Fields

| data           | table             | type   | required | key type                | default |
| -------------- | ----------------- | ------ | -------- | ----------------------- | ------- |
| id             | id                | number | true     | pk                      | -       |
| userId         | user_id           | number | true     | fk - users.id           | -       |
| query          | query             | string | false    | -                       | -       |
| remarks        | remarks           | string | false    | -                       | -       |
| queryTypeId    | query_type_id     | number | true     | fk - query_types.id     | -       |
| querySubTypeId | query_sub_type_id | number | true     | fk - query_sub_types.id | -       |

### payrolls Table

#### payrolls Fields

| data   | table   | type                | required | key type      | default |
| ------ | ------- | ------------------- | -------- | ------------- | ------- |
| id     | id      | number              | true     | pk            | -       |
| userId | user_id | number              | true     | fk - users.id | -       |
| date   | date    | date                | true     | -             | -       |
| salary | salary  | number              | true     | -             | -       |
| status | status  | payroll status enum | true     | -             | pending |

### time_sheets Table

#### time_sheets Fields

| data    | table    | type                   | required | key type      | default |
| ------- | -------- | ---------------------- | -------- | ------------- | ------- |
| id      | id       | number                 | true     | pk            | -       |
| userId  | user_id  | number                 | true     | fk - users.id | -       |
| inTime  | in_time  | date                   | true     | -             | -       |
| outTime | out_time | date                   | true     | -             | -       |
| status  | status   | time sheet status enum | true     | -             | present |
