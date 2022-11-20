import {useState,useEffect } from "react";
import Post from "../../components/Post";
import Loader from '../../components/Loader'


const Blog = () => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        document.title = "posts"
        setIsFetching(true);
        fetch(`http://localhost:5000/get_post?subject=${search}`)
            .then((response)=>response.json())
            .then((data)=>{setPosts(data.posts); setIsFetching(false);});
    },[search])

    const onSearch =(event)=>{
        setSearch(event.target.value);
    }

        return (
        <div>
            Search : <input type="text" onChange={onSearch} />
            {
                !isFetching && posts.length===0
                &&
                <p>No posts have been found with this title</p>
            }
            {
                isFetching && <Loader />
            }
            {
                !isFetching && <Post posts={posts}/>
            }
        </div>
        )
}

export default Blog