use chacha20::{
    cipher::{Iv, KeyIvInit, StreamCipher},
    ChaCha20, Key, Nonce,
};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct Cipher {
    cipher: ChaCha20,
}

// rust basics
#[wasm_bindgen]
impl Cipher {
    #[wasm_bindgen(constructor)]
    pub fn new(key: &[u8], nonce: &[u8]) -> Self {
        let key: &Key = Key::from_slice(key);
        let nonce: &Nonce = Iv::<ChaCha20>::from_slice(nonce);

        let cipher = ChaCha20::new(key, nonce);
        Self { cipher }
    }
}

// node:streams.Transformer
// hopefully, implementing nodejs transformer methods will allow it to behave as such
#[wasm_bindgen]
impl Cipher {
    pub fn transform(&mut self, data: &mut [u8]) {
        self.cipher.apply_keystream(data);
    }
}
