//users
let main_occupations = [
  "sleep_schedule",
  "unknown",
  "fitness",
  "projects",
  "jobs",
  "studies",
  "leisure",
  "reading",
];

let users = {
  _id: "id de coleccion users", //id users mongo
  auth: {
    firebaseUID: "id de firebase",
    email: "email de firebase",
  },
  profile: {
    username: "nombre de usuario (unico)",
  },
  meta: {
    createAt: "ISODate",
    lastLogin: "ISODate",
  },
  //progressPerMonthId: "id de ppm", // id de coleccion progress-per-month
  //fitnessId: "id de fitness", //id de coleccion
  //projectsId: "id de projects", //id de coleccion
  progressPerMonth: {
    progressPerMonthId: "id de ppm",
    meta: {
      //ultima actualizacion, y mas informacion adicional para progressPermonthId
    },
  },
  fitness: {
    fitnessId: "id de fitness",
    //tambien se agregan las "IDs' de otros usuarios en el caso de que este mismo usuario haya sido "invitado"
  },
  projects: {
    projectsId: "id de fitness",
    //tambien se agregan las "IDs' de otros usuarios en el caso de que este mismo usuario haya sido "invitado"
  },
  finances: {
    financesId: "id de fitness",
    //tambien se agregan las "IDs' de otros usuarios en el caso de que este mismo usuario haya sido "invitado"
  },
  //notification
  notification: [
    {
      type: "tipo de notificacion",
    },
  ],
  //friends
  friends: [
    {
      username: "nombre de usuario",
      _id: "id de usuario",
      create_at: "creado el...",
    },
  ],
  //calendario
  calendar: {
    //memento mori
    mementoMori: {
      date: "fecha de nacimiento",
      create_at: "creado el...",
    },
    studies: {
      major1: {
        //dias de cursada
        //dias importantes(fechas de parciales)
      },
    },
    //dias a recordar(random)
    datesReminders: {},
    //calendario para marcar dias consecutivos.
    goalTrackers: {
      //los meses son por numero y almacenan numeros en vez de dias
      cal1: {
        nm: "nombre",
        cA: "creado el...",
        1: [1, 2, 3, 4], //o
        1: ["1t", "2t", "3f"], //t significa que cumplio, f significa que fallo
      },
    },
  },
  //sleep schedule
  //sleep_schedule: "total de horas dormidas",

  //unknown activities
  unknownActivities: "total de horas en unknow",
  //jobs
  jobs: {
    job_1: {
      name: "nombre del trabajo",
      create_at: "creado el...",
      total: "total de horas en el trabajo",
    },
    job_2: {},
  },
  //studies
  studies: {
    //carreras majors
    major1: {
      name: "nombre de la carrera",
      create_at: "creado el...",
      //materias de la carrera
      courses: {
        course_1: {
          name: "nombre de la materia",
          create_at: "creado el...",
          //TEST
          notes: [
            {
              title: "nombre de la prueba",
              body: "nota de la prueba",
            },
          ],
          finish_at: "dia en el que termino",
        },
        course_2: {},
      },
    },
    major2: {},
  },
  //leisure
  leisure: {
    leisure_1: {
      name: "nombre de tiempo en ocio",
      create_at: "creado el...",
      //talvez..
      total_time: "tiempo total dedicado",
    },
    leisure_2: {},
  },
  //reading
  reading: {
    total_books: "total de libros",
    total_time: "total de tiempo leyendo libros",
    total_pages: "total de paginas leidas",
    books: {
      //books
      book_1: {
        title: "nombre de libro",
        create_at: "fecha creado",
        total_time: "tiempo total en que se leyo el libro",
        pages: "total de paginas leidas",
        finish: false,
      },
      book_2: {},
    },
  },
  // week (rutina semanal estructurada)
  weekly_routine: {
    _1: {
      sleep_schedule: {
        lapse_1: "start-end",
        lapse_2: "start-end",
      },
    },
    _2: {},
    _3: {},
    _4: {},
    _5: {},
    _6: {},
    _7: {},
    _12: {},
    _23: {},
    _34: {},
    _45: {},
    _56: {},
    _71: {},
  },
};
//agenda fija, rutina semanal estructurada, calendario regular
/* 
    0: domingo
    1: lunes
    2: martes
    3: miercoles
    4: jueves
    5: viernes
    6: sabado
  */
let progressPerMonth = {
  _id: "id de ppm",
  _users: "id de users",
  // tracking-time
  traking_time: [
    {
      main_occupations: "main-ocupations",
      name: "nombre de la ocupacion",
      time_start: "tiempo de inicio",
      time_end: "tiempo de finalizacion",
      // time-lapse
      time_lapses: [
        {
          //typ: "breack", // or 'focus'
          type: false, // false = breack, true = focus
          focus: true, // focus = true (concentrado), focus = false (descanzando)
          time_start: "tiempo de inicio",
          tiem_end: "tiempo de finalizacion",
          total_time: end - str,
        },
      ],
      total_time: end - str,
    },
  ],
};
//fitness
let fitness = {};
//projects
let projects = {};
