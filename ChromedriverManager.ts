import { execSync } from 'child_process';

class CommandExecutor {

    private versionRegEx: RegExp = /\d{1,3}/;
    private errMsg: string = ' version is not found.';

    private execCmd(cmd: string, options?: Array<string>) {
        try {
            return execSync(cmd).toString();
        } catch (error) {
            console.log(error);
            throw Error(error.message);
        }
    }

    private getChromedriverModule(): string {
        return this.execCmd('npm list --dev --depth=0 --json');
    }

    private getChromedriverVersionFullVersion(): string {
        return JSON.parse(this.getChromedriverModule()).dependencies["chromedriver"].version;
    }

    private getChromedriverVersionMajorVersion(): string | Error {
        const array: RegExpExecArray | null = (this.versionRegEx).exec(this.getChromedriverVersionFullVersion());
        return array != null ? array[0] : new Error('chromedriver' + this.errMsg);
    }

    private getInstalledGoogleChrome(): string {
        return this.execCmd('wmic product get name,version | findstr /I /R /C:"chrome"');
    }

    private getInstalledGoogleChromeFullVersion(): string {
        return this.getInstalledGoogleChrome().replace('Google Chrome', '');
    }

    private getInstalledGoogleChromeMajorVersion(): string | Error {
        const array: RegExpExecArray | null = (this.versionRegEx).exec(this.getInstalledGoogleChromeFullVersion());
        return array != null ? array[0] : new Error('Google Chrome' + this.errMsg);
    }

    synchronizeChromeAndChromedriver(): void {
        let googleChromeVersion: string | Error = this.getChromedriverVersionMajorVersion();
        let chromedriverVersion: string | Error = this.getInstalledGoogleChromeMajorVersion();

        console.log('Google Chrome version: ' + googleChromeVersion);
        console.log('chromedriver version: ' + chromedriverVersion);
        if (googleChromeVersion != chromedriverVersion) this.execCmd('npm install --save-dev chromedriver@latest');
    }

}

new CommandExecutor().synchronizeChromeAndChromedriver();
