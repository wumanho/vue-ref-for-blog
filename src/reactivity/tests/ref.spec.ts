import {effect} from "../effect";
import {ref} from "../ref"

describe("ref", () => {
    it("should hold a value", () => {
        const a = ref(1)
        expect(a.value).toBe(1)
    })
    it("should be reactive", () => {
        const a = ref(1)
        let dummy
        let calls = 0
        effect(() => {
            calls += 1
            dummy = a.value
        })
        expect(calls).toBe(1)
        expect(dummy).toBe(1)
        a.value = 2
        expect(calls).toBe(2)
        expect(dummy).toBe(2)
        // value 不变的话，不走 trigger
        a.value = 2
        expect(calls).toBe(2)
        expect(dummy).toBe(2)
    })
})