import axios from 'axios';
import React , {useState , useEffect} from 'react';
import Post from './Post';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/posts')
            .then(function (response) {
                // console.log(response.data);
                setPosts(response.data.reverse());
            })
            .catch(function (error) {
                console.log(error);
            });
    },[])
    return (
        <div>
            <h1 className='text-center mt-20 text-3xl text-primary font-bold'>Here You Will See All Blogs</h1>
            <div className='grid gap-4 grid-cols-3 container mt-20 mx-auto'>
                {posts?.map(post => <Post key={post._id} post={post}></Post>)}
            </div>
        </div>
    );
};

export default Posts;