package com.enviadoqr;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.oblador.vectoricons.VectorIconsPackage;
// import com.spyworldxp.barcodescanner.BarcodeScannerPackage;
import org.reactnative.camera.RNCameraPackage;
import com.zmxv.RNSound.RNSoundPackage;
import com.rnfs.RNFSPackage;
// import com.ekreutz.barcodescanner.BarcodeScannerPackage;
import com.rssignaturecapture.RSSignatureCapturePackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
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
            new KCKeepAwakePackage(),
            new VectorIconsPackage(),
            // new BarcodeScannerPackage(),
            new RNCameraPackage(),
            new RNSoundPackage(),
            new RNFSPackage(),
            new RSSignatureCapturePackage(),
            new RNSpinkitPackage(),
            new RNDeviceInfo(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
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
