document.addEventListener("DOMContentLoaded", function () {
  function showMessage(message) {
    const msgItem = document.getElementById("messages");
    msgItem.innerText = message;
    msgItem.style.display = "block";
  }

  function saveBlog(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const imageUrl = document.getElementById("imageUrl").value;
    if (!title || !content) {
      showMessage("Must provide title and content!");
      return;
    }

    const editBlogId = localStorage.getItem("edit_blog");
    if (editBlogId) {
      const blogs = JSON.parse(localStorage.getItem("blogs"));
      const blogIndex = blogs.findIndex((blog) => blog.id === editBlogId);

      if (blogIndex > -1) {
        blogs[blogIndex].title = title;
        blogs[blogIndex].content = content;
        blogs[blogIndex].imageUrl = imageUrl;
        localStorage.setItem("blogs", JSON.stringify(blogs));
        localStorage.removeItem("edit_blog");
        window.location.href = "/view_blog.html";
      }
    } else {
      const blog = {
        id: Math.random().toString(36),
        title,
        content,
        imageUrl,
      };

      const blogs = JSON.parse(localStorage.getItem("blogs")) || [];
      blogs.push(blog);
      localStorage.setItem("blogs", JSON.stringify(blogs));
      window.location.href = "/view_blog.html";
    }
  }

  function populateEditBlogForm() {
    const blogToEditId = localStorage.getItem("edit_blog");
    const blogs = JSON.parse(localStorage.getItem("blogs"));
    const blogToEdit = blogs.find((b) => b.id === blogToEditId);
    if (blogToEdit) {
      document.getElementById("title").value = blogToEdit.title;
      document.getElementById("content").value = blogToEdit.content;
      document.getElementById("imageUrl").value = blogToEdit.imageUrl;
    }
  }

  document
    .getElementById("createBlogForm")
    .addEventListener("submit", saveBlog);

  document.getElementById("cancelBtn").addEventListener("click", function () {
    localStorage.removeItem("edit_blog");
  });

  window.addEventListener("load", populateEditBlogForm);
});
