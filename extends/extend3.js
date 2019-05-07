/**
 * 3 组合继承
 * 构造函数继承的属性会把原型链继承的属性覆盖掉，所以 引用类型的属性不会被所有实例共享
 * 缺点：
 * 原型中会存在两份相同的属性/方法 一个是直接发返回的对象（call 方式构造函数继承的），一个存在__proto__中的对象（原型链继承的）
 */
function Parent(name) {
  this.name = name;
  this.names = ['a', 'b', 'c'];
}

Parent.prototype.getName = function() {
  console.log(this.name);
}

function Child(name, age) {
  // 继承属性(防止引用属性被所有实例共享)
  Parent.call(this, name);
  this.age = age;
}

// 构造原型来呢，继承方法
Child.prototype = new Parent();
Child.prototype.constructor = Child;
Child.prototype.sayAge = function() {
  console.log(this.age);
}

var child1 = new Child('lrn', 23);
child1.names.push('d');
console.log(child1.names);
child1.getName();
child1.sayAge();

var child2 = new Child('xixi', 20);
console.log(child2.names);
child2.getName();
child2.sayAge();
