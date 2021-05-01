

export default function debounce(func,wait,immediate) {
    let timeout,e;
    return ()=>{
        
        const later = ()=>{
            timeout = null;
            // if(!immediate) func.apply(context,args);
            immediate || (e=func.apply(context,args));
        }
        const context = this, args=arguments;
        return(clearTimeout(timeout),timeout=setTimeout(later,wait),
        immediate && !timeout &&(e=func.apply(context,args)),e)
        
        /*let callNow = immediate && !timeout;
        timeout = setTimeout(later,wait);
        clearTimeout(timeout);
        if(callNow) func.apply(context,args);*/
    }
   
}

/*export default function debounce(a,b,c){
    var d,e;
    return function(){
      function h(){
        d=null;
        c||(e=a.apply(f,g));
      }
      var f=this,g=arguments;
      return (clearTimeout(d),d=setTimeout(h,b),c&&!d&&(e=a.apply(f,g)),e)
    }
  }*/



export  function removeHTMLTags(str){
    return str.replace(/<[^>]*>?/gm, '');
    
}