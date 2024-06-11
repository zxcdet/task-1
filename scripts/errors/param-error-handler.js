export function paramErrorHandler() {
    const argv = process.argv;
    const itemAllAlias = ['--shift', '--action', '--input', '--output', '-s', '-o', '-i', '-a'];

    itemAllAlias.forEach((alias) => {
        if (argv.indexOf(alias) !== -1 && !argv[argv.indexOf(alias) + 1]) {
            throw `Empty parameter for ${alias}!`;
        }
    })
}