const pool = require("../boot/database/db_connect");
const { queryError, success, badRequest } = require("../constants/statusCodes");
const logger = require("../middleware/winston");

const addMovie = async (req, res) => {
  const { title, release_date, author } = req.body;
  const { type, poster, backdrop_poster, overview } = req.body;

  if (!title || !release_date || !author || !type) {
    return res
      .status(missingParameters)
      .json({ message: "missing parameters" });
  }

  pool.query(
    `INSERT INTO movies(title, release_date, author, type, poster, backdrop_poster, overview, creation_date)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`,
    [
      title,
      release_date,
      author,
      type,
      poster,
      backdrop_poster,
      overview,
      req.body.creation_date,
    ],
    (err, rows) => {
      if (err) {
        logger.error(err.stack);
        res
          .status(queryError)
          .json({ error: "Exception occured while adding new movie" });
      } else {
        logger.info(rows);
        res.status(success).json({ message: "Movie added" });
      }
    }
  );
};

const getMovieById = async (req, res) => {
  const { id } = req.params;

  let movieId = parseInt(id);
  console.log(movieId);
  if (movieId === NaN) {
    return res.status(badRequest).json({ message: "id must be a number" });
  }

  pool.query(
    `SELECT * FROM movies WHERE movie_id = $1`,
    [movieId],
    (err, rows) => {
      if (err) {
        logger.error(err.stack);
        res
          .status(queryError)
          .json({ error: "Exception occured while fetching movie" });
      } else {
        logger.info("ROWS", rows.rows);
        res.status(success).json({ movie: rows.rows });
      }
    }
  );
};

const getMovies = async (req, res) => {
  pool.query(`SELECT * FROM movies GROUP BY movie_id, type;`, (err, rows) => {
    if (err) {
      logger.error(err.stack);
      res
        .status(queryError)
        .json({ error: "Exception occured while fetching movies" });
    } else {
      // group movies by type
      /**
       *
       * {
       *    "Comedy": [
       *        {
       *            movie_id: 1
       *
       *        },
       *        {
       *            movie_id: 2
       *
       *        }
       *    ],
       *
       *    "Horror": [
       *        {
       *            movie_id: 10
       *
       *        },
       *        {
       *            movie_id: 20
       *
       *        }
       *    ]
       * }
       */
    }
  });
};

module.exports = {
  addMovie,
  getMovieById,
};
