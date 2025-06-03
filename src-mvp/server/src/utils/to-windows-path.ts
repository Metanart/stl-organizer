export function toWindowsPath(wslPath: string): string {
    const match = wslPath.match(/^\/mnt\/([a-z])\/(.*)/i);
    if (!match) return wslPath;

    const driveLetter = match[1].toUpperCase();
    const rest = match[2].replace(/\//g, '\\');
    return `${driveLetter}:\\${rest}`;
}
