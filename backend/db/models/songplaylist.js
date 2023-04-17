'use strict';
module.exports = (sequelize, DataTypes) => {
  const SongPlaylist = sequelize.define('SongPlaylist', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    songId: DataTypes.INTEGER,
    playlistId: DataTypes.INTEGER
  }, {});
  SongPlaylist.associate = function(models) {

  };
  return SongPlaylist;
};
