import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public")); // تصحيح الاسم هنا
app.set('view engine', 'ejs');    // تأكد من تحديد محرك القوالب

const API_URL = "https://api.adviceslip.com/advice";

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    const adviceText = response.data.slip.advice; 
    res.render("index.ejs", { advice: adviceText });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", { 
      advice: "عذراً، تعذر جلب النصيحة الآن. حاول لاحقاً!" 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});