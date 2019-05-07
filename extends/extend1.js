/**
 * 1 原型链继承
 * 缺点：引用类型的属性被所有实例共享
 *      在创建 Child 的实例时，不能向Parent传参
 * 这个时候 child1.__proto__ : Parent {names: Array(3)}
 * 这种继承 所有的属性都在__proto__下 在__proto__下的属性，会被所有实例共享
 */
function Parent() {
  this.names = ['a', 'b'];
}

function Child() {}

Child.prototype = new Parent();
var child1 = new Child();
child1.names.push('c');
console.log(child1.names);
var child2 = new Child();
console.log(child2.names);