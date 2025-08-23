import React from 'react';
import { StyleSheet } from 'react-native';

import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';

import Colors from '@/constants/Colors';

export default function EditScreenInfo({ path }: { path: string }) {
  const meditationColors = Colors.meditation; // Access our beautiful meditation palette
  
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor={meditationColors.neutral.charcoal + 'CC'}  // Charcoal with transparency
          darkColor={meditationColors.neutral.warmWhite + 'CC'}> {/* Warm white with transparency */}
          Open up the code for this screen:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor={meditationColors.accent.sage + '0D'}      // Healing green subtle
          lightColor={meditationColors.accent.mintGreen + '0D'}> {/* Refreshing vitality subtle */}
          <MonoText>{path}</MonoText>
        </View>

        <Text
          style={styles.getStartedText}
          lightColor={meditationColors.neutral.charcoal + 'CC'}  // Charcoal with transparency
          darkColor={meditationColors.neutral.warmWhite + 'CC'}> {/* Warm white with transparency */}
          Change any of the text, save the file, and your app will automatically update.
        </Text>
      </View>

      <View style={styles.helpContainer}>
        <ExternalLink
          style={styles.helpLink}
          href="https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet">
          <Text 
            style={styles.helpLinkText} 
            lightColor={meditationColors.sunrise.skyBlue}> {/* Calm morning breeze for links */}
            Tap here if your app doesn't automatically update after making changes
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
