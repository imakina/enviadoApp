### Config Folder
All application specific configuration falls in this folder.

`AppConfig.js` - production values.
`DebugConfig.js` - development-wide globals.
`ReactotronConfig.js` - Reactotron client settings.
`ReduxPersist.js` - rehydrate Redux state.

react-native bundle --dev false --platform android --entry-file index.android.js --bundle-output ./android/app/build/intermediates/assets/debug/index.android.bundle --assets-dest ./android/app/build/intermediates/res/merged/debug

Esto deberia compilar la version para que no sea una apk de desarrollo, y dejaria los bundles output en las carpetas intermedia de la apk.

Luego compilar la apk

cd android && ./gradlew assembleRelease