export async function fetchData(collectionName){
    return fetch(`https://costos-backend.vercel.app/${collectionName}`)
    .then((res)=>res.json())
}

export async function postData(url, obj){
    fetch(`https://costos-backend.vercel.app/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(obj)
    })
}