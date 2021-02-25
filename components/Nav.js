import Button from '../components/Button.js'

import changeStyle from '../lib/changeStyle.js'
import uuidGen from '../lib/uuidGenerator.js'

const Nav=(function(){
  "use strict"

  let state={
    quizText: "<div></div>",
    scoreText: "<div></div>",
    dictionaryText: "<div></div>"
  }
  let props={}
  const defaultStyle={
    width: '50px',
    height: '100vh',
    bgColor:'rgb(158,158,158)',
    textColor:'black',
    hoverWidth: '30%',
    hoverColor: 'rgb(20,20,20)',
    hoverTextColor: 'white'
  }
  const keys = Array(3).fill(0).map(el=>uuidGen())

  // 사용자 함수
  function showText(target){
    console.log("show")
    changeStyle(target, "visibility", "visible", null)
  }
  function hideText(target){
    console.log("hide")
    changeStyle(target, "visibility", "hidden", null)
  }
  function changeVisibilityOfText(w, target){
    // console.log(w)
    if(w > 150) showText(target)
    else hideText(target)
  }

  function update(newData){
    state={...state, ...newData}
    render()
    addComponents()
    addHandlers()
    doSomethingAfterRendering(() => {
        console.log("Nav updated!")
    })
  }

  // TODO: 이벤트 핸들러 
  function navigate(e){
    console.log(e.target.dataset.url) // 이벤트 위임: 해당 클래스 이름을 가진 가장 가까운 상위요소
    if(e.target.dataset.url){
      window.router(e.target.dataset.url, {rendorDOMId:'root'})
    }else{
      console.warn("No link property on draw function of Button")
    }
  }

  function handleMouseOver(e){
    console.log("hover")

    const { hoverWidth } = props.style
    const d = defaultStyle
    changeStyle(this, "width", hoverWidth, d.hoverWidth)

    const quizText = `
      <div class="nav-menu-text">Quiz</div>
      <div class="nav-menu-guide">solve vocaburary</div>
    `
    const scoreText = `
      <div class="nav-menu-text">Score</div>
      <div class="nav-menu-guide">how many you get right</div>
    `
    const dictionaryText = `
      <div class="nav-menu-text">Dictionary</div>
      <div class="nav-menu-guide">view words you added</div>
    `
    // update({ quizText, scoreText, dictionaryText })

    // console.log(this)
    // const { hoverWidth, hoverColor, hoverTextColor } = props.style
    // const d = defaultStyle
    
    // changeStyle(e.target.closest('.nav-menu-item'), "backgroundColor", hoverColor, d.hoverColor)
    // changeStyle(e.target.closest('.nav-menu-item'), "color", hoverTextColor, d.hoverTextColor)

    // changeStyle(this.closest('#nav-container'), "width", hoverWidth, d.hoverWidth)
    // console.log(this.closest('#nav-container'))
    // changeStyle(this, 'display', 'block', null)

    // Array.from(document.getElementsByClassName('.nav-menu-text')).forEach(el=>{
    //   changeStyle(el, "visibility", "visible", null)
    // })

    // console.log(this.closest('.nav-container').offsetWidth)
    // changeVisibilityOfText(this.closest('.nav-container').offsetWidth, this.closest('.nav-menu'))
  }

  function handleMouseLeave(e){
    console.log("leave")

    const { width } = props.style
    const d = defaultStyle
    changeStyle(this, "width", width, d.width)

    const quizText = `
      <div></div>
    `
    const scoreText = `
      <div></div>
    `
    const dictionaryText = `
      <div></div>
    `
    
    // update({ quizText, scoreText, dictionaryText })

    // console.log(e.target)
    
    // changeStyle(e.target.closest('.nav-menu-item'), "backgroundColor", bgColor, d.bgColor)
    // changeStyle(e.target.closest('.nav-menu-item'), "color", textColor, d.textColor)
    
    // changeStyle(this.closest('#nav-container'), "width", width, d.width)
    // console.log(this.closest('.nav-menu-item'))

  
    // changeStyle(this, 'display', 'none', null)

    // Array.from(document.getElementsByClassName('.nav-menu-text')).forEach(el=>{
    //   el.changeStyle(el, "visibility", "hidden", null)
    // })

    // console.log(this.closest('.nav-container').offsetWidth)
    // changeVisibilityOfText(this.closest('.nav-container').offsetWidth, this.closest('.nav-menu'))
  }

  function init(properties){
    props={...properties}
    if(!props.hasOwnProperty("rendorDOMId")) throw new Error("No position to render. Please set renderDOMId property on draw function of Nav!")
    if(!props.hasOwnProperty("style")) props.style = {}
  }
  function getTemplete(){
    const { style } = props
    const { width, height, bgColor, textColor } = style
    const d = defaultStyle
    return (`<div id="nav-container" class="nav-container" 
                  style="width:${width?width:d.width};height:${height?height:d.height};
                  background-color:${bgColor?bgColor:d.bgColor};color:${textColor?textColor:d.textColor};">
              <div id="nav-menu" class="nav-menu">
              </div>
            </div>`)
  }
  function render(){
    const template = getTemplete()
    const renderPosition=document.getElementById(props.rendorDOMId)
    renderPosition.innerHTML=template
  }

  function addComponents(){
    const { quizText, scoreText, dictionaryText } = state
    console.log(quizText)
    const { bgColor, hoverColor } = props.style
    const d = defaultStyle
    
    const quizBtn = Button()
    quizBtn.draw({rendorDOMId: "nav-menu", uuid: keys[0], link: "/", onClick: navigate,
                  style: {width: "100%", height: "calc(100%/3)", bgColor: `${bgColor?bgColor:d.bgColor}`, 
                  hoverColor: `${hoverColor?hoverColor:d.hoverColor}`, text: quizText, borderRadius: "0px"}})

    const scoreBtn = Button()
    scoreBtn.draw({rendorDOMId: "nav-menu", uuid: keys[1], link: "/score", onClick: navigate, 
                  style: {width: "100%", height: "calc(100%/3)", bgColor: `${bgColor?bgColor:d.bgColor}`, 
                  hoverColor: `${hoverColor?hoverColor:d.hoverColor}`, text: scoreText, borderRadius: "0px"}})
                  
    const dictionaryBtn = Button()
    dictionaryBtn.draw({rendorDOMId: "nav-menu", uuid: keys[2], link: "/dictionary", onClick: navigate, 
                  style: {width: "100%", height: "calc(100%/3)", bgColor: `${bgColor?bgColor:d.bgColor}`, 
                  hoverColor: `${hoverColor?hoverColor:d.hoverColor}`, text: dictionaryText, borderRadius: "0px"}})

  }

  function addHandlers(){
    // document.getElementById('nav-menu').addEventListener('click', navigate)
    document.getElementById('nav-container').addEventListener('mouseover', handleMouseOver)
    document.getElementById('nav-container').addEventListener('mouseleave', handleMouseLeave)

    // Array.from(document.getElementsByClassName('nav-menu-item')).forEach(el=>{
    //   el.addEventListener('mouseover', handleMouseOver)
    //   el.addEventListener('mouseleave', handleMouseLeave)
    // })
  }

  function doSomethingAfterRendering(callback){
    setTimeout(callback,0) 
  }
  function draw(properties){
    init(properties)
    render()
    addComponents()
    addHandlers()
    doSomethingAfterRendering(() => console.log("Nav mounted!")) 
} 
  return {draw}
})()

export default Nav