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
     👍(无论有没有constructor, 在render方法中 this.props都是可以使用的这是React自带的特性)
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
  /**  ------------------ function 模式    --------------------------------- **/
  // 在function模式内, 传递的参数无法引用this,直接用参数名取值即可
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


  /**  ------------------ class 模式   --------------------------------- **/
  // 在class模式内, 传递的参数引用时要用this,因为构造函数初始化了父类的对象.
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

  ```

+ 父子组件调用-模式一
  ```javascript
    // STEP 1 : 父组件 引入子组件
    import RepositoryOptions from '@/components/RepositoryOptions';
    // STEP 2 : 父组件 定义子组件在父组件执行的方法, 命名可以不是event标准事件, 可以在此将子组件数据map到父组件.
    onChangeParent(value){
        this.props.form.setFieldsValue({
            mr_repos: value,
        });
    }
    // STEP 3: 父组件 使用子组件
     <Form.Item {...layout.formItemLayout} label="Gitlab项目">{
      getFieldDecorator('mr_repos',{
          rules:[{required:true,message: '请选择仓库'}]
      })(<RepositoryOptions onChangeParent={this.onChangeParent.bind(this)}/>)
    }
    
    // STEP 4 : 子组件 定义标准事件, 在此触发父组件事件.
     onChangeChild = (value) => {
        this.props.onChangeParent(value);
    }

    // STEP 5 : 子组件 使用.
    <Checkbox.Group style={{ width: '100%' }} onChange={(value)=>this.onChangeChild(value)} />

  ```
+ 方法调用
  ```javascript
    // Solution 1 : 
    onChangeParent(value){}
    (<RepositoryOptions onChangeParent={this.onChangeParent.bind(this)} />)


    // Solution 2 :
    onChangeParent(value){}
    (<RepositoryOptions onChangeParent={(e) =>this.onChangeParent(e)} />)
    

    // Solution 3 :
    onChangeParent = (value) =>{}
    <RepositoryOptions onChangeParent={()=>this.onChangeParent(value)} />

  ```

  + class定义
  ```javascript
    // 可以将2个class写在一个文件内,然后引用.
    class Clock extends Component{}

    class Main extends Component{
      render(){
        return(
          <div>
            <Clock></Clock>
          </div>
        )
      }
    }
  ```

+ super 详解
  ```javascript
  // super关键字,它指代父类的实例(也就是父类的 ⛳⛳this对象⛳⛳⛳), 子类必须在constructor方法中调用super方法,否则新建实例会报错。
  // 这是因为子类没有自己的 ⛳⛳this对象⛳⛳⛳, 而是继承父类的 ⛳⛳this对象⛳⛳⛳, 然后对其进行加工。
  // 如果不调用 super 方法, 子类就得不到 ⛳⛳this对象⛳⛳⛳.
  ```

  + 箭头函数和普通函数的示例
  ```javascript
    // 箭头函数: 自带 return
    this.setState((prevState,props) => {
      counter: prevState.counter + props.increment,
    })

    // 普通函数
    this.setState(function(prevState,props){
      return{
        counter: prevState.counter + props.increment,
      }
    })
  ```
+ props 
  ```javascript
  <SupportItem param={anyTypeValue} childDemoField="childDemoField" id="1943"></SupportItem>

  function SupportItem(props) {
    console.info(props); // {param:anyTypeValue, childDemoField: 'childDemoField', id:"1943"}
    console.info(props.param);
    console.info(props.param.childAttr);
    console.info(props.childDemoField);
    console.info(props.id);
  }

  class SupportItem extends Component{
    console.info(this.props.param);
    console.info(this.props.param.childAttr);
    console.info(this.props.childDemoField);
    console.info(this.props.id);
  }
  ```
+ key
  ```javascript
  // key会作为给React的提示,但是不会传递给你的组件,如果组件需要使用和key相同的值.将其作为属性传递
  const content = posts.map(post=>{
    <Post
      key={post.id}
      id={post.id}
      title={post.title}
    </Post>
  })
  // Post组件可以读取props.id,但是无法读取 props.key
  ```