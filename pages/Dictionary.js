import Nav from '../components/Nav.js'
import Button from '../components/Button.js'

const Dictionary=(function(){
  "use strict"

  let state={open:false}
  let props={}

  function update(newData){
    state={...state, ...newData}
    render()
    addHandlers()
    addComponents()
    doSomethingAfterRendering(()=>{
        console.log('updated!')
    })
  }

  // TODO: 이벤트 핸들러
  function handleOpen(){
    console.log("modal opened ...")
    update({open:true})

  } 

  function init(properties){
    props={...properties}
  }
  function getTemplete(){
    return (`<div class="dictionary-container">
              <div id="dictionary-nav"></div>
              <div class="dictionary-contents">
                <div class="dictionary-words">사전</div>
                <div class="dictionary-btns" id="dictionary-btns"></div>
              </div>
            </div>`)
  }
  function render(){
    const template = getTemplete()
    const renderPosition=document.getElementById(props.rendorDOMId)
    renderPosition.innerHTML=template
  }
  function addHandlers(){}

  function addComponents(){
    Nav.draw({rendorDOMId: "dictionary-nav", bgColor: "black", textColor: "rgb(190, 190, 190)"})
    
    const addBtn = Button()
    const removeBtn = Button()
    console.log(addBtn === removeBtn)
    addBtn.draw({rendorDOMId: "dictionary-btns", bgColor:'black', borderRadius: '50%', text:'+', 
                  width:'70px', height:'70px', textSize: '50px', onClick: handleOpen})
    removeBtn.draw({rendorDOMId: "dictionary-btns", bgColor:'black', borderRadius: '50%', text:'-', 
                  width:'70px', height:'70px', textSize: '50px', onClick: handleOpen})
  }

  function doSomethingAfterRendering(callback){
    setTimeout(callback,0) 
  }
  function draw(properties){
    init(properties)
    render()
    addHandlers()
    addComponents()
    doSomethingAfterRendering(()=>console.log('mounted!'))
    
} 
  return {draw}
})()

export default Dictionary