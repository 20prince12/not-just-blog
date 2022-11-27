import {useState,useEffect } from "react";
import Post from "../../components/Post";
import Loader from '../../components/Loader';
import api from '../../utils/api';
import SearchBox from "../../components/SearchBox";

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

    const onSearch =(value)=>{
        setSearch(value);
    }

        return (
        <div>
            <SearchBox onSearch = {onSearch} />
            {
                !isFetching && posts.length===0
                &&
                <p className="dark:text-white text-gray-800">No posts have been found with this title</p>
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