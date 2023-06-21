#include <iostream>
#include <string>
#include <vector>
#include <libload.hpp>
#include <rectavalo_io.hpp>
#include <codecvt>
#include <locale>

std::string value = "Hello from C++!";

#ifdef ANDROID
extern "C" JNIEXPORT jstring JNICALL
Java_com_rectavalo_RectavaloModule_helloNative(
        JNIEnv *env,
        jobject /* this */) {
  return env->NewStringUTF(hello());
}

extern "C" JNIEXPORT jstring JNICALL
Java_com_rectavalo_RectavaloModule_onMessage(
        JNIEnv *env,
        jobject /* this */,
        jstring messageBody) {
  const char *nativeString = env->GetStringUTFChars(messageBody, 0);
  auto result = env->NewStringUTF(onMessage(std::string(nativeString)).c_str());
  env->ReleaseStringUTFChars(messageBody, nativeString);
  return result;
}
#endif

const char* hello() {
  return value.c_str();
}

Json::Value parseJson(const std::string& json) {
  Json::Value root;
  Json::Reader reader;
  reader.parse(json, root);
  return root;
}

Json::Value parseJson(const std::wstring& wide) {
  using convert_type = std::codecvt_utf8<wchar_t>;
  std::wstring_convert<convert_type, wchar_t> converter;
  //use converter (.to_bytes: wstr->str, .from_bytes: str->wstr)
  std::string narrow = converter.to_bytes(wide);
  return parseJson(narrow);
}


std::string onMessage(const std::string& json) {
  return onMessage(
    parseJson(json)
  );
}

std::wstring onMessage(const std::wstring& wide) {
  std::string s = onMessage(
    parseJson(wide)
  );

  std::wstringstream cls;
  cls << s.c_str();
  return cls.str();
}

std::string json_stringify(const Json::Value json) {
  Json::StreamWriterBuilder wbuilder;
  wbuilder["commentStyle"] = "None";
  wbuilder["indentation"] = "  ";

  return Json::writeString(wbuilder, json);
}

Json::Value jsonOk() {
  Json::Value ok("Ok");
  return ok;
}

Json::Value console_log(const std::vector<Json::Value> args) {
  for (auto value : args) {
    std::cout << value;
  }
  std::cout << std::endl;
  return jsonOk();
}

std::string onMessage(const Json::Value json) {
  /*for (auto member : json.getMemberNames()) {
    std::cout << "onMessage: " << member << std::endl;
    std::cout << "onMessage: " << member << ": " << json[member] << std::endl;
  }*/

  std::string fn;
  int callbackId = -1;
  std::vector<Json::Value> args;
  if (json["fn"].isString()) {
    fn = json["fn"].asString();
  }

  if (json["callbackId"].isIntegral()) {
    callbackId = json["callbackId"].asInt();
  }

  if (json["args"].isArray()) {
    for (unsigned int x = 0; x < json["args"].size(); ++x) {
      args.push_back(json["args"][x]);
    }
  }

  Json::Value response;
  if (fn == "nativeHello") {
    response["nativeResult"] = hello();
  } else if (fn == "console.log") {
    // should supress console response. Logging this response creates an infinite loop.
    response["result"] = console_log(args);
  } else if (fn == "io.readFile") {
    response = io_readFile(args);
  } else {
    response["error"] = "Unknown request: " + fn;
  }

  if (callbackId > -1) response["callbackId"] = callbackId;

  // todo: await response in client side, don't console.log every response (infinite loop)
  // return json_stringify(response);
  return json_stringify(response);
}
