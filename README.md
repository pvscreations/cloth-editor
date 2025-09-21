# 3D Ball Game

A physics-based 3D game built with React Three Fiber, GSAP, and Rapier physics engine. Navigate through various obstacles while controlling a ball in this engaging 3D environment.

## 🎮 Features & Technologies

### Three.js Concepts & Technologies Used

- **Physics Engine**: [@react-three/rapier](https://github.com/pmndrs/react-three-rapier) for realistic physics simulation
- **CSG & BVH**: Used three-bvh-csg for advanced geometry operations in board creation
- **Shaders**:
  - Custom Portal shader with vertex and fragment shaders
  - Firefly material for particle effects
- **Post-processing**:
  - Vignette effect using @react-three/postprocessing
  - Custom effect composer setup
- **Lights & Shadows**:
  - Dynamic directional light following camera
  - Ambient lighting
  - Real-time shadow mapping
- **Animation**:
  - GSAP for smooth UI animations
  - Pulse effects on game elements
- **State Management**:
  - Zustand for game state management
  - Leva for debug controls
- **Asset Loading**:
  - Custom asset loader for textures and GLTF models
  - Efficient resource management
- **Analytics**:
  - Integration with Vercel Analytics
  - Custom analytics tag manager

### Game Features

- Multiple obstacle types:
  - Spinner blocks
  - Axe blocks
  - Limbo blocks
  - Ring variations of each block
  - Window variations of each block
- Smooth camera following
- Keyboard controls (WASD/Arrow keys)
- Physics-based ball movement
- Progressive difficulty
- End portal with custom shader effects

## 📁 Project Structure

```
src/
├── analytics/         # Analytics setup and configuration
├── components/        # Reusable React components
├── config/           # Configuration files
├── constants/        # Game constants and asset definitions
├── controllers/      # Game control logic
├── effects/         # Post-processing and visual effects
├── features/        # Game features (Pulse, Fade effects)
├── geometry/        # Custom geometry definitions
├── levels/          # Level components and obstacles
├── loaders/         # Asset loading utilities
├── shaders/         # Custom shader implementations
├── stages/          # Game stages (Menu, Gameplay)
├── stores/          # Zustand state management
└── types/           # TypeScript type definitions
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm dev
   ```
4. Build for production:
   ```bash
   pnpm build
   ```

## 🎮 Controls

- **Move Forward**: W or Arrow Up
- **Move Backward**: S or Arrow Down
- **Move Left**: A or Arrow Left
- **Move Right**: D or Arrow Right
- **Jump**: Space

## 🛠️ Development Tools

- **TypeScript** for type-safe code
- **Vite** for fast development and building
- **ESLint** for code linting
- **Prettier** for code formatting
- **Leva** for debug controls
- **R3F-Perf** for performance monitoring

## 🌐 Live Demo

Try the game at: [https://ball-game.vercel.app/](https://ball-game.vercel.app/)

## 📝 License

MIT
