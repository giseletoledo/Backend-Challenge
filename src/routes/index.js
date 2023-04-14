import express from "express";
import tutores from "./tutoresRoutes.js"
import abrigos from "./abrigosRoutes.js"
import pets from "./petsRoutes.js"
import adocoes from "./adocoesRoutes.js"
import login from "./loginRoutes.js"

const routes = (app) => {
  app.route('/').get((req, res) => {
    res.status(200).send({titulo: "Adopet"})
  })

  app.use(
    express.json(),
    tutores,
    abrigos,
    pets,
    adocoes,
    login
  )
}

export default routes