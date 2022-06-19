import express from 'express';
import controller from '../controllers/BookController';
// import controller from '../controllers/Book';
// import { Schemas, ValidateJoi } from '../middleware/Joi';

const router = express.Router();
// ValidateJoi(Schemas.book.create), 
// ValidateJoi(Schemas.book.update),
router.post('/create',controller.createBook);
router.get('/get/:bookId', controller.readBook);
router.get('/get/', controller.readAll);
router.patch('/update/:bookId',  controller.updateBook);
router.delete('/delete/:bookId', controller.deleteBook);

export = router;