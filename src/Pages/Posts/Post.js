import React from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import SinglePost from './SinglePost';


const Post = ({ post }) => {
    // const handleReadMore = () => {
    //     return <SinglePost post = {post}></SinglePost>
    // }
    // console.log(post);
    const { postName, name, thumbnailImage, postDetails, date, _id, content } = post;
    console.log(post);
    return (
        <div className="card w-96 bg-base-100 shadow-xl">
            <figure><img src={thumbnailImage} alt="" /></figure>
            <div className="card-body">
                <h2 className="card-title">{postName}</h2>
                <p>{postDetails} ... <Link className='text-primary' to={`${_id}`}>Read More</Link></p>
                <div className="card-actions justify-end">
                    <div className="badge badge-outline">{date}</div>
                </div>
                {/* <img src={thumbnailImage} alt="" />
                {
                    parse(content)
                } */}
            </div>
        </div>
    );
};

export default Post;