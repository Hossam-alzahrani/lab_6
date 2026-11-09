let likes = 100;
let dislikes = 20;
let comments = [];

function setCookie(name, value) {
  document.cookie = name + "=" + encodeURIComponent(value) + "; max-age=604800; path=/";
}

function getCookie(name) {
  let cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    let parts = cookies[i].split("=");
    if (parts[0] === name) {
      return decodeURIComponent(parts[1]);
    }
  }
  return "";
}

function deleteCookie(name) {
  document.cookie = name + "=; max-age=0; path=/";
}

function updateUI() {
  document.getElementById("likeCount").textContent = likes;
  document.getElementById("dislikeCount").textContent = dislikes;
}

if (getCookie("likes") !== "") likes = Number(getCookie("likes"));
if (getCookie("dislikes") !== "") dislikes = Number(getCookie("dislikes"));
if (getCookie("comments") !== "") comments = getCookie("comments").split("|");
updateUI();

function handleVote(choice) {
  if (choice === "like") likes++;
  else dislikes++;
  setCookie("likes", likes);
  setCookie("dislikes", dislikes);
  updateUI();
}

document.getElementById("likeBtn").addEventListener("click", function () { handleVote("like"); });
document.getElementById("dislikeBtn").addEventListener("click", function () { handleVote("dislike"); });

document.getElementById("submitBtn").addEventListener("click", function () {
  let input = document.getElementById("commentInput");
  let text = input.value.trim();

  if (text === "") {
    alert("Please write a comment first.");
    return;
  }

  comments.push(text);
  setCookie("comments", comments.join("|"));
  input.value = "";
  document.getElementById("message").textContent = "Comment submitted!";
});

document.getElementById("resetBtn").addEventListener("click", function () {
  deleteCookie("likes");
  deleteCookie("dislikes");
  deleteCookie("comments");
  likes = 100;
  dislikes = 20;
  comments = [];
  updateUI();
  document.getElementById("message").textContent = "Your votes and comments have been cleared.";
});