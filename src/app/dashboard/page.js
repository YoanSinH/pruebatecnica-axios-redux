"use client"
import { useEffect, useState, useRef } from "react"
import Card from "./_components/card"
import CardSkeleton from "./_components/card-skeleton"
import { getPostsAndAuthors } from "./_services/fetch-post"
import axios from 'axios'

export default function Page() {

    const [data, setData] = useState([])

    const bottomRef = useRef(null);
    const [currentPage] = useState(1);
    const [dataPerPage, setDataPerPage] = useState(9);

    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const loadData = () => {
        setDataPerPage(dataPerPage + 9);
        setTimeout(() => {
        bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }, 100);
    }

    const handlePost = () => {
        if(title === '' || content === ''){
            alert('No puedes dejar campos vacios')
        }else{
            const post = {
                title: title,
                body: content,
                userId: 1
            }
            axios.post('https://jsonplaceholder.typicode.com/posts', post)
            .then((response) => {
                console.log(response);
                if(response.status === 201){
                    alert('Post creado con exito')
                }
            }, (error) => {
                console.log(error);
                alert('Error al crear el post')
            })
        }}

    const indexLastData = currentPage * dataPerPage;
    const indexFistData = indexLastData - dataPerPage;
    const currentData = data.slice(indexFistData, indexLastData);

    useEffect(() => {
        getPostsAndAuthors()
        .then((data) => setData(data))
        .catch((error) => console.error('Error:', error));
    },[])

    return(
        <>
        <main className="flex min-h-screen flex-col mt-10 md:px-24 px-5">
        <button type="button" data-modal-target="default-modal" data-modal-toggle="default-modal" className="items-center text-zinc-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" >Nuevo post</button>
            <h2 className="font-semibold text-3xl mb-4">Posts</h2>
            <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {data.length === 0 ?
            <>
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
            <CardSkeleton/>
            </>
                :
            currentData.map(post => (
                <Card key={post.id} id={post.id} title={post.title} author={post.author} content={post.body} contentPage={'dashboard/post/'+post.id}/>
            ))}
            </div>
            {data.length === 0 || currentData.length >= data.length ?
            null :
            <>
                <div className='mt-5 flex items-center justify-center'>
                    <button type="button" className="items-center text-zinc-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" onClick={loadData}>Cargar Más</button>
                </div>
            </>
            }
            <div ref={bottomRef} />
        </main>
        <div id="default-modal" tabindex="-1" aria-hidden="true" class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-2xl max-h-full">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Nuevo Post
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
                    <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>
            <div class="p-6 space-y-6">
                <label for="title" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Titulo del post</label>
                <input onChange={(e) => setTitle(e.target.value)} type="title" id="title" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="" required/>


                <label for="content" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contenido del post</label>
                <textarea onChange={(e) => setContent(e.target.value)} id="content" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" required></textarea>

            </div>
            <div class="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
                <button onClick={handlePost} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Crear</button>
                <button data-modal-hide="default-modal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Cerrar</button>
            </div>
        </div>
    </div>
</div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/1.8.1/flowbite.min.js" async></script>
    </>
    )
}