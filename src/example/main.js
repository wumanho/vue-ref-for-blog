import * as Ref from "../../lib/esm.js"
import * as Effect from "../../lib/esm.js"

const {ref} = Ref
const {effect} = Effect

const text = ref("Hello Ref !")
window.text = text

effect(() => {
    const root = document.getElementById('app')
    root.innerText = text.value
})