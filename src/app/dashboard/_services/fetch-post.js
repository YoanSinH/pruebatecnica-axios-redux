import axios from 'axios';

export async function getPostsAndAuthors() {
  try {
    const [postsResponse, authorsResponse] = await Promise.all([
      axios.get('https://jsonplaceholder.typicode.com/posts'),
      axios.get('https://jsonplaceholder.typicode.com/users/'),
    ]);

    if (!postsResponse.status == 200 || !authorsResponse.status == 200) {
      throw new Error('Error fetching data');
    }

    const [posts, authors] = await Promise.all([
      postsResponse.data,
      authorsResponse.data,
    ]);

    const combinedData = posts.map((post) => {
      const author = authors.find((author) => author.id === post.userId);
      return {
        id: post.id,
        title: post.title,
        body: post.body,
        author: author ? author.name : 'Unknown Author',
      };
    });

    return combinedData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export async function fetchPostDetails(postId) {
  try {
    const postResponse = await axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`);
    const post = postResponse.data;

    const authorResponse = await axios.get(`https://jsonplaceholder.typicode.com/users/${post.userId}`);
    const author = authorResponse.data;

    const commentsResponse = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
    const comments = commentsResponse.data;

    console.log("fetchPostDetails:", post, author, comments);
    return { post, author, comments };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}