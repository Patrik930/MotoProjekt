export const getData = async (url,fcName)=>{
    const response = await fetch(url)
    const data = await response.json()
    fcName(data)
}