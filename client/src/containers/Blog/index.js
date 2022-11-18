import {Component} from "react";
import Post from "../../components/Post";


class Blog extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
 }

    onSearch =(event)=>{        fetch(`http://localhost:5000/get_post?subject=${event.target.value}`)
        .then((response)=>response.json())
        .then((data)=>this.setState( { posts : data.posts }));

    }

    render() {
        return (
        <div>
            Subject : <input type="text" onChange={this.onSearch} />
            <Post posts = {this.state.posts} />
        </div>
        )
    }
}

export default Blog