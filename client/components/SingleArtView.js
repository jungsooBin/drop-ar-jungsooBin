import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PanResponder,
  Animated,
  TouchableOpacity,
  StatusBar
} from "react-native";
import axios from "axios";
import { connect } from "react-redux";
import Expo from "expo";
import { AR } from "expo";
import * as THREE from "three";
import ExpoTHREE from "expo-three";
import { Button } from "react-native-elements";
import { saveLikeArt, saveDislikeArt, changeLike } from "../store/likesReducer";

console.disableYellowBox = true;

class SingleArtView extends React.Component {
  constructor() {
    super();
    this.state = {
      singleArt: {},
      like: false
    };
    this.graffitiObjects = [];
    this.handleLoad = this.handleLoad.bind(this);
    this.likeArt = this.likeArt.bind(this);
    this.dislikeArt = this.dislikeArt.bind(this);
    this.findShape = this.findShape.bind(this)
    this.addItem = this.addItem.bind(this);
    this.generateLighting.bind(this);

  }

  componentDidMount() {
    const { navigation } = this.props;
    const artObj = navigation.getParam("art");
    const usersWhoLikedThisArt = [];
    artObj.likedBy.map(user => usersWhoLikedThisArt.push(user.id));
    const youLikedThisArt = usersWhoLikedThisArt.includes(this.props.user.id);
    if (youLikedThisArt === true) {
      this.setState({ like: true });
    }
  }

  async componentWillUnmount() {
    cancelAnimationFrame(this.gameRequest);
    try {
      this.arSession = await this._glView.stopARSessionAsync();
    } catch (err) {
      console.log(err);
    }
  }
  generateLighting(scene) {
    const leftLight = new THREE.DirectionalLight(0xffffff);
    const rightLight = new THREE.DirectionalLight(0xffffff);
    this.scene.add(leftLight);
    this.scene.add(rightLight);
    const light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
    this.scene.add(new THREE.AmbientLight(0x404040));
    this.scene.add(light);
    var plight = new THREE.PointLight(0x000000, 1, 100);
    plight.position.set(50, 50, 50);
    this.scene.add(plight);
  }
  
  async likeArt() {
    const { navigation } = this.props;
    const art = navigation.getParam("art");
    this.props.saveLikeArt({ userId: this.props.user.id, artId: art.id });
    this.setState({ like: !this.state.like });
  }

  async dislikeArt() {
    const { navigation } = this.props;
    const art = navigation.getParam("art");
    this.props.saveDislikeArt({ userId: this.props.user.id, artId: art.id });
    this.setState({ like: !this.state.like });
  }

  findShape(sizeToUse, shape) {
    if (shape === "sphere") {
      return new THREE.SphereGeometry(sizeToUse, 32, 32);
    } else if (shape === "pyramid") {
      return new THREE.TetrahedronBufferGeometry(sizeToUse, 0);
    } else {
      return new THREE.BoxGeometry(sizeToUse, sizeToUse, sizeToUse);
    }
  }

  async handleLoad() {
    const { navigation } = this.props;
    const artObj = navigation.getParam("art");
    const artPieceArr = artObj.artPiece
    for(let i = 0; i < artPieceArr.length; i++) {
        this.addItem(
          artPieceArr[i].sizeToUse,
          artPieceArr[i].colorToUse,
          artPieceArr[i].targetPosition,
          artPieceArr[i].shape)
      }
    }   
    
  
  async addItem(sizeToUse, colorToUse, targetPosition, shape) {
    // this.objectKeys.push(itemKey);
    const objectToRender = await this.findShape(sizeToUse, shape);
    // if (this.state.texture === "color") {
    const material = new THREE.MeshPhongMaterial({
      color: colorToUse,
      // transparent: true,
      specular: 0x555555,
      opacity: 1.0,
      shininess: 100
    });

    const mesh = new THREE.Mesh(objectToRender, material);

    mesh.position.copy(targetPosition);
    mesh.rotator = 0.025;
    this.graffitiObjects.push(mesh); 
    this.scene.add(mesh);
  }
  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <StatusBar hidden={true} />
        <Expo.GLView
          ref={ref => (this._glView = ref)}
          style={{ flex: 1 }}
          onContextCreate={this._onGLContextCreate}
        />
        <View style={styles.drop}>
          <Button
            raised
            rounded
            title="Load Scene"
            onPress={this.handleLoad}
            buttonStyle={{
              backgroundColor: "green",
              opacity: 0.5,
              width: 85,
              height: 85
            }}
          />
          {this.state.like === false ? (
            <TouchableOpacity
              style={styles.button}
              onPress={this.likeArt.bind(this)}
            >
              <Image
                source={{
                  uri:
                    "https://cdn1.iconfinder.com/data/icons/valentine-s-day-simplicity/512/empty_heart-512.png"
                }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
              <Text>Like</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.button}
              onPress={this.dislikeArt.bind(this)}
            >
              <Image
                source={{
                  uri:
                    "https://icon2.kisspng.com/20180320/xqq/kisspng-social-media-facebook-like-button-heart-emoticon-facebook-live-love-png-5ab1d16e4eb9f1.5813486915216029263225.jpg"
                }}
                style={{ width: 80, height: 80, borderRadius: 40 }}
              />
              <Text>Liked</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  _onGLContextCreate = async gl => {
    const width = gl.drawingBufferWidth;
    const height = gl.drawingBufferHeight;

    this.arSession = await this._glView.startARSessionAsync();

    this.scene = new THREE.Scene();
    this.camera = ExpoTHREE.createARCamera(
      this.arSession,
      width,
      height,
      0.01,
      1000
    );
    const renderer = ExpoTHREE.createRenderer({ gl });
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    this.scene.background = ExpoTHREE.createARBackgroundTexture(
      this.arSession,
      renderer
    );

    this.generateLighting(this.scene);
    var helper = new THREE.CameraHelper(this.camera);
    this.scene.add(helper);

    const animate = () => {
      this.gameRequest = requestAnimationFrame(animate);
      this.camera.position.setFromMatrixPosition(this.camera.matrixWorld);
      const cameraPos = new THREE.Vector3(0, 0, 0);
      cameraPos.applyMatrix4(this.camera.matrixWorld);

      this.graffitiObjects.forEach(art => {
        art.castShadow = true;
        art.rotation.x += art.rotator;
        art.rotation.y += art.rotator;
      });

      renderer.render(this.scene, this.camera);
      gl.endFrameEXP();
    };
    // this.handleLoad();
    animate();
  };
}

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  drop: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: height - 350,
    left: width / 2 + 88
  },
  love: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute"
  }
});

function setModelPos(model, dropPos) {
  const item = model.clone();
  item.position.x = dropPos.x;
  item.position.y = dropPos.y;
  item.position.z = dropPos.z;
  item.rotator = 0.02;
  return item;
}

const mapStateToProps = state => {
  return {
    likeArt: state.likes.likeArt,
    dislikeArt: state.likes.dislikeArt,
    user: state.users.user
  };
};

const mapDispatchToProps = dispatch => ({
  saveLikeArt: likeData => {
    dispatch(saveLikeArt(likeData));
  },
  saveDislikeArt: dislikeData => {
    dispatch(saveDislikeArt(dislikeData));
  },
  likedArt: liked => dispatch(changeLike(liked))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleArtView);
