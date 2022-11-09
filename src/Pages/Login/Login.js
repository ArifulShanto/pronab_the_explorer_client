import axios from 'axios';
import React , {useContext} from 'react';
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserContext } from '../../App';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const { register, formState: { errors }, handleSubmit, getValues, resetField } = useForm();
    
    const navigate = useNavigate();
    const location = useLocation();

    let from = location.state?.from?.pathname || '/';


    const onSubmit = data => {
        if (data.email && data.password)  {
            const exUser = {
                email: data.email,
                password: data.password
            };
            axios.post(`http://localhost:5000/user/login/${data.email}`, exUser)
                .then(function (response) {
                    if (response.data.success === false) {
                        toast.error('Something went wrong');
                    }
                    else {
                        toast('Successfully Logged In');
                        const user = { ...exUser, name: response.data.name };
                        setLoggedInUser(user);
                        navigate(from, { replace: true });
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        resetField('email');
        resetField('password');
    };
    return (
        <div className='flex h-full justify-center items-center mt-20'>
            <div className="card w-96 bg-base-100">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Log In</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                        <input type="submit" className='btn w-full max-w-xs' value=" Log In" />
                    </form>
                    <p><small>New to Pronab The Explorer ? <Link className='text-primary' to="/signup">Sign Up</Link></small></p>
                </div>
            </div>
        </div>
    );
};

export default Login;