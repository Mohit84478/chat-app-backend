import express from 'express'
import { getMessage, sendmsg } from '../controller/messagecontrol.js'
import isauth from '../middleware/isauth.js';

const router = express.Router()

router.route("/send/:id").post( isauth,sendmsg)
router.route("/:id").get(isauth, getMessage);
export default router;