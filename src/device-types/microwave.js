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

const type = 'action.devices.types.MICROWAVE'

class Microwave extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['microwave'],
      roomHint: 'Kitchen'
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Microwave()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Cook',
        'action.devices.traits.StartStop',
        'action.devices.traits.Timer',
      ],
      defaultNames: [`Smart Microwave`],
      name: `Smart Microwave`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        maxTimerLimitSec: 60,
        pausable: true,
        supportedCookingModes: [
          'DEFROST',
          'MICROWAVE',
          'WARM',
        ]
      },
      willReportState: true,
      states: {
        online: true,
        timerRemainingSec: -1,
        timerPaused: false,
        isRunning: false,
        isPaused: false,
        currentCookingMode: 'NONE',
        currentFoodPreset: 'NONE',
        currentFoodQuantity: 0,
        currentFoodUnit: 'NONE'
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
  identifier: '_addMicrowave',
  icon: 'device:nfc',
  label: 'Microwave',
  function: (app) => { app._createDevice(Microwave.createDevice()); }
})
