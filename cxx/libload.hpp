#ifndef _RECTAVALO_LIBLOAD_H
#define _RECTAVALO_LIBLOAD_H

const char* hello();

#ifdef ANDROID
#include <jni.h>
#include <android/log.h>
#define LOG_TAG "OPENCV"
#define LOGD(...) __android_log_print(ANDROID_LOG_DEBUG, LOG_TAG, __VA_ARGS__)
#endif

#endif