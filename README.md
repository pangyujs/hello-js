# JS 重点知识回顾

## strict mode(blog)

in file

```js
"use strict";
// code
```

in chrome dev tools

```js
"use strict"; // Shift+Enter
// code Enter
```

in old browser

```js
(function () {
  "use strict";
  // code
});
```

Default open strict mode on use Class or modules

## 8 种数据类型

- boolean
- number: 小于 2^53, 大于 -(2^53)的整数
- bigint: 任意范围内的整数
- string
- null
- undefined
- symbol
- object: array, function, object

## 交互 API

- alert: 模态框信息
- prompt: 模态输入框
- confirm: 模态选择框

## 类型转换

- 数字转字符 String()
- 字符转数字 Number(), parseInt(), parseFloat()
  - Number 转换规则
    - undefined <=> NaN
    - null <=> 0
    - true <=> 1
    - false <=> 0
    - '' <=> 0
    - '123' <=> 123
    - '哈哈 agss' <=> NaN
- bool 转换: Boolean()

## ?? 运算符

未定义的变量作为判断条件, 与下面表达式相同

```js
let a;

const res1 = a ?? "haha";

const res2 = a === undefined || a === null ? "haha" : a;
```

## break/continue 标签

// 支持循环前的标签, 标签是 break/continue 跳出嵌套循环可以转到外部的唯一方法

```js
outer: for (let i = 0; i < 3; i++) {
  if (i === 1) {
    continue outer;
  }
  console.log(i);
}
```

## 函数表达式 VS 函数声明

函数声明: 主代码中声明位单独的语句的函数

- 定义之前可被调用
-

```js
function sum() {
  console.log("sum");
}
```

函数表达式: 在一个表达式中或另一个语法结构中创建的函数

- 定义后才可调用

```js
let sum = function () {
  console.log("sum");
};
```

> 大多数情况下, 需要声明一个函数时, 首先考虑函数声明语法, 它能够为组织代码提供更多的灵活性, 因为我们可以在声明之前调用这些函数

## 对象

- 多词属性名必须加引号, 且只能使用中括号访问

```js
let user = {
  "like birds": true,
};
console.log(user["like birds"]);
```

- 计算属性

```js
let fruit = prompt("which fruit to buy?", "apple");
let bag = {};
bag[fruit] = 5;
```

- in 关键字判断是否在对象中, 尤其是当属性 key 存在, 但 value 为 undefined 的时候

```js
let use = { name: "meng", age: 11, eat: undefined };
console.log(name in use);
console.log(eat in use);
```

- for...in 迭代对象

```js
let user = { name: "meng", age: 11 };
for (const key in user) {
  console.log(key, user[key]);
}
```

- 对象排序

对象有特别的顺序: 整数属性会被进行排序, 其他属性按照创建的顺序展示

> 整数属性: 一个可以不做任何更改的情况下与一个整数进行相互转换的字符串

```js
const codes = {
  3: "yu",
  2: "xiang",
  1: "meng",
};
Object.keys(codes).map((item) => console.log(item));
```

- 复制对象

使用 for in

```js
const user = { name: "meng", age: 11 };
const newUser = {};
for (const key in user) {
  newUser[key] = user[key];
}
```

使用 Object.assign

```js
const newUser = Object.assign({}, user);
```

## 垃圾回收

可达性: 如果一个值通过引用链从根访问任何其他值, 则认为该值是可达的

- 当前执行的函数, 它的局部变量和参数
- 当前嵌套调用链上的其他函数, 他们的局部变量和参数
- 全局变量

垃圾回收的基本算法被称为: 'mark-and-sweep'

定期执行以下步骤进行垃圾回收:

1. 垃圾收集器找到所有的根, 并标记他们
2. 然后遍历并标记他们所有的引用
3. 然后遍历标记的对象标记他们的引用, 所有被遍历到的对象都会被记住, 以免再次遍历到同一对象
4. 没有被标记的对象都会被删除

一些优化建议

- 分代收集: 对象被分成两组, 新的和旧的, 频繁检查新对象是否需要清除, 检查旧对象频率降低
- 增量收集: 将整个对象拆分为多个部分, 将这些部分逐一清除, 这样会有很多小型的垃圾回收, 会带来微小的延迟, 而不是大的延迟
- 闲时收集: 在 CPU 空闲时尝试运行, 减少可能对代码执行的影响
