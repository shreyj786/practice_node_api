import express from 'express';
import controller from '../controllers/AuthorControllers';
// import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();
// ValidateJoi(Schemas.author.create),
router.post('/create',  controller.createAuthor);
router.get('/get/:authorId', controller.readAuthor);
router.get('/get', controller.readAll);
// ValidateJoi(Schemas.author.update),
router.patch('/update/:authorId', controller.updateAuthor);
router.delete('/delete/:authorId', controller.deleteAuthor);

export = router;