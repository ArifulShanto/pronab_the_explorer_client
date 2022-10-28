import React, { useRef, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import parse from 'html-react-parser';
import './AddPost.css';
import axios from 'axios';
import { toast } from 'react-toastify';




export default function App() {
    const [content , setContent] = useState('')
    const [name, setName] = useState('');
    const editorRef = useRef(null);

    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (editorRef.current) {
            const content = editorRef.current.getContent();
            if (content === "") {
                e.preventDefault();
                toast.error('Something Went Wrong');
            }
            else {
                const currentPost = {
                    postName: name,
                    content: content
                }
                axios.post('http://localhost:5000/addPost', currentPost)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
                setContent(content)
            }
            
        }
        
    };
    return (
        <div className='flex h-screen justify-center items-center'>
            <div className="card w-4/5 bg-base-100">
                <h2 className='text-center font-black text-2xl text-secondary'>Add Your Own Blog</h2>
                <div className="card-body">
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <label htmlFor="">Enter your post name</label>
                        <div className="form-control w-full max-w-xs mb-10">
                            <input onChange={(event) => {
                                setName(event.target.value);
                            }} required type="text" placeholder="Enter your post name" className="input input-bordered w-full max-w-xs " />
                        </div>
                        <label className='text-center m-auto' htmlFor="">Enter your post content here</label>
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
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount', 'image', 'save'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | image' + '| table |',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                                    automatic_uploads: true,
                                    images_upload_url: '/postImage',

                                }}
                            />
                        </div>
                        <input type="submit" className='btn  mt-10' value="Submit Your Post" />
                    </form>
                    <div>
                        {parse(content)}
                    </div>
                </div>
            </div>
        </div>



    );
}