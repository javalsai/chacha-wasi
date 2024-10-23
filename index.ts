import { Transform, type TransformCallback } from 'node:stream'
import lib from './pkg'

export class Cipher extends Transform {
  #lib_cipher: lib.Cipher

  constructor(key: Uint8Array, nonce: Uint8Array) {
    if (key.length !== 32 || nonce.length !== 12)
      throw new Error('Invalid key and nonce lengths')

    super({
      transform: (
        might_chunk: unknown,
        encoding: BufferEncoding,
        callback: TransformCallback,
      ): void => {
        let chunk: Uint8Array | undefined = undefined
        if (might_chunk instanceof Uint8Array) chunk = might_chunk
        else if (Buffer.isBuffer(might_chunk))
          chunk = new Uint8Array(might_chunk)
        else if (typeof might_chunk === 'string') {
          if (encoding === 'utf-8' || encoding === 'utf8')
            chunk = new TextEncoder().encode(might_chunk)
          else chunk = new Uint8Array(Buffer.from(might_chunk, encoding))
        }

        if (!chunk) {
          callback(
            new Error(
              `Invalid chunk type, not a Uint8Array, but ${typeof might_chunk} instead`,
            ),
          )
          return
        }

        this.#lib_cipher.transform(chunk)
        callback(null, chunk)
      },
    })
    this.#lib_cipher = new lib.Cipher(key, nonce)
  }

  update(chunk: Uint8Array) {
    this.#lib_cipher.transform(chunk)
  }

  seek(pos: number) {
    this.#lib_cipher.seek(pos)
  }
}

