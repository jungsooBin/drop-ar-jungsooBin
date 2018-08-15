import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  PanResponder,
  Animated
} from "react-native";
import axios from "axios";
import Expo from "expo";
import { AR } from "expo";
import * as THREE from "three";
import ExpoTHREE from "expo-three";
import { Button } from "react-native-elements";

console.disableYellowBox = true;

export default class SingleArtView extends React.Component {
  constructor() {
    super();
    this.state = {
      singleArt: {}
    };
    this.handleLoad = this.handleLoad.bind(this);
  }

  async handleLoad() {
    let loader = new THREE.ObjectLoader();
    const response = await axios.get(`http://172.16.22.255:8080/api/art/2`);
    this.setState({
      singleArt: response.data
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
              backgroundColor: "purple",
              opacity: 0.2,
              width: 85,
              height: 85
            }}
          />
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

const { height, width } = Dimensions.get("window");

const styles = StyleSheet.create({
  drop: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: height - 350,
    left: width / 2 + 100
  }
});
