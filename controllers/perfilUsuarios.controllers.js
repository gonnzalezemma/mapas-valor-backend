const ctrlPerfilUsuarios = {};

const {Perfil} = require("../models/SequelizeModels");

//controlador para agregar datos
ctrlPerfilUsuarios.agregarDatos = async (req, res) => {
  const {
    nombre,
    apellido,
    celular,
    ocupacion,
    coordinates,
    lugaresInteres,
    organizacion,
    funcionOrganizacion,
  } = req.body;

  const userId = req.usuario.id;

  const { lat, long } = coordinates;
  const existePerfil=await Perfil.findOne({ where: { PerfilUserId: userId } })

if(existePerfil){
 return res.status(404).json({
      msj:"existe Perfil"
  })
}
  const direccion = {
    type: "Point",
    coordinates: [lat, long],
    crs: { type: "name", properties: { name: "EPSG:4326" } },
  };
  const interes = {
    type: "Polygon",
    coordinates: lugaresInteres,
  };

 await Perfil.create({
    PerfilUserId: userId,
    nombre: nombre,
    apellido: apellido,
    celular: celular,
    direccion: direccion,
    ocupacion: ocupacion,
    lugarInteres: interes,
    organizacion: organizacion,
    funcionOrganizacion: funcionOrganizacion,
  });

  const perfil = await Perfil.findOne({ where: { PerfilUserId: userId } });
  return res.status(201).json({
    msg: "usuario Agregado exitosamente",
    Perfil: perfil,
  });
};

//* PUT MODIFICAR INFORMATION

ctrlPerfilUsuarios.rutaEditPerfil = async (req, res) => {
  const {
    nombre,
    apellido,
    celular,
    ocupacion,
    coordinates,
    lugaresInteres,
    organizacion,
    funcionOrganizacion,
  } = req.body;
  const user = req.usuario;

  if (coordinates) {
    const { lat, long } = coordinates;
    var direccion = {
      type: "Point",
      coordinates: [lat, long],
      crs: { type: "name", properties: { name: "EPSG:4326" } },
    };
  }

  if (lugaresInteres) {
    var interes = {
      type: "Polygon",
      coordinates: lugaresInteres,
    };
  }

  await Perfil.update(
    {
      nombre: nombre,
      apellido: apellido,
      celular: celular,
      direccion: direccion,
      ocupacion: ocupacion,
      lugarInteres: interes,
      organizacion: organizacion,
      funcionOrganizacion: funcionOrganizacion,
    },
    { where: { userId: user.id } }
  );

  const perfil = await Perfil.findOne({ where: { id: user.id } });

  return res.json({ msg: "goof", perfil });
};

//?mostrar informacion de usuario
ctrlPerfilUsuarios.rutaMostrarInformacion = async (req, res) => {
  const userId = req.params.id;
  const perfilUsuario = await Perfil.findOne({ where: { id: userId } });

  res.status(201).json({
    msg: "good request",
    perfilUsuario,
  });
};

module.exports = ctrlPerfilUsuarios;
