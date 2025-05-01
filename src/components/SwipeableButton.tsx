import React, { useCallback } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { PanGestureHandler, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors } from '../theme/colors';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BUTTON_WIDTH = SCREEN_WIDTH - 32;
const BUTTON_HEIGHT = 64;
const SWIPE_THRESHOLD = BUTTON_WIDTH * 0.75;

interface SwipeableButtonProps {
  onSwipeComplete: () => void;
}

export const SwipeableButton: React.FC<SwipeableButtonProps> = ({ onSwipeComplete }) => {
  const translateX = useSharedValue(0);
  const buttonOpacity = useSharedValue(1);

  const handleComplete = useCallback(() => {
    onSwipeComplete();
  }, [onSwipeComplete]);

  const gestureHandler = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: (event) => {
      const newTranslateX = Math.max(0, Math.min(event.translationX, BUTTON_WIDTH - BUTTON_HEIGHT));
      translateX.value = newTranslateX;
      buttonOpacity.value = 1 - (newTranslateX / (BUTTON_WIDTH - BUTTON_HEIGHT));
    },
    onEnd: () => {
      if (translateX.value > SWIPE_THRESHOLD) {
        translateX.value = withSpring(BUTTON_WIDTH - BUTTON_HEIGHT);
        buttonOpacity.value = withSpring(0);
        runOnJS(handleComplete)();
      } else {
        translateX.value = withSpring(0);
        buttonOpacity.value = withSpring(1);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  const backgroundStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.background, backgroundStyle]}>
        <Text style={styles.text}>SWIPE TO EXECUTE</Text>
      </Animated.View>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={[styles.swipeable, animatedStyle]}>
          <Icon name="lightning-bolt" size={24} color={colors.text.primary} />
        </Animated.View>
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: BUTTON_WIDTH,
    height: BUTTON_HEIGHT,
    backgroundColor: colors.cardBackground,
    borderRadius: BUTTON_HEIGHT / 2,
    overflow: 'hidden',
    alignSelf: 'center',
    marginVertical: 16,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text.primary,
  },
  swipeable: {
    width: BUTTON_HEIGHT,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT / 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 