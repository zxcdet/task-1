import {termErrorHandler} from "./scripts/errors/term-error-handler.js";
import {aliasParser} from "./scripts/modules/alias-parser.js";

async function ceasarStart() {
    try {
        await aliasParser()
    } catch (err) {
        termErrorHandler(err)
    }
}

ceasarStart()