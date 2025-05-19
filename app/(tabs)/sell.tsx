import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Camera, ChevronDown, Play, X, Plus, Image as ImageIcon } from 'lucide-react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import Colors from '@/constants/Colors';
import { i18n } from '@/localization/i18n';

export default function SellScreen() {
  const [productName, setProductName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(i18n.t('vegetables'));
  const [unit, setUnit] = useState('kg');
  const [images, setImages] = useState<string[]>([]);
  const [showCamera, setShowCamera] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraType, setCameraType] = useState<CameraType>('back');
  const router = useRouter();

  const handleAddImage = () => {
    if (Platform.OS === 'web') {
      // Mock image for web
      setImages([...images, 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg']);
    } else {
      if (!permission?.granted) {
        requestPermission();
      } else {
        setShowCamera(true);
      }
    }
  };

  const handleCapture = () => {
    // Mock image capture for demo
    setImages([...images, 'https://images.pexels.com/photos/2252584/pexels-photo-2252584.jpeg']);
    setShowCamera(false);
  };

  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };

  const submitProduct = () => {
    // For demo purposes, just navigate back to home
    router.push('/');
  };

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} facing={cameraType}>
          <View style={styles.cameraControls}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setShowCamera(false)}
            >
              <X color={Colors.white} size={24} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.captureButton}
              onPress={handleCapture}
            >
              <View style={styles.captureButtonInner} />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.flipButton}
              onPress={() => setCameraType(current => current === 'back' ? 'front' : 'back')}
            >
              <Camera color={Colors.white} size={24} />
            </TouchableOpacity>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{i18n.t('sellYourProduce')}</Text>
        <TouchableOpacity style={styles.voiceAssistButton}>
          <Play color={Colors.white} size={20} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.formContainer}>
          <Text style={styles.sectionTitle}>{i18n.t('productDetails')}</Text>
          
          <View style={styles.formRow}>
            <Text style={styles.label}>{i18n.t('productName')}</Text>
            <TextInput
              style={styles.input}
              value={productName}
              onChangeText={setProductName}
              placeholder={i18n.t('enterProductName')}
            />
          </View>
          
          <View style={styles.formRow}>
            <Text style={styles.label}>{i18n.t('category')}</Text>
            <TouchableOpacity style={styles.selectInput}>
              <Text style={styles.selectText}>{category}</Text>
              <ChevronDown color={Colors.neutral[600]} size={20} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.formRow}>
            <Text style={styles.label}>{i18n.t('price')}</Text>
            <View style={styles.priceInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.priceInput}
                value={price}
                onChangeText={setPrice}
                placeholder="0.00"
                keyboardType="numeric"
              />
              <Text style={styles.perUnit}>/ </Text>
              <TouchableOpacity style={styles.unitSelector}>
                <Text style={styles.unitText}>{unit}</Text>
                <ChevronDown color={Colors.neutral[600]} size={16} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.formRow}>
            <Text style={styles.label}>{i18n.t('quantity')}</Text>
            <View style={styles.quantityInputContainer}>
              <TextInput
                style={styles.quantityInput}
                value={quantity}
                onChangeText={setQuantity}
                placeholder="0"
                keyboardType="numeric"
              />
              <TouchableOpacity style={styles.unitSelector}>
                <Text style={styles.unitText}>{unit}</Text>
                <ChevronDown color={Colors.neutral[600]} size={16} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.formRow}>
            <Text style={styles.label}>{i18n.t('description')}</Text>
            <TextInput
              style={styles.textarea}
              value={description}
              onChangeText={setDescription}
              placeholder={i18n.t('enterDescription')}
              multiline={true}
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>
          
          <View style={styles.formRow}>
            <Text style={styles.label}>{i18n.t('photos')}</Text>
            <Text style={styles.photoSubtitle}>{i18n.t('addUpTo')}</Text>
            
            <View style={styles.imagesContainer}>
              {images.map((image, index) => (
                <View key={index} style={styles.imageWrapper}>
                  <Image source={{ uri: image }} style={styles.productImage} />
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => handleRemoveImage(index)}
                  >
                    <X color={Colors.white} size={16} />
                  </TouchableOpacity>
                </View>
              ))}
              
              {images.length < 4 && (
                <TouchableOpacity 
                  style={styles.addImageButton}
                  onPress={handleAddImage}
                >
                  <Plus color={Colors.primary[500]} size={24} />
                  <Text style={styles.addImageText}>{i18n.t('addPhoto')}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.back()}>
          <Text style={styles.secondaryButtonText}>{i18n.t('cancel')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.primaryButton} onPress={submitProduct}>
          <Text style={styles.primaryButtonText}>{i18n.t('listProduct')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 56,
    paddingBottom: 16,
  },
  headerTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: Colors.neutral[900],
  },
  voiceAssistButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.secondary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 100,
  },
  formContainer: {
    padding: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 18,
    color: Colors.neutral[900],
    marginBottom: 16,
  },
  formRow: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  selectInput: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  priceInputContainer: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  currencySymbol: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    color: Colors.neutral[800],
    marginRight: 4,
  },
  priceInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  perUnit: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[600],
  },
  unitSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
  },
  unitText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[800],
    marginRight: 4,
  },
  quantityInputContainer: {
    height: 48,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityInput: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[800],
  },
  textarea: {
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: Colors.neutral[800],
    height: 100,
  },
  photoSubtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: Colors.neutral[600],
    marginBottom: 8,
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageWrapper: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  removeButton: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.error[500],
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageButton: {
    width: 80,
    height: 80,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.primary[300],
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary[50],
  },
  addImageText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 10,
    color: Colors.primary[500],
    marginTop: 4,
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.neutral[200],
  },
  secondaryButton: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.neutral[300],
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  secondaryButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.neutral[700],
  },
  primaryButton: {
    flex: 1,
    height: 48,
    backgroundColor: Colors.primary[500],
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  primaryButtonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: Colors.white,
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraControls: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    padding: 20,
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButtonInner: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.white,
  },
  flipButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});