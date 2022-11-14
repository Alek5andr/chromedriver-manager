declare class CommandExecutor {
    private versionRegEx;
    private errMsg;
    private execCmd;
    private getChromedriverModule;
    private getChromedriverVersionFullVersion;
    private getChromedriverVersionMajorVersion;
    private getInstalledGoogleChrome;
    private getInstalledGoogleChromeFullVersion;
    private getInstalledGoogleChromeMajorVersion;
    private installChromedriver;
    synchronizeChromeAndChromedriver(): void;
}
declare const _default: CommandExecutor;
export default _default;
