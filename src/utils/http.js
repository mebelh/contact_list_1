export async function request(url, body){
   const res = await fetch(url, {
      method: 'POST',
      headers: {
         "Content-type": "application/json"
      },
      body: JSON.stringify(body)
   })
   const json = await res.json()
   return json
}