import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React from 'react';
import { useSelector } from 'react-redux';

import { ReduxState } from 'type';
import { getScaleNumber } from 'utils/refDimention';
// import { ReduxState } from 'types';

type propTypes = {
  color?: String;
};

const Spinner = ({ color }: propTypes) => {
  const { loading, spinnerMessage } = useSelector((state:ReduxState) =>state.common);

  if (loading) {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: 'black',
            position: 'absolute',
            flex: 1,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.3,
          }}></View>
        <ActivityIndicator size={'large'} color={color ? color : 'white'} />
        <Text style={styles.textContent}>{spinnerMessage}</Text>
        {/* </View> */}
      </View>
    );
  } else return <></>;
};

export default Spinner;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    // opacity: 0.3,
  },
  loaderContent: {
    backgroundColor: 'black',
    opacity: 0.5,
    padding: getScaleNumber(20),
    borderRadius: getScaleNumber(10),
  },
  textContent: {
    paddingHorizontal: getScaleNumber(20),
    fontSize: 20,
    fontWeight: '700',
    height: 50,
    top: 20,
    color: 'white',
    zIndex: 100,
    textAlign: 'center',
  },
});
