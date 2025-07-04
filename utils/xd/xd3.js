// un documento por usuario.
let users = {
  _id: "id de coleccion de usuario",
  user_data: {
    firebase_auth: {
      firebase_id: "id firebase",
      email: "email de usuario",
    },
    profile: {
      username: "nombre de usuario",
      email: "email de usuario",
    },
  },
  notifications: {
    // Notificaciones de usuario.
  },
  coleccions: {
    monthly_activity_tracking,
    activities,
    yearly_activity_tracking,
  },
  groups: {
    simple: {
      // Solo un grupo, no tiene configuraciones.
    },
    structured: [
      {
        title: "nombre del grupo",
        activities: [
          // Id de actividades
        ],
      },
    ],
  },
  is_active: {
    // Actividades, grupos, fechas y todo lo que este "activo".
  },
  meta: {
    created_at: "fecha de creacion",
    updated_at: "fecha de actualizacion",
  },
};

// varios documentos por usuario.
let monthly_activity_tracking = {
  _id: "id de coleccion",
  user_id: "..",
  activities_tracking: [
    {
      _id: "id de actividad",
      title: "titulo de actividad",
    },
  ],
  // TODO: registrar:
  // tiempo total de concentracion por cada dia
  // tiempo total de descando por dia
  // tiempo total de conc. por mes
  // tiempo total de desc. por mes
  day_tracking: [
    {
      day, // dia del mes, Number
      activity_tracking: [
        {
          // intento representar una actividad desconocida "unknown"
          activity, // podria ser 'false'(maqueta)
          time_start, //momento en que empieza
          time_end, //momento en que termina
        },
        {
          title, //nombre de la actividad
          time_tracking: [
            {
              focus, //valor booleano, si es true esta concentrado si es false estadescasando.
              time_start,
              time_end,
            },
          ],
          time_start, //momento en que empieza
          time_end, //momento en que termina
          total_time,
        },
      ],
      time_start,
      time_end,
      total_time,
      time: {
        start,
        end,
        total,
      },
    },
  ],

  meta: {
    created_at: "fecha de creacion",
    updated_at: "fecha de actualizacion",
  },
};

// varios documentos por usuario.
let activities = {
  _id: "id de actividad",
  user_id: "id de usuario",
  title: "nombre de la actividad",
  weekly_schedules: {
    deadline: null,
    week: [
      {
        start_day: 1,
        start_time: 345,
        end_day: 1,
        end_time: 523,
      },
    ],
  },
  meta: {
    is_active: "booleano",
    created_at: "fecha de creacion",
    updated_at: "fecha de actualizacion",
  },
};

// Resumen de meses en cada año.
let yearly_activity_tracking = {
  _id: "id de documento",
  user_id: "id de usuario",
  year_tracking: [
    {
      year: 2025,
      month_tracking: [
        {
          month: 1, //enero
          focus: "tiempo total de concentracion",
          break: "tiempo total de descanso",
          unknown: "tiempo total desconocido",
          total: "tiempo total de mes",
        },
      ],
    },
  ],
};
// Otra opcion, donde son varios documentos. Me convence.
yearly_activity_tracking = {
  _id: "id de documento",
  user_id: "id de usuario",
  month_tracking: [
    {
      month: 1, //enero
      focus: "tiempo total de concentracion",
      break: "tiempo total de descanso",
      unknown: "tiempo total desconocido",
      total: "tiempo total de mes",
    },
  ],
  meta: {
    year: 2025, // o created_at determina el año.
    created_at: "fecha de creacion",
    updated_at: "fecha de actualizacion",
  },
};
