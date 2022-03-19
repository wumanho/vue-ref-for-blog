import {track, trigger} from "./effect";

class RefImpl {
    private _value: any
    private _rawValue: any
    public deps

    constructor(value) {
        this._rawValue = value
        this._value = value
        this.deps = new Set()
    }

    //收集依赖
    get value() {
        track(this.deps)
        return this._value
    }

    //触发依赖
    set value(newVal) {
        //如果数据没有变更，不触发依赖
        if (hasChanged(newVal, this._rawValue)) {
            this._rawValue = newVal
            this._value = newVal
            trigger(this.deps)
        }
    }
}

const hasChanged = (newVal, oldVal) => !Object.is(newVal, oldVal)

export function ref(value) {
    return new RefImpl(value)
}