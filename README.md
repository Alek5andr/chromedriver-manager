Chromedriver Manager
====================

The manager installs version of chromedriver according to installed Google Chrome version.

# \><> Windows only <><

## Requirements
* Node.JS >= 14
  * _Maybe works on lesser versions_

## How does it work
The package scouts **devDependencies** in search of "chromedriver".
<br>
* If there are no **devDependencies**, the script ***_fails_***.
* If there is no "chromedriver" devDependency, it will install one according to your Google Chrome browser's version.

## How to use
Install the package using ```npm install --save-dev @alek5andr/chromedriver-manager```.
<br>
Then execute the following command in your project's terminal: ```install-chromedriver```.

### Error?
If You receive the following error:
> cannot be loaded because running scripts is disabled on this system.

write a script in yours ```package.json``` to execute the following command ```ts-node node_modules/@alek5andr/chromedriver-manager/cli.ts```. For instance:
```
"scripts": {
    "sync-chromes": "ts-node node_modules/@alek5andr/chromedriver-manager/cli.ts"
}
```
Then simply execute the script in the project's terminal: ```npm run sync-chromes```.
<br>
That should do the job.

# Help wanted
Please help to make it quicker.
