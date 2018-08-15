import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PanResponder,
  TouchableOpacity,
  Animated,
} from 'react-native';
import axios from 'axios';
import Expo from 'expo';
import { AR } from 'expo';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

console.disableYellowBox = true;

export default class SingleArtView extends React.Component {
  constructor() {
    super();
    this.state = {
      singleArt: {},
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.loveArt = this.loveArt.bind(this);
  }

  async loveArt() {
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    var cube = new THREE.Mesh(geometry, material);
    const newItem = setModelPos(cube, this.camera.position);
    this.scene.add(cube);
  }

  async handleLoad() {
    let loader = new THREE.ObjectLoader();
    const response = await axios.get(`http://172.16.21.129:8080/api/art/7`);
    this.setState({
      singleArt: response.data,
    });
    console.log(response.data);
    const sceneJson = response.data.artPiece;
    const artToLoad = loader.parse(sceneJson);
    this.scene.add(artToLoad);
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
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
              backgroundColor: 'green',
              opacity: 0.5,
              width: 85,
              height: 85,
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={this.loveArt.bind(this)}
          >
            <Image
              source={{
                uri:
                  'https://icon2.kisspng.com/20180320/xqq/kisspng-social-media-facebook-like-button-heart-emoticon-facebook-live-love-png-5ab1d16e4eb9f1.5813486915216029263225.jpg',
              }}
              style={{ width: 80, height: 80, borderRadius: 40 }}
            />
          </TouchableOpacity>
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

    const animate = () => {
      requestAnimationFrame(animate);
      this.camera.position.setFromMatrixPosition(this.camera.matrixWorld);
      const cameraPos = new THREE.Vector3(0, 0, 0);
      cameraPos.applyMatrix4(this.camera.matrixWorld);

      renderer.render(this.scene, this.camera);
      gl.endFrameEXP();
    };
    animate();
  };
}

const { height, width } = Dimensions.get('window');

const styles = StyleSheet.create({
  drop: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: height - 350,
    left: width / 2 + 100,
  },
  button: {
    backgroundColor: 'white',
    width: 80,
    height: 80,
    borderRadius: 40,
    marginTop: 10,
  },
});

function setModelPos(model, dropPos) {
  const item = model.clone();
  item.position.x = dropPos.x;
  item.position.y = dropPos.y;
  item.position.z = dropPos.z;
  item.rotator = 0.02;
  return item;
}
