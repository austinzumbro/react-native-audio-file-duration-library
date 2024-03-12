
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNAudioFileDurationLibrarySpec.h"

@interface AudioFileDurationLibrary : NSObject <NativeAudioFileDurationLibrarySpec>

#else
// Your existing imports and interface declaration come here for the old architecture.
#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface AudioFileDurationLibrary : NSObject <RCTBridgeModule>

#endif

@end

NS_ASSUME_NONNULL_END

