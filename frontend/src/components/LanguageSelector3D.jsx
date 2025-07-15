import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, Text } from '@react-three/drei'
import * as THREE from 'three'

const languages = [
    { name: "JavaScript", color: "#f0db4f", position: [0, 0, 5] },
    { name: "Python", color: "#3776ab", position: [5, 0, 0] },
    { name: "Java", color: "#007396", position: [0, 0, -5] },
    { name: "C++", color: "#00599c", position: [-5, 0, 0] }
]

const LanguageSphere = ({ language, onClick, isSelected }) => {
    const ref = useRef()

    useFrame(({ clock }) => {
        ref.current.rotation.y = clock.getElapsedTime() * 0.2
        if (!isSelected) {
            ref.current.position.y = Math.sin(clock.getElapsedTime() * 2) * 0.3
        }
    })

    return (
        <group position={language.position} onClick={onClick}>
            <Sphere ref={ref} args={[1, 32, 32]}>
                <meshStandardMaterial
                    color={language.color}
                    emissive={isSelected ? language.color : "#000000"}
                    emissiveIntensity={isSelected ? 0.8 : 0}
                    roughness={0.4}
                    metalness={0.3}
                />
            </Sphere>
            <Text
                position={[0, -2, 0]}
                color={language.color}
                fontSize={0.8}
                anchorX="center"
                anchorY="middle"
            >
                {language.name}
            </Text>
        </group>
    )
}

export default function LanguageSelector3D({ selectedLanguage, onChange }) {
    return (
        <Canvas
            camera={{ position: [0, 5, 10], fov: 45 }}
            style={{ height: '400px', background: 'linear-gradient(to bottom, #f8fafc, #e2e8f0)' }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />

            <OrbitControls
                enableZoom={false}
                autoRotate
                autoRotateSpeed={1}
                minPolarAngle={Math.PI / 4}
                maxPolarAngle={Math.PI / 2}
            />

            {languages.map((lang) => (
                <LanguageSphere
                    key={lang.name}
                    language={lang}
                    isSelected={selectedLanguage === lang.name}
                    onClick={() => onChange(lang.name)}
                />
            ))}
        </Canvas>
    )
}