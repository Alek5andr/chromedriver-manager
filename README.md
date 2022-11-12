Chromedriver Manager
====================

The manager installs version of chromedriver according to installed Google Chrome version.

# ! Under construction !
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
    "sync-chromes": "install-chromedriver"
}
```
Then simply execute the script in the project's terminal: ```npm run sync-chromes```.
That should do the job.
