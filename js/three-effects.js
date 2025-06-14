// Enhanced Three.js implementation for GlucoCorp website
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.150.1/build/three.module.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/loaders/GLTFLoader.js';
import { EffectComposer } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/shaders/FXAAShader.js';

// Initialize the 3D scene
let scene, camera, renderer, controls;
let logo3D, heroBackground, particles;
let composer, bloomPass;
let animationFrameId;
let mouseX = 0, mouseY = 0;
let targetX = 0, targetY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;
let clock = new THREE.Clock();
let mixer;

// Initialize the scene
function init() {
    // Create scene
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x000000, 0.001);
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
    camera.position.z = 5;
    camera.position.y = 1;
    
    // Create renderer with advanced settings
    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true,
        powerPreference: "high-performance"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit for performance
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Add renderer to DOM
    const container = document.getElementById('hero-3d-container');
    if (container) {
        container.appendChild(renderer.domElement);
    }
    
    // Setup post-processing
    setupPostProcessing();
    
    // Add lights with improved settings
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(1, 1, 1);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    scene.add(directionalLight);
    
    // Add a soft point light for highlights
    const pointLight = new THREE.PointLight(0xF06292, 1, 10);
    pointLight.position.set(2, 2, 2);
    scene.add(pointLight);
    
    // Add controls with improved settings
    controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = false;
    controls.enablePan = false;
    
    // Create enhanced 3D logo
    createLogo3D();
    
    // Add enhanced particles background
    createParticlesBackground();
    
    // Add event listeners
    window.addEventListener('resize', onWindowResize);
    document.addEventListener('mousemove', onMouseMove);
    
    // Start animation loop
    animate();
}

// Setup post-processing effects
function setupPostProcessing() {
    // Create composer
    composer = new EffectComposer(renderer);
    
    // Add render pass
    const renderPass = new RenderPass(scene, camera);
    composer.addPass(renderPass);
    
    // Add bloom pass for glow effect
    bloomPass = new UnrealBloomPass(
        new THREE.Vector2(window.innerWidth, window.innerHeight),
        0.5,    // strength
        0.4,    // radius
        0.85     // threshold
    );
    composer.addPass(bloomPass);
    
    // Add FXAA pass for anti-aliasing
    const fxaaPass = new ShaderPass(FXAAShader);
    fxaaPass.material.uniforms['resolution'].value.set(
        1 / (window.innerWidth * renderer.getPixelRatio()),
        1 / (window.innerHeight * renderer.getPixelRatio())
    );
    composer.addPass(fxaaPass);
}

// Handle mouse movement for interactive effects
function onMouseMove(event) {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
}

// Create an enhanced 3D logo
function createLogo3D() {
    // Create a group for the logo
    logo3D = new THREE.Group();
    
    // Create a sphere with GluCorp primary color and advanced material
    const sphereGeometry = new THREE.SphereGeometry(1, 64, 64);
    const sphereMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0xF06292,
        metalness: 0.4,
        roughness: 0.2,
        clearcoat: 0.8,
        clearcoatRoughness: 0.2,
        envMapIntensity: 1.0,
        reflectivity: 0.8,
    });
    
    const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
    sphere.castShadow = true;
    sphere.receiveShadow = true;
    logo3D.add(sphere);
    
    // Add a ring around the sphere with improved geometry and material
    const ringGeometry = new THREE.TorusGeometry(1.5, 0.12, 32, 128);
    const ringMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x4a91e2,
        metalness: 0.6,
        roughness: 0.1,
        clearcoat: 1.0,
        clearcoatRoughness: 0.1,
        transmission: 0.2,
        thickness: 0.5,
    });
    
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = Math.PI / 2;
    ring.castShadow = true;
    ring.receiveShadow = true;
    logo3D.add(ring);
    
    // Add a second, smaller ring at a different angle
    const smallRingGeometry = new THREE.TorusGeometry(1.2, 0.08, 24, 96);
    const smallRingMaterial = new THREE.MeshPhysicalMaterial({ 
        color: 0x9C27B0,
        metalness: 0.7,
        roughness: 0.1,
        clearcoat: 0.9,
        emissive: 0x330033,
        emissiveIntensity: 0.2,
    });
    
    const smallRing = new THREE.Mesh(smallRingGeometry, smallRingMaterial);
    smallRing.rotation.x = Math.PI / 4;
    smallRing.rotation.y = Math.PI / 4;
    smallRing.castShadow = true;
    smallRing.receiveShadow = true;
    logo3D.add(smallRing);
    
    // Add small decorative spheres around the main sphere
    const smallSphereGeometry = new THREE.SphereGeometry(0.15, 32, 32);
    const smallSphereMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x4a91e2,
        metalness: 0.8,
        roughness: 0.1,
        emissive: 0x001133,
        emissiveIntensity: 0.2,
    });
    
    // Create a few small spheres in orbit
    for (let i = 0; i < 5; i++) {
        const angle = (i / 5) * Math.PI * 2;
        const smallSphere = new THREE.Mesh(smallSphereGeometry, smallSphereMaterial);
        smallSphere.position.set(
            Math.cos(angle) * 2,
            Math.sin(angle) * 0.5,
            Math.sin(angle) * 2
        );
        smallSphere.castShadow = true;
        logo3D.add(smallSphere);
    }
    
    // Position the logo
    logo3D.position.set(0, 0, 0);
    scene.add(logo3D);
}

// Create enhanced particles background
function createParticlesBackground() {
    // Create two particle systems for depth effect
    createMainParticleSystem();
    createSecondaryParticleSystem();
}

// Create main particle system with custom shaders
function createMainParticleSystem() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 5000;
    
    // Create positions array
    const positions = new Float32Array(particlesCount * 3);
    const scales = new Float32Array(particlesCount);
    const colors = new Float32Array(particlesCount * 3);
    
    // Define colors for particles
    const color1 = new THREE.Color(0xF06292); // Primary color
    const color2 = new THREE.Color(0x4a91e2); // Secondary color
    const color3 = new THREE.Color(0x9C27B0); // Accent color
    
    for (let i = 0; i < particlesCount; i++) {
        // Position
        const i3 = i * 3;
        positions[i3] = (Math.random() - 0.5) * 30;
        positions[i3 + 1] = (Math.random() - 0.5) * 30;
        positions[i3 + 2] = (Math.random() - 0.5) * 30;
        
        // Scale (size variation)
        scales[i] = Math.random() * 2.5 + 0.5;
        
        // Color - blend between three colors based on position
        let colorChoice = Math.random();
        let finalColor = new THREE.Color();
        
        if (colorChoice < 0.33) {
            finalColor.copy(color1);
        } else if (colorChoice < 0.66) {
            finalColor.copy(color2);
        } else {
            finalColor.copy(color3);
        }
        
        // Add some variation to each color
        finalColor.r += (Math.random() - 0.5) * 0.1;
        finalColor.g += (Math.random() - 0.5) * 0.1;
        finalColor.b += (Math.random() - 0.5) * 0.1;
        
        colors[i3] = finalColor.r;
        colors[i3 + 1] = finalColor.g;
        colors[i3 + 2] = finalColor.b;
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    // Use custom point material with texture
    const particleTexture = new THREE.TextureLoader().load('https://assets.codepen.io/3685267/spark1.png');
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.1,
        sizeAttenuation: true,
        map: particleTexture,
        alphaMap: particleTexture,
        transparent: true,
        vertexColors: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
    });
    
    heroBackground = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(heroBackground);
}

// Create secondary, smaller particle system for depth
function createSecondaryParticleSystem() {
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 2000;
    
    const posArray = new Float32Array(particlesCount * 3);
    const colorArray = new Float32Array(particlesCount * 3);
    
    for (let i = 0; i < particlesCount; i++) {
        const i3 = i * 3;
        posArray[i3] = (Math.random() - 0.5) * 50;
        posArray[i3 + 1] = (Math.random() - 0.5) * 50;
        posArray[i3 + 2] = (Math.random() - 0.5) * 50;
        
        // Subtle color variation
        colorArray[i3] = 0.7 + Math.random() * 0.3; // Red (pink)
        colorArray[i3 + 1] = 0.3 + Math.random() * 0.3; // Green
        colorArray[i3 + 2] = 0.5 + Math.random() * 0.5; // Blue
    }
    
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
        size: 0.015,
        transparent: true,
        opacity: 0.6,
        vertexColors: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false
    });
    
    particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);
}

// Handle window resize with improved handling
function onWindowResize() {
    // Update camera
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    // Update renderer
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    // Update composer
    composer.setSize(window.innerWidth, window.innerHeight);
    
    // Update FXAA pass if it exists
    const fxaaPass = composer.passes.find(pass => pass.material && pass.material.uniforms && pass.material.uniforms.resolution);
    if (fxaaPass) {
        fxaaPass.material.uniforms.resolution.value.set(
            1 / (window.innerWidth * renderer.getPixelRatio()),
            1 / (window.innerHeight * renderer.getPixelRatio())
        );
    }
    
    // Update half window variables for mouse interaction
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
}

// Enhanced animation loop
function animate() {
    animationFrameId = requestAnimationFrame(animate);
    
    const delta = clock.getDelta();
    const elapsedTime = clock.getElapsedTime();
    
    // Smooth camera movement based on mouse position
    targetX = mouseX * 0.15;
    targetY = mouseY * 0.1;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    // Animate the logo with more complex movement
    if (logo3D) {
        // Gentle floating motion
        logo3D.position.y = Math.sin(elapsedTime * 0.5) * 0.2;
        
        // Rotation with varying speed
        logo3D.rotation.y += 0.005;
        logo3D.rotation.z = Math.sin(elapsedTime * 0.3) * 0.1;
        
        // Scale pulse effect
        const scalePulse = 1 + Math.sin(elapsedTime * 2) * 0.03;
        logo3D.scale.set(scalePulse, scalePulse, scalePulse);
        
        // Rotate child elements for additional effect
        logo3D.children.forEach((child, index) => {
            if (index > 0) { // Skip the main sphere
                child.rotation.x += 0.01 * (index % 2 ? 1 : -1);
                child.rotation.z += 0.005 * (index % 3 ? 1 : -1);
            }
        });
    }
    
    // Animate the particles backgrounds
    if (heroBackground) {
        // Main particles rotation
        heroBackground.rotation.x += 0.0002;
        heroBackground.rotation.y += 0.0003;
        
        // Respond to mouse movement
        heroBackground.rotation.x += (targetY - heroBackground.rotation.x) * 0.01;
        heroBackground.rotation.y += (targetX - heroBackground.rotation.y) * 0.01;
    }
    
    if (particles) {
        // Secondary particles with different rotation
        particles.rotation.x -= 0.0001;
        particles.rotation.y -= 0.0002;
        particles.rotation.z -= 0.0001;
    }
    
    // Update controls
    controls.update();
    
    // Render with post-processing
    composer.render();
}

// Enhanced clean up function to prevent memory leaks
function cleanup() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }
    
    // Remove all event listeners
    window.removeEventListener('resize', onWindowResize);
    document.removeEventListener('mousemove', onMouseMove);
    
    // Dispose of post-processing
    if (composer) {
        composer.passes.forEach(pass => {
            if (pass.dispose) pass.dispose();
        });
    }
    
    // Dispose of geometries and materials
    scene.traverse(object => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
            if (Array.isArray(object.material)) {
                object.material.forEach(material => disposeMaterial(material));
            } else {
                disposeMaterial(object.material);
            }
        }
    });
    
    // Helper function to dispose material properties
    function disposeMaterial(material) {
        // Dispose textures
        for (const key in material) {
            const value = material[key];
            if (value && typeof value === 'object' && 'minFilter' in value) {
                value.dispose();
            }
        }
        material.dispose();
    }
    
    // Dispose renderer
    if (renderer) {
        renderer.dispose();
        renderer.forceContextLoss();
        renderer.domElement = null;
    }
    
    // Clear all references
    scene = null;
    camera = null;
    renderer = null;
    controls = null;
    logo3D = null;
    heroBackground = null;
    particles = null;
    composer = null;
    bloomPass = null;
    clock = null;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export functions for external use
export { init, cleanup };