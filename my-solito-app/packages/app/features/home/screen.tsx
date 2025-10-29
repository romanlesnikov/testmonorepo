'use client'

import { TextLink } from 'solito/link'
import { Text, View } from 'react-native'
import { useEffect } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withSpring, withSequence, Easing } from 'react-native-reanimated'
import { VirtuosoGrid, Virtuoso } from 'react-virtuoso'
import { Panel , PanelGroup , PanelResizeHandle } from "react-resizable-panels";
import { Platform } from 'react-native'
export function HomeScreen() {
const isWeb = Platform.OS == 'web'
    const opacity = useSharedValue(0);
  const translateY = useSharedValue(-50); // start position
  const animationDuration = 500;
  useEffect(() => {
    // Start the animations
    opacity.value = withTiming(1, { duration: animationDuration });
    translateY.value = withSpring(0);
}, []); // <-- Empty dependency array ensures this runs only once on mount

const animatedStyles = useAnimatedStyle(() => {
  return {
      opacity: opacity.value,
      transform: [
          {
              translateY: translateY.value
          }
      ]
  };
},[opacity, translateY]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        gap: 32,
      }}
    >
      <Animated.View style={[animatedStyles]}>
        <H1>Welcome to Solito.</H1>
      </Animated.View>
      {isWeb && <Virtuoso></Virtuoso>}
       {isWeb && <PanelGroup direction="horizontal">
   <Panel defaultSize={30} minSize={20} style={{background:'red'}}>
     left
   </Panel>
   <PanelResizeHandle />
   <Panel minSize={30}>
     middle
   </Panel>
   <PanelResizeHandle />
   <Panel defaultSize={30} minSize={20}>
     right
   </Panel>
 </PanelGroup>}
      <View style={{ maxWidth: 600, gap: 16 }}>
        <Text style={{ textAlign: 'center' }}>
          Here is a basic starter to show you how you can navigate from one
          screen to another. This screen uses the same code on Next.js and React
          Native.
        </Text>
        <Text style={{ textAlign: 'center' }}>
          Solito is made by{' '}
          <TextLink
            href="https://twitter.com/fernandotherojo"
            target="_blank"
            rel="noreferrer"
            style={{ color: 'blue' }}
          >
            Fernando Rojo
          </TextLink>
          .
        </Text>
      </View>
      <View style={{ flexDirection: 'row', gap: 32 }}>
        <TextLink
          href="/users/fernando"
          style={{
            fontSize: 16,
            fontWeight: 'bold',
            color: 'blue',
          }}
        >
          Link
        </TextLink>
      </View>
    </View>
  )
}

const H1 = ({ children }: { children: React.ReactNode }) => {
  return <Text style={{ fontWeight: '800', fontSize: 24 }}>{children}</Text>
}

const P = ({ children }: { children: React.ReactNode }) => {
  return <Text style={{ textAlign: 'center' }}>{children}</Text>
}
