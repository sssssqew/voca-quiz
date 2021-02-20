const AddModal=(function(){
  "use strict"

  let state={}
  let props={}
  const defaultStyle={}

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
    if(!props.rendorDOMId) throw new Error("No position to render. Please set renderDOMId property on draw function of AddModal!")
  }
  function getTemplete(){
    const { bgColor, textColor, width, height, border } = props
    return (`<div class="addmodal-body" style="background-color:${bgColor?bgColor:'white'};
              color:${textColor?textColor:'black'};
              width:${width?width:'500px'};height:${height?height:'400px'};
              border:${border?border:'1px solid black'}">
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