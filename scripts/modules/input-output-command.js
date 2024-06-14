import { Transform } from "node:stream";
import { access, constants, stat } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
import { createReadStream, createWriteStream, existsSync } from "node:fs";

import { program } from 'commander';
import { decrypt, encrypt } from "caesar-encrypt";

export async function inputOutputCommand() {
    const options = program.opts();

        const inputExist = existsSync(options.input);
        const outputExist = existsSync(options.output);

        if (!inputExist && options.input) {
            throw `No file ${options.input}!`;
        }

        const statInput = await stat(options.input);

        if (statInput.size === 0) {
            throw 'Empty file!';
        }

        await access(options.input, constants.R_OK).catch(() => {
            throw 'No Rad access!';
        })

        if (outputExist && options.output) {
            await access(options.output, constants.W_OK).catch(() => {
                throw 'No Write access!';
            });
        }


        const instanceTransform = new Transform({
            transform(chunk, _, cb) {
                if (options.action === 'encode') {
                    cb(null, encrypt(chunk.toString(), options.shift));
                } else {
                    cb(null, decrypt(chunk.toString(), options.shift));
                }
            }
        });

         await pipeline(
            createReadStream(options.input),
            instanceTransform,
            options.output ? createWriteStream(options.output, {flags: 'a'}) : process.stdout
        );
}