let users = {
  _id: "id de coleccion",
  auth: {
    firebaseUID: "id de firebase",
    email: "email de firebase",
  },
  profile: {
    username: "nombre de usuario",
  },
  //primera version
  progressPerMonth: {
    _id: "id de la coleccion progressPerMonth",
    currentDate: "fecha actual",
  },
  //segunda version
  progressPerMonth: {
    records: [
      {
        _id: "id del documento dentro de la coleccion",
        year: "año",
        month: "mes",
        totalTime: "tiempo total del mes",
        progressTime: "tiempo total de progreso",
      },
    ],
    meta: {
      currentDate: "mes actual", // 'mes-año' 2024-12 12-2024
    }, //aqui voy a poner si fue actualizado o que "algo cambio" y que queda pendiente cambiar el numero "total"
  },
  fitness: {
    private: {
      fit_1: {
        _id: "id del documento de la coleccion",
        title: "titulo",
      },
    },
    public: {
      fit_1: {
        _id: "id del documento de la coleccion",
        title: "titulo",
      },
    },
  },
  // activities en vez de leisure
  leisure: {
    list: [
      {
        _id: "id de la actividad",
        title: "titulo de la actividad",
        createdAt: "fecha de creacion",
      },
      {
        _id: "id de la actividad",
        title: "titulo de la actividad",
        createdAt: "fecha de creacion",
      },
    ],
    meta: {
      total: 2,
      updatedAt: "ISODate",
    },
  },
  active: {
    leisure: {
      activities: {
        activity_1: {
          _id: "id de actividad",
          title: "titulo de la actividad",
          createdAt: "fecha de creacion",
        },
      },
    },
  },
  meta: {
    lastLogin: "ISOData",
    createdAt: "ISODate",
    updatedAt: "ISODate",
  },
};

let progressPerMonth = {
  _id: "id de la coleccion",
  userId: "id de usuario",
  year: "año",
  month: "mes",
  progressTracking: [
    {
      _id: "id de actividad",
      title: "titulo de actividad",
      timeLapses: [
        {
          type: "focus",
          start: "fecha de inicio",
          end: "fecha de fin",
          total: end - start,
        },
        {
          type: "breack",
          start: "fecha de inicio",
          end: null,
          total: null,
          //end: "fecha de fin",
          //total: end - start,
        },
      ],
      meta: {
        // si el timeLapses fue modificado.
        manualAdjustment: false, //modificacion manual
        adjustmentAt: "fecha de la ultima modificacion manual",
        //lastModified: 'ultim'
        // en un futuro se puede determinar los diferentes usuarios.
      },
    },
  ],
  meta: {
    totalTime: "tiempo total del mes",
    progressTime: "tiempo total de progreso",
  },
};

/* 
idToken

uid: 'id de firebase',
mongodb: {
  nombre de usuario,
  id de usuario,
  id de mes actual,
  mes actual(mes-año),
}
///////
uid:
username:
userId: 
progressId: 
month: 20
year: 2024
*/
