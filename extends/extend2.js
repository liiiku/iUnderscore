/**
 * 2 借用构造函数继承
 * 优点：
 * 避免了引用类型的属性被所有实例共享
 * 可以在 Child 中向 Parent 传参
 * 缺点：
 * 无法实现复用，每个子类都有父类实例函数的副本，影响性能（say这个方法）
 * 只能继承父类的实例属性和方法，不能继承原型属性/方法 (也就是每个实例 child1\child2\child3 访问不到sayHello方法)
 * 
 * child1.__proto__ : Object(Child) Child {name: undefined, names: Array(3), say: ƒ}
 */
function Parent(name) {
  this.name = name;
  this.names = ['a', 'b'];
  this.say = function() {
    console.log('say');
  }
}

Parent.prototype.sayHello = function() {
  console.log('hello');
}

function Child(name) {
  Parent.call(this, name);
}

var child1 = new Child();
child1.names.push('c');
console.log(child1.names);
var child2 = new Child();
console.log(child2.names);
var child3 = new Child('lrn');
console.log(child3.name);