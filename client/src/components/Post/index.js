import './index.css';

const Posts = ({post})=>(
    <li className="Posts">
        subject : {post.subject}
        body : {post.body}
        created by : {post.user_data[0].first_name} {post.user_data[0].last_name}
        created at : {post.createdAt}
    </li>
)

const Blog_post = (props) =>(
    <div className="post">
        <ul>
        {props.posts.map(post => (
            <Posts key={post._id} post={post} />
        ))}
        </ul>
    </div>
);

export default Blog_post;