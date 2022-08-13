const Film = require("./film.model");
const { setError } = require("../../helpers/utils/error");
const { deleteFile } = require("../../middleware/delete-file");


const getAllFilms = async (req, res, next) => {
  try {
    const films = Film.find().sort({ createAt: 'desc' })
    return res.status(200).json({
      message: 'All Films',
     films
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed recover all film'));
  }
}

const getFilmById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const film = await (await Film.findById(id)).populate("director ");
    if (!film) return next(setError(404, error.message | 'Film not found'));
    return res.status(200).json({
      message: 'Film by Id',
      film
    })

  } catch (error) {
    return next(setError(500, error.message | 'Failed film id'));
  }
}

const create = async (req, res, next) => {
  try {
    const film = new Film(req.body);
    // Recogemos el path -> url de cloudinary - cover
    if (req.file) film.cover = req.file.path;
    const filmInDb = await film.save();

    return res.status(201).json({
      message: 'Created new Film',
      filmInDb
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed create film '));
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const film = new Film(req.body);
    film._id = id;
    // Si pasamos un nuevo cover -> se añade sobre su porpiedad
    if (req.file) film.cover = req.file.path;
    const updatedFilm = await Film.findByIdAndUpdate(id, film);
    if (!updatedFilm) return next(setError(404, 'Film not found'));
    return res.status(201).json({
      message: 'Updated Film',
      updatedFilm
    })

  } catch (error) {
    return next(setError(500, error.message | 'Failed updated film'));
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedFilm = await Film.findByIdAndDelete(id);
    if (deletedFilm.cover) deleteFile(deletedFilm.cover);
    if (!deletedFilm) return next(setError(404, 'Film not found'));
    return res.status(200).json({
      message: 'Delete Film',
      deletedFilm
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed deleted film'));
  }
}

	module.exports = { getAllFilms, getFilmById, create, update, remove };