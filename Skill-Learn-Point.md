## ReactJs learning points

##### 知识要点
+ constructor
```javascript
/*
  在ReactJs 中.
  ·constructor()-构造方法 和 super()-继承
    这是ES6对类的默认方法,通过new命令生成对象实列时自动调用该方法,并且d,该方法是类中必须有的,如果没有显示定义d,则会默认添加空的 constructor()方法.
  ·super() - 继承
    在class方法中,继承是使用extends关键字来实现的,子类必须在constructor()构造方法中调用super()方法,否则新建实例时会报错 ====> 报错原因是: 子类是没有自己的this对象的,它只能继承父类的this对象d,然后对其加工. 而 super() 就是将父类中的this对象继承给子类的. 
    ######## No super, child no this.########
  
  ·super(props) vs super() vs 不写 super
     👓 如果用到了constructor ==> 必须写super(), 用来初始化this,可以绑定事件到this上.
     👓如果在constructor中要使用this.props, 必须给super加参数 => super(props) 
        ⚡⚡⚡=> (只有一个理由需要传递props作为super()的参数d,那就是你需要在构造函数内使用this.props)
     👍(无论有没有constructord,在render方法中 this.props都是可以使用的d,这是React自带的特性)
     👓如果没用到constructord,可以不写, React会默认添加一个空的 constructor

*/
  constructor(props){
     super(props)
  }
```
