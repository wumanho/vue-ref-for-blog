//全局容器，用于保存当前的 ReactiveEffect 实例
let activeEffect;
class ReactiveEffect {
    constructor(fn) {
        this._fn = fn;
    }
    //封装的 run 方法，执行 effect 传入的回调函数
    run() {
        activeEffect = this;
        this._fn();
    }
}
function track(dep) {
    //不再重复收集
    if (dep.has(activeEffect))
        return;
    dep.add(activeEffect);
}
function trigger(dep) {
    for (const effect of dep) {
        effect.run();
    }
}
function effect(fn) {
    //将依赖封装到 reactiveeffect 类的run方法中
    const _effect = new ReactiveEffect(fn);
    //马上执行一下
    _effect.run();
}

class RefImpl {
    constructor(value) {
        this._value = value;
        this.deps = new Set();
    }
    //收集依赖
    get value() {
        track(this.deps);
        return this._value;
    }
    //触发依赖
    set value(newVal) {
        this._value = newVal;
        trigger(this.deps);
    }
}
function ref(value) {
    return new RefImpl(value);
}

export { effect, ref };
