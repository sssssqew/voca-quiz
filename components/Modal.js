const Modal=(function(){
  "use strict"

  let state={}
  let props={}

  function update(newData){
    state={...state, ...newData}
    render()
    addHandlers()
    doSomethingAfterRendering(()=>{
        console.log('Modal updated!')
    })
  }

  // TODO: 이벤트 핸들러 

  function init(properties){
    props={...properties}
  }
  function getTemplete(){
    return (`<div>Modal</div>`)
  }
  function render(){
    const template = getTemplete()
    const renderPosition=document.getElementById(props.rendorDOMId)
    renderPosition.innerHTML=template
  }
  function addHandlers(){}

  function doSomethingAfterRendering(callback){
    setTimeout(callback,0)
  }
  function draw(properties){
    init(properties)
    render()
    addHandlers()
    doSomethingAfterRendering(()=>console.log('Modal mounted!'))
    
} 
  return {draw}
})()

export default Modal