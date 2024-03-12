
#ifdef RCT_NEW_ARCH_ENABLED
#import "RNAudioFileDurationLibrarySpec.h"

@interface AudioFileDurationLibrary : NSObject <NativeAudioFileDurationLibrarySpec>

#else

#import <React/RCTBridgeModule.h>

NS_ASSUME_NONNULL_BEGIN

@interface AudioFileDurationLibrary : NSObject <RCTBridgeModule>

#endif

@end

NS_ASSUME_NONNULL_END

