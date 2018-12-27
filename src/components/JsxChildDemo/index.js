import React, { Component } from 'react';

function Repeat(props){
    console.info(props);
    let items = [];
    for(let i = 0; i < props.numTimes;i++){
        // props可以调用到children属性是因为在父组件调用时标签内部有其他代码.<Repeat>some other code or content</Repeat>
        /** -------------- console.info(props.children(i)) --------------
         * $$typeof: Symbol(react.element)
         * key: "9"
         * ref: null
         * type: "div"
         * owner: object
         * store: {validated: false}
         */
        items.push(props.children(i));
    }
    return(
        <div>
            {items}
        </div>
    )
}

export default function ListOfTenThings(){
    return (
        <Repeat numTimes={10}>
            {(index) => (<div key={index}>This is item {index} in the list</div>)}
        </Repeat>
    )
}