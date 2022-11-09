import axios from 'axios';
import React, {useContext} from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../App';

const Signup = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    console.log(typeof(!loggedInUser));
    const { register, formState: { errors }, handleSubmit, resetField } = useForm();
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || '/';

    const onSubmit = data => {
        console.log(data.name, data.email, data.password, data.confirm_pass);
        if (data.password !== data.confirm_pass) {
            toast.error('Password not match');
        }
        else if (data.name && data.email && data.password && data.confirm_pass) {
            const newUser = {
                name: data.name,
                email: data.email,
                password: data.password
            }
            axios.post(`http://localhost:5000/user/signup/${data.email}`, newUser)
                .then(function (response) {
                    console.log(response);
                    if (response.data.success === false) {
                        toast.error('Already Have An Account');
                    }
                    else {
                        toast("Successfully Created Your Account");
                        setLoggedInUser(newUser);
                        navigate(from, { replace: true });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });  
        }
        resetField('name');
        resetField('email');
        resetField('password');
        resetField('confirm_pass');
    };
    return (
        <div className='flex h-full justify-center items-center mt-20 '>
            <div className="card w-96 bg-base-100">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                type="name"
                                placeholder="Enter Your Name"
                                className="input input-bordered w-full max-w-xs"
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name is Required"
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                className="input input-bordered w-full max-w-xs"
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email is Required"
                                    },
                                    pattern: {
                                        value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                        message: 'Provide a Valid Email'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password is Required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Confirm Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Re-enter Password"
                                className="input input-bordered w-full max-w-xs"
                                {...register("confirm_pass", {
                                    required: {
                                        value: true,
                                        message: "Password is Required"
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer'
                                    }
                                })}
                            />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        <input type="submit" className='btn w-full max-w-xs' value=" Sign Up" />
                    </form>
                    <p><small>Already have an account ? <Link className='text-primary' to="/login">Log In</Link></small></p>
                    {/* <div className="divider">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline"
                    >Continue with Google</button> */}

                </div>
            </div>
        </div>
    );
};

export default Signup;