#include <string>

std::string value = "hello";
const char* hello();

#ifdef ANDROID
#include <jni.h>
#include <android/log.h>
#define LOG_TAG "OPENCV"
#define LOGD(...) __android_log_print(ANDROID_LOG_DEBUG, LOG_TAG, __VA_ARGS__)

extern "C" JNIEXPORT jstring JNICALL
Java_com_rectavalo_RectavaloModule_helloNative(
        JNIEnv *env,
        jobject /* this */) {
    std::string hello = "Hello from C++";
    return env->NewStringUTF(hello.c_str());
}
#endif

const char* hello() {
  return value.c_str();
}
