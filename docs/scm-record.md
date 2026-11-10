# Software Configuration Management Record

## Project Details

* **Project Name:** Student Task Management System
* **Course:** CSE2552 – Software Configuration Management
* **Version:** v0.1
* **Status:** Initial Setup

## Configuration Items

| CI ID | Configuration Item                    | Type          | Owner              | Version/Status |
| ----- | ------------------------------------- | ------------- | ------------------ | -------------- |
| CI-01 | HTML, CSS and JavaScript source files | Software      | Development Team   | v0.1           |
| CI-02 | README.md                             | Documentation | Documentation Team | v0.1           |
| CI-03 | scm-record.md                         | Documentation | SCM Lead           | v0.1           |
| CI-04 | Test cases                            | Test artifact | Reviewer           | Planned        |
| CI-05 | .gitignore                            | Configuration | Developer          | v0.1           |
| CI-06 | Git repository and version history    | Configuration | SCM Lead           | v0.1           |

## Version Control

* Version Control System: Git
* Remote Repository: GitHub
* Initial Version: v0.1
* Initial Commit Message: chore: initialize project

## Initial Setup Activities

1. Created the project folder structure.
2. Added the initial HTML, CSS and JavaScript files.
3. Created the README file.
4. Created the SCM record.
5. Added the .gitignore file.
6. Initialized Git and configured the user identity.
7. Prepared the initial commit.
# Branching Strategy

Our team follows the Feature Branch Workflow.

### Main
Contains the stable integrated version of the application.

### feature/CR-02-ui-update
Used by Student A for UI development and improvements.

### feature/CR-03-validation
Used by Student B for implementing validation.

### Reason for Selecting This Strategy

We selected the Feature Branch Workflow because it allows developers to work independently on different features without directly modifying the main branch.

It also makes it easier to review, test and integrate changes.
 ## Integration Test

After merging CR-02 UI updates into the main branch, the application was tested.

- Page loads: PASS
- UI works: PASS
- Existing functionality: PASS

Overall: PASS
