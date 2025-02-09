import { Router } from 'express';
const router = Router();
import {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} from '../../controllers/thoughtController.js';

router.route('/').get(getThoughts).post(createThought)

router.route('/:thoughtId')
    .get(getSingleThought).delete(deleteThought).put(updateThought);


router.route('/:thoughtId/reactions').post(createReaction);

router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);



export { router as thoughtRouter };