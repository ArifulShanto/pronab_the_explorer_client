import React, { useRef, useState, useContext }  from 'react';
import { format } from 'date-fns';
import { Editor } from '@tinymce/tinymce-react';
import parse from 'html-react-parser';
import './AddPost.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { UserContext } from '../../App';
import { useNavigate } from 'react-router-dom';




const AddPost = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [date, setDate] = useState(new Date());
    const [name, setName] = useState('');
    const [postDetails, setPostDetails] = useState('');
    const [thumbnailImage, setThumbnailImage] = useState({ preview: '', data: '' });
    const [thumbnailImageDestination, setThumbnailImageDestination] = useState('');
    const editorRef = useRef(null);

    const formattedDate = format(date, 'PP');
    const navigate = useNavigate();




    const handleImageChange = (e) => {
        console.log(e.target.files[0]);
        const img = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0]
        }
        setThumbnailImage(img);
    }

    const handleImageUpload = (e) => {
        e.preventDefault();
        if (!thumbnailImage) {
            toast.error('No Image Selected');
        }
        else {
            const formData = new FormData();
            formData.append("thumbnailImage", thumbnailImage.data);
            axios.post('http://localhost:5000/thumbnailImage', formData)
                .then(function (response) {
                    console.log(response);
                    setThumbnailImageDestination(response.data);
                    toast.success('Thumbnail Image Uploaded Successfully');
                })
                .catch(function (error) {
                    console.log(error);
                });
            
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        if (editorRef.current) {
            const content = editorRef.current.getContent();
            console.log(content);
            if (content === "") {
                console.log(thumbnailImageDestination);
                e.preventDefault();
                toast.error('Something Went Wrong');
            }
            else if(!thumbnailImageDestination){
                toast.error('Please Upload Your Thumbnail Image');
            }
            else {
                const currentPost = {
                    name : loggedInUser.name,
                    postName: name,
                    date : formattedDate, 
                    thumbnailImage: thumbnailImageDestination,
                    postDetails: postDetails,
                    content: content
                }
                axios.post('http://localhost:5000/addPost', currentPost)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                navigate('/posts');
                
            }

        }

    };
    return (
        <div className='flex  justify-center items-center'>
            <div className="card w-4/5 bg-base-100">
                <h2 className='text-center font-black text-2xl text-secondary'>Add Your Own Blog</h2>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <label htmlFor="">Enter your post name</label>
                        <div className="form-control w-full max-w-xs mb-10 mt-5">
                            <input onChange={(event) => {
                                setName(event.target.value);
                            }} required type="text" placeholder="Enter your post name" className="input input-bordered w-full max-w-xs " />
                        </div>
                        <label htmlFor="">Upload Your Thumbnail Image</label>
                        <div className="form-control w-full max-w-xs mb-5 mt-5">
                            {thumbnailImage.preview && <img alt='' src={thumbnailImage.preview} className = "mb-5" width="200" height="200" />}
                            <input onChange={handleImageChange} required type="file" name='thumbnail' className="input w-full max-w-xs " />
                        </div>
                        <button onClick={handleImageUpload} className='btn btn-primary mb-10'>Upload</button>
                        <br />
                        <label htmlFor="">Enter your post description</label>
                        <div className="form-control w-full max-w-xs mb-10 mt-5">
                            <textarea onChange={(event) => {
                                setPostDetails(event.target.value);
                            }} required type="text" placeholder="Enter your post description" className="input input-bordered w-full h-20 max-w-xs " />
                        </div>
                        <label htmlFor="">Enter your post content here</label>
                        <div>
                            <Editor
                                apiKey='qwsfhyvb3ckncskkclp530zzmw0lyhtcwujjm876aww7y2wi'
                                onInit={(evt, editor) => editorRef.current = editor}
                                initialValue="<p>Enter your blog details here</p>"
                                init={{
                                    margin: "0 auto",
                                    height: 300,
                                    menubar: false,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'table', 'media' , 'code', 'help', 'wordcount', 'image', 'save'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | image ' + 'media' + '| table |',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    name: 'tiny-mce',
                                    media_live_embeds: true,
                                    automatic_uploads: true,
                                    images_upload_url: '/postImage',

                                }}
                            />
                        </div>
                        <input type="submit" className='btn  mt-10' value="Submit Your Post" />
                    </form>
                </div>
            </div>
        </div>



    );
}

export default AddPost;