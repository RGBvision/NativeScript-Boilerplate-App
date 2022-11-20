import {Application, isAndroid} from '@nativescript/core';

export enum orientationType {
  any,
  portrait,
  landscape,
}

/**
 * Locks / unlocks specified screen orientation
 *
 * @example
 * setOrientation(orientationType.landscape); // lock landscape orientation
 *
 * @example
 * setOrientation(); // clear orientation
 *
 * @param orientation
 */
export function setOrientation(orientation: orientationType = orientationType.any) {

  const valueKey = 'orientation';

  switch (orientation) {
    case orientationType.portrait:
      if (isAndroid) {
        Application.android.foregroundActivity.setRequestedOrientation(android.content.pm.ActivityInfo.SCREEN_ORIENTATION_PORTRAIT);
      } else {
        UIDevice.currentDevice.setValueForKey(NSNumber.numberWithInt(UIInterfaceOrientation.Portrait), valueKey);
      }
      break;
    case orientationType.landscape:
      if (isAndroid) {
        Application.android.foregroundActivity.setRequestedOrientation(android.content.pm.ActivityInfo.SCREEN_ORIENTATION_LANDSCAPE);
      } else {
        UIDevice.currentDevice.setValueForKey(NSNumber.numberWithInt(UIInterfaceOrientation.LandscapeRight), valueKey);
      }
      break;
    default:
      if (isAndroid) {
        Application.android.foregroundActivity.setRequestedOrientation(android.content.pm.ActivityInfo.SCREEN_ORIENTATION_USER);
      } else {
        UIDevice.currentDevice.setValueForKey(NSNumber.numberWithInt(UIInterfaceOrientation.Unknown), valueKey);
      }
      break;
  }
}
