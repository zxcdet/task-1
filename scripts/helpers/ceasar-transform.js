import {Transform} from "node:stream";
import {decrypt, encrypt} from "caesar-encrypt";

export class CeasarTransform extends Transform {
    constructor(argv,correctAction, shift) {
        super(argv, correctAction, shift)
        this.argv = argv;
        this.correctAction = correctAction;
        this.shift = shift;
    }

    _transform(chunk, encoding, callback) {
        try {
            const actionIndex = this.argv[this.argv.indexOf(this.correctAction) + 1].trim();

            switch (actionIndex) {
                case 'decode':
                    this.push(decrypt(chunk.toString(), this.shift));
                    break
                case 'encode':
                    this.push(encrypt(chunk.toString(), this.shift));
                    break
                default:
                    throw 'Uncorrected parameter';
            }
            callback();
        } catch (err) {
            callback(err);
        }
    }

}