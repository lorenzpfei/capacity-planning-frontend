import axios from 'axios';

export default function Home() {
    const instance = axios.create({
        withCredentials: true,
        baseURL: 'http://localhost:8000/api'
    })
    instance.get('/user', {
        // @ts-ignore
        on401: (destroySession) => {
            console.log('destroy'); //todo: remove debug
            destroySession(); // Destroy the session and redirect to login
        }
    }).then((res) => {
        console.log(res); //todo: remove debug
    })

    return (
        <>
            content
        </>
    )
}
