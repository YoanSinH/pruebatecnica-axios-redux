'use client'
import React from 'react'
import Card from '@/app/dashboard/_components/card';
import { fetchPostDetails } from '@/app/dashboard/_services/fetch-post';
import axios from 'axios';

export default function Page({ params }) {
  const [postDetails,setPostDetails] = React.useState()

  const [post,setPost] = React.useState([])

  const fetchPost = async (id) => {
    try {
      const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`);
      const data = response.data;
      setPost(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    console.log(`https://jsonplaceholder.typicode.com/posts/${id}`);
  }

  React.useEffect(() => {
    fetchPost(params.slug)

    fetchPostDetails(params.slug)
    .then(data => setPostDetails(data))
    .catch(error => console.error(error))
    console.log(postDetails);
  },[])

  if (!postDetails) {
    return (
      <>
      <main>
      <div className="flex min-h-screen items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-blue-400"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-blue-400"></div>
        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-blue-400"></div>
      </div>
      </main>
      </>
    )
  }
  
  return (
  <>
  <main className="flex min-h-screen flex-col mt-10 md:px-24 px-5 mb-10">
    <article className="flex min-h-screen flex-col justify-between mt-10 md:px-24 px-5 mb-10">
      <div className='max-w-[80%]'>
        <h1 className="font-bold text-2xl">{post.title}</h1>
        <p className="font-light text-lg">By: {postDetails.author.name}</p>
        <p className="font-normal mt-3">{post.body}</p>
      </div>
      <div className='grid h-screen mt-5'>
        <h2 className='font-semibold text-lg'>Comments:</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-fit'>
        {postDetails.comments.map(comment => {
          return(
          <Card key={comment.id} id={comment.id} title={comment.name} author={comment.email} content={comment.body} />
          )
        })
        }
        </div>
      </div>
      <div className='mt-10 mb-10'/>
    </article>
  </main>
  </>
  )
  }  