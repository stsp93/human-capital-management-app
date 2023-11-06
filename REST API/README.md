# Human Capital Management (HCM)


## REST Api

It supports multiple user roles - `user`, `manager`, and `admin`, each with different access rights.

To use this API, you need to authenticate and include a valid token in your requests.

### Routes

#### Authentication

- Guest Access
  - POST `/users/register` - Register and receive an access token.
  - POST `/users/login` - Log in and receive an access token.
- User Access
  - GET `/users/logout` - Log out.

#### User

- User Access
  - GET `/users/:id` - Get user info.
  - PUT `/users/:id` - Update user(User/Admin change pass only). 
- Admin Access
  - GET `/users/` - Get all. 
  - POST `/users/create` - Create a new user. 

#### Employee

- User Access (Update only own record)
  - GET `/employees/` - Retrieve all employees.
  - GET `/employees/:id` - Retrieve one employee.
  - PUT `/employees/:id` - Update employee.
- Admin/Manager Access
  - POST `/employees/` - Create employee. 

#### Department

- User Access
  - GET `/departments/` - Retrieve all departments.
  - GET `/departments/:id` - Retrieve one department.
- Admin/Manager Access
  - POST `/departments/` - Create department.
  - PUT `/departments/:id` - Update department.

#### Position

- User Access (Own position and partial record of others)
  - GET `/positions/` - Retrieve a list of positions.
  - GET `/positions/:id`- Retrieve one position.
  - GET `/positions/total`- Retrieve position count.
- Admin/Manager Access
  - POST `/positions/` - Create position.
  - PUT `/positions/:id` - Update position.

#### Salary

- User Access (Own salary only)
  - GET `/salary/:id` - Retrieve one salary.
- Admin/Manager Access
  - GET `/salary/` - Retrieve all salaries.
  - POST `/salary/` - Create salary.
  - PUT `/salary/:id` - Update salary.
  - DELETE `/salary/:id/removeBonus?bonusId=` - Add/Remove bonus to salary.
  - POST `/salary/:id/addBonus|removeBonus` - Add/Remove bonus to salary.

#### Leave

- User Access (Own leaves only)
  - GET `/leaves/:id` - Retrieve one leave.
  - GET `/leaves/` - Retrieve all leaves.
  - POST `/leaves/` - Create leave request.
  - PUT `/leaves/:id` - Update leave request.
- Admin/Manager Access
  - GET `/leaves/:id/:status(approved|rejected)` - Approve/Reject a leave request.

#### Performance Review

- User Access (Own reviews only)
  - GET `/reviews/` - Retrieve all reviews.
  - GET `/reviews/:id` - Retrieve one review.
- Admin/Manager Access
  - POST `/reviews/` - Create review.
  - PUT `/reviews/:id` - Update review.

#### Delete requires Admin Access
- `DELETE`  
  `/users/:id` - Delete a specific user.    
  `/employees/:id` - Delete a specific employee.     
  `/departments/:id` - Delete a specific department.    
  `/positions/:id`- Delete a specific position and related salary.  
  `/salary/:id` - Delete a specific salary.  
  `/leaves/:id` - Delete a specific leave.  
  `/reviews/:id` - Delete a specific review.


#### Additional Info

##### Query String
You can use query strings when retrieving multiple records, 

`?search=` search for a name/username

`?page=` spec page 

`?limit=` page limit

`?sort=` sort by propery (asc default)

`?order=` 'asc','desc','1','-1'

##### Positon:
When assigning a new position, the old one(if any) is becoming inactive with end date be equal to the start date of the new one

##### Leave:
When leave is requested it has pending status and stays active until the start date.
If approved stays active until the end of the year (Year of the end date)

