// RCTLibLoadModule.m
#import "RCTLibLoadModule.h"
#include <libload.hpp>

@implementation RCTLibLoadModule

// To export a module named RCTLibLoadModule
RCT_EXPORT_MODULE(Rectavalo);


// RCT_EXPORT_METHOD(onMessage:(NSString *)message_body callback: (RCTResponseSenderBlock)callback) {
RCT_EXPORT_METHOD(hello: resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
// RCT_EXPORT_METHOD(hello) {
  // std::string body_str = std::string([message_body UTF8String]);
  // auto response = onMessage(body_str);
  NSLog(@"helloWrapper called");
  auto response = hello();
  // auto response = "hello";
  NSLog(@"hello called");
  
  NSString* response_ns = [NSString 
    stringWithFormat:@"%s", response
  ];

  NSLog(@"%@", response_ns);

  resolve(@{@"result": response_ns});
}

@end