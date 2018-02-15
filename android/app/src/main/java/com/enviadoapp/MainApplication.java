package com.enviadoapp;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.airbnb.android.react.maps.MapsPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.rssignaturecapture.RSSignatureCapturePackage;
import com.lwansbrough.RCTCamera.RCTCameraPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.lugg.ReactNativeConfig.ReactNativeConfigPackage;
import com.i18n.reactnativei18n.ReactNativeI18n;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new MapsPackage(),
            new RNDeviceInfo(),
            new RSSignatureCapturePackage(),
            new RCTCameraPackage(),
            new VectorIconsPackage(),
            new RNSpinkitPackage(),
            new ReactNativeConfigPackage(),
            new ReactNativeI18n()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
