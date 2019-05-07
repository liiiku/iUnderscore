// 模拟实现new
/**
 * 其实这个obj就是相当于new出来的那个实例，既然实例的__proto__ === 构造函数的prototype，所以就有了
 * obj.__proto__ = fn.prototype
 * 
 * 构造函数返回了一个对象，在实例 实例 中只能访问返回的对象中的属性。
 * 如果没有，我们该返回什么就返回什么。
 * obj.__proto__ 时，可以理解成返回了 Object.getPrototypeOf(obj)=> 返回指定对象的原型
 * 
 * Object.prototype.__proto__ === null
 * 但是null就没有原型了，所以说
 * var obj = Object.create(null) 这样的对象没有 __proto__ 
 * obj.__proto__ 会把 fn.prototype 原型上的方法全都拿过来，也就是说，如果这个方法是fn.prototype原型上的，那么这个方法就在obj.__proto__ 上了
 * 所以 p 可以直接 p.say()执行
 * p1.say() 就会报错，因为say方法在p1.__proto__上
 * p1.__proto__.say()
 * 
 * 
 * var a = Object.create(null)
 * var b = new Object()
 * bject.getPrototypeOf(b) === Object.prototype // true
 * a 是没有原型链链接的空对象，自然访问不到__proto__ 属性，没有在原型链上，所以也可以用来做字典，不会有原型链上属性影响。
 */
function selfNew(){
  // var obj = new Object();
  // var obj = Object.create(null);
  var obj = Object.create(Object.prototype);
  var fn = [].shift.call(arguments);
  obj.__proto__ = fn.prototype;  // 这个是为了能够拿到原型上的属性
  var ret = fn.apply(obj, arguments); // 这个是为了能够拿到构造函数中的属性

  // return typeof ret === 'object' ? ret : obj;
  // return (typeof ret === 'object' || typeof ret === 'function') ? ret || obj : obj;  
  return ret instanceof Object ? ret : obj;
}

function Person(name, age) {
  this.name = name;
  this.age = age;
}

Person.prototype.say = function() {
  console.log('person');
}

var p = new Person('lrn', 18);
var p1 = selfNew(Person, 'lrn', 20);