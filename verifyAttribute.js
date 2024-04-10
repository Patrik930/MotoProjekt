export const verifyAttribute=(arr,atrName,val)=>{
    return arr.find(obj=>obj[atrName]==val)
}