import {pipeline} from "node:stream/promises";
import {access, constants, stat} from "node:fs/promises";
import {createReadStream, createWriteStream, existsSync} from "node:fs";

import {shiftCommand} from "./shift-command.js";
import {helperGetAlias} from "../helpers/helper-get-alias.js";

import {CeasarTransform} from "../helpers/ceasar-transform.js";

export async function inputOutputCommand() {
    const inputPutAlias = ['--input', '-i'];
    const outputAlias = ['--output', '-o'];
    const actionAlias = ['--action', '-a'];
    const argv = process.argv;
    const stdOut = process.stdout;
    const shift = shiftCommand();

    let correctOutput = helperGetAlias(outputAlias);
    let inputAlias = helperGetAlias(inputPutAlias);
    let correctAction = helperGetAlias(actionAlias);


    if (correctOutput && !inputAlias) {
        throw 'Output use with input!';
    }

    const instanceTransform = new CeasarTransform(argv, correctAction, shift);

    if (inputAlias) {
        const paramInput = argv[argv.indexOf(inputAlias) + 1].trim();
        const paramOutput = argv[argv.indexOf(correctOutput) + 1].trim();
        const statInput = await stat(paramInput);
        if (statInput.size === 0) {
            throw 'Empty file!';
        }

        await access(paramInput, constants.R_OK).catch(() => {
            throw 'No Rad access!';
        })
        if (correctOutput) {
            if (existsSync(paramOutput)) {
                await access(paramOutput, constants.W_OK).catch(() => {
                    throw 'No Write access!';
                });
            }
            await pipeline(
                createReadStream(paramInput),
                instanceTransform,
                createWriteStream(paramOutput)
            );
            return;
        }
        await pipeline(
            createReadStream(paramInput),
            instanceTransform,
            stdOut
        );
        return;
    }
}