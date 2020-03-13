/**
 * Copyright 2019, Google, Inc.
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

const type = 'action.devices.types.TV'

class Tv extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['big screen'],
      roomHint: 'Living Room',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Tv()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.AppSelector',
        'action.devices.traits.InputSelector',
        'action.devices.traits.MediaState',
        'action.devices.traits.Modes',
        'action.devices.traits.OnOff',
        'action.devices.traits.Toggles',
        'action.devices.traits.TransportControl',
        'action.devices.traits.Volume',
      ],
      defaultNames: ['Smart Television'],
      name: 'Smart Television',
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        transportControlSupportedCommands: [
          'NEXT', 'PREVIOUS', 'PAUSE', 'STOP', 'RESUME',
        ],
        availableApplications: [{
          key: 'youtube',
          names: [{
            name_synonym: ['youtube', 'Youtube_en'],
            lang: 'en',
          }],
        }],
        availableInputs: [{
          key: 'hdmi_1',
          names: [{
            name_synonym: ['hdmi 1', 'first hdmi'],
            lang: 'en',
          }],
        }, {
          key: 'usb_1',
          names: [{
            name_synonym: ['usb', 'usb 1', 'first usb'],
            lang: 'en',
          }],
        }],
        availableModes: [{
          name: 'picture',
          name_values: [{
            name_synonym: ['picture', 'picture mode'],
            lang: 'en',
          }],
          settings: [{
            setting_name: 'normal',
            setting_values: [{
              setting_synonym: ['normal', 'standard'],
              lang: 'en',
            }],
          }, {
            setting_name: 'cinema',
            setting_values: [{
              setting_synonym: ['cinema', 'movie'],
              lang: 'en',
            }],
          }, {
            setting_name: 'game',
            setting_values: [{
              setting_synonym: ['game', 'video game'],
              lang: 'en',
            }],
          }],
        }],
        availableToggles: [{
          name: 'hdr',
          name_values: [{
            name_synonym: ['hdr', 'high dynamic range'],
            lang: 'en',
          }],
        }, {
          name: '3d_audio',
          name_values: [{
            name_synonym: ['3D audio', '3D sound'],
            lang: 'en',
          }],
        }],
        orderedInputs: false,
        volumeMaxLevel: 11,
        volumeCanMuteAndUnmute: true,
        volumeDefaultPercentage: 6,
        levelStepSize: 2,
        commandOnlyVolume: false,
        supportActivityState: true,
        supportPlaybackState: true,
      },
      willReportState: true,
      states: {
        online: true,
        currentInput: 'hdmi_1',
        currentVolume: 11,
        isMuted: false,
        currentApplication: 'youtube',
        on: true,
        activityState: 'ACTIVE',
        playbackState: 'STOPPED',
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
  identifier: '_addTv',
  icon: 'hardware:tv',
  label: 'Television',
  function: (app) => {
    app._createDevice(Tv.createDevice());
  },
})
