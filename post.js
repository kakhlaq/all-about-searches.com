document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');
    
    if (postId) {
        fetchBlogPost(postId);
    } else {
        document.getElementById('post-content').innerHTML = 
            '<p class="error">Post not found. <a href="/">Return to home page</a></p>';
    }
});

function fetchBlogPost(postId) {
    fetch('posts/posts.json')
        .then(response => response.json())
        .then(posts => {
            const post = posts.find(p => p.id === postId);
            displayBlogPost(post);
        })
        .catch(error => {
            console.error('Error loading blog post:', error);
            document.getElementById('post-content').innerHTML = 
                '<p class="error">Error loading blog post. Please try again later.</p>';
        });
}

function displayBlogPost(post) {
    const postContentContainer = document.getElementById('post-content');
    
    if (!post) {
        postContentContainer.innerHTML = 
            '<p class="error">Post not found. <a href="/">Return to home page</a></p>';
        return;
    }
    
    const html = `
        <article class="post">
            <h2>${post.title}</h2>
            <div class="post-date">${new Date(post.date).toLocaleDateString()}</div>
            <div class="post-content">${post.content}</div>
        </article>
    `;
    
    postContentContainer.innerHTML = html;
    document.title = `${post.title} | My Fast Blog`;
}
