/**
 * 6 寄生组合继承
 * 在组合继承的时候，我们发现，会有重复的属性，会调用两次父构造函数。
 * 如果我们不使用 Child.prototype = new Parent() ，而是间接的让 Child.prototype 访问到 Parent.prototype 呢？
 */
// 代替new Parent
function inheritPrototype(child, parent) {
  var prototype = Object.create(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;  // Child.prototype = new Parent()
}

function Parent(name) {
  this.name = name;
  this.colors = ['red', 'black'];
}
Parent.prototype.sayName = function() {
  console.log(this.name);
}

function Child(name, age) {
  Parent.call(this, name);
  this.age = age;
}

// 代替 Child.prototype = new Parent()
inheritPrototype(Child, Parent);

Child.prototype.sayAge = function() {
  console.log(this.age);
}

var child1 = new Child('haha', 22);
child1.colors.push('blue');
console.log(child1.colors);
child1.sayName();
child1.sayAge();

var child2 = new Child('heihei', 33);
console.log(child2.colors);
child2.sayName();
child2.sayAge();