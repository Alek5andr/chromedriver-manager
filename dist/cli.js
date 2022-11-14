"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
class CommandExecutor {
    constructor() {
        this.versionRegEx = /\d{1,3}/;
        this.errMsg = ' version is not found.';
    }
    execCmd(cmd, options) {
        try {
            return (0, child_process_1.execSync)(cmd).toString();
        }
        catch (error) {
            console.log(error);
            throw Error(error.message);
        }
    }
    getChromedriverModule() {
        return this.execCmd('npm list --dev --depth=0 --json');
    }
    getChromedriverVersionFullVersion() {
        const installedDevDependencies = JSON.parse(this.getChromedriverModule()).dependencies;
        return installedDevDependencies.hasOwnProperty("chromedriver") ? installedDevDependencies["chromedriver"].version : undefined;
    }
    getChromedriverVersionMajorVersion() {
        const array = (this.versionRegEx).exec(this.getChromedriverVersionFullVersion());
        return array != null ? array[0] : undefined;
    }
    getInstalledGoogleChrome() {
        return this.execCmd('wmic product get name,version | findstr /I /R /C:"chrome"');
    }
    getInstalledGoogleChromeFullVersion() {
        return this.getInstalledGoogleChrome().replace('Google Chrome', '');
    }
    getInstalledGoogleChromeMajorVersion() {
        const array = (this.versionRegEx).exec(this.getInstalledGoogleChromeFullVersion());
        return array != null ? array[0] : undefined;
    }
    installChromedriver(version = 'latest') {
        return this.execCmd('npm install --save-dev chromedriver@' + version);
    }
    synchronizeChromeAndChromedriver() {
        let googleChromeVersion = this.getInstalledGoogleChromeMajorVersion();
        let chromedriverVersion = this.getChromedriverVersionMajorVersion();
        if (googleChromeVersion === undefined)
            throw Error('Google Chrome' + this.errMsg);
        console.log('Google Chrome version: ' + googleChromeVersion);
        console.log('chromedriver version: ' + chromedriverVersion);
        if (chromedriverVersion === undefined)
            this.installChromedriver(googleChromeVersion);
        if (googleChromeVersion != chromedriverVersion)
            this.installChromedriver();
    }
}
exports.default = new CommandExecutor();
//# sourceMappingURL=cli.js.map