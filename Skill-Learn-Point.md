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
    // STEP 2 : 父组件 定义方法,传给子组件并供子组件调用, 命名可以不是event标准事件, 可以在此将子组件数据map到父组件.
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
    <RepositoryOptions onChangeParent={this.onChangeParent} />
    

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
      title={post.title}>
    </Post>
  })
  // Post组件可以读取props.id,但是无法读取 props.key
  ```

+ props vs state
  ```javascript
  /* -------------------- 🎃🎃🎃 props 🎃🎃🎃 --------------------
    React的核心思想是组件化思想,页面会被切分成独立的，可服用的组件
    组件从概念上看就是一个函数，可以接受一个参数作为输入值, 这个参数就是props，
        👨‍👩‍👧‍👦 👨‍👩‍👧‍👦 当然这个props可以是很多数据项的集合.
    所以可以把props理解为从外部传入组件内部的数据. 由于React是单向数据流， 所以 props基本上就是父组件向子组件传递的数据.
  **/

  /* -------------------- 🎃🎃🎃 state 🎃🎃🎃 --------------------
   State is similar to props, but it is private and fully controller by the component.
   一个组件的显示形态可以由数据状态和外部参数所决定，外部参数=props， 数据状态=state.
   pre-condition 1: 它是通过props从父组件传递过来的吗？    是 => 不是state.
   pre-condition 2: 随着时间推移不变?                     是 => 不是state.
   pre-condition 3: 根据组件中state和props能够计算出来？   是 => 不是state

   state的主要作用用于组件保存,控制及修改自己的状态, 它只能在 constructor中初始化,它是组件的私有属性，不可通过外部访问和修改,只能通过组件内部的this.setState()来修改，修改state属性会导致组件的重新渲染.
  **/

  /* -------------------- 🔗🔗🔗 区别 🔗🔗🔗 --------------------
  1: state 是组件自己管理数据,控制自己的状态,可变.
  2: props 是外部传入的参数，不可变
  3: 没有state的叫做无状态组件,有state的叫做有状态组件.
  4: 多用props,少用state => 多写无状态组件
  5: 父组件的state可以转化为props来为子组件进行传值.
  **/
  ```

  + Advanced points:
  ```javascript
  /* --------------------  --------------------
  📢: JSX标签名不能是一个表达式 <components[props.type] story={props.story}/>
      可以在return之前 将表达式先获取： 
            SomeComponent = components[props.type];
            <SomeComponent story={props.story} />
  */

  ```

+ 使用 PropTypes进行类型检查
  ```javascript
  /****
   * 
     Step_1: 在 头部引用 import PropTypes from 'prop-types';
     Step_2: Class.propTypes = {
       propName: PropTypes.string | array | bool | func | number | object | symbol
     }
     请参照: https://react.docschina.org/docs/typechecking-with-proptypes.html
  ***.
  ```

+ 不使用JSX
  ```javascript

    // JSX 方式
    class Hello extends React.Component{
      render(){
        return <div>Hello {this.props.toWhat}</div>
      }
    }
    ReactDom.render(
      <Hello toWhat="World"></Hello>,
      document.getElementById('root')
    )

    // 非 JSX 方式
    class Hello extends React.Component{
      render(){
        return React.createElement('div', null, `Hello ${this.props.towhat}`);
      }
    }
    ReactDom.render(
      React.createElement(Hello,{toWhat:'World'}, null);
      document.getElementById('root')
    )
  ```

+ Virtual Dom
  ```javascript
  /***
   Step_1: 用JavaScript对象结构表示DOM树的结构,然后用这个树构建一个真正的DOM树,插到文档中.
   Step_2: 当状态变更的时候，重新构造一棵新的对象树,然后用新的树和旧的树进行比较,记录两棵树的差异.
   Step_3: 把 Step_2 所记录的差异应用到 Step_1所构建的真正的DOM树上，视图就更新了.

   这种做法在React中叫做 Virtual DOM(虚拟DOM), 由虚拟DOM来确保只对界面上真正变化的部分进行实际的DOM操作. 虚拟DOM本质上就是在JS和DOM之间做了一个缓存。
   可以类比:
    CPU 和 硬盘， 既然硬盘这么慢，我们就在它们之间加个缓存：
    DOM 和 DOM,   既然DOM这么慢，我们就在JS和DOM加个缓存，这个缓存就是 Virtual DOM.JS只操作Virtual DOM,最后的时候写入DOM
  
   ***/
  ```

  + @connet vs mapStateToProps
  ```javascript
    /**
    * 🚀🚀🚀 解释型书写 @mapStateToProps 是一个函数
    * 用于建立组件跟 store 的 state 的映射关系
    * 作为一个函数，它可以传入两个参数，结果一定要返回一个 object 
    */
    /**
    * state里存放的是所有的models里定义的全部命名空间下的所有对象.
    *      - login:{loginLoading:false,pwd:'',user:''}
    *      - products: array
    *      - routing: location
    *      - todo: list:[]
    */
    // function mapStateToProps(state.moduleA,state.moduleB) {
    function mapStateToProps(state) {
        // 按需加载.
        return {
            list: state.todo.list,
            // "xxx": state.xxx.xxxAttr, //允许多个对象的注入.
        }
    }

    /** 🚀🚀🚀 @connect 直接写法 是清晰写法, 但会引入所有的state,在返回的时候做挑选.
          @connect(({ blacklist, loading }) => ({
              name: blacklist.checkList.name,
              loading: loading.models.blacklist,
          }))
    */

    // connect里的所有属性在UI层可以使用 this.props.xxx来使用.
    const _className = connect(mapStateToProps)(ClassName)
  ```

  + @connect 装饰器
  ```javascript
  /****
   *
    🚀🚀 定义
    import createLoading from 'dva-loading';
    app.use(createLoading())

   🚀🚀 组件写法中调用了 dva 所封装的 react-redux 的 @connect 装饰器，用来接收绑定的 list 这个 model 对应的 redux store。注意到这里的装饰器实际除了 
        app.state.list 以外还实际接收 
        app.state.loading 作为参数，
      这个 loading 的来源是 src/index.js 中调用的 dva-loading这个插件
      ⭐⭐⭐ 它返回的信息包含了 global、model 和 effect 的异步加载完成情况。

  🚀🚀🚀🚀
   @connect(({ list, loading }) => ({
      list,//①
      loading: loading.models.list,//②
    }))
    1、connect 有两个参数, mapStateToProps 以及 mapDispatchToProps,一个将状态绑定到组件的props一个将方法绑定到组件的props
    2、代码①：将实体list中的state数据绑定到props，注意绑定的是实体list整体，使用时需要list.[state中的具体变量]
    3、代码②：通过loading将上文“数据map一”中的models的list的key对应的value读取出来。赋值给loading，以方便使用，如表格是否有加载图标
  ***.
  ```