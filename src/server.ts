import app from "./app";
import "./config/config";

function index() {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server listining on port: ${process.env.PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

index();
