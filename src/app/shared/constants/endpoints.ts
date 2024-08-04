export const Endpoints = {
  generatorQuestions: '/interviews/generator-questions',
  interviews:"/interviews",
  login:"/auth/login",
  questions:"/questions",
  generateCode: '/questions/code',
  validateCode: '/questions/validateCode',
  resultInterview:'/interviews/qualifier',
  reportInterview: '/questions/resultInterviews',
  dowloadPdf: '/questions/reportInterview',
  users:'/users'
}

export const questions_dummy = [
  {
    'content':'  "¡Hola! Estoy aquí para hacer una breve entrevista sobre tu experiencia y habilidades como Desarrollador Angular. A continuación, te haré cinco preguntas relacionadas con la descripción y los requisitos de la vacante. Por favor, responde lo mejor que puedas. Vamos a empezar.\n\nPregunta 1: ¿Cuál es tu experiencia previa en el desarrollo de aplicaciones web utilizando Angular?"',
    'role': 'Bot'
  }
]
