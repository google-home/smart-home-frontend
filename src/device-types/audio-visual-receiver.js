/**
 * Copyright 2020, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *   http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an 'AS IS' BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { DeviceType } from './device-type';

let instance;

const type = 'action.devices.types.AUDIO_VIDEO_RECEIVER'

class AudioVideoReceiver extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Media center receiver'],
      roomHint: 'Living Room',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new AudioVideoReceiver()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.InputSelector',
        'action.devices.traits.Volume',
      ],
      defaultNames: ['Smart Audio Video Receiver'],
      name: 'Smart Audio Video Receiver',
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        availableInputs: [{
          key: 'hdmi_1',
          names: [{
            name_synonym: ['hdmi 1', 'DVD player'],
            lang: 'en',
          }],
        }, {
          key: 'hdmi_2',
          names: [{
            name_synonym: ['hdmi 2', 'TV'],
            lang: 'en',
          }],
        }],
        volumeMaxLevel: 11,
        volumeCanMuteAndUnmute: true,
      },
      willReportState: true,
      states: {
        online: true,
        currentInput: 'hdmi_1',
        currentVolume: 11,
        isMuted: false,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
  }
}

window.deviceTypes.push({
  type,
  identifier: '_addAudioVisualReceiver',
  icon: 'hardware:computer',
  label: 'Audio Video Receiver',
  function: (app) => {
    app._createDevice(AudioVideoReceiver.createDevice());
  },
})
