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

const type = 'action.devices.types.OVEN'

class Oven extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['oven'],
      roomHint: 'Kitchen',
    }, {
      nicknames: ['stove'],
      roomHint: 'Kitchen',
    }, {
      nicknames: ['broiler'],
      roomHint: 'Kitchen',
    }, {
      nicknames: ['microwave'],
      roomHint: 'Kitchen',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Oven()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Cook',
        'action.devices.traits.OnOff',
        'action.devices.traits.TemperatureControl',
      ],
      defaultNames: [`Smart Oven`],
      name: `Smart Oven`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        temperatureRange: {
          minThresholdCelsius: 100.0,
          maxThresholdCelsius: 300.0,
        },
        temperatureUnitForUX: 'C',
        supportedCookingModes: [
          'BAKE',
          'CONVECTION_BAKE',
          'ROAST',
        ],
      },
      willReportState: true,
      states: {
        online: true,
        temperatureSetpointCelsius: 200,
        currentCookingMode: 'NONE',
        currentFoodPreset: 'NONE',
        currentFoodQuantity: 0,
        currentFoodUnit: 'NONE',
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
  identifier: '_addOven',
  icon: 'av:web',
  label: 'Oven',
  function: (app) => {
    app._createDevice(Oven.createDevice());
  },
})
