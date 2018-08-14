const { db } = require('./index');
const Art = require('./models/art');
const User = require('./models/user');

const newArt = [{
  "artPiece":  {
    "geometries":  [
       {
        "depth": 0.1,
        "height": 0.1,
        "type": "BoxGeometry",
        "uuid": "9D90A110-B6BD-49B7-9D51-67786F0F7E9C",
        "width": 0.1,
      },
    ],
    "materials":  [
       {
        "color": 8392433,
        "depthFunc": 3,
        "depthTest": true,
        "depthWrite": true,
        "emissiveIntensity": undefined,
        "linewidth": undefined,
        "opacity": 0.85,
        "rotation": undefined,
        "transparent": true,
        "type": "MeshBasicMaterial",
        "uuid": "B05BD3D8-00F9-451E-905F-9A6970BB90CE",
      },
    ],
    "metadata":  {
      "generator": "3D.toJSON",
      "type": "",
      "version": 4.5,
    },
    "":  {
      "background":  {
        "anisotropy": 1,
        "center":  [
          0,
          0,
        ],
        "flipY": true,
        "format": 1023,
        "magFilter": 1006,
        "mapping": 300,
        "metadata":  {
          "generator": "Texture.toJSON",
          "type": "Texture",
          "version": 4.5,
        },
        "minFilter": 1008,
        "name": "",
        "offset":  [
          0,
          0,
        ],
        "repeat":  [
          1,
          1,
        ],
        "rotation": 0,
        "uuid": "76920AE5-F062-44A6-B98F-F07D78B36362",
        "wrap":  [
          1001,
          1001,
        ],
      },
      "children":  [
         {
          "color": 4210752,
          "intensity": 1,
          "matrix":  [
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
          ],
          "type": "AmbientLight",
          "uuid": "DAF24130-454D-427D-A44D-6EBB92357FE4",
        },
         {
          "castShadow": true,
          "geometry": "9D90A110-B6BD-49B7-9D51-67786F0F7E9C",
          "material": "B05BD3D8-00F9-451E-905F-9A6970BB90CE",
          "matrix":  [
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
            0,
            0,
            0,
            0,
            1,
          ],
          "type": "Mesh",
          "uuid": "3A1AD250-6DE0-457D-864C-E74DBC521428",
        },
      ],
      "matrix":  [
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
        0,
        0,
        0,
        0,
        1,
      ],
      "type": "Scene",
      "uuid": "12FB2720-1C01-4788-B90B-55EE4FD8C4B9",
    },
  },
  "description": "Amazing art piece, love it",
  "likes": 10,
  "location":  [
    40.704928297016174,
    -74.00904571144392,
  ],
}];

const newUsers = [];

const seed = () =>
  
  Promise.all(newUsers.map(user => User.create(user))).then(() =>
    Promise.all(newArt.map(art => Art.create(art)))
  );

const main = () => {
  console.log('Syncing db...');
  db.sync({ force: true })
    .then(() => {
      console.log('Seeding databse...');
      return seed();
    })
    .catch(err => {
      console.log('Error while seeding');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

main();
