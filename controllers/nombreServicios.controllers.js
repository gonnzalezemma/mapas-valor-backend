const crtlServicios = {};

const { NombreServicios } = require("../models/SequelizeModels");

crtlServicios.agregarServicio = async (req, res) => {
  const { nombre, valorOptimo, unidadMedida, descripcion } = req.body;
  const idUser = req.usuario.id;
  const servicio = await NombreServicios.findOne({ where: { nombre: nombre } });

  if (servicio) {
    return res.status(402).json({
      msg: "Servicio existente",
    });
  }
  let unidad;
  if (unidadMedida == 0) {
    unidad = "decimal";
  }
  if (unidadMedida == 1) {
    unidad = "porcentual";
  }
  //? decimal 0 porcentual 1

  await NombreServicios.create({
    nombre: nombre,
    valorOptimo: valorOptimo,
    unidadMedida: unidadMedida,
    descripcion: descripcion,
    createFor:idUser
  });
  const servicioCreado = await NombreServicios.findOne({
    where: { nombre: nombre },
  });

  return res.status(200).json({
    servicioCreado,
  });
};

crtlServicios.editarServicio = async (req, res) => {
  const { nombre, valorOptimo, unidadMedida, descripcion } = req.body;
  const idUser = req.usuario.id;
  const id = req.params.idServicio;

  await NombreServicios.update(
    { nombre, valorOptimo, unidadMedida, descripcion },
    { where: { [Op.and]: [{ id: id }, { createFor: idUser }] } }
  );

  const servicio = await NombreServicios.findOne({ where: { id: id } });

  return res.status(201).json({
    msg: "servicio editado exitosamente",
    servicio: servicio,
  });
};

crtlServicios.verServicios = async(req, res)=>{

    const idUser = req.usuario.id;

    const {id, nombre, valorOptimo, unidadMedida, descripcion} = await NombreServicios.findAll({ where: {id: idUser}})

    
    return res.status(200).json({id, nombre, valorOptimo, unidadMedida, descripcion})
} 

module.exports =crtlServicios;