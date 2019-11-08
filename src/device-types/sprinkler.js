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

class Sprinkler extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['front yard sprinklers'],
      roomHint: 'Front Yard'
    }, {
      nicknames: ['garage faucet'],
      roomHint: 'Garage'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Sprinkler()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.SPRINKLER',
      traits: [
        'action.devices.traits.StartStop',
      ],
      defaultNames: [`Smart Sprinkler`],
      name: `Smart Sprinkler`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        pausable: false
      },
      willReportState: true,
      states: {
        online: true,
        isRunning: false,
        isPaused: false,
      },
      hwVersion: '1.0.0',
      swVersion: '2.0.0',
      model: 'L',
      manufacturer: 'L',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addSprinkler',
  icon: 'image:filter-vintage',
  label: 'Sprinkler',
  function: (app) => { app._createDevice(Sprinkler.createDevice()); }
})
