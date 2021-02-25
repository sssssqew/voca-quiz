import Nav from '../components/Nav.js'
import Button from '../components/Button.js'
import Modal from '../components/Modal.js'
import AddModal from '../components/AddModal.js'

import uuidGen from '../lib/uuidGenerator.js'

const Dictionary=(function(){
  "use strict"

  let state={open:false}
  let props={}
  const defaultStyle={}
  const keys = Array(5).fill(0).map(el=>uuidGen())

  console.log(keys)

  function update(newData){
    state={...state, ...newData}
    render()
    addComponents()
    addHandlers()
    doSomethingAfterRendering(()=>{
        console.log("Dictionary updated!")
    })
  }

  // TODO: 이벤트 핸들러
  function handleOpen(e){
    console.log("modal opened ...")
    if(e.target.id === keys[0]){
      console.log("추가버튼 클릭 !")
      update({open:true, modalBody:AddModal})
    }else if(e.target.id === keys[1]){
      console.log("삭제버튼 클릭 !")
      update({open:true})
    }
  } 
  function navigate(e){
    console.log(e.target.dataset.url) // 이벤트 위임: 해당 클래스 이름을 가진 가장 가까운 상위요소
    if(e.target.dataset.url){
      window.router(e.target.dataset.url, {rendorDOMId:'root'})
    }else{
      console.warn("No link property on draw function of Button")
    }
  }

  function init(properties){
    props={...properties}
    if(!props.hasOwnProperty("rendorDOMId")) throw new Error("No position to render. Please set renderDOMId property on draw function of Dictionary!")
    if(!props.hasOwnProperty("style")) props.style = {}
  }
  function getTemplete(){
    return (`<div class="dictionary-container">
              <div id="dictionary-nav"></div>
              <div id="dictionary-modal"></div>
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

  function addComponents(){
    Nav.draw({rendorDOMId: "dictionary-nav", style: {bgColor: "black", textColor: "rgb(190, 190, 190)"}})
    Modal.draw({rendorDOMId: "dictionary-modal", open: state.open, modalBody:state.modalBody, style: {bgColor:"black", textColor: "rgb(190, 190, 190)", border: "none"}})

    const addBtn = Button()
    addBtn.draw({rendorDOMId: "dictionary-btns", disabled: true, style: {hoverColor:'orange', bgColor:'black', borderRadius: '50%', text:'+', 
    width:'70px', height:'70px', textSize: '50px'}, uuid: keys[0], onClick: handleOpen})

    const removeBtn = Button()
    removeBtn.draw({rendorDOMId: "dictionary-btns", style: {bgColor:'black', borderRadius: '50%', text:'-', 
    width:'70px', height:'70px', textSize: '50px'}, uuid: keys[1], onClick: handleOpen})

    // 사진에 저작권 있음. 전자책 쓸때는 사용하지 말기
                  const defaultBtn = Button()
                  defaultBtn.draw({rendorDOMId: "dictionary-btns", uuid: keys[2], style: {text: `<div style="display:flex;justify-contents:center;align-items:center"><img width='25px' height='25px' src='../resources/camera.png' style='filter: invert(100%)' />camera</div>`}})

                  const defaultBtn2 = Button()
                  defaultBtn2.draw({rendorDOMId: "dictionary-btns", uuid: keys[3], style: {border: "1px solid orange", textColor: "orange", bgColor: "orange", textColor: "white", hoverColor: "white", hoverTextColor: "orange"}})

                  const defaultBtn3 = Button()
                  defaultBtn3.draw({rendorDOMId: "dictionary-btns", uuid: keys[4], link: '/score', onClick: navigate})
    
  }

  function addHandlers(){
    // document.addEventListener('click', handleOpen)
  }

  function doSomethingAfterRendering(callback){
    setTimeout(callback,0) 
  }
  function draw(properties){
    init(properties)
    render()
    addComponents()
    addHandlers()
    doSomethingAfterRendering(()=>console.log("Dictionary mounted!"))
    
} 
  return {draw}
})()

export default Dictionary