import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUI from 'swagger-ui-express'

const options = {

  definition: {
    info: {
      title: 'Comedy Thread API',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js']
}

const comedyTreadDocs = swaggerJSDoc(options)

export default (app) => {
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(comedyTreadDocs))
}