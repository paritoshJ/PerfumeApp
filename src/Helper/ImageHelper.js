import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

export const chooseFromCamera = mediaType => {
  var options = {
    title: 'Select Image',
    mediaType: mediaType,
    videoQuality: 'medium',
    allowsEditing: false,
    durationLimit: 30,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    saveToPhotos: true,
    selectionLimit: 1,
    includeExtra: true,
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Take Photo',
    chooseFromLibraryButtonTitle: undefined,
    cameraType: 'back',
    compressImageQuality: 0.2,
    quality: 0.2,
  };

  return new Promise(function (isPicked) {
    launchCamera(options, response => {
      console.log(response, '---resppppp');
      if (response.didCancel) {
        isPicked({
          isPicked: false,
          data: undefined,
        });
      } else if (response.error) {
        isPicked({
          isPicked: false,
          data: undefined,
        });
      } else {
        isPicked({
          isPicked: true,
          data: response.assets[0],
        });
      }
    });
  });
};
export const chooseFromFrontCamera = mediaType => {
  var options = {
    title: 'Select Image',
    mediaType: mediaType,
    videoQuality: 'medium',
    allowsEditing: false,
    durationLimit: 30,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    saveToPhotos: true,
    selectionLimit: 1,
    includeExtra: true,
    cancelButtonTitle: 'Cancel',
    takePhotoButtonTitle: 'Take Photo',
    chooseFromLibraryButtonTitle: undefined,
    cameraType: 'front',
  };

  return new Promise(function (isPicked) {
    launchCamera(options, response => {
      console.log(response, '--?resp');
      if (response.didCancel) {
        isPicked({
          isPicked: false,
          data: undefined,
        });
      } else if (response.error) {
        isPicked({
          isPicked: false,
          data: undefined,
        });
      } else {
        isPicked({
          isPicked: true,
          data: response.assets[0],
        });
      }
    });
  });
};

//Image picker dialog to select file
export const openImagePicker = () => {
  var options = {
    title: 'Select Image',
    mediaType: 'photo',
    videoQuality: 'medium',
    allowsEditing: false,
    transform: [{translateX: '-50%'}, {translateY: '-50%'}],
    durationLimit: 30,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
    cancelButtonTitle: 'Cancel',
    selectionLimit: 1,
    // includeExtra: true,
    takePhotoButtonTitle: 'Take Photo',
    chooseFromLibraryButtonTitle: 'Choose from Library',
  };

  return new Promise(function (isPicked) {
    launchImageLibrary(options, response => {
      console.warn('dfdsfd', response);
      if (response.didCancel) {
        isPicked({
          isPicked: false,
          data: undefined,
        });
      } else if (response.error) {
        isPicked({
          isPicked: false,
          data: undefined,
        });
      } else {
        isPicked({
          isPicked: true,
          data: response.assets[0],
        });
      }
    });
  });
};
