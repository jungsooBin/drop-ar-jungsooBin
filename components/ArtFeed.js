import React, { Component } from "react";
import { connect } from "react-redux";
import { Text, View, ScrollView } from "react-native";
import Button from "./Button";
import SingleArtItem from "./SingleArtItem";
import { fetchAllArt } from "../store";

export default class ArtFeed extends Component {
  // componentDidMount() {
  //   this.props.fetchAllArt();
  // }
  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text>Explore</Text>
        <ScrollView>
          {/* {this.props.allArt.map(art => {
          return <SingleArtItem key={art.id} />;
        })} */}
        </ScrollView>
        <Button onPress={() => navigation.goBack()}>Back</Button>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF"
  }
};

// const mapStateToProps = state => {
//   return {
//     allArt: state.allArt
//   };
// };

// const mapDispatchToProps = dispatch => ({
//   fetchAllArt: () => {
//     dispatch(fetchAllArt());
//   }
// });

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ArtFeed);
