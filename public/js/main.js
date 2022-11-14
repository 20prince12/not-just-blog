function toggle_input(event,id) {
    btn = document.getElementById(id);
    event.preventDefault();
    if(btn.disabled == false) btn.disabled = true
    else btn.disabled = false;
}


async function populatePosts(){
    try {
        const response = await fetch('http://localhost:5000/get_post', {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            },
        });
        const posts = await response.json();
        const html = await posts.posts.map(post =>{
            return `
            <div class="post">
                <p>body : ${post.body}</p>
                <p>subject : ${post.subject}</p>
                <p>createdBy : ${post.first_name} ${post.last_name}</p>
                <p>createdAt : ${post.createdAt}</p>
            `;
        })
            .join("<hr>");
        document.querySelector('.posts_container').innerHTML = html;

    }
    catch(error) {
        console.log(error);
        }
}


/* Main Call */
window.onload = function() {
    populatePosts();
};