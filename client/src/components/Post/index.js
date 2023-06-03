import './index.css';

const Blog_post = (props) => {

    const liked = true;
    const pinned = true;

    const svg = {
        'tag' : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path fillRule="evenodd" d="M5.25 2.25a3 3 0 00-3 3v4.318a3 3 0 00.879 2.121l9.58 9.581c.92.92 2.39 1.186 3.548.428a18.849 18.849 0 005.441-5.44c.758-1.16.492-2.629-.428-3.548l-9.58-9.581a3 3 0 00-2.122-.879H5.25zM6.375 7.5a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" clipRule="evenodd" />
        </svg>
        ,'like' : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
            <path d="M7.493 18.75c-.425 0-.82-.236-.975-.632A7.48 7.48 0 016 15.375c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23h-.777zM2.331 10.977a11.969 11.969 0 00-.831 4.398 12 12 0 00.52 3.507c.26.85 1.084 1.368 1.973 1.368H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 01-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227z" />
        </svg>
    }

    const Posts = ({post})=>(
            <div className="p-2 flex-col hover:bg-gray-100 dark:hover:bg-gray-800 hover:border-cyan-600 dark:hover:border-cyan-200  w-full my-0.5 py-1  shadow-sm text-black bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 dark:text-white">
                <div className="pb-1 flex mt-1 hover:contrast-150 justify-start hover:cursor-pointer dark:hover:text-cyan-200  hover:text-cyan-600">
                    <img className="contrast-100  border dark:border-gray-200 border-gray-700 w-8 h-8 rounded-3xl" src="https://www.kindpng.com/picc/b/155-1551570_yasuo-png.png" alt="Profile_Pic" />
                    <h1 className="ml-2 self-center font-mono text-sm w-full">{post.user_data[0].first_name}</h1>
                    <h1 className="ml-2 self-center font-mono text-sm w-32">{post.createdAt.slice(0,10)}</h1>
                </div>
                 <h1 className="m-2 font-serif hover:cursor-pointer dark:hover:text-cyan-200  hover:text-cyan-600">{post.subject}</h1>
                <div className='flex justify-start mt-4 mb-1'>
                  <div className={liked?"inline-block hover:text-pink-200 text-pink-500 rounded-xl ":"hover:text-pink-500 text-pink-200 rounded-xl"}> {svg.like} </div>
                  <div className={pinned?"ml-auto inline-block  hover:text-orange-200 text-orange-500 rounded-xl ":"hover:text-orange-500 text-orange-200 rounded-xl"}> {svg.tag} </div>
                </div>
            </div>
    )

    return (
            <div>
                {props.posts.map(post => (

                    <Posts key={post._id} post={post}/>
                ))}
            </div>
    )
};

export default Blog_post;