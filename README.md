# Beta Portal
Assignment For Ajackus

Steps to install:
1. Clone the project.
2. Open the folder in a terminal, and run `npm install` to install the dependencies.
3. Start the project using `npm start`.
4. Coverage folder is included, but to run tests again (with coverage) run `npm test -- --coverage --watchAll`.


Flow Instructions:
1. Login using `/login`, and use the credentials given below according to the role. 1 doctor, and 1 patient accounts are already created (Credentials Below).
2. Doctor can create, edit, delete a patient. Patient list is available.
3. Default password set for a patient account when created by a doctor is *healthcare*.
4. Patient can view their own profile, and change the password.


Credentials:
1. Doctor: *doctor@hotmail.com* *password*
2. Patient: *patient@hotmail.com* *healthcare*


Possible Errors (or unwanted situations):
1. Console error: `unique key error` when viewing the patient list, does not happen all the time.
2. Diagnoses, and Prescribed Medications are supposed to be required, however was unable to pass the test for some reason, so they are not mandatory for now (*Good news for the patient though, they can now be free of a disease*).

