import { execSync } from 'child_process';

class CommandExecutor {

    private versionRegEx: RegExp = /\d{1,3}/;
    private errMsg: string = ' version is not found.';

    private execCmd(cmd: string, options?: Array<string>) {
        try {
            return execSync(cmd).toString();
        } catch (error: any) {
            console.log(error);
            throw Error(error.message);
        }
    }

    private getChromedriverModule(): string {
        return this.execCmd('npm list --dev --depth=0 --json');
    }

    private getChromedriverVersionFullVersion(): string {
        const installedDevDependencies: any = JSON.parse(this.getChromedriverModule()).dependencies;
        return installedDevDependencies.hasOwnProperty("chromedriver") ? installedDevDependencies["chromedriver"].version : undefined;
    }

    private getChromedriverVersionMajorVersion(): string | undefined {
        const array: RegExpExecArray | null = (this.versionRegEx).exec(this.getChromedriverVersionFullVersion());
        return array != null ? array[0] : undefined;
    }

    private getInstalledGoogleChrome(): string {
        return this.execCmd('wmic product get name,version | findstr /I /R /C:"chrome"');
    }

    private getInstalledGoogleChromeFullVersion(): string {
        return this.getInstalledGoogleChrome().replace('Google Chrome', '');
    }

    private getInstalledGoogleChromeMajorVersion(): string | undefined {
        const array: RegExpExecArray | null = (this.versionRegEx).exec(this.getInstalledGoogleChromeFullVersion());
        return array != null ? array[0] : undefined;
    }

    private installChromedriver(version: string = 'latest'): string {
        return this.execCmd('npm install --save-dev chromedriver@' + version);
    }

    synchronizeChromeAndChromedriver(): void {
        let googleChromeVersion: string | undefined = this.getInstalledGoogleChromeMajorVersion();
        let chromedriverVersion: string | undefined = this.getChromedriverVersionMajorVersion();

        if (googleChromeVersion === undefined) throw Error('Google Chrome' + this.errMsg)
        console.log('Google Chrome version: ' + googleChromeVersion);
        console.log('chromedriver version: ' + chromedriverVersion);

        if (chromedriverVersion === undefined) this.installChromedriver(googleChromeVersion);
        if (googleChromeVersion != chromedriverVersion) this.installChromedriver();
    }

}

export default new CommandExecutor();
