---
    title: Vue2 基础知识
    tags: [Vue2]
    date: 时间 2023
    draft: false
    summary: 重新总结一下vue2
    type: Blog
    images: ['https://cdn.shaoyiqiao.online/Vue-Blog-Cover-2.png']
    authors: ['default']
    layout: PostLayout
    show: true
---

# 基础

## 响应式系统

Vue 的响应式系统是其核心特性之一，它能够确保在应用状态发生改变时，UI 可以自动更新。

![](https://v2.cn.vuejs.org/images/data.png)

1. **数据劫持**. 当你将一个普通 JS 对象传给一个 vue 实例作为其 **`data`** 选项时，Vue 会遍历该对象所有属性，并使用 **`Object.defineProperty`** 将它们转化为 **`getter/setter`** 。
   并在内部跟踪相关依赖，在属性被访问或修改时通知变化。 - `Object.defineProperty` 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。

2. **依赖收集**. 在第一次渲染或者对其他数据的访问中，当某个属性被访问时，**`getter`**被触发。此时，Vue 会记住当前正在使用的属性并**观察**该属性的依赖。

   - 在 get 函数中通过 **`dep.depend`** 做依赖收集。

3. **观察者模式**. Vue 的响应式系统使用的是观察者模式。每个数据属性都有一个对应的观察者对象(Dep)存储所有依赖该属性的东西。当数据属性改变时，它的 **`setter`** 会被触发，进而通知所有关联的观察者进行更新。

4. **批量异步更新**. 为了避免频繁的、不必要的 DOM 操作或计算，Vue 在更新 DOM 时是异步执行的。只要侦听到数据变化，Vue 将开启一个队列，并缓冲在同一事件循环中发生的所有数据变更。如果同一属性被多次修改(如果同一个 watcher 被多次触发)，它只会被推入到队列中一次。然后，在下一个事件循环“tick”中，Vue 刷新队列并执行实际（已去重的）工作。

5. **计算属性和侦听器**. 为了提供更细粒度的数据响应控制，Vue 提供了计算属性 **`computed`** 和侦听器 **`watch`**。计算属性允许你基于其他属性计算和缓存值，而侦听器允许你对单独的数据属性的变化做出响应。

## 双向数据绑定

1. 是一种特殊的绑定方法，它不仅允许数据影响视图（单向数据流），还允许视图影响数据。

   即当一个数据发生变化时，视图随之更新；而当用户在视图中修改了数据时，模型也会相应地更新。

2. 双向数据绑定通常与 v-model 指令相关，常用于表单元素。
3. `v-model` 实际上是 `v-bind`（绑定属性）和 `v-on:input`（监听输入事件）的语法糖。

## 响应式系统跟双向数据绑定的关系

可以理解为：响应式数据系统是 Vue 中数据和视图同步的核心，而双向数据绑定是这个系统的一个特定应用，它允许视图也能反过来影响数据。

## 条件渲染

### v-if

1. Vue 编译器在解析模版时，会给每个元素生成`AST`（抽象语法树）节点。如果编译器在元素上找到`v-if`指令，它会给 AST 节点添加一个`ifConditions`属性。
2. 根据 AST 生成``vnode`时会考虑`v-if`条件，如果值为`false`，相关代码不会被生成，`render`的时候就不会被渲染。
3. 组件重新渲染时，`v-if`会被重新评估。如果条件从`false`变为`true`，跟`v-if`相关的元素会被创建并被渲染。反之条件从`true`变为`false`，元素会被销毁。
   > Vue 使用虚拟 DOM，所以任何 DOM 的创建和销毁实际上是在虚拟 DOM 层面上进行的。只有在必要的时候，改变才会被真实地应用到 DOM 上。
4. Vue 尝试重用已存在的元素，这是通过一个名为 `key` 的特殊属性来完成的。当与 `v-if` 一起使用，你可以通过为每个条件分支提供一个 `唯一的key` 来确保元素不被重用。

#### 用 `<template>` 元素进行分组渲染

因为 v-if 是一个指令，所以必须将它添加到一个元素上。如果想切换多个元素时可以把一个 `<template>` 元素当做不可见的包裹元素，并在上面使用 v-if。最终的渲染结果将不包含 `<template>` 元素。

#### v-else / v-else-if

`v-else` `v-else-if` 元素必须紧跟在带 `v-if` 或者 `v-else-if` 的元素的后面，否则它将不会被识别。

#### 永远不要把 `v-if` 和 `v-for` 同时用在同一个元素上。

当 `v-if` 与 `v-for` 一起使用时，`v-for` 具有比 `v-if` 更高的优先级。

- 为了过滤一个列表中的项目 (比如 `v-for="user in users" v-if="user.isActive"`)。在这种情形下，请将 `users` 替换为一个`计算属性` (比如 activeUsers)，让其返回过滤后的列表。

  - 哪怕我们只渲染出一小部分用户的元素，也得在每次重渲染的时候遍历整个列表，不论活跃用户是否发生了变化。

- 为了避免渲染本应该被隐藏的列表 (比如 `v-for="user in users" v-if="shouldShowUsers"`)。这种情形下，请将 `v-if` 移动至`容器元素`上 (比如 ul、ol)。

### v-show

不管是什么条件，都会生成 vnode，只是会在`render`时根据条件改变其`display`属性。

### v-show 和 v-if 有啥区别

`v-show`、`v-if`都是 vue 中控制元素显示隐藏的指令，但它们在工作原理和使用场景有所不同。

1. **渲染方式**
   - `v-if`: 当值为 false 的时候，该元素不会渲染到 dom 中。只有当值为 true 时，才会真正的渲染该元素。
   - `v-show`: 不论其值是否为 true，元素始终会渲染到 dom 中。当值为 false 时，元素通过 css：`display: none` 属性被隐藏。
2. **响应性**
   - `v-if`: 条件发生变化时，元素会被完全销毁或者重新创建，意味着该元素及其子元素的生命周期钩子会被重新触发。
   - `v-show`: 条件发生变化时，仅切换元素 css 的`display`属性，元素生命周期钩子不会被触发。
3. **初始渲染开销**
   - `v-if`: 初始渲染的时候不会生成所有的条件块，有更小的初始渲染开销。但在后续的显示隐藏过程中设计真实 dom 的销毁与重建，需要更大的开销。
   - `v-show`: 初始渲染会渲染所有元素，所以初始渲染开销比`v-if`大。但后续的显示隐藏过程只涉及 css 样式的更改，所以开销更小。
4. **用途**
   - `v-if`: 适合运行时很少需要更改条件的情况。
   - `v-show`: 适合频繁切换的情况。
