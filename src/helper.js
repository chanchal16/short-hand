export default function debounce(func, timeout ) {
  let timer
  return () => {
    let context = this,
      args= arguments;
      clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(context, args)
      
    }, timeout)
    
  }
  
}



export  function removeHTMLTags(str){
    return str.replace(/<[^>]*>?/gm, '');
    
}