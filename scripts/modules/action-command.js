import {shiftCommand} from "./shift-command.js";
import {decrypt, encrypt} from "caesar-encrypt";

export function actionCommand() {
    const argv = process.argv;
    const stdOut = process.stdout;
    const stdIn = process.stdin;
    const shift = shiftCommand();

    stdOut.write('Your text');
    stdOut.write('>');
    stdIn.setEncoding('utf8').on('data', (data) => {
        if (argv.includes('decode')) {
            console.log(decrypt(data, shift));
            process.exit();
        }
        console.log(encrypt(data, shift));
        process.exit();
    }).on('error', (err) => {
        if (err) throw err;
    })

}