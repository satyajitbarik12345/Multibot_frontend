document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById("map")) {
    // Initialize the Leaflet map on the Home page
    var map = L.map("map").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([51.505, -0.09])
      .addTo(map)
      .bindPopup("<b>Hello!</b><br>This is a marker.")
      .openPopup();
  } else if (document.getElementById("users-container")) {
    // Fetch user details on the Settings page
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((users) => {
        const container = document.getElementById("users-container");
        users.forEach((user) => {
          //   console.log("user", user);
          const card = document.createElement("div");
          card.className = "profile-card";
          card.innerHTML = `
                    <div class="social-icons">
        <a href="#"><i class="bi bi-facebook"></i></a>
        <a href="#"><i class="bi bi-twitter"></i></i></a>
        <a href="#"><i class="bi bi-instagram"></i></i></a>
    </div>
    <div class="profile-image">
        <img src="https://tse2.mm.bing.net/th?id=OIP.Di2QPUcXbo1DLWSu2W_1DAHaHa&pid=Api&P=0&h=220">
    </div>
                        <h2>${user.name}</h2>
                        <p> ${user.username}</p>
                        <p> ${user.email}</p>
                         <p> ${user.phone}</p>
                         <p> ${user.company.name}</p>
                         <div class="geo-details">
                         <p> lat : ${user.address.geo.lat}</p>
                         <p> lng : ${user.address.geo.lng}</p>
                         <div>
                        
                        <button 
                          type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasExample"
                            aria-controls="offcanvasExample" 
                            onclick="showUserDetails(${user.id})">
                                View Details
                        </button>
                    `;
          container.appendChild(card);
        });
      });
  }
});

// Showing user details when "Details" button is clicked
function showUserDetails(userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then((response) => response.json())
    .then((user) => {
      const container = document.getElementById("offcanvasExample");
      container.innerHTML = ""; // cleared the previous user data

      const userDetailsCard = document.createElement("div");
      userDetailsCard.className = "userdetails-card";
      userDetailsCard.innerHTML = `
            <button type="button" class="btn-close position-absolute end-0 me-3" data-bs-dismiss="offcanvas" aria-label="Close"></button>
       <div class="social-icons">
            <a href="#"><i class="bi bi-facebook"></i></a>
            <a href="#"><i class="bi bi-twitter"></i></i></a>
            <a href="#"><i class="bi bi-instagram"></i></i></a>
        </div>
        <div class="profile-image">
             <img src="https://tse2.mm.bing.net/th?id=OIP.Di2QPUcXbo1DLWSu2W_1DAHaHa&pid=Api&P=0&h=220">
        </div>
        <p><strong>Name:</strong> ${user.name}</p>
          <p><strong>Username:</strong> ${user.username}</p>
          <p><strong>Email:</strong> ${user.email}</p>
          <p><strong>Phone:</strong> ${user.phone}</p>
          <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
          
          <h5>Address</h5>
          <p><strong>Street:</strong> ${user.address.street}</p>
          <p><strong>Suite:</strong> ${user.address.suite}</p>
          <p><strong>City:</strong> ${user.address.city}</p>
          <p><strong>Zipcode:</strong> ${user.address.zipcode}</p>
          <p><strong>Geo:</strong> Lat: ${user.address.geo.lat}, Lng: ${user.address.geo.lng}</p>

          <h5>Company</h5>
          <p><strong>Company Name:</strong> ${user.company.name}</p>
          <p><strong>Catchphrase:</strong> "${user.company.catchPhrase}"</p>
          <p><strong>BS:</strong> ${user.company.bs}</p> 
          <a href="posts.html?userId=${user.id}" class="link">
            <button  onclick="showUserPosts(${user.id})">
              Posts
            </button>
          </a>
          <a href="albums.html?userId=${user.id}" class="link">
            <button  onclick="showUserAlbums(${user.id})">
                Albums
            </button>
          </a>
          `;
      container.appendChild(userDetailsCard);
    });
}

//Fetching user posts

function showUserPosts(userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
    .then((response) => response.json())
    .then((posts) => {
      const container = document.getElementById("posts");
      container.innerHTML = ""; // cleared the previous user data

      posts.forEach((post) => {
        console.log("posts", post);

        const postCard = document.createElement("div");
        postCard.className = "post-card";
        postCard.style.border = "1px solid #ddd";
        postCard.style.padding = "15px";
        postCard.style.marginBottom = "10px";

        postCard.innerHTML = `
            <h6>${post.title}</h6>
            <p>${post.body}</p>
          `;

        container.appendChild(postCard);
      });
    })
    .catch((error) => console.error("Error fetching posts:", error));
}

// Fetching user albums

function showUserAlbums(userId) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
    .then((response) => response.json())
    .then((albums) => {
      const container = document.getElementById("albums");
      container.innerHTML = ""; // cleared the previous user data

      albums.forEach((album) => {
        const albumCard = document.createElement("div");
        albumCard.className = "card";
        albumCard.style.border = "1px solid #ddd";
        albumCard.style.padding = "15px";
        albumCard.style.marginBottom = "10px";

        albumCard.innerHTML = `
            <h6>${album.title}</h6>
            
          `;

        container.appendChild(albumCard);
      });
    })
    .catch((error) => console.error("Error fetching posts:", error));
}
