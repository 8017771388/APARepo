
call node --version

call npm install

::call npm uninstall -g @angular/cli angular/cli

::call npm install -g @angular/cli@8.3.6
::call npm install --save-dev @angular-devkit/build-angular

::call npm link

::call npm audit fix


ECHO ************ Angular Setup Details ************
call ng --version
::call npm audit fix
ECHO ************ Start Building App ************

::call npm install -g increase-memory-limit

::call increase-memory-limit

::node --max_old_space_size=8192 ./node_modules/@angular/cli/bin/ng build --build-optimizer --base-href=/cfoadmin/ --source-map=false --prod --output-hashing=all
::ng build --prod --output-hashing=all --base-href /apa/ --source-map
node --max_old_space_size=8192 node_modules/@angular/cli/bin/ng build --prod --output-hashing=all --base-href /apa/ --source-map 
::node --max_old_space_size=8048 ./node_modules/@angular/cli/bin/ng build --prod --aot --output-hashing=all --base-href /cfoadmin/ --source-map
