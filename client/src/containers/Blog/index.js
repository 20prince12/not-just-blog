import {useState,useEffect } from "react";
import Post from "../../components/Post";
import Loader from '../../components/Loader';
import api from '../../utils/api';

const Blog = () => {

    const [posts, setPosts] = useState([]);
    const [search, setSearch] = useState('');
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        document.title = "posts"
        setIsFetching(true);
        api.get(`/get_post?subject=${search}`).then((response)=>{
            setPosts(response.data.posts);
            setIsFetching(false);
        });
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