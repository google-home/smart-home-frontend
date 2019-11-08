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

class Dishwasher extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['dish cleaner'],
      roomHint: 'Kitchen'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Dishwasher()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type: 'action.devices.types.DISHWASHER',
      traits: [
        'action.devices.traits.RunCycle',
        'action.devices.traits.StartStop',
      ],
      defaultNames: [`Smart Dishwasher`],
      name: `Smart Dishwasher`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        pausable: true,
      },
      willReportState: true,
      states: {
        online: true,
        currentRunCycle: [{
          currentCycle: "rinse",
          nextCycle: "soap",
          lang: "en"
        }],
        currentTotalRemainingTime: 1212,
        currentCycleRemainingTime: 301,
        isRunning: false,
        isPaused: false,
      },
      hwVersion: '3.2',
      swVersion: '11.4',
      model: '442',
      manufacturer: 'sirius',
    };
  }
}

window.deviceTypes.push({
  identifier: '_addDishwasher',
  icon: 'maps:restaurant',
  label: 'Dishwasher',
  function: (app) => { app._createDevice(Dishwasher.createDevice()); }
})
