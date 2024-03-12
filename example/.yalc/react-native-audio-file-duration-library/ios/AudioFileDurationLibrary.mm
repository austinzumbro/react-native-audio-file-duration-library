#import "AudioFileDurationLibrary.h"
#import <AVFoundation/AVFoundation.h>

@implementation AudioFileDurationLibrary
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getAudioFileDuration:(NSString *)filePath
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{
    NSURL *fileURL = [NSURL fileURLWithPath:filePath];
    AVURLAsset *audioAsset = [AVURLAsset URLAssetWithURL:fileURL options:nil];
    if (!audioAsset) {
        NSError *error = [NSError errorWithDomain:@"AudioFileDurationErrorDomain" code:-1 userInfo:@{NSLocalizedDescriptionKey: @"Could not create audio asset from file path"}];
        reject(@"asset_creation_error", @"Could not create audio asset from file path", error);
        return;
    }

    CMTime audioDuration = audioAsset.duration;
    float audioDurationSeconds = CMTimeGetSeconds(audioDuration);

    if (audioDurationSeconds >= 0) {
        resolve(@(audioDurationSeconds));
    } else {
        NSError *error = [NSError errorWithDomain:@"AudioFileDurationErrorDomain" code:-1 userInfo:@{NSLocalizedDescriptionKey: @"Could not retrieve duration from audio asset"}];
        reject(@"duration_error", @"Could not retrieve duration from audio asset", error);
    }
}

@end
