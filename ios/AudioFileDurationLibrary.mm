#import "AudioFileDurationLibrary.h"
#import <AVFoundation/AVFoundation.h>

@implementation AudioFileDurationLibrary
RCT_EXPORT_MODULE()

RCT_EXPORT_METHOD(getAudioFileDuration:(NSString *)filePath
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)
{

    NSURL *fileURL = [NSURL URLWithString:filePath];

    if (![[NSFileManager defaultManager] fileExistsAtPath:[fileURL path]]) {
        NSError *error = [NSError errorWithDomain:@"AudioFileDurationErrorDomain" code:-1 userInfo:@{NSLocalizedDescriptionKey: @"File does not exist at the specified URL"}];
        // NSLog(@"Error: %@", error);
        reject(@"file_not_found", @"File does not exist at the specified URL", error);
        return;
    }

    NSFileCoordinator *fileCoordinator = [[NSFileCoordinator alloc] initWithFilePresenter:nil];
    [fileCoordinator coordinateReadingItemAtURL:fileURL options:NSFileCoordinatorReadingWithoutChanges error:nil byAccessor:^(NSURL *newURL) {
        // NSLog(@"Coordinated reading of file URL: %@", newURL);

        AVURLAsset *audioAsset = [AVURLAsset URLAssetWithURL:newURL options:nil];

        if (!audioAsset) {
            NSError *error = [NSError errorWithDomain:@"AudioFileDurationErrorDomain" code:-1 userInfo:@{NSLocalizedDescriptionKey: @"Could not create audio asset from file path"}];
            // NSLog(@"Error creating audio asset: %@", error);
            reject(@"asset_creation_error", @"Could not create audio asset from file path", error);
            return;
        }

        CMTime audioDuration = audioAsset.duration;
        float audioDurationSeconds = CMTimeGetSeconds(audioDuration);
        // NSLog(@"Audio duration: %f seconds", audioDurationSeconds);
        
        if (audioDurationSeconds >= 0) {
            resolve(@(audioDurationSeconds));
        } else {
            NSError *error = [NSError errorWithDomain:@"AudioFileDurationErrorDomain" code:-1 userInfo:@{NSLocalizedDescriptionKey: @"Could not retrieve duration from audio asset"}];
            // NSLog(@"Error retrieving duration: %@", error);
            reject(@"duration_error", @"Could not retrieve duration from audio asset", error);
        }
    }];
}

@end
