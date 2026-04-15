# Blender 애드온

> Blender에서 RenderTracker를 연동하는 방법을 안내합니다.

---

## 1. 설치

설치 파일에서 **`Blender`** 버전을 체크하여 설치합니다.

---

## 2. 애드온 활성화

**`Edit > Preferences > Add-ons`** 에서 **`RenderTracker (Blender)`** 를 검색하여 활성화합니다.  
![blender_addon_enable | w-800](res/rendertracker/blender_addon_enable.webp)

---

## 3. RenderTracker 앱 실행

Blender 상단 메뉴의 **`Render > RenderTracker...`** 를 클릭하여 앱을 실행할 수 있습니다.  
![blender-rendertracker | w-300](res/rendertracker/blender-rendertracker.webp)

---

## 4. 스틸 렌더 알림 제외 (선택사항)

**`F12`** 로 스틸 프레임을 렌더할 때 RenderTracker 알림이 오는 현상이 생길 수 있습니다.  
**현재 프레임이 첫 번째 프레임인 채로 렌더하면 이 현상이 발생합니다.**  
두 번째 프레임 이후로 이동한 뒤 렌더하면 해당 현상을 피할 수 있습니다.

근본적으로 해결하려면 **`Preferences > Add-ons > RenderTracker (Blender)`** 에서  
**`Detect Rendering after 1st frame (Exclude Still Renders)`** 옵션을 활성화하세요.  
![blender_addon_detect | w-600](res/rendertracker/blender_addon_detect.webp)

> ⚠️ 이 옵션을 활성화하면 첫 번째 프레임이 렌더된 이후부터 RenderTracker에 알림이 오기 시작합니다.

---

## ⚠️ 주의사항

*   Blender에서는 RenderTracker 앱으로 텍스트로 된 가벼운 렌더링 정보만 전송하기 때문에 실질적인 렌더링 속도에는 영향이 거의 없습니다.

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
