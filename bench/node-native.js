// This script fails on bun and succeeds on node
// Should test if chacha20 support is here already
import crypto from 'node:crypto'
import { pipeline } from 'node:stream'

const cipher = crypto.createCipheriv(
        'chacha20-poly1305',
        Buffer.from(Array(32).fill(0)),
        Buffer.from(Array(12).fill(0)),
)

pipeline(
        process.stdin,
        cipher,
        process.stdout,
        () => {},
)
