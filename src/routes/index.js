import express from "express";
import tutores from "./tutoresRoutes.js"
import abrigos from "./abrigosRoutes.js"

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Adopet"})
  })

  app.use(
    express.json(),
    tutores,
    abrigos
  )
}

export default routes