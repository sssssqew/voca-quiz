import Nav from '../components/Nav.js'

const Dictionary=(function(){
  "use strict"

  let state={}
  let props={}

  function update(newData){
    state={...state, ...newData}
    render()
    addHandlers()
    doSomethingAfterRendering(()=>{
        console.log('updated!')
    })
  }

  // TODO: 이벤트 핸들러 

  function init(properties){
    props={...properties}
  }
  function getTemplete(){
    return (`<div class="dictionary-container">
              <div id="dictionary-nav"></div>
              <div class="dictionary-contents">사전</div>
            </div>`)
  }
  function render(){
    const template = getTemplete()
    const renderPosition=document.getElementById(props.rendorDOMId)
    renderPosition.innerHTML=template

    Nav.draw({rendorDOMId: "dictionary-nav", bgColor: "black", textColor: "rgb(190, 190, 190)"})
  }
  function addHandlers(){}

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

export default Dictionary