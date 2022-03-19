import typescript from "@rollup/plugin-typescript"

export default {
    input: "./src/index.ts", //入口
    output: [{
        format: "es",
        file: "lib/esm.js"
    }],
    plugins: [typescript()]
}