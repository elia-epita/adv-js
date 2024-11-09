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
       * iteration 1:
       *
       * ACC value: {}
       * Type value: Top Rated
       * --> if key does not exist add key 'Top Rated' to ACC
       * --> push movie to ACC['Top Rated']

       * ACC value: {
       * "Top Rated": [{movie1}]
       * }

       * iteration 2:
       * ACC value: {
       * "Top Rated": [{movie1}]
       * }
       * Type value: Romance
       * --> if key does not exist add key 'Romance' to ACC
       * --> push movie to ACC['Romance']

       * ACC value: {
       * "Top Rated": [{movie1}],
       * "Romance": [{movie2}]
       * }
       *
       */
      const groupedMovies = rows.rows.reduce((acc, movie) => {
        console.log("ACC :: ", acc);
        const { type } = movie;
        if (!acc[type]) {
          console.log("TYPE :: ", type);
          acc[type] = [];
        }
        acc[type].push(movie);
        return acc;
      }, {});
      res.status(success).json({ movies: groupedMovies });
    }
  });
};

module.exports = {
  addMovie,
  getMovieById,
  getMovies,
};
