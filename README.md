# chacha-wasi

This is a pretty rudimentary library for rust chacha encryption bindings aimed for speed and easy of use. It was initially intended to work on bun as there's no built-in chacha20 cipher, but could be used on other environments such as the web, tho it might no be prepared for it.

# benchmarks

This project has a direcotory to bench the cipher thoughoutput compared to other implementations, such as of now, the results are:
```
Benching 'this.js' (with 'bun run') for 10s...
3,33GiB 0:00:10 [ 341MiB/s] [...]
Transfered 3,4Gi/10s
Benching 'node-native.js' (with 'node') for 10s...
11,6GiB 0:00:10 [1,16GiB/s] [...]
Transfered 12Gi/10s
Benching 'chacha.js' (with 'bun run') for 10s...
 429MiB 0:00:10 [42,9MiB/s] [...]
Transfered 429Mi/10s
Benching 'chacha.js' (with 'node') for 10s...
 352MiB 0:00:10 [35,3MiB/s] [...]
Transfered 353Mi/10s
```

If the names aren't obvious, `node-native` is just the built-in node cipher, `this` is the use of this library, and `chacha` is using [this npm package](https://www.npmjs.com/package/chacha). The results are not carefully measured but might provide a rough estimate of the speed.

# docs

The code is very simple so far, you can just check out `index.ts` and `src/main.rs`, not more than a few hundred lines, maybe not even 200.

# installation

You will need to have wasm-pack installed (`cargo i wasm-pack wasm-bindgen-cli` should provide any command necessary).

Then, everything should be as simple as installing the package with your prefered npm package manager from the git URL and making sure the postinstall script succeeded (will build the library into a wasm binary and js bindings).

# contributing and issued

Feel free to fork, open a PR, issue... or anything related to this, I doubt it will even be used.
