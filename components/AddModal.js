const AddModal=(function(){
  "use strict"

  let state={}
  let props={}
  const defaultStyle={
    bgColor:'white',
    textColor:'black',
    width:'500px',
    height:'400px',
    border:'1px solid black'
  }

  function update(newData){
    state={...state, ...newData}
    render()
    addHandlers()
    doSomethingAfterRendering(()=>{
        console.log("AddModal updated!")
    })
  }

  // TODO: 이벤트 핸들러 

  function init(properties){
    props={...properties}
    if(!props.hasOwnProperty("rendorDOMId")) throw new Error("No position to render. Please set renderDOMId property on draw function of AddModal!")
    if(!props.hasOwnProperty("style")) props.style = {}
  }
  function getTemplete(){
    const { style } = props
    const { bgColor, textColor, width, height, border } = style
    const d = defaultStyle
    return (`<div class="addmodal-body" style="background-color:${bgColor?bgColor:d.bgColor};
              color:${textColor?textColor:d.textColor};
              width:${width?width:d.width};height:${height?height:d.height};
              border:${border?border:d.border}">
                <div class="addmodal-header">
                  <p>You will add new word in your dictionary?</p>
                </div>
                <div class="addmodal-contents">
                  <div class="addmodal-inputs">
                    <input class="addmodal-input" type="text" placeholder="Type meaning of the word in korean ..."/>
                    <input class="addmodal-input" type="text" placeholder="Type new word in english ..."/>
                  </div>
                </div>
                <div class="addmodal-footer">
                </div>
              </div>`)
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
    doSomethingAfterRendering(()=>console.log("AddModal mounted!"))
    
} 
  return {draw}
})()

export default AddModal