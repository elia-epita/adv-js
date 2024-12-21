const router = require("express").Router();
const multer = require("multer");

let storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const movieController = require("../controllers/movie.controller");

router.post("/add", movieController.addMovie);
router.get("/", movieController.getMovies);
router.get("/:id", movieController.getMovieById);
router.put("/:id");
router.post("/image/add");

// Upload a single movie image
router.post("/upload/:id", upload.single("file"), movieController.uploadImage);

module.exports = router;
