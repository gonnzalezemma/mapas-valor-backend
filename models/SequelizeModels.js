//const {model, Schema}= require('mongoose');
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const { sequelize } = require("../connections");
const model = {};
model.Usuario = sequelize.define("Usuarios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    required: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  activo: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  role: {
    type: DataTypes.STRING,
  },
});

model.Perfil = sequelize.define("Perfil", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING,
    required: true,
  },
  apellido: {
    type: DataTypes.STRING,
  },
  celular: {
    type: DataTypes.STRING,
  },
  direccion: {
    type: DataTypes.GEOMETRY("POINT", 4326),
  },
  ocupacion: {
    type: DataTypes.STRING,
  },
  lugarInteres: {
    type: DataTypes.GEOMETRY("POLYGON"),
  },
  organizacion: {
    type: DataTypes.STRING,
  },
  funcionOrganizacion: {
    type: DataTypes.STRING,
  },
});

model.Perfil.findPerfil = (long, lat, range) => {
  return new Perfil.findAll({
    where: Sequelize.where(
      Sequelize.fn(
        "ST_DWithin",
        Sequelize.col("location"),
        Sequelize.fn(
          "ST_SetSRID",
          Sequelize.fn("ST_MakePoint", long, lat),
          4326
        ),
        +range * 0.016
      ),
      true
    ),
  });
};

model.Parcelas = sequelize.define("Parcelas", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  parcela: {
    type: DataTypes.GEOMETRY("POLYGON"),
  },
  nombreParcela: {
    type: DataTypes.STRING(10),
  },
  active:{
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  }

});

model.Registros = sequelize.define(
  "Registros",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING(150),
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    active:{
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  }
);

model.DatosParcela = sequelize.define("DatosParcela", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },

  coordenada: {
    type: DataTypes.GEOMETRY("POINT", 4326),
  },
  valor: {
    type: DataTypes.INTEGER,
    required: true,
  },
});

model.NombreServicios = sequelize.define("NombreServicios", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true,
  },
  nombre: {
    type: DataTypes.STRING(20),
  },
  valorOptimo:{
    type: DataTypes.INTEGER,

  },
  unidadMedida:{
    type: DataTypes.INTEGER,

  },
  descripcion: {
    type: DataTypes.STRING(250),
  },
  createFor:{
    type: DataTypes.INTEGER
  }
});


model.Perfil.belongsTo(model.Usuario,{
    foreignKey: "PerfilUserId",

});
model.Usuario.hasOne(model.Perfil,{
    foreignKey: "PerfilUserId",

});


model.Perfil.hasMany(model.Parcelas, {
  foreignKey: "PerfilId",
  sourceKey: "id",
}); //*Una parcela tiene muchos registros
model.Parcelas.belongsTo(model.Perfil, {
  foreignKey: "PerfilId",
  targetId: "id",
}); //*Una parcela pertenece a un perfil




model.Parcelas.hasMany(model.Registros, {
  foreignKey: "ParcelaId",

}); //*Una parcela tiene muchos registros

model.Registros.belongsTo(model.Parcelas, {
  foreignKey: "ParcelaId",

});




model.Registros.hasMany(model.DatosParcela, {
  foreignKey: "RegistroId",
}); //model Registros

model.DatosParcela.belongsTo(model.Registros, {
  foreignKey: "RegistroId",
}); //











model.NombreServicios.hasMany(model.DatosParcela, {
  foreignKey: "NombreServiciosId",

});
model.DatosParcela.belongsTo(model.NombreServicios, {
  foreignKey: "NombreServiciosId",
}); //

module.exports = model;
