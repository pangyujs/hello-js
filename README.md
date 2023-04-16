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

## new 操作符

当一个函数被使用 new 操作符执行时, 按照以下步骤创建

1. 一个新的空对象被创建并分配给 this
2. 函数体执行, 通常会修改 this, 为其添加新的属性
3. 返回 this 的值

构造器的目的---实现可重用的对象创建代码

在一个函数内部是否进行了 new 调用, 可以使用 new.target, 调用返回该函数, 每调用则返回 undefined

省略括号: 如果没有参数, 可以省略 new 后的括号

```js
let user = new User; === let user = new User();
```

实现一个 new 函数

```js
function new(Con, ...args){
  const obj = Object.create(Con);
  const result = Con.apply(obj, args);
  return result instanceof Object ? result : obj;
}
```

总结:

- 构造函数, 或简称构造器, 就是常规函数, 但对于构造函数要大写, 这是约定
- 构造函数只能使用 new 来调用, 这样的调用意味着再开始时创建了空的 this, 并在最后返回填充了值的 this

## 可选链

检查左边部分是否为 undefined 或者 null

```js
const user = [
  {
    name() {
      console.log("I am pangyujs");
    },
  },
];
const result = user?.[0]?.name?.();
```

> 注意: 可选链不要过度使用, 否则可能引起代码中的错误被消除, 可选链具有短路效应

## symbol 类型

只有 string 和 symbol 可以作为对象的属性键, symbol 保证全局唯一

- symbol 不会自动转为字符串, 使用 symbol.toString() 或者 symbol.description
- 全局唯一可以保证隐藏属性, 例如三方库使用 symbol 防止用户篡改代码
- 在 for in 和 object.keys 会被跳过, 但 Object.getOwnPropertySymbols(obj) 和 Reflect.ownKeys(obj) 可以获取一个对象的所有键, 包括 symbol
- object.assign 会复制字符串和 symbol 属性

全局 symbol

应用程序的不同部分想要访问 symbol, 完全相同的属性, 此时可以从全局 symbol 注册表中读取

```js
const id = Symbol.for("id"); // 返回symbol
const idAgain = Symbol.for("id");
const idKey = Symbol.keyFor(id); // id 返回symbol的key, 只适用于全局symbol
console.log(id === idAgain);
```

[系统 symbol](https://tc39.es/ecma262/#sec-well-known-symbols)

可以使用它们来微调对象的各个方面

## 对象类型转换

1. 所以对象都为 true
2. 数字转换发生在对象相减或应用数学函数时, 例如 Date 可以实现两个日期的差值计算
3. 字符串转化, 通常发生在想 alert(obj), 会隐式调用对象的 toString 方法

### hint

类型转换有三种变体, 称为 hint

- string

对象转字符串, 对期望一个字符串的对象执行操作时, 如 alert

```js
alert(obj);
obj1[obj] = 123;
```

- number
  对象到数字的转换, 如进行数学运算时

```js
const num = Number(obj);
const n = +obj;
const delta = date2 - date2;
const greater = user1 > user2;
```

- default

在少数情况下发生, 当运算符"不确定"期望值的类型时, 如二元加法, 判断于字符串, 数字, symbol 比较

```js
let total = obj1 + obj2;
if (obj1 === 1) {
}
```

### Symbol.toPrimitive

如果此方法存在, 则会被用于所有 hint

```js
let user = {
  name: "meng",
  money: 1000,
  [Symbol.toPrimitive](hint) {
    console.log("hint=", hint);
    return hint === "string" ? `{name: "${this.name}"}` : this.money;
  },
};

console.log(user);
console.log(+user);
console.log(user + 500);
```

### toString/valueOf

如果没有 Symbol.toPrimitive, 那么 js 尝试寻找 toString 和 valueOf 方法

- 对于 string hint: 调用 toString 方法, 如果不存在, 调用 valueOf 方法, 因此对于字符串转换, 优先调用 toString 方法
- 对于其他 hint: 调用 valueOf 方法, 如果不存在, 则调用 toString 方法, 因此对于数学运算, 优先调用 valueOf 方法

```js
alert(user); // [object Object]
alert(user.valueOf() === user); // true
```

实现 toString 和 valueOf

```js
let user = {
  name: "meng",
  money: 1000,
  toString() {
    return `{name: ${this.name}}`;
  },
  valueOf() {
    return this.money;
  },
};
alert(user); // toString -> {name: "John"}
alert(+user); // valueOf -> 1000
alert(user + 500); // valueOf -> 1500
```

> 通常希望有一个"全能"的地方来处理原始转换, 可以只实现 toString()方法, 这将处理所有原始转换

总结:

对象到原始值的转换, 是由许多期望以原始值作为值的内建函数和运算符自动调用的

有三种类型(hint):

1. string, 对于 alert 和其他需要字符串的操作
2. number, 对于数学运算
3. default, 少数运算符, 通常对象以和 number 相同的方式实现 default 转换

转换算法是:

1. 调用 obj[Symbol.toPrimitive](hint), 如果这个方法存在
2. 否则, 如果 hint 为 string, 尝试调用 toString 或者 valueOf
3. 否则, 如果 hint 为 number 或者 default, 尝试调用 valueOf 或者 toString

所有方法必须返回一个原始值才能工作, 实际使用中只实现 toString 方法就够了

## 可迭代对象

Symbol.iterator

```js
const range = {
  from: 1,
  to: 5,
  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,
      next() {
        if (this.current <= this.last) {
          return { done: false, value: this.current++ };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (let num of range) {
  console.log("num=====", num);
}
```

Array.from: 可以转换一个类数组为真数组

## Map 和 Set

Map 是一个带键的数据项的集合

- new Map([iterable]), 创建 map, 可选择带有 [key,value] 对的 iterable 来进行初始化
- map.set(key, value), 根据键存值, 返回 map 自身, 可链式调用
- map.get(key), 根据键返回值, 如果不存在此键, 则返回 undefined
- map.has(key), 如果 key 存在则返回 true, 否则返回 false
- map.delete(key), 删除制定的键对应的值, 如果删除成功返回 true, 否则返回 false
- map.clear(), 清空 map
- map.size, 返回当前元素个数

与普通 Object 不同点

1. 任何键, 对象都可以作为键
2. 有其他的便捷方法, 如 size 属性

Set 是一组唯一值的集合

- new Set([iterable]), 创建 set, 可选择带有 iterable 来进行初始化
- set.add(value), 添加一个值, 返回 set 本身
- set.delete(value), 删除成功为 true, 否则为 false
- set.has(value), 存在返回 true, 否则返回 false
- set.clear(), 清空 set
- set.size, 返回元素的个数

WeakMap 和 WeakSet 被用作"主要"对象存储之外的"辅助"数据结构, 一旦对象从主存储器中删除, 如果该对象仅被用作 WeakMap 或 WeakMap 的键, 那么该对象会自动清除

## Date

- JS 中, 日期和时间使用 Date 对象来表示, 我们不能单独创建日期和时间, Date 对象总是同时创建两者
- 月份从 0 开始计数
- 一周的某一天 getDay()同样从 0 开始计算
- 当设置了超出范围的组件时, Date 会进行自动校准
- 日期可以相减, 得到的是一 ms 为单位的两者差值
- 使用 Date.now() 可以更快的获取当地时间的时间戳
- 浏览器有 performance.now() 的方法给出从页面加载开始以毫秒为单位的微秒数

## JSON 序列化和反序列化

- JSON 是一种数据格式, 具有自己的独立标准和大多数编程语言的库
- JSON 支持 Object, array, string, number, boolean 和 null
- JS 提供反序列化成 JSON 的方法 JSON.stringify() 和解析 JSON 的方法 JSON.parse
- 两种方法都支持用于智能读写的转换函数
- 如果一个对象有 toJSON, 那么它会被 JSON.stringify 调用
