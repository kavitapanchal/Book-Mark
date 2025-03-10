document.addEventListener("DOMContentLoaded", function() {
  readbook(); 
});

function bookMark(){
  let title = document.getElementById("title").value;
  let url = document.getElementById("url").value;
   if(title === "" || url === ""){
    alert ("please enter both title and url");
    return;
   }

   let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
   bookmarks.push({title, url});
   localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
   readbook();
   document.getElementById("title").value = "";
   document.getElementById("url").value = "";
}

function readbook(){
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  let list = document.getElementById("book-list");
  list.innerHTML = "";
  bookmarks.map((bookmarks, index)=> {
    let li = document.createElement("li");
    li.innerHTML = `
    <a href = "${bookmarks.url}" target="_blank" >${bookmarks.title}</a>
    <button onclick="updateBook(${index})">Edit</button>
    <button onclick = "deleteBook(${index})">Delete</button>
    `;
    list.appendChild(li);
  })
}

function updateBook(index){
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  let newTitle = prompt("Enter New title :", bookmarks[index].title);
  let newUrl = prompt("Enter new url:", bookmarks[index].url);

  if(newTitle && newUrl){
    bookmarks[index] = {title: newTitle, url : newUrl};
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    readbook();
  }
}

function deleteBook(index){
  let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];
  bookmarks.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  readbook();
}