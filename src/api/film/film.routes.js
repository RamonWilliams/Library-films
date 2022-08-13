const FilmRoutes = require("express").Router();
const { authorize } = require("../../middleware/auth");
const { getAllFilms, getFilmById, create, update, remove } = require("./film.controller");
const upload = require("../../middleware/file");
const rateLimit = require("express-rate-limit");

/*const filmCreateRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1min
  max: 2,
  standardHeaders: true,
  legacyHeaders: false,
});*/

FilmRoutes.get('/', [authorize], getAllFilms);
FilmRoutes.get('/:id', [authorize], getFilmById);
FilmRoutes.post('/create', [authorize], upload.single("cover"), create);
FilmRoutes.patch('/:id', [authorize], upload.single("cover"), update);
FilmRoutes.delete('/:id', [authorize], remove);


module.exports = FilmRoutes;