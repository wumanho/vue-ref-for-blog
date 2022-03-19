//全局容器，用于保存当前的 ReactiveEffect 实例
let activeEffect: any

class ReactiveEffect {
    private readonly _fn: any

    constructor(fn) {
        this._fn = fn
    }

    //封装的 run 方法，执行 effect 传入的回调函数
    run() {
        activeEffect = this
        this._fn()
    }
}

export function track(dep) {
    //不再重复收集
    if (dep.has(activeEffect)) return
    dep.add(activeEffect)
}

export function trigger(dep) {
    for (const effect of dep) {
        effect.run()
    }
}

export function effect(fn) {
    //将依赖封装到 reactiveeffect 类的run方法中
    const _effect = new ReactiveEffect(fn)
    //马上执行一下
    _effect.run()
}