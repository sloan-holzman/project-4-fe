let backend

// points to a different backend URL, depending on the environment
if (process.env.NODE_ENV === "production") {
  backend = "https://virtual-wallet.herokuapp.com/";
} else {
  backend = "http://localhost:1337/";
}

export default backend;
