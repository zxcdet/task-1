export function helperCommand() {
    const argv = process.argv;
    const isHelpAction = argv.includes('--help') || argv.includes('-h');
    const helpAlias = ['--help', '-h'];

    if (isHelpAction) {
        let helpCorrectAction = helpAlias.find((value) => argv.includes(value));

        if (helpCorrectAction) {
            process.stdout.write(`-s, --shift: a shift\n-i, --input: an input file\n-o, --output: an output file\n-a, --action: an action encode/decode`);
            process.exit();
        }
        return
    }

}