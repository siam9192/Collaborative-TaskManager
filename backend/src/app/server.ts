import app from "./app";



async function main() {
  try {
    app.listen(5000, async () => {
    console.log("Server in running on port",5000)
    });
  } catch (error) {
    console.log(error);
  }
}

main();
