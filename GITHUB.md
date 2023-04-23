# Git Strategy

1.	Master branch: Maintain a single stable branch, "main," which represents the production-ready state of your code. 
2.	Bug fixes will be performed off a branch of “main” and follow the following feature branch strategy.
3.	Develop branch: Create a "develop" branch, which acts as an integration branch for all features. This branch contains the latest code that has been reviewed and tested.
4.	Feature branches: For each new feature or bugfix, create a separate branch that branches off from the "develop" branch. Name the branch descriptively to reflect its purpose. Maybe we should take these from the Trello board but I do like to have naming convention
•	Example: feature/login or bugfix/fix-pagination
5.	Commit changes: Make frequent, smaller commits in the feature branch, ensuring that each commit is logically organized and represents a specific change.
6.	Pull and rebase: Regularly pull changes from the "develop" branch and rebase your feature branch to keep it up to date, resolving any conflicts as necessary.
7.	Code review: Once the feature or bugfix is complete, create a pull request (PR) to merge the changes from the feature branch into the "develop" branch. Assign team members to review the code, discuss changes, and suggest improvements. Instructions for how to do a PR are located here.
8.	Merge PR: After the PR has been reviewed and approved, merge the changes into the "develop" branch. Delete the feature branch after merging to keep the repository clean.
git checkout develop
- git pull origin develop
- git checkout <feature-branch-name>
- git merge develop
- # Resolve conflicts, if any
- git add .
- git commit -m "Resolve merge conflicts"
- git push origin <feature-branch-name>
9.	Deployment: Periodically, merge the "develop" branch into the "master" or "main" branch for deployment, ensuring that the production environment stays updated with the latest stable features and fixes. Generally we do this after deployment, once the smoke tests have been done and we know we do not need to rollback. 

