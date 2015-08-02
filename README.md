# b2

## ionic

ionic is a hybrid app framework involving cordova and angular.js.

### install

install cordova with npm:

`$ sudo npm install -g cordova`

install ionic:

`$ sudo npm install -g ionic`

### create (if you want a new project)

if you want to create a new project from ionic template:

`$ ionic start myapp`

enter the new folder 'myapp':

`$ cd myapp`

### configure platforms

for instance, we enable Android platform:

`$ ionic platform add android`

### build and run

given that an Android device is connected (which is strongly suggested instead of a emulator), come in the app folder, build and run:

`$ ionic build android`

`$ ionic run android`