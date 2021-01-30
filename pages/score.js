const Score =(function(){
    'use strict'

    let state={
        title: "Score",
    }
    let props={}

    function update(newData){
        state={...state, ...newData}
        render()
        addHandlers()
        doSomethingAfterRendering(()=>{
            console.log('updated!')
        })
    }

    function changeTitle(){
        update({title:"new title", person:'syleemomo'})
    }
    function init(properties){
        props={...properties}
    }
    function getTemplete(){
        const {title, person}=state
        return (`<div>
            <h1>${title} page</h1>
        </div>`)
    }
    // 실제 특정 DOM 위치에 렌더링하기 
    function render(){
        const template = getTemplete()
        const renderPosition=document.getElementById(props.rendorDOMId)
        renderPosition.innerHTML=template
    }
    function addHandlers(){
        // document.getElementById('title-btn').addEventListener('click', changeTitle)
    }
    function doSomethingAfterRendering(callback){
        setTimeout(callback,0)
    }
    function draw(properties){
        init(properties)
        render()
        addHandlers()
        doSomethingAfterRendering(()=>console.log('mounted!'))
    } 
    return {draw}
})()

export default Score 