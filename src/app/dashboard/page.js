"use client"
import axios from "axios"
import { useEffect, useState } from "react"

export default function Page() {

    const [data, setData] = useState([])

    const handleData = async () => {
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(function (response) {
            setData(response.data)
            console.log(response.data);
        })
        .catch(function (error) {
            console.error('Error:', error);
        });
    }

    useEffect(() => {
        handleData()
    }
    ,[])

    return(
        <>
            <p>dashboard</p>
        </>
    )
}