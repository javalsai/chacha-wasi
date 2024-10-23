import { pipeline } from 'node:stream'
import chacha from 'chacha'

const key = Buffer.from(new Uint8Array(32))
const nonce = Buffer.from(new Uint8Array(12))

const cipher = chacha.createCipher(key, nonce);

pipeline(
        process.stdin,
        cipher,
        process.stdout,
        () => {},
)
