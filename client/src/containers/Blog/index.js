import {useState, useEffect, useContext} from "react";
import Post from "../../components/Post";
import Loader from '../../components/Loader';
import api from '../../utils/api';
import {UserContext} from "../../context/UserContext";
import Header from "../../components/Header";
import Navbar from "../../components/Navbar";

const Blog = () => {

    const [posts, setPosts] = useState([]);
    const {Search} = useContext(UserContext);
    const [isFetching, setIsFetching] = useState(false);

    useEffect(() => {
        document.title = "posts"
        setIsFetching(true);
        api.get(`/get_post?subject=${Search}`).then((response)=>{
            setPosts(response.data.posts);
            setIsFetching(false);
        });
    },[Search])


        return (
        <div className="flex-auto ml-52 flex-col m-2">
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