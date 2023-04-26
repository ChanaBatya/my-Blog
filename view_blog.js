document.addEventListener("DOMContentLoaded", function () {
  function writeError(message) {
    const msgItem = document.getElementById("messages");
    msgItem.innerText = "An error occurred.";
    msgItem.style.display = "block";
  }
  function deleteBlog(id) {
    var blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    const index = blogs.findIndex((blog) => blog.id === id);

    if (index !== -1) {
      blogs.splice(index, 1);
      localStorage.setItem("blogs", JSON.stringify(blogs));
    }
  }

  function editBlog(blog) {
    if (!blog) {
      writeError("Must select blog item");
      return;
    }
    localStorage.setItem("edit_blog", blog.id);
    window.location.href = "/create_blog.html";
  }

  function generateBlogListItem(blog) {
    const li = document.createElement("li");
    li.className = "blog-list-item";

    const img = document.createElement("img");
    img.src = blog.imageUrl;
    img.alt = blog.title;

    const h2 = document.createElement("h2");
    h2.textContent = blog.title;

    const p = document.createElement("p");
    p.textContent = blog.content;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      deleteBlog(blog.id);
      li.remove();
    });

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", function () {
      editBlog(blog);
    });

    li.appendChild(img);
    li.appendChild(h2);
    li.appendChild(p);
    li.appendChild(deleteBtn);
    li.appendChild(editBtn);

    return li;
  }

  function loadBlogs() {
    var blogs = JSON.parse(localStorage.getItem("blogs")) || [];
    var blogList = document.getElementById("blogList");
    blogList.innerHTML = "";

    for (var i = 0; i < blogs.length; i++) {
      var blog = blogs[i];
      var li = generateBlogListItem(blog);
      blogList.appendChild(li);
    }
  }

  window.onload = loadBlogs;
});
