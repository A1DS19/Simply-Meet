/*
********************************************
 Copyright © 2021 Agora Lab, Inc., all rights reserved.
 AppBuilder and all associated components, source code, APIs, services, and documentation 
 (the “Materials”) are owned by Agora Lab, Inc. and its licensors. The Materials may not be 
 accessed, used, modified, or distributed for any purpose without a license from Agora Lab, Inc.  
 Use without a license or in violation of any license terms and conditions (including use for 
 any purpose competitive to Agora Lab, Inc.’s business) is strictly prohibited. For more 
 information visit https://appbuilder.agora.io. 
*********************************************
*/
import React, {useContext} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import SecondaryButton from '../atoms/SecondaryButton';
import TextInput from '../atoms/TextInput';
import useRemoteMute, {MUTE_REMOTE_TYPE} from '../utils/useRemoteMute';
import {PollContext} from './PollContext';
import PrimaryButton from '../atoms/PrimaryButton';

export interface MuteAllAudioButtonProps {
  render?: (onPress: () => void) => JSX.Element;
}

export const MuteAllAudioButton = (props: MuteAllAudioButtonProps) => {
  const muteRemoteAudio = useRemoteMute();
  //commented for v1 release
  //const muteAllAudioButton = useString('muteAllAudioButton')();
  const muteAllAudioButton = 'Mute all audios';
  const onPress = () => muteRemoteAudio(MUTE_REMOTE_TYPE.audio);

  return props?.render ? (
    props.render(onPress)
  ) : (
    <SecondaryButton onPress={onPress} text={muteAllAudioButton} />
  );
};

export interface MuteAllVideoButtonProps {
  render?: (onPress: () => void) => JSX.Element;
}
export const MuteAllVideoButton = (props: MuteAllVideoButtonProps) => {
  const muteRemoteVideo = useRemoteMute();

  //commented for v1 release
  //const muteAllVideoButton = useString('muteAllVideoButton')();
  const muteAllVideoButton = 'Mute all videos';
  const onPress = () => muteRemoteVideo(MUTE_REMOTE_TYPE.video);

  return props?.render ? (
    props.render(onPress)
  ) : (
    <SecondaryButton onPress={onPress} text={muteAllVideoButton} />
  );
};

const HostControlView = () => {
  //commented for v1 release
  //const hostControlsLabel = useString('hostControlsLabel')();
  const hostControlsLabel = 'Host Controls';
  const {
    question,
    setQuestion,
    answers,
    setAnswers,
    isModalOpen,
    setIsModalOpen,
  } = useContext(PollContext);

  return (
    <>
      <Text style={style.heading}>{hostControlsLabel}</Text>
      <View>
        <View style={style.btnContainer}>
          <MuteAllAudioButton />
        </View>
        {!$config.AUDIO_ROOM && (
          <View style={style.btnContainer}>
            <MuteAllVideoButton />
          </View>
        )}

        <Text style={style.heading_sub}>Create a Poll</Text>
        <View>
          <TextInput
            style={style.textInput}
            value={question}
            onChangeText={setQuestion}
            placeholder="Poll Question"
          />
          <br />
          {answers.map((answer, index) => (
            <div key={index}>
              <br />
              <TextInput
                value={answer.option}
                placeholder={`Poll Answer ${index + 1}`}
                onChangeText={(value) =>
                  setAnswers([
                    ...answers.slice(0, index),
                    {option: value, votes: 0},
                    ...answers.slice(index + 1),
                  ])
                }
              />
            </div>
          ))}
        </View>
        <View style={style.btnContainer}>
          <PrimaryButton
            onPress={() => {
              setIsModalOpen(true);
            }}
            text="Start Poll"
          />
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: '700',
    color: $config.PRIMARY_FONT_COLOR,
    // marginBottom: 20,
    alignSelf: 'center',
  },
  heading_sub: {
    fontSize: 20,
    fontWeight: '700',
    color: $config.PRIMARY_FONT_COLOR,
    marginBottom: 15,
    marginTop: 20,
    alignSelf: 'center',
  },
  textInput: {
    marginBottom: 20,
  },
  btnContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default HostControlView;
