// section - 原型链 - f1 -> F.prototype -> Object.prototype -> null; 涉及到的对象 F, Object, Function, Function.prototype

// const F = function() {
//   this.funName = 'F';
// }

// const f1 = new F();

// console.log('-------------- look into f1 --------------');
// console.log('f1.prototype', f1.prototype);
// console.log('f1.constructor === F', f1.constructor === F);
// console.log('f1.__proto__ === F.prototype', f1.__proto__ === F.prototype);

// console.log('-------------- look into F.prototype --------------');
// console.log('F.prototype', F.prototype);
// console.log('F.prototype.constructor === F', F.prototype.constructor === F);
// console.log('F.prototype.__proto__ === Object.prototype', F.prototype.__proto__ === Object.prototype);

// console.log('-------------- look into Object.prototype --------------');
// console.log('Object.prototype', Object.prototype);
// console.log('Object.prototype.constructor === Object', Object.prototype.constructor === Object);
// console.log('Object.prototype.__proto__ === null', Object.prototype.__proto__ === null);

// console.log('-------------- look into F --------------');
// console.log('F', F);
// console.log('F.constructor === Function', F.constructor === Function);
// console.log('F.__proto__ === Function.prototype', F.__proto__ === Function.prototype);

// console.log('-------------- look into Function.prototype --------------');
// console.log('Function', Function);
// console.log('Function.prototype.constructor === Function', Function.prototype.constructor === Function);
// console.log('Function.prototype.__proto__ === Object.prototype', Function.prototype.__proto__ === Object.prototype);

// console.log('-------------- look into Object --------------');
// console.log('Object', Object);
// console.log('Object.constructor === Function', Object.constructor === Function);
// console.log('Object.__proto__ === Function.prototype', Object.__proto__ === Function.prototype);

// console.log('-------------- look into Function --------------');
// console.log('Function', Function);
// console.log('Function.constructor === Function', Function.constructor === Function);
// console.log('Function.__proto__ === Function.prototype', Function.__proto__ === Function.prototype);

// Function.prototype.b = 'test b';

// const a = {};

// // console.log(a.b); // error
// console.log(Object.b); // log test b

// // console.log(f1.b); // error
// console.log(F.b); // log test b


// section - 继承

// 1. 原型链继承 - 缺点 共享引用类型，每一个子类更改都会影响到其他类的使用

// const Person = function(name, age) {
//   this.name = name;
//   this.age = age
// }

// Person.prototype.say = function() {
//   console.log('i am person');
// }

// const Student = function(name) {
//   this.name = name;
//   this.score = 80;
// }

// Student.prototype = new Person();

// Student.prototype.study = function() {
//   console.log('i am studing');
// }

// const stud1 = new Student('lu');

// 2. 构造函数继承 - 未使用原型链，调用构造函数把父类代码复制到子类执行一遍

// const Person = function(name, age) {
//   this.name = name;
//   this.age = age;
//   this.say = function() {
//     console.log('i am person');
//   }
// }

// const Student = function(name) {
//   Person.call(this, name)
// }

// const stu1 = new Student('darren');
// const stu2 = new Student('qinglu');
// console.log('stu1.say === stu2.say', stu1.say === stu2.say);

// 3. 组合式继承 - 结合 1 & 2

// const Person = function(name, age) {
//   this.name = name;
//   this.age = age;
// }

// Person.prototype.say = function() {
//   console.log('i am person');
// }

// const Student = function(name) {
//   Person.call(this, name)
// }

// Student.prototype = new Person();

// const stu1 = new Student('darren');
// const stu2 = new Student('qinglu');
// console.log('stu1.say === stu2.say', stu1.say === stu2.say);

// 4. 寄生式继承
// const inheritObject = function(o) {
//   const clone = Object.create(o);
//   clone.sayHi = function() {
//     console.log('hello~');
//   }
//   return clone;
// }

// const PersonObj = {
//   name: 'qinglu',
//   age: 28
// }

// const PersonFun = function(name, age) {
//   this.name = name;
//   this.age = age;
// }

// const stud1 = inheritObject(PersonObj);
// const stud2 = inheritObject(new PersonFun('qinglu', 28));

// 5. 寄生组合继承 -
// function inheritObject (subType, superType) {
//   const prototype = Object.create(superType.prototype);
//   prototype.constructor = subType;
//   subType.prototype = prototype
// }

// function SuperType(name) {
//   this.name = name;
//   this.colors = ['red', 'green', 'yellow'];
// }

// SuperType.prototype.sayName = function() {
//   alert(this.name);
// }

// function SubType(name, age) {
//   SuperType.call(this, name);
//   this.age = age;
// }

// inheritObject(SubType, SuperType);

// // 子类的原型声明需要在 inheritObject 之后
// SubType.prototype.sayAge = function() {
//   alert(this.age)
// }

// const sub1 = new SubType('qinglu', 28);

// 6. es6 class - extends 其实是语法糖

// class A {
//   constructor(name, age) {
//     console.log('A name', name);
//     console.log('A age', age);
//     this.name = name;
//     this.age = age;
//   }

//   sayName() {
//     console.log(this.name);
//   }
// }

// class B extends A {
//   sayAge() {
//     console.log(this.age);
//   }
// }

// // Object.setPrototypeOf(B.prototype, A.prototype);
// // Object.setPrototypeOf(B, A);

// const b = new B('qinglu', 28);

// section - Object function

// Object.defineProperty 的使用方法

// const Person = {};

// Object.defineProperty(Person, 'name', {
//   get: function() {
//     return n;
//   },
//   set: function(name) {
//     n = name + ' by setter';
//   }
// });

// Person.name = 'lu';

// Object setter & getter 的使用方法

// var o = {
//   a : 7,
//   // get b(){return this.a +1;},//通过 get,set的 b,c方法间接性修改 a 属性
//   // set c(x){this.a = x/2}
// };

// var o = {
//   a : 7
// };

// o.__defineGetter__('version', function() {
//   return this.a;
// })

// o.__defineGetter__('b', function() {
//   return this.a +1;
// })

// o.__defineSetter__('c', function(x) {
//   this.a = x/2
// })

// console.log(o.version);
// console.log(o.version);
// o.c = 50;
// console.log(o.version);

// section - 闭包与函数作用域

// function fun() {
//   // const result= [];
//   // for(let i = 0; i < 10; i ++) {
//   //     result[i] = (() => () => i)(i)
//   // }
//   const result = new Array(10).fill(1);
//   return result.map((item, i) => {
//     console.log('i', i);
//     return () => i
//   })
// }

// const result = fun();

// console.log(result[0]());

// section - es6

// 对象字面量的属性赋值简写
// const a = {
//   say() {
//     console.log('invoke a.say')
//   }
// }

// const b = {
//   __proto__: a,
//   say() {
//     super.say();
//   }
// }

// b.say();

// 迭代器


// Map + Set + WeakMap + WeakSet


// new api
// Array.from(document.querySelectorAll('.container'));

// Proxy & Reflect
// const target = {};

// const handler = {
//   set(receiver, name) {
//     console.log('receiver', receiver);
//     console.log('name', name);
//   }
// }

// const p = new Proxy(target, handler);

// p.name = 'haha';

// Symbols

// Promises

// const waitOneSecond = 'hahah'


// then(() => {
//   console.log('waitOneSecond resolved');
// })

// class P {
//   constructor(name) {
//     this.name = name
//   }

//   sayName() {
//     console.log(this.name);
//   }
// }

// class A extends P{
//   sayName() {
//     console.log('A said: ', this.name);
//   }
// }

// new A('青鹭').sayName()

// Generator & async

// const asyncFun1 = () => {
//   return new Promise(resolve => {
//     setTimeout(resolve, 1000)
//   })
// }

// const asyncFun2 = () => {
//   return new Promise(resolve => {
//     setTimeout(resolve, 2000)
//   })
// }

// function* asyncFuns() {
//   console.log('in generator ~');
//   yield asyncFun1();
//   console.log('wait 1s');
//   yield asyncFun2();
//   console.log('wait 2s');
//   return 'ending';
// }


// function co(gen) {
//   const g = gen();
//   const next = (data) => {
//     const result = g.next(data);
//     if (result.done) return result.value;
//     result.value.then((data) => {
//       next(data);
//     })
//   }
//   next();
// }

// co(asyncFuns);

// const fs = require('fs');
// const thunkify = require('thunkify');

// const readfileThunk = thunkify(fs.readFile);

// const gen = function* () {
//   const html = yield readfileThunk('./index.html');
//   console.log('html', html);
//   const packageJSON = yield readfileThunk('./package.json');
//   console.log('packageJSON', packageJSON);
//   return 'end';
// }

// const stepValue = gen().next()

// stepValue.value()

// exports.gen = gen()

// Throttle 节流函数，在 wait 秒内最多执行 fn 一次的函数。


// debounce 防抖动函数，该函数会从上一次被调用后，延迟 wait 毫秒后调用 fn 方法



// window.onload = () => {

//   const debounce = (fn, wait) => {
//     // 进来如果有timeout，则清除重新设置，没有则设置
//     let timerId;
//     const debounced = (...args) => {
//       if (timerId) {
//         clearTimeout(timerId);
//         timerId = null;
//       }
//       timerId = setTimeout(fn.bind(null, ...args), wait);
//     }

//     return debounced;
//   }

//   const scrollFuc = (e) => {
//     console.log('in scrollFuc e', e);
//     console.log('in scrollFuc window.pageYOffset', window.pageYOffset);
//   }

//   window.addEventListener('scroll', debounce(scrollFuc, 250))
// }
