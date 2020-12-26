#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(SaveBase64Image, NSObject)

RCT_EXTERN_METHOD(save:(NSString)base64ImageString withOptions:(NSDictionary)options
                 withResolver:(RCTPromiseResolveBlock)resolve
                 withRejecter:(RCTPromiseRejectBlock)reject)

@end
