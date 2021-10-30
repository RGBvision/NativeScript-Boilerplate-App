import {Application, ApplicationSettings, Device, Color} from '@nativescript/core';
import {Theme} from '@nativescript/theme';

export function applyTheme(): void {

  const appThemeMode = ApplicationSettings.getString("appThemeMode", 'auto');

  let isDarkMode: boolean;

  if (appThemeMode === 'auto') {
    isDarkMode = Application.systemAppearance() === 'dark';
  } else {
    isDarkMode = appThemeMode === 'dark';
  }

  if (!isDarkMode) {
    Theme.setMode(Theme.Light);
  } else {
    Theme.setMode(Theme.Dark);
  }

  if (Application.android && (parseFloat(Device.sdkVersion) >= 21)) {

    const View = android.view.View;
    const window = Application.android.startActivity.getWindow();
    const decorView = window.getDecorView();
    const LayoutParams = android.view.WindowManager.LayoutParams;
    window.clearFlags(LayoutParams.FLAG_TRANSLUCENT_STATUS);
    window.addFlags(LayoutParams.FLAG_DRAWS_SYSTEM_BAR_BACKGROUNDS);

    if (!isDarkMode) {
      window.setStatusBarColor(new Color("#ffffff").android);
      if (parseFloat(Device.sdkVersion) < 26) {
        window.setNavigationBarColor(new Color("#000000").android);
        decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_VISIBLE | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
      } else {
        window.setNavigationBarColor(new Color("#ffffff").android);
        window.setNavigationBarDividerColor(new Color("#eceff1").android);
        decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_VISIBLE | View.SYSTEM_UI_FLAG_LIGHT_NAVIGATION_BAR | View.SYSTEM_UI_FLAG_LIGHT_STATUS_BAR);
      }
    } else {
      window.setStatusBarColor(new Color("#263238").android);
      if (parseFloat(Device.sdkVersion) >= 26) {
        window.setNavigationBarColor(new Color("#263238").android);
        window.setNavigationBarDividerColor(new Color("#37474f").android);
      }
      decorView.setSystemUiVisibility(View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_VISIBLE);
    }
  }

  if (Application.ios) {
    if (!isDarkMode) {
      UIApplication.sharedApplication.setStatusBarStyleAnimated(UIStatusBarStyle.DarkContent, true);
    } else {
      if (parseFloat(Device.sdkVersion) < 13) {
        UIApplication.sharedApplication.setStatusBarStyleAnimated(UIStatusBarStyle.Default, true);
      } else {
        UIApplication.sharedApplication.setStatusBarStyleAnimated(UIStatusBarStyle.LightContent, true);
      }
    }
  }

}
