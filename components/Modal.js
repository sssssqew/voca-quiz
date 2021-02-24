const Modal=(function(){
  "use strict"

  let state={}
  let props={}
  const defaultStyle={}

  function update(newData){
    state={...state, ...newData}
    render()
    addComponents()
    addHandlers()
    doSomethingAfterRendering(()=>{
        console.log("Modal updated!")
    })
  }

  // TODO: 이벤트 핸들러 

  function init(properties){
    props={...properties}
    if(!props.hasOwnProperty("rendorDOMId")) throw new Error("No position to render. Please set renderDOMId property on draw function of Modal!")
    if(!props.hasOwnProperty("open")) throw new Error("No open property for modal component. Please set open property on draw function of Modal!")
    if(!props.hasOwnProperty("modalBody")) throw new Error("No contents to render on Modal. Please set modalBody property on draw function of Modal!")
    if(!props.hasOwnProperty("style")) props.style = {}
  }
  function getTemplete(){
    return (`<div id="modal-frame" class="modal-frame" style="display:${props.open? "block":"none"}"></div>`)
  }
  function render(){
    const template = getTemplete()
    const renderPosition=document.getElementById(props.rendorDOMId)
    renderPosition.innerHTML=template
  }
  function addHandlers(){}

  function addComponents(){
    const { modalBody, style } = props
    if(modalBody){
      modalBody.draw({rendorDOMId: "modal-frame", style})
    }
  }

  function doSomethingAfterRendering(callback){
    setTimeout(callback,0)
  }
  function draw(properties){
    init(properties)
    render()
    addComponents()
    addHandlers()
    doSomethingAfterRendering(()=>console.log("Modal mounted!"))
    
} 
  return {draw}
})()

export default Modal