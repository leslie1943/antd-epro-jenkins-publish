## ReactJs learning points

##### 知识要点
+ constructor
```javascript
/*
  在ReactJs 中.
  ·constructor()-构造方法 和 super()-继承
    这是ES6对类的默认方法,通过new命令生成对象实列时自动调用该方法,并且该方法是类中必须有的,如果没有显示定义则会默认添加空的 constructor()方法.
  ·super() - 继承
    在class方法中,继承是使用extends关键字来实现的,子类必须在constructor()构造方法中调用super()方法,否则新建实例时会报错 ====> 报错原因是: 子类是没有自己的this对象的,它只能继承父类的this对象然后对其加工. 而 super() 就是将父类中的this对象继承给子类的. 
    ######## No super, child no this.########
  
  ·super(props) vs super() vs 不写 super
     👓 如果用到了constructor ==> 必须写super(), 用来初始化this,可以绑定事件到this上.
     👓如果在constructor中要使用this.props, 必须给super加参数 => super(props) 
        ⚡⚡⚡=> (只有一个理由需要传递props作为super()的参数那就是你需要在构造函数内使用this.props)
     👍(无论有没有constructor在render方法中 this.props都是可以使用的这是React自带的特性)
     👓如果没用到constructor可以不写, React会默认添加一个空的 constructor

*/
  constructor(props){
     super(props)
     console.info(this.props); // 如果没有前一行的 super(props), 这句调用会出错
     // 👇👇👇👇👇👇👇👇
     // this.props => {value: undefine, id: "mr_repos", onChange: ƒ, data-__meta: {…}, data-__field: {…}}
     // 是因为 父组件在引用此组件时的范围如下 👇👇👇👇👇👇
     /**
      <Form.Item {...layout.formItemLayout} label="Gitlab项目">{
         getFieldDecorator('mr_repos',{
             rules:[{required:true,message: '请选择仓库'}]
             })(<RepositoryOptions/>)
         }
      </Form.Item>
    */
  }
```
+ 粒度问题
  ```javascript
    /**  ------------------
      // 🍭🍭🍭🍭 变量模式定义 🍭🍭🍭🍭
      const R_Columns = this.props.options.map((col) => 
        <Col span={8} key={col.value}>
          <Checkbox  value={col.value}>{col.label}</Checkbox>
        </Col>
      );
      return(
        <Row>{R_Columns}</Row>
      )
      ------- ****/
  ```

  + 组件定义方式
  ```javascript
  /**  ------------------ function 模式 
  function RepositoryOptions(props){
    const R_Columns = props.options.map((col) => 
        <Col span={8} key={col.value}>
            <Checkbox  value={col.value}>{col.label}</Checkbox>
        </Col>
    );
    return(
        <Row>{R_Columns}</Row>
    );
  }
  --------------------------------- **/

  /**  ------------------ class 模式 
  class RepositoryOptions extends Component{
    
    // 详细解释参加文档 Skill-Learn-Point.md
    // constructor(props){
    //     super(props);
    //}
    render(){
        console.info(this.props);
          return(
            <Row>{
                this.props.options.map((col) =>
                <Col span={8} key={col.value}>
                <Checkbox value={col.value}>{col.label}</Checkbox>
                </Col>)
            }</Row>
          )
      }
  }
  --------------------------------- **/
  ```