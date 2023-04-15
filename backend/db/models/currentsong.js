"use strict";
module.exports = (sequelize, DataTypes) => {
  const CurrentSong = sequelize.define(
    "CurrentSong",
    {
      userId: DataTypes.INTEGER,
      songId: DataTypes.INTEGER,
    },
    {}
  );
  CurrentSong.associate = function (models) {
    CurrentSong.belongsTo(models.User, { foreignKey: "userId" });
    CurrentSong.belongsTo(models.Song, { foreignKey: "songId" });
  };
  CurrentSong.upload = async function ({ userId, songId }) {
    const currentSong = await CurrentSong.create({
      userId,
      songId,
    });
    return CurrentSong.findByPk(currentSong.id);
  };
  return CurrentSong;
};
