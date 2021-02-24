const Nav=(function(){
  "use strict"

  let state={}
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

  function update(newData){
    state={...state, ...newData}
    render()
    addHandlers()
    doSomethingAfterRendering(() => {
        console.log("Nav updated!")
    })
  }

  // TODO: 이벤트 핸들러 
  function navigate(e){
    console.log(e.target.closest('.nav-menu-item').dataset.url) // 이벤트 위임: 해당 클래스 이름을 가진 가장 가까운 상위요소
    window.router(e.target.closest('.nav-menu-item').dataset.url, {rendorDOMId:'root'})
  }

  function handleMouseOver(){
    const { hoverColor, hoverTextColor, hoverWidth } = props.style
    const d = defaultStyle
    this.style.backgroundColor = hoverColor? hoverColor: d.hoverColor
    this.style.color = hoverTextColor? hoverTextColor: d.hoverTextColor
    this.closest('.nav-container').style.width = hoverWidth? hoverWidth: d.hoverWidth
  }

  function handleMouseLeave(){
    const { width, bgColor, textColor } = props.style
    const d = defaultStyle
    this.style.backgroundColor = bgColor? bgColor: d.bgColor
    this.style.color = textColor? textColor: d.textColor
    this.closest('.nav-container').style.width = width? width: d.width
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
    return (`<div class="nav-container" 
                  style="width:${width?width:d.width};height:${height?height:d.height};
                  background-color:${bgColor?bgColor:d.bgColor};color:${textColor?textColor:d.textColor};">
              <div id="nav-menu" class="nav-menu">
                <div class="nav-menu-item" data-url="/">
                  <div class="nav-menu-text">Quiz</div>
                  <div class="nav-menu-guide">solve vocaburary</div>
                </div>
                <div class="nav-menu-item" data-url="/score">
                  <div class="nav-menu-text">Score</div>
                  <div class="nav-menu-guide">how many you get right</div>
                </div>
                <div class="nav-menu-item" data-url="/dictionary">
                  <div class="nav-menu-text">Dictionary</div>
                  <div class="nav-menu-guide">view words you added</div>
                </div>
              </div>
            </div>`)
  }
  function render(){
    const template = getTemplete()
    const renderPosition=document.getElementById(props.rendorDOMId)
    renderPosition.innerHTML=template
  }
  function addHandlers(){
    document.getElementById('nav-menu').addEventListener('click', navigate)
    Array.from(document.getElementsByClassName('nav-menu-item')).forEach(el=>{
      el.addEventListener('mouseover', handleMouseOver)
      el.addEventListener('mouseleave', handleMouseLeave)
    })
  }

  function doSomethingAfterRendering(callback){
    setTimeout(callback,0) 
  }
  function draw(properties){
    init(properties)
    render()
    addHandlers()
    doSomethingAfterRendering(() => console.log("Nav mounted!")) 
} 
  return {draw}
})()

export default Nav