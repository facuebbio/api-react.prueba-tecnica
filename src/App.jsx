import { useEffect, useState } from "react"
import './App.css'



const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact/'
// const CAT_ENDPOINT_IMAGE_URL =`https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'


export function App () {
    const [fact, setFact] = useState()
    const [imageUrl, setImageUrl] = useState()

// Primer Effect para recuperar cita al cargar la pagina// no puedes usar React Query, SWR, axios, apollo, etc. Solo FETCH
useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
        .then(res => res.json())
        .then(data => {
            const {fact} = data
            setFact(fact)
        })
}, [])

//Segundo Effect para recuperar la imagen cada vez que tenemos una cita nueva

useEffect(() => {
    if (!fact) return
    
    const threeFirstWords = fact.split(' ', 3).join('') //split y join, siempre tipicos 
            console.log(threeFirstWords);

            fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
                .then(res => res.json())
                .then(response => {
                    const { url } = response
                    setImageUrl(url)
                })
}, [fact])

    return (
        <main>
            <h1>App Test React</h1>
            {fact && <p>{fact}</p>}
            {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`Image extracted using the first three words for ${fact}`}/>}
        </main>
    )
}