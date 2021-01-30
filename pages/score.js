import Nav from '../components/Nav.js'

const Score = (function(){
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
    return (`<div class="score-container">
              <div id="score-nav"></div>
              <div class="score-contents">점수</div>
            </div>`)
  }
  function render(){
    const template = getTemplete()
    const renderPosition=document.getElementById(props.rendorDOMId)
    renderPosition.innerHTML=template

    Nav.draw({rendorDOMId: "score-nav", bgColor: "black", textColor: "rgb(190, 190, 190)"})
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

export default Score  