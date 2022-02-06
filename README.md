# Ambulance

## Quick description
### Admin section:
- List of patients (with the option to delete), a form to enter a
new patient and a form to modify an existing patient.
- List of doctors (with the option to delete), a form to enter a
new doctor and a form to modify an existing doctor

### Doctors section
- Login form (username and password)
- A list of examinations assigned to the (reported) physician
and marked as incomplete
- The form for changing the diagnosis for a particular
examination (i.e. the form should contain only the diagnosis
field) and whether or not the examination is completed
(check box)

### Counter
- List of all examinations (separate visually completed and
uncompleted ones) with the option to delete them
- Form to add an examination
- Form to change examination

### Examination Form
- Patient
- Time and date of examination (format: 20.09.2012 10:38)
- Doctor
- Diagnosis (up to 2000 characters)
- Performed / not performed examination
**Note**: The form of the change to the examination in the doctors
section should include only the diagnosis and the completed /
not completed examination.

### Patient form
- Name (up to 100 alpha characters)
- Last name (up to 100 alpha characters)
- Location (ID from the secondary location table)
- JMGB (birth registration number, 13 numeric characters)
- Note(up to 1000 characters)

### Doctor form
- Name (up to 100 alpha characters)
- Last name (up to 100 alpha characters)
- Type (ID from the secondary table typ_doctor)
- Username (up to 32 characters)
- Password (up to 32 characters)

## Requirements
- PHP >= 7.4
- Composer
- Node >= 14.17.5

## On first run instructions
- create database with name from .env
- `composer install`
- `npm install`
- `npm run production`
- `php artisan migrate`
- `php artisan db:seed` (user_admin & user_doctor, check db seeder class for credentials)