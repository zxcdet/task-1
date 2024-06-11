const argv = process.argv;

export function helperGetAlias(arr) {
    return arr.find((value) => argv.includes(value));
}