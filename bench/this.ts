import { pipeline } from 'node:stream'
import { Cipher } from '..'

const key = new Uint8Array(32)
const nonce = new Uint8Array(12)

const cipher = new Cipher(key, nonce)

pipeline(
        Bun.stdin.stream() as unknown as NodeJS.ReadableStream,
        cipher,
        process.stdout,
        () => {},
)
