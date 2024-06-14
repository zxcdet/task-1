import { termErrorHandler } from "./scripts/errors/term-error-handler.js";
import { inputOutputCommand } from "./scripts/modules/input-output-command.js";
import { actionCommand } from "./scripts/modules/action-command.js";

import { program } from "commander";

async function caesarStart() {
    try {
        const argv = process.argv;
        const options = program.opts();

        program.requiredOption('-a, --action <type>', 'action', (value) => {
            const actions = ['encode', 'decode'];
            if (!actions.includes(value)) {
                throw 'Use correct param decode or encode'
            }
            return value;
        }).option('-s, --shift <number>', 'shift', (value) => {
            if (value < 1) {
                throw 'Shift less than 1!';
            }
            if (!(typeof parseFloat(value) === 'number' && Number.isFinite(parseFloat(value)))) {
                throw 'Not number!';
            }
            return value;
        }, 1)
            .option('-i, --input <type>',)
            .option('-o, --output <type>',);

        program.parse(argv);

        if (options.input) {
            await inputOutputCommand();
            return;
        }
        actionCommand();
    } catch (err) {
        termErrorHandler(err);
    }
}

await caesarStart();