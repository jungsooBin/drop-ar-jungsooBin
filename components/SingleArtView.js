import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PanResponder,
  Animated,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import Expo from 'expo';
import { AR } from 'expo';
import * as THREE from 'three';
import ExpoTHREE from 'expo-three';
import { Button } from 'react-native-elements';

console.disableYellowBox = true;

export default class SingleArtView extends React.Component {
  constructor() {
    super();
    this.state = {
      singleArt: {},
      like: false,
    };
    this.handleLoad = this.handleLoad.bind(this);
    this.loveArt = this.loveArt.bind(this);
  }

  async loveArt() {
    // var geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    // var material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    // var cube = new THREE.Mesh(geometry, material);
    // const newItem = setModelPos(cube, this.camera.position);
    // this.scene.add(cube);
    this.setState({ like: !this.state.like });
  }

  async handleLoad() {
    const { navigation } = this.props;
    let loader = new THREE.ObjectLoader();
    const artObj = navigation.getParam('art');
    const sceneJson = artObj.artPiece;

    const artToLoad = loader.parse(sceneJson);
    this.scene.add(artToLoad);
  }

  render() {
    const { navigation } = this.props;
    const artObj = navigation.getParam('art');
    console.log('artObj: ', artObj);
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
        <View style={styles.love}>
          {this.state.like === true ? (
            <Image
              source={{
                uri:
                  'https://icon2.kisspng.com/20180320/xqq/kisspng-social-media-facebook-like-button-heart-emoticon-facebook-live-love-png-5ab1d16e4eb9f1.5813486915216029263225.jpg',
              }}
              style={{ width: 80, height: 80, borderRadius: 40 }}
            />
          ) : null}
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
  love: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
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
