--------------------------------------------
Simple Git
--------------------------------------------

Add the files to the branch:
 `$ git add .`
 
Commit the files:
 `$ git commit -m "comment"`
 
Add branch and files to the Remote Repo:
 `$ git push -u origin master`

--------------------------------------------
 Managing your Local Repo
--------------------------------------------
NOTE: If you need to hard reset your local repo to match 
       the remote master use the following commands:<br>
 `$ git fetch origin`<br>
 `$ git reset --hard origin/master`<br>
 
Undo the act of committing, leaving everything else intact:<br>
 `$ git reset --soft HEAD^:`<br>

Undo the act of committing and everything you'd staged, 
but leave the work tree (your files intact):<br>
 `$ git reset HEAD^`

Completely undo it, throwing away all uncommitted changes,
 resetting everything to the previous commit:<br>
 `$ git reset --hard HEAD^`
 
--------------------------------------------  
 Simple Workflow
-------------------------------------------- 
Clone the Repo to local machine:<br>
 `$ git clone https://github.com/user_name/repo_name.git`
 
Make sure the local master is up-to-date:
 `$ git pull origin master`

Create new branch:
 `$ git banch branch_name`
 
Move to branch:
 `$ git checkout branch_name`
 
Navigate file structure as needed:<br>
 `$ ls`<br>
 `$ cd folder_name`
 
Add the files to the branch:
 `$ git add .`
 
Verify file: 
 `$ git status`
 
Commit the files:
 `$ git commit -m "comment"`
 
Add branch and files to the Remote Repo:<br>
 `$ git push -u origin branch_name`
 
Go to the github website to manage pull request and merge. 
 
Switch back to local master so you can delete the local branch:<br>
 `$ git checkout master`
 
Delete local branch:<br>
 `$ git branch -d branch_name`<br>
 OR<br>
 `$ git branch -D branch_name`
 
 If you don't want to go to the website, you can merge your branch 
 to the master locally and push the new master to the remote repo:
 
Switch back to master branch:<br>
 `$ git checkout master`
 
Merge the branch with the local master:<br>
 `$ git merge branch_name -m "comment"`
 
Push the local master to the remote master:<br>
 `$ git push origin master`
 
Delete local branch:<br>
 `$ git branch -d branch_name`<br>
 OR<br>
 `$ git branch -D branch_name`
