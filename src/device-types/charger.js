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

const type = 'action.devices.types.CHARGER'

class Charger extends DeviceType {
  constructor() {
    super()
    this.valuesArray = [{
      nicknames: ['Electric Car Charger'],
      roomHint: 'Garage',
    }, {
      nicknames: ['Smart Phone Charger'],
      roomHint: 'Bedroom',
    }];
  }

  static createDevice() {
    if (!instance) {
      instance = new Charger()
    }
    const element = instance.valuesArray.shift();

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.EnergyStorage',
      ],
      defaultNames: [`Smart Charger`],
      name: `Smart Charger`,
      nicknames: instance.getNicknames(element),
      roomHint: instance.getRoomHint(element),
      attributes: {
        isRechargeable: true,
        queryOnlyEnergyStorage: false,
      },
      willReportState: true,
      states: {
        online: true,
        descriptiveCapacityRemaining: 'LOW',
        capacityRemaining: [{
          unit: 'SECONDS',
          rawValue: 3600,
        }, {
          unit: 'PERCENTAGE',
          rawValue: 15,
        }],
        isPluggedIn: true,
        isCharging: false,
        capacityUntilFull: [{
          unit: 'SECONDS',
          rawValue: 3600,
        }, {
          unit: 'PERCENTAGE',
          rawValue: 85,
        }],
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
  identifier: '_addCharger',
  icon: 'device:battery-charging-full',
  label: 'Charger',
  function: (app) => {
    app._createDevice(Charger.createDevice());
  },
})
