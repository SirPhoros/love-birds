import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, Text, View, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import { Camera, CameraType } from 'expo-camera';
import { shareAsync } from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

const CameraFeature = ({ onClose }) => {
  let cameraRef = useRef();
  const [hasCameraPermission, setHasCameraPermission] = useState();
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState();
  const [photo, setPhoto] = useState();

  useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.requestCameraPermissionsAsync();
      const mediaLibraryPermission = await MediaLibrary.requestPermissionsAsync();
      setHasCameraPermission(cameraPermission.status === "granted");
      setHasMediaLibraryPermission(mediaLibraryPermission.status === "granted");
    })();
  }, []);

  if (hasCameraPermission === undefined) {
    return <Text>Requesting permissions...</Text>
  } else if (!hasCameraPermission) {
    return <Text>Permission for camera not granted. Please change this in your settings.</Text>
  }

  let takePic = async () => {
    if (cameraRef.current) {
      let options = {
        quality: 1,
        base64: false,
        exif: false
      };

      let newPhoto = await cameraRef.current.takePictureAsync(options);
      setPhoto(newPhoto);
    }
  };

  if (photo) {
    let sharePic = () => {
      shareAsync(photo.uri).then(() => {
        setPhoto(undefined);
      });
    };

    // let savePhoto = () => {
    //   MediaLibrary.saveToLibraryAsync(photo.uri).then(() => {
    //     setPhoto(undefined);
    //   });
    // };

    return (
        <View style={styles.container}>
          {photo ? (
            <View style={styles.previewContainer}>
              <Image style={styles.preview} source={{ uri: photo.uri }} />
            </View>
          ) : (
            <View style={styles.cameraContainer}>
              <Camera style={styles.camera} type={CameraType.front} ref={cameraRef} />
            </View>
          )}
          <View>
            {photo ? (
              <>
                  <Button
                    title="Share"
                    onPress={sharePic}
                    buttonStyle={{ backgroundColor: '#FAE8E0' }}
                    titleStyle={{ color: '#EF7C8E' }}
                  />
                {/* {hasMediaLibraryPermission && (
                    <Button
                      title="Save"
                      onPress={savePhoto}
                      buttonStyle={{ backgroundColor: '#FAE8E0' }}
                      titleStyle={{ color: '#EF7C8E' }}
                    />
                )} */}
                  <Button
                    title="Discard"
                    onPress={() => setPhoto(undefined)}
                    buttonStyle={{ backgroundColor: '#FAE8E0' }}
                    titleStyle={{ color: '#EF7C8E' }}
                  />
                  {/* <Button
                    title="Go Back"
                    onPress={onClose}
                    buttonStyle={{ backgroundColor: '#FAE8E0' }}
                    titleStyle={{ color: '#EF7C8E' }}
                  /> */}
              </>
            ) : (
              <>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Snap!"
                    onPress={takePic}
                    buttonStyle={{ backgroundColor: '#FAE8E0' }}
                    titleStyle={{ color: '#EF7C8E' }}
                  />
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    title="Back"
                    onPress={onClose}
                    buttonStyle={{ backgroundColor: '#FAE8E0' }}
                    titleStyle={{ color: '#EF7C8E' }}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      );
      
      
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={CameraType.front} ref={cameraRef} />
      <View style={styles.buttonContainer}>
        <Button
          title="Snap!"
          onPress={takePic}
          buttonStyle={{ backgroundColor: '#FAE8E0' }}
          titleStyle={{ color: '#EF7C8E' }}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Go Back"
          onPress={onClose}
          buttonStyle={{ backgroundColor: '#FAE8E0' }}
          titleStyle={{ color: '#EF7C8E' }}
        />
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const cameraSize = Math.min(windowWidth * 0.8, windowHeight * 0.6);

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    width: cameraSize,
    height: cameraSize,
    aspectRatio: 1,
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 20,
  },
  previewContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  preview: {
    width: '320%',
    height: '60%',
    borderRadius: 10,
    marginBottom: 2,
    marginTop: 60,
    padding: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '40%',
    marginBottom: 10,
    backgroundColor: '#FAE8E0',
	borderRadius: 50,
    borderWidth: 2,
    borderColor: 'brown',
  },
});

export default CameraFeature;


