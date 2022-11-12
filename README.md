Chromedriver Manager
====================

The manager installs version of chromedriver according to installed Google Chrome version.

# ! Upgrade in progress !
First package

# Windows only!

## Requirements
* Node.JS >= 14
  * _Maybe works on lesser versions_

## How to use
Install the package using ```npm install --save-dev @alek5andr/chromedriver-manager```. Then execute the following command in your project's terminal: ```install-chromedriver```.

### Error
If You receive the following error:
> cannot be loaded because running scripts is disabled on this system.

write a script in yours ```package.json``` to execute the command. For instance:
```
"scripts": {
    "sync-chromes": "ts-node node_modules/@alek5andr/chromedriver-manager/cli.ts"
}
```
Then simply execute the script in the project's terminal: ```npm run sync-chromes```.
That should do the job.
