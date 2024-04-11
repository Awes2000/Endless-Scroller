const body = document.querySelector("body");
const darkLight = document.querySelector("#darkLight");
const sidebar = document.querySelector(".sidebar");
const submenuItems = document.querySelectorAll(".submenu_item");
const sidebarOpen = document.querySelector("#sidebarOpen");
const sidebarClose = document.querySelector(".collapse_sidebar");
const sidebarExpand = document.querySelector(".expand_sidebar");
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"));

sidebarClose.addEventListener("click", () => {
  sidebar.classList.add("close", "hoverable");
});
sidebarExpand.addEventListener("click", () => {
  sidebar.classList.remove("close", "hoverable");
});

sidebar.addEventListener("mouseenter", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.remove("close");
  }
});
sidebar.addEventListener("mouseleave", () => {
  if (sidebar.classList.contains("hoverable")) {
    sidebar.classList.add("close");
  }
});

darkLight.addEventListener("click", () => {
  body.classList.toggle("dark");
  if (body.classList.contains("dark")) {
    document.setI;
    darkLight.classList.replace("bx-sun", "bx-moon");
  } else {
    darkLight.classList.replace("bx-moon", "bx-sun");
  }
});

submenuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    item.classList.toggle("show_submenu");
    submenuItems.forEach((item2, index2) => {
      if (index !== index2) {
        item2.classList.remove("show_submenu");
      }
    });
  });
});

if (window.innerWidth < 768) {
  sidebar.classList.add("close");
} else {
  sidebar.classList.remove("close");
}

// Function to fetch mock data from data.json
async function fetchMockData() {
  try {
    const response = await fetch("js/data.json");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching mock data:", error);
    return [];
  }
}
function createPostElement(post) {
  const postElement = document.createElement("article");
  postElement.classList.add("post");

  // Create elements for post content
  const userInfoElement = document.createElement("div");
  userInfoElement.classList.add("user-info");

  const avatarElement = document.createElement("p");
  avatarElement.innerText = post.avatar;
  avatarElement.classList.add("avatar");

  const usernameElement = document.createElement("span");
  usernameElement.textContent = post.username;

  const imageElement = document.createElement("img");
  imageElement.src = post.image;
  imageElement.alt = "Post Image";

  const captionElement = document.createElement("p");
  captionElement.textContent = post.caption;

  // Append elements to postElement
  userInfoElement.appendChild(avatarElement);
  userInfoElement.appendChild(usernameElement);
  postElement.appendChild(userInfoElement);
  postElement.appendChild(imageElement);
  postElement.appendChild(captionElement);

  return postElement;
}

// Function to display posts in the postSection
async function displayPosts() {
  const postSection = document.getElementById("postSection");
  const mockData = await fetchMockData();

  for (let i = 0; i < 5; i++) {
    let post = mockData[i];
    const postElement = createPostElement(post);
    postSection.appendChild(postElement);
  }
  observeBottom();
}

// Function to observe when user scrolls to the bottom of the page
function observeBottom() {
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        console.log("test");
        displayPosts();
      }
    },
    { threshold: 1.0 }
  );

  // Target the last post element
  const posts = document.getElementsByClassName("post");
  const lastPost = posts[posts.length - 1];
  if (lastPost) {
    observer.observe(lastPost);
  }
}

// Function to load more data
async function loadMoreData() {
  try {
    // Fetch more data from the server
    const response = await fetch("data.json");
    const newData = await response.json();

    // Append new posts to the existing ones
    newData.forEach((post) => {
      const postElement = createPostElement(post);
      postSection.appendChild(postElement);
    });
  } catch (error) {
    console.error("Error loading more data:", error);
  }
}

// Call the function to observe when the user scrolls to the bottom

displayPosts();
