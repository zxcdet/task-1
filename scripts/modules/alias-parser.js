import {helperCommand} from "./helper-command.js";
import {actionCommand} from "./action-command.js";
import {paramErrorHandler} from "../errors/param-error-handler.js";
import {helperGetAlias} from "../helpers/helper-get-alias.js";
import {inputOutputCommand} from "./input-output-command.js";

const argv = process.argv;
const isRequireAction = argv.includes('--action') || argv.includes('-a');
const inputPutAlias = ['--input', '-i'];

export async function aliasParser() {
    helperCommand();
    if (isRequireAction) {

        paramErrorHandler();

        let inputAlias = helperGetAlias(inputPutAlias);

        if (inputAlias) {
            await inputOutputCommand();
            return
        }

        actionCommand();
        return;
    }
    throw 'Required alias --action or a with encode or decode!';
}