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

const type = 'action.devices.types.SCENE'

class Scene extends DeviceType {
  constructor() {
    super()
  }

  static createDevice() {
    if (!instance) {
      instance = new Scene()
    }

    return {
      id: instance.genUuid(),
      type,
      traits: [
        'action.devices.traits.Scene',
      ],
      defaultNames: [`Smart Scene`],
      name: `Smart Scene`,
      nicknames: [`Party Mode`],
      roomHint: '',
      attributes: {
        sceneReversible: true
      },
      willReportState: false,
      states: {
        online: true,
        deactivate: true,
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
  identifier: '_addScene',
  icon: 'image:slideshow',
  label: 'Scene',
  function: (app) => { app._createDevice(Scene.createDevice()); }
})
