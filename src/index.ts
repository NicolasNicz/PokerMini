import { createApp } from "./createApp";
import bodyParser from "body-parser";
const app = createApp()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, () => console.log("Server is running on port 3000"));