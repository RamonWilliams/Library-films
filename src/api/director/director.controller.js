const Director = require("./director.model");
const { setError } = require("../../helpers/utils/error");
const { deleteFile } = require("../../middleware/delete-file");


const getAllDirectors = async (req, res, next) => {
  try {
    const directors = Director.find().sort({ createAt: 'desc' })
    return res.status(200).json({
      message: 'All Directors',
     directors
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed recover all director'));
  }
}

const getDirectorById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const director = await (await Director.findById(id)).populate("film");
    if (!director) return next(setError(404, error.message | 'Director not found'));
    return res.status(200).json({
      message: 'Director by Id',
      director
    })

  } catch (error) {
    return next(setError(500, error.message | 'Failed director id'));
  }
}

const create = async (req, res, next) => {
  try {
    const director = new Director(req.body);
    // Recogemos el path -> url de cloudinary - cover
    if (req.file) director.cover = req.file.path;
    const directorInDb = await director.save();

    return res.status(201).json({
      message: 'Created new Director',
      directorInDb
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed create director'));
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const director = new Director(req.body);
    director._id = id;
    // Si pasamos un nuevo cover -> se añade sobre su porpiedad
    if (req.file) director.cover = req.file.path;
    const updatedDirector = await Director.findByIdAndUpdate(id, director);
    if (!updatedDirector) return next(setError(404, 'Director not found'));
    return res.status(201).json({
      message: 'Updated Director',
      updatedDirector
    })

  } catch (error) {
    return next(setError(500, error.message | 'Failed updated director'));
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedDirector = await Film.findByIdAndDelete(id);
    if (deletedDirector.cover) deleteFile(deletedDirector.cover);
    if (!deletedDirector) return next(setError(404, 'Director not found'));
    return res.status(200).json({
      message: 'Delete Director',
      deletedDirector
    })
  } catch (error) {
    return next(setError(500, error.message | 'Failed deleted director'));
  }
}

	module.exports = { getAllDirectors, getDirectorById, create, update, remove };