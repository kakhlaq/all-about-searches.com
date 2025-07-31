document.addEventListener('DOMContentLoaded', function() {
    fetchBlogPosts();
});

function fetchBlogPosts() {
    fetch('posts/posts.json')
        .then(response => response.json())
        .then(posts => displayBlogPosts(posts))
        .catch(error => {
            console.error('Error loading blog posts:', error);
            document.getElementById('blog-posts').innerHTML = 
                '<p class="error">Error loading blog posts. Please try again later.</p>';
        });
}

function displayBlogPosts(posts) {
    const blogPostsContainer = document.getElementById('blog-posts');
    
    if (!posts || posts.length === 0) {
        blogPostsContainer.innerHTML = '<p>No blog posts found.</p>';
        return;
    }
    
    let html = '';
    posts.forEach(post => {
        html += `
            <article class="post">
                <h2>${post.title}</h2>
                <div class="post-date">${new Date(post.date).toLocaleDateString()}</div>
                <p class="post-excerpt">${post.excerpt}</p>
                <a href="post.html?id=${post.id}" class="read-more">Read More</a>
            </article>
        `;
    });
    
    blogPostsContainer.innerHTML = html;
}
