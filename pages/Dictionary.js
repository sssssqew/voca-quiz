import Nav from '../components/Nav.js'
import Button from '../components/Button.js'

import uuidGen from '../lib/uuidGenerator.js'

const Dictionary=(function(){
  "use strict"

  let state={open:false}
  let props={}
  const keys = Array(2).fill(0).map(el=>uuidGen())

  console.log(keys)

  function update(newData){
    state={...state, ...newData}
    render()
    addComponents()
    addHandlers()
    doSomethingAfterRendering(()=>{
        console.log('Dictionary updated!')
    })
  }

  // TODO: 이벤트 핸들러
  function handleOpen(e){
    console.log("modal opened ...")
    if(e.target.id === keys[0]){
      console.log("추가버튼 클릭 !")
      update({open:true})
    }else if(e.target.id === keys[1]){
      console.log("삭제버튼 클릭 !")
      update({open:true})
    }
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
  function addHandlers(){
    // document.addEventListener('click', handleOpen)
  }

  function addComponents(){
    Nav.draw({rendorDOMId: "dictionary-nav", bgColor: "black", textColor: "rgb(190, 190, 190)"})
    
    const addBtn = Button()
    addBtn.draw({rendorDOMId: "dictionary-btns", bgColor:'black', borderRadius: '50%', text:'+', 
                  width:'70px', height:'70px', textSize: '50px', uuid: keys[0], onClick: handleOpen})

    const removeBtn = Button()
    removeBtn.draw({rendorDOMId: "dictionary-btns", bgColor:'black', borderRadius: '50%', text:'-', 
                  width:'70px', height:'70px', textSize: '50px', uuid: keys[1], onClick: handleOpen})
    
    
  }

  function doSomethingAfterRendering(callback){
    setTimeout(callback,0) 
  }
  function draw(properties){
    init(properties)
    render()
    addComponents()
    addHandlers()
    doSomethingAfterRendering(()=>console.log('Dictionary mounted!'))
    
} 
  return {draw}
})()

export default Dictionary