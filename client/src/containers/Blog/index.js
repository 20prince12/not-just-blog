import {Component} from "react";
import Post from "../../components/Post";
import Loader from '../../components/Loader'
import Header from '../../components/Header'


class Blog extends Component {
    state = {
        posts: [],
        postSearch: '',
        isFetching: false,

    }


    componentDidMount() {
        document.title = "posts"
        this.setState(({isFetching: true}))
        fetch(`http://localhost:5000/get_post`)
            .then((response)=>response.json())
            .then((data)=>this.setState( { posts : data.posts , isFetching: false}));
    }

    onSearch =(event)=>{
        this.setState(({postSearch: event.target.value , isFetching: true}))
        fetch(`http://localhost:5000/get_post?subject=${event.target.value}`)
        .then((response)=>response.json())
        .then((data)=>this.setState( { posts : data.posts , isFetching: false}));

    }

    render() {
        const {posts, postSearch, isFetching} = this.state;
        return (
        <div>
            <Header/>
            Search : <input value={postSearch} type="text" onChange={this.onSearch} />
            {
                !isFetching && posts.length===0
                &&
                <p>No posts have been found with this title</p>
            }
            {
                isFetching && <Loader />
            }
            {
                !isFetching && <Post posts={this.state.posts}/>
            }
        </div>
        )
    }
}

export default Blog