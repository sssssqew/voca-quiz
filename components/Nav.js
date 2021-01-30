const Nav=(function(){
  "use strict"

  let state={}
  let props={}

  function update(newData){
    state={...state, ...newData}
    render()
    addHandlers()
    doSomethingAfterRendering(() => {
        console.log('updated!')
    })
  }

  // TODO: 이벤트 핸들러 
  function navigate(e){
    console.log(e.target.closest('.nav-menu-item').dataset.url) // 이벤트 위임: 해당 클래스 이름을 가진 가장 가까운 상위요소
    window.router(e.target.closest('.nav-menu-item').dataset.url, {rendorDOMId:'root'})

  }
  function init(properties){
    props={...properties}
  }
  function getTemplete(){
    const {bgColor, textColor} = props
    return (`<div class="nav-container" style="background-color:${bgColor};color:${textColor};">
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
  }

  function doSomethingAfterRendering(callback){
    setTimeout(callback,0) 
  }
  function draw(properties){
    init(properties)
    render()
    addHandlers()
    doSomethingAfterRendering(() => console.log('mounted !')) 
} 
  return {draw}
})()

export default Nav