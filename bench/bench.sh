#!/usr/bin/env bash
set -e

MYSELF=$(realpath "$0")
MYDIR=$(dirname "$MYSELF")

bench() {
    CMD=${CMD:-bun run}
    TIME=${2:-10}
    echo "Benching '$1' (with '$CMD') for ${TIME}s..."
    TRANSFERED=$( (
        # shellcheck disable=2086
        timeout "$TIME" $CMD "$MYDIR"/"$1" < /dev/zero \
            || true
    ) | \
        pv | \
        wc -c | \
        numfmt --to=iec-i
    )
    echo "Transfered $TRANSFERED/10s"
}

bench this.js
CMD=node bench node-native.js
bench chacha.js
CMD=node bench chacha.js
