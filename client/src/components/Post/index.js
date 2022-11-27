import './index.css';
import {UserContext} from "../../context/UserContext";
import {useContext} from "react";

const svg = {
    'eye_light' : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
    ,'eye_dark' : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
        <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clipRule="evenodd" />
    </svg>
    ,'user_light' : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
    ,'user_dark' : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
}



const Blog_post = (props) => {

    const {theme} = useContext(UserContext);

    const Posts = ({post})=>(
        <div className="bg-gray-100 dark:bg-gray-900 rounded-xl  drop-shadow-lg max-w-xs md:max-w-none overflow-hidden">
            <img className="h-56 lg:h-60 w-full object-cover rounded-lg shadow-sm"
                 src="https://flowbite.com/docs/images/examples/image-1@2x.jpg"
                 alt=""/>
            <div className="p-3">
                <span className="dark:text-gray-300 text-sm text-gray-700"><p className="text-left text-xs">created on {post.createdAt}</p></span>
                <h3 className="font-semibold text-xl leading-6 text-black dark:text-gray-50 my-2">
                    {post.subject}
                </h3>
                <p className="paragraph-normal text-gray-600  text-gray-900 dark:text-gray-200 ">
                    {post.body}
                </p>
                <div className="flow-root">
                    <div  className="float-left cursor-pointer flex text-xs hover:text-cyan-700 dark:hover:text-cyan-200 dark:text-white">{post.user_data[0].first_name} {post.user_data[0].last_name} {svg[`user_${theme}`]}  </div>
                    <div  className="float-right cursor-pointer text-xs hover:text-cyan-700 dark:hover:text-cyan-200 dark:text-white"> {svg[`eye_${theme}`]} </div>
                </div>
            </div>
        </div>
    )

    return (
        <section className="h-screen from-pink-50 to-indigo-100 px-2">
            <div className="grid justify-center md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-7 my-10">
                {props.posts.map(post => (
                    <Posts key={post._id} post={post}/>
                ))}
            </div>
        </section>
    )
};

export default Blog_post;