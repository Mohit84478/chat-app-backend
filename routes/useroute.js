import express from "express";
import { login, logout, otheruse, register } from "../controller/usercontrol.js";
import isauth from "../middleware/isauth.js";
  const router= express.Router()
  router.route("/register").post(register)
  router.route("/login").post(login)
  router.route("/logout").get(logout)
  router.route("/").get( isauth,otheruse)
  
  export default router