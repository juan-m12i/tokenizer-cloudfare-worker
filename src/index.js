import { init, Tiktoken } from "../node_modules/@dqbd/tiktoken/lite/init";
import wasm from "../node_modules/@dqbd/tiktoken/lite/tiktoken_bg.wasm";
import model from "../node_modules/@dqbd/tiktoken/encoders/cl100k_base.json";

export default {
  async fetch() {
    await init((imports) => WebAssembly.instantiate(wasm, imports));
    const encoder = new Tiktoken(
      model.bpe_ranks,
      model.special_tokens,
      model.pat_str
    );
    const tokens = encoder.encode("hello world this is a test");
    const numberOfTokens = tokens.length; // Get the length of the tokens array
    encoder.free();
    return new Response(`${numberOfTokens}`); // Return the number of tokens
  },
};
