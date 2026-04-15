# Blender Add-on

> This guide explains how to connect RenderTracker with Blender.

---

## 1. Installation

Check the **`Blender`** version in the installer and install it.

---

## 2. Enable the Add-on

Search for **`RenderTracker (Blender)`** in **`Edit > Preferences > Add-ons`** and enable it.  
![blender_addon_enable | w-800](res/rendertracker/blender_addon_enable.webp)

---

## 3. Launch RenderTracker App

Click **`Render > RenderTracker...`** in the Blender top menu to launch the app.  
![blender-rendertracker | w-300](res/rendertracker/blender-rendertracker.webp)

---

## 4. Exclude Still Renders (Optional)

When rendering a still frame with **`F12`**, a RenderTracker notification may be triggered unintentionally.  
**This happens when the current frame is set to the first frame before rendering.**  
Moving to the second frame or later before rendering will avoid this issue.

To resolve it permanently, enable **`Detect Rendering after 1st frame (Exclude Still Renders)`**  
in **`Preferences > Add-ons > RenderTracker (Blender)`**.  
![blender_addon_detect | w-600](res/rendertracker/blender_addon_detect.webp)

> ⚠️ With this option enabled, RenderTracker notifications will only start after the first frame has been rendered.

---

## ⚠️ Notes

*   Blender only sends lightweight text-based render information to RenderTracker, so there is virtually no impact on actual rendering performance.

<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
