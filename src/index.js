// 两个函数, 一个对象怎样实现

const obj = {};
function A() {
  return obj;
}
function B() {
  return obj;
}

console.log(new A() === new B());

/* 
创建一个构造函数 Calculator，它创建的对象中有三个方法：
read() 使用 prompt 请求两个值并把它们记录在对象的属性中。
sum() 返回这些属性的总和。
mul() 返回这些属性的乘积。
*/

function Calculator(a, b) {
  this.a = a;
  this.b = b;
  this.sum = function () {
    return this.a + this.b;
  };
  this.mul = function () {
    return this.a * this.b;
  };
}

const cal = new Calculator(2, 2);

console.log(cal.sum(), cal.mul());

// 对象转换, 使用Symbol.toPrimitive

let user = {
  name: "pangyujs",
  value: 666,
  toString() {
    return "[object Object]";
  },
  valueOf() {
    return this.value;
  },
  // [Symbol.toPrimitive](hint) {
  //   console.log("hint=", hint);
  //   if (hint === "string") {
  //     return `My name is ${this.name}`;
  //   } else if (hint === 'number') {
  //     return this.value;
  //   } else {
  //     return "This is a default";
  //   }
  // },
};

// hint: string
console.log(String(user)); // My name is pangyujs

// hint: number
console.log(+user); // 666

// hint: default
console.log(user + user); // This is a default

// Symbol.iterator

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
