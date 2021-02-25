function changeStyle(target, property, userStyle, defaultStyle){
  target.style[property] = userStyle? userStyle: defaultStyle
}

export default changeStyle