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

const type = 'action.devices.types.REMOTECONTROL'

class Remote extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['remote'],
      roomHint: 'Living Room',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Remote()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.AppSelector',
        'action.devices.traits.InputSelector',
        'action.devices.traits.MediaState',
        'action.devices.traits.OnOff',
        'action.devices.traits.Toggles',
        'action.devices.traits.TransportControl',
        'action.devices.traits.Volume',
      ],
      defaultNames: [`Smart Remote Control`],
      name: `Smart Remote Control`,
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
        availableToggles: [{
          name: 'pip',
          name_values: [{
            name_synonym: ['PIP', 'picture in picture'],
            lang: 'en',
          }],
        }, {
          name: 'details',
          name_values: [{
            name_synonym: ['details', 'program details'],
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
        supportApplicationState: true,
      },
      willReportState: true,
      states: {
        online: true,
        currentInput: 'hdmi1',
        currentVolume: 11,
        isMuted: false,
        currentApplication: 'youtube',
        on: true,
        activityState: 'ACTIVE',
        playbackState: 'STOPPED',
        currentToggleSettings: {
          pip: false,
          details: false,
        },
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
  identifier: '_addRemote',
  icon: 'icons:settings-remote',
  label: 'Remote Control',
  function: (app) => {
    app._createDevice(Remote.createDevice());
  },
})
