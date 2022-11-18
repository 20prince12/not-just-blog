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
                <p>createdBy : ${post.user_data[0].first_name} ${post.user_data[0].last_name}</p>
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

 function submitPost(){
    const post_subject = document.querySelector('#post_subject').value;
    const post_body = document.querySelector('#post_body').value;
    const body =  JSON.stringify({post_body : post_body , post_subject : post_subject});
    try {
        const response = fetch('http://localhost:5000/create_post', {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: body
        });
        populatePosts();
    }
    catch(error) {
        console.log(error);
    }


}

/* Main Call */
window.onload = function() {
    populatePosts();
    document.querySelector('#submit_post').addEventListener("click", submitPost);
};