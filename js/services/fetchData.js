export async function fetchData(collectionName){
    return fetch(`https://costos-backend.vercel.app/${collectionName}`)
    .then((res)=>res.json())
}