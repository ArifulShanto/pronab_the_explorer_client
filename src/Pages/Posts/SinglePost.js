import axios from 'axios';
import React , {useEffect , useState} from 'react';
import { useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const SinglePost = () => {
    const { postId } = useParams();
    const [postid, setPostid] = useState(null);

    useEffect(() => {
        setPostid(postId);
    }, [postId])
    console.log(postId);
    const [aPost , setAPost] = useState({})
    useEffect(() => {
        axios.get(`http://localhost:5000/posts/${postId}`)
            .then(function (response) {
                // console.log(response.data);
                setAPost(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, [postId])
    console.log(aPost);
    return(
        <div className='container mx-auto mt-20'>
            <h2 className='font-bold text-4xl'>{aPost?.postName}</h2>
            <br />
            <p className='text-gray-400 font-bold'>{aPost?.date}</p>
            <div>
                {('content' in aPost) ? parse(aPost?.content) : ''}
            </div>
            
        </div>
    );
};

export default SinglePost;