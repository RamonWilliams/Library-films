const DirectorRoutes = require("express").Router();
const { authorize } = require("../../middleware/auth");
const { getAllDirectors, getDirectorById, create, update, remove } = require("./director.controller");
const upload = require("../../middleware/file");

DirectorRoutes.get('/', [authorize], getAllDirectors);
DirectorRoutes.get('/:id', [authorize], getDirectorById);
DirectorRoutes.post('/create', [authorize], upload.single("image"), create);
DirectorRoutes.patch('/:id', [authorize], upload.single("image"), update);
DirectorRoutes.delete('/:id', [authorize], remove);


module.exports =DirectorRoutes;