import { dlopen, FFIType, suffix } from "bun:ffi";

const path = new URL(`./libadd.${suffix}`, import.meta.url).pathname;

const lib = dlopen(path, {
  add: { args: [FFIType.int, FFIType.int], returns: FFIType.int },
});

const sum = lib.symbols.add(121312, 2);

console.log("result:", sum);
