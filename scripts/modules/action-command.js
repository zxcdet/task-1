import fs from 'node:fs';
import * as readline from 'node:readline';

import { decrypt, encrypt } from "caesar-encrypt";
import { program } from 'commander';

export function actionCommand() {
    const options = program.opts();
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: 'Input String > '
    });

    rl.prompt();

    rl.on('line', (line) => {
        if (line.trim() === ':q') {
            rl.close();
        }
        if (options.output && !options.input) {
            if (line.length > 1) {
                fs.createWriteStream(options.output, { flags: 'a' }).write(line);
                process.stdout.write(`> Success write to ${options.output}\n\n`);
                rl.prompt();
            } else {  process.stdout.write(`> Error write to ${options.output}\n\n`);
                rl.prompt();
            }
            return
        }
        if (options.action === 'decode') {
            process.stdout.write(`Output string > ${decrypt(line, options.shift)}\n\n`);
        } else {
            process.stdout.write(`Output string > ${encrypt(line, options.shift)}\n\n`);
        }
        rl.prompt();
    }).on('close', () => {
        console.log('\n\nGoodbye!');
        process.exit(0);
    });
}