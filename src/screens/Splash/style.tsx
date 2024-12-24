import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window'); // Get screen dimensions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  fullScreenImage: {
    width: width, // Fill the width of the screen
    height: height, // Fill the height of the screen
    resizeMode: 'cover', // Ensure the image covers the entire screen
  },
});

export default styles;
