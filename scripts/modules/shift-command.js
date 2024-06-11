export function shiftCommand() {
    const argv = process.argv;
    const shitAlias = ['--shift', '-s'];

    let shift = 1;

    shitAlias.forEach((shifts) => {
        const shiftIndex = argv.indexOf(shifts);

        if (shiftIndex !== -1) {
            if (!(argv[shiftIndex + 1] >= 1)) {
                throw 'Less than 1 shift!';
            }
            shift = argv[shiftIndex + 1];
        }
    })
    return shift;
}