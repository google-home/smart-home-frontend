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

const type = 'action.devices.types.AIRFRESHENER'

class AirFreshener extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Mr. Fresh'],
      roomHint: 'Kitchen',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new AirFreshener()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.OnOff',
        'action.devices.traits.Toggles',
      ],
      defaultNames: [`Smart Air Freshener`],
      name: `Smart Air Freshener`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        availableToggles: [{
          name: 'intermittent spray',
          name_values: [{
            name_synonym: ['intermittent spray'],
            lang: 'en',
          }, {
            name_synonym: ['intermittierender Spray'],
            lang: 'de',
          }],
        }],
      },
      willReportState: true,
      states: {
        online: true,
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
  }
}

window.deviceTypes.push({
  type,
  identifier: '_addAirFreshener',
  icon: 'icons:hourglass-full',
  label: 'Air Freshener',
  function: (app) => {
    app._createDevice(AirFreshener.createDevice());
  },
})
