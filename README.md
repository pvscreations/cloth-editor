# Sager Drone 3D Annotation System

A performant 3D annotation web app built with React and React Three Fiber (R3F). Users can load .glb models, inspect them, and draw points, lines, and polygons directly on the surface of the model with real-time feedback and measurement tools.

## 🚀 Features

- **Frameworks & Libraries**:
  - React
  - React Three Fiber (R3F)
  - three-mesh-bvh (accelerated raycasting)
  - Leva (UI controls)
- **Model Loading & Interaction**:
  - Load .glb models
  - Camera auto-fits to loaded model
  - Progress loader during model loading
  - Raycasting for interactive annotation (accelerated via three-mesh-bvh)
- **Annotation Tools**:
  - **Points**: Place and orient to match surface normal
  - **Lines**: Live preview from last point to mouse, display real-world length (meters)
  - **Polygons**: Live preview, display area upon completion
  - **Normals**: Geometry oriented to match surface normals (like camera-facing stickers)
- **Drawing Behavior**:
  - Temporary preview line while drawing lines/polygons
  - Double-click to finalize shape and remove preview
  - Style preview to match final geometry (color, width)
- **UI Controls (Leva)**:
  - Drawing Mode: Point | Line | Polygon
  - Drawing Color
  - Lighting Settings (intensity, color)
- **Performance**:
  - Efficient picking and rendering (three-mesh-bvh)
  - Maintains 60+ FPS on mid-range machines

## 📁 Project Structure

```
src/
├── analytics/         # Analytics setup and configuration
├── components/        # React components (ClothModel, Board, etc.)
├── config/            # Leva and asset configuration
├── constants/         # Editor and asset constants
├── controllers/       # Drawing and delay controllers
├── effects/           # Post-processing and visual effects
├── features/          # Annotation features (Fade, Pulse, etc.)
├── geometry/          # Custom geometry definitions
├── loaders/           # Asset/model loaders
├── shaders/           # Custom shader code
├── stages/            # Game/annotation stages
├── stores/            # Zustand state management
└── types/             # TypeScript type definitions
```

## 🛠️ Setup & Usage

1. **Clone the repository**
   ```bash
   git clone https://github.com/pvscreations/cloth-editor.git
   cd cloth-editor
   ```
2. **Install dependencies**
   ```bash
   pnpm install
   ```
3. **Start the development server**
   ```bash
   pnpm dev
   ```
4. **Build for production**
   ```bash
   pnpm build
   ```

## 🎨 Controls & UI

- **Drawing Mode**: Select Point, Line, or Polygon
- **Drawing Color**: Choose annotation color
- **Lighting**: Adjust intensity and color
- **Interaction**:
  - Click to place points
  - Click and drag to draw lines/polygons
  - Double-click to finalize shapes
  - Live preview and measurement (length/area)

## ⚡ Performance

- Accelerated raycasting and picking (three-mesh-bvh)
- Optimized rendering for smooth 60+ FPS experience

## 📦 Dependencies

- React
- React Three Fiber
- three-mesh-bvh
- Leva
- Zustand
- Vite
- TypeScript

## 📝 Key Source Files

- **Editor** ([src/stages/Editor.tsx](https://github.com/pvscreations/cloth-editor/blob/master/src/stages/Editor.tsx))
  - Main annotation interface for drawing points, lines, and polygons on the model surface.
  - Integrates Leva controls for drawing mode, color, and lighting.
  - Handles pointer events for interactive annotation.

- **ClothModel** ([src/components/ClothModel.tsx](https://github.com/pvscreations/cloth-editor/blob/master/src/components/ClothModel.tsx))
  - Loads and displays the .glb model.
  - Applies color and material settings from Leva controls.
  - Uses three-mesh-bvh for efficient raycasting and picking.

- **StartButton** ([src/stages/StartButton.tsx](https://github.com/pvscreations/cloth-editor/blob/master/src/stages/StartButton.tsx))
  - Displays a start button with progress/fade effects before entering the main editor.
  - Handles game stage transitions and progress bar logic.

- **Assets Config** ([src/config/assetsConfig.ts](https://github.com/pvscreations/cloth-editor/blob/master/src/config/assetsConfig.ts))
  - Central configuration for all assets used in the app (models, textures, etc.).
  - Defines asset types, names, and file paths for loading resources.
  - Example:
    ```ts
    export const assetsConfig: IAsset = {
      [EAssets.CLOTH_MODEL]: {
        name: EAssets.CLOTH_MODEL,
        type: EAssetsType.GLB,
        path: "/model/cloth.glb",
      },
      [EAssets.CLOTH_TEXTURE]: {
        name: EAssets.CLOTH_TEXTURE,
        type: EAssetsType.TEXTURE,
        path: "/model/cloth_final.jpg",
      },
    };
    ```

- **Leva Config** ([src/config/levaConfig.ts](https://github.com/pvscreations/cloth-editor/blob/master/src/config/levaConfig.ts))
  - Central configuration for all Leva UI controls in the app.
  - Defines editor controls (drawing mode, offset), model controls (color), lighting controls, postprocessing, and debugging options.
  - Example:
    ```ts
    export const editorConfig = {
      editorType: {
        value: EEditorType.LINE,
        options: [EEditorType.POINT, EEditorType.LINE, EEditorType.POLYGON],
      },
      offset: { value: 0.03, min: 0, max: 0.1, step: 0.01 },
    };
    export const modelConfig = {
      modelColor: {
        value: "#ff0000", // default red
      },
    };
    export const lightsConfig = {
      directionalIntensity: { value: 4.5, min: 0, max: 10, step: 0.1 },
      ambientIntensity: { value: 1.5, min: 0, max: 5, step: 0.1 },
      directionalPositionX: { value: 4, min: -10, max: 10, step: 0.1 },
      directionalPositionY: { value: 4, min: -10, max: 10, step: 0.1 },
      directionalPositionZ: { value: 1, min: -10, max: 10, step: 0.1 },
    };
    ```

## 🌐 Demo

Try the app live: [https://cloth-annotator.vercel.app/](https://cloth-annotator.vercel.app/)

## 📄 License

MIT
