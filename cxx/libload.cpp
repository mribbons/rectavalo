#include <string>
#include "libload.hpp"

std::string value = "Hello from C++!";

#ifdef ANDROID
extern "C" JNIEXPORT jstring JNICALL
Java_com_rectavalo_RectavaloModule_helloNative(
        JNIEnv *env,
        jobject /* this */) {
    return env->NewStringUTF(hello());
}
#endif

const char* hello() {
  return value.c_str();
}
