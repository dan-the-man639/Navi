"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Box, Environment } from "@react-three/drei"
import { Group, Mesh } from "three"
import Image from "next/image"

function MouseTrackingVisualization() {
  const groupRef = useRef<Group>(null)
  const sphereRefs = useRef<(Mesh | null)[]>([])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }

    sphereRefs.current.forEach((sphere, i) => {
      if (sphere) {
        sphere.position.y = Math.sin(state.clock.elapsedTime * 2 + i) * 0.5
        sphere.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3 + i) * 0.2)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Mouse cursor trail */}
      {Array.from({ length: 8 }).map((_, i) => (
        <Sphere
          key={i}
          ref={(el: Mesh | null) => {
            sphereRefs.current[i] = el
          }}
          args={[0.1, 16, 16]}
          position={[Math.cos((i / 8) * Math.PI * 2) * 2, 0, Math.sin((i / 8) * Math.PI * 2) * 2]}
        >
          <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.3} />
        </Sphere>
      ))}

      {/* Central interaction point */}
      <Sphere args={[0.3, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FF8C42" emissive="#FF8C42" emissiveIntensity={0.5} />
      </Sphere>

      {/* Click indicators */}
      {Array.from({ length: 3 }).map((_, i) => (
        <Box
          key={`click-${i}`}
          args={[0.2, 0.2, 0.2]}
          position={[
            Math.cos((i / 3) * Math.PI * 2 + Math.PI) * 1.5,
            0, // Removed state.clock?.elapsedTime * 4 + i to fix undeclared variable error
            Math.sin((i / 3) * Math.PI * 2 + Math.PI) * 1.5,
          ]}
        >
          <meshStandardMaterial color="#D2691E" />
        </Box>
      ))}
    </group>
  )
}

function QualityControlVisualization() {
  const groupRef = useRef<Group>(null)
  const barRefs = useRef<(Mesh | null)[]>([])
  const indicatorRefs = useRef<(Mesh | null)[]>([])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.3
    }

    barRefs.current.forEach((bar, i) => {
      if (bar) {
        const height = 1 + Math.sin(state.clock.elapsedTime * 2 + i * 0.5) * 0.5
        bar.scale.y = height
        bar.position.y = (height - 1) * 0.5
      }
    })

    indicatorRefs.current.forEach((indicator, i) => {
      if (indicator) {
        indicator.position.y = Math.sin(state.clock.elapsedTime * 3 + i) * 0.5
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Quality metrics bars */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Box key={i} ref={(el: Mesh | null) => {
          barRefs.current[i] = el
        }} args={[0.3, 1, 0.3]} position={[(i - 2.5) * 0.8, 0, 0]}>
          <meshStandardMaterial
            color={i < 4 ? "#FF6B6B" : "#FF8C42"}
            emissive={i < 4 ? "#FF6B6B" : "#FF8C42"}
            emissiveIntensity={0.2}
          />
        </Box>
      ))}

      {/* Quality indicators */}
      {Array.from({ length: 4 }).map((_, i) => (
        <Sphere
          key={`indicator-${i}`}
          ref={(el: Mesh | null) => {
            indicatorRefs.current[i] = el
          }}
          args={[0.15, 16, 16]}
          position={[Math.cos((i / 4) * Math.PI * 2) * 3, 0, Math.sin((i / 4) * Math.PI * 2) * 3]}
        >
          <meshStandardMaterial color="#D2691E" emissive="#D2691E" emissiveIntensity={0.4} />
        </Sphere>
      ))}
    </group>
  )
}

function DataVisualization() {
  const groupRef = useRef<Group>(null)
  const nodeRefs = useRef<(Mesh | null)[]>([])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
    }

    nodeRefs.current.forEach((node, i) => {
      if (node) {
        node.position.y = Math.sin(state.clock.elapsedTime * 1.5 + i * 0.8) * 0.3
        node.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.1)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Data nodes representing different data types */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const radius = 2.5
        return (
          <Sphere
            key={i}
            ref={(el: Mesh | null) => {
              nodeRefs.current[i] = el
            }}
            args={[0.15, 16, 16]}
            position={[Math.cos(angle) * radius, 0, Math.sin(angle) * radius]}
          >
            <meshStandardMaterial
              color={i % 4 === 0 ? "#FF6B6B" : i % 4 === 1 ? "#FF8C42" : i % 4 === 2 ? "#D2691E" : "#FFB366"}
              emissive={i % 4 === 0 ? "#FF6B6B" : i % 4 === 1 ? "#FF8C42" : i % 4 === 2 ? "#D2691E" : "#FFB366"}
              emissiveIntensity={0.3}
            />
          </Sphere>
        )
      })}

      {/* Central hub */}
      <Sphere args={[0.4, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#FF6B6B" emissive="#FF6B6B" emissiveIntensity={0.5} />
      </Sphere>

      {/* Connecting lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <Box
          key={`connection-${i}`}
          args={[0.02, 2, 0.02]}
          position={[Math.cos((i / 6) * Math.PI * 2) * 1.2, 0, Math.sin((i / 6) * Math.PI * 2) * 1.2]}
          rotation={[0, (i / 6) * Math.PI * 2, 0]}
        >
          <meshStandardMaterial color="#D2691E" emissive="#D2691E" emissiveIntensity={0.2} />
        </Box>
      ))}
    </group>
  )
}

function ModelTrainingVisualization() {
  const groupRef = useRef<Group>(null)
  const layerRefs = useRef<(Group | null)[]>([])
  const neuronRefs = useRef<(Mesh | null)[]>([])

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15
    }

    layerRefs.current.forEach((layer, i) => {
      if (layer) {
        layer.position.x = Math.sin(state.clock.elapsedTime * 1.5 + i * 0.5) * 0.1
      }
    })

    neuronRefs.current.forEach((neuron, i) => {
      if (neuron) {
        neuron.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 3 + i * 0.3) * 0.2)
      }
    })
  })

  return (
    <group ref={groupRef}>
      {/* Neural network layers */}
      {Array.from({ length: 4 }).map((_, layerIndex) => (
        <group key={layerIndex} ref={(el: Group | null) => {
          layerRefs.current[layerIndex] = el
        }}>
          {Array.from({ length: 5 }).map((_, neuronIndex) => (
            <Sphere
              key={`${layerIndex}-${neuronIndex}`}
              ref={(el: Mesh | null) => {
                neuronRefs.current[layerIndex * 5 + neuronIndex] = el
              }}
              args={[0.12, 16, 16]}
              position={[layerIndex * 1.5 - 2.25, (neuronIndex - 2) * 0.8, 0]}
            >
              <meshStandardMaterial
                color={layerIndex === 0 ? "#FF6B6B" : layerIndex === 3 ? "#FF8C42" : "#D2691E"}
                emissive={layerIndex === 0 ? "#FF6B6B" : layerIndex === 3 ? "#FF8C42" : "#D2691E"}
                emissiveIntensity={0.4}
              />
            </Sphere>
          ))}
        </group>
      ))}

      {/* Connection lines between layers */}
      {Array.from({ length: 3 }).map((_, connectionIndex) => (
        <group key={`connections-${connectionIndex}`}>
          {Array.from({ length: 10 }).map((_, lineIndex) => (
            <Box
              key={`line-${connectionIndex}-${lineIndex}`}
              args={[1.5, 0.01, 0.01]}
              position={[connectionIndex * 1.5 - 1.5 + 0.75, (Math.random() - 0.5) * 3, 0]}
              rotation={[0, 0, (Math.random() - 0.5) * 0.5]}
            >
              <meshStandardMaterial color="#FFB366" emissive="#FFB366" emissiveIntensity={0.1} />
            </Box>
          ))}
        </group>
      ))}
    </group>
  )
}

export default function NaviLandingPage() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-white text-gray-800 px-0 mx-0 shadow-2xl">
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-white/90 backdrop-blur-md border-b border-orange-200 shadow-lg shadow-orange-500/10" : "bg-transparent"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between h-16">
            
          <div className="flex items-center gap-2">
              <Image src="/Favicon.png" alt="Navi" width={25} height={25} />
              <h3 className="text-xl font-light text-gray-900 ">NAVI</h3>
              </div>
            <nav className="hidden md:flex items-center space-x-8">
              <button
                onClick={() => scrollToSection("products")}
                className="text-gray-600 hover:text-gray-900 transition-colors font-light"
              >
                Products
              </button>
              <button
                onClick={() => scrollToSection("founders")}
                className="text-gray-600 hover:text-gray-900 transition-colors font-light"
              >
                Founders
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-gray-600 hover:text-gray-900 transition-colors font-light"
              >
                About
              </button>
              <Button className="bg-[#FF8C42] text-white hover:bg-[#FF8C42]/90 rounded-md px-4 py-2 font-normal text-sm shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/40 transition-all duration-300">
                Book a Demo
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="h-screen pt-52 pb-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-thin text-gray-900 mb-8 leading-tight text-balance drop-shadow-lg">
            Shape the next generation of computer-use AI
          </h1>
          <p className="text-xl md:text-2xl font-light text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Navi makes it fun to generate the datasets that power tomorrow&apos;s computer-use agents.
          </p>
          <Button
            size="lg"
            className="bg-[#FF8C42] text-white hover:bg-[#FF8C42]/90 rounded-md px-6 py-3 text-base font-normal shadow-xl shadow-orange-500/40 hover:shadow-2xl hover:shadow-orange-500/50 transition-all duration-300"
          >
            Buy our Data
          </Button>
        </div>
      </section>

      {/* We Partner With */}
      <section className="py-16 px-0">
        <div className="w-full text-center ">
          <h2 className="text-2xl font-light text-gray-900 mb-6 drop-shadow-md">We Partner With</h2>
          <div className="relative overflow-hidden">
            <div className="animate-text-scroll whitespace-nowrap">
              <span className="text-gray-600 text-lg font-light">
                Leading productivity-AI startups building the next generation of intelligent automation · innovative
                design studios crafting user-centric experiences · top-tier research universities advancing computer
                vision and human-computer interaction · enterprise RPA vendors scaling automation solutions · federal
                innovation units developing cutting-edge AI applications for government services · Fortune 500 companies
                implementing AI-driven workflow optimization · Leading productivity-AI startups building the next
                generation of intelligent automation · innovative design studios crafting user-centric experiences ·
                top-tier research universities advancing computer vision and human-computer interaction · enterprise RPA
                vendors scaling automation solutions · federal innovation units developing cutting-edge AI applications
                for government services · Fortune 500 companies implementing AI-driven workflow optimization
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Quality CUA Data */}
      <section id="products" className="py-52 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 text-center mb-16 drop-shadow-lg">Quality CUA Data</h2>
          <div className="grid md:grid-cols-2 gap-8 pb-10">
            <Card className="glass-card rounded-2xl p-8 hover:translate-y-[-2px] transition-all duration-300 shadow-xl shadow-gray-300/30 hover:shadow-2xl hover:shadow-orange-500/20">
              <h3 className="text-2xl font-light text-gray-900 mb-4">High-Fidelity Interaction Signals</h3>
              <p className="text-gray-600 mb-8 text-base font-light leading-relaxed">
                Pixel-level screen recordings with Mouse paths, clicks, and scrolling with millisecond precision
              </p>
            </Card>
            <Card className="bg-[#FF8C42] rounded-2xl p-8 hover:translate-y-[-2px] transition-all duration-300 shadow-xl shadow-orange-300/30 hover:shadow-2xl hover:shadow-orange-500/20">
              <h3 className="text-2xl font-light text-black mb-4">Rigorous Quality Controls</h3>
              <p className="text-black mb-8 text-base font-light leading-relaxed">
              Automatic anomaly detection catches corrupted or incomplete sessions, with continuous review to keep every dataset clean.
              </p>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-[#FF8C42] rounded-2xl p-8 hover:translate-y-[-2px] transition-all duration-300 shadow-xl shadow-orange-300/30 hover:shadow-2xl hover:shadow-orange-500/20">
              <h3 className="text-2xl font-light text-black mb-4">Detailed Session Labels</h3>
              <p className="text-black mb-8 text-base font-light leading-relaxed">
                Each dataset includes rich metadata — task type, app context, timestamps — to make training and evaluation easier.
              </p>
            </Card>
            <Card className="glass-card rounded-2xl p-8 hover:translate-y-[-2px] transition-all duration-300 shadow-xl shadow-gray-300/30 hover:shadow-2xl hover:shadow-orange-500/20">
              <h3 className="text-2xl font-light text-gray-900 mb-4">Continuous Improvement</h3>
              <p className="text-gray-600 mb-8 text-base font-light leading-relaxed">
              Quality pipelines track drift and surface edge cases, so your models always learn from the most accurate, up-to-date signals.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Diverse Data We Provide */}
      <section className="py-52 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-3">E-commerce</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Record users browsing, adding to carts, and checking out on sites like Amazon or Etsy.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-3">Productivity Tools</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Collect interaction traces from tasks in Docs, Notion, or Excel, showing edits, formatting, and
                  navigation.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-3">Enterprise Software</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Log how people update CRMs, build reports, or configure SaaS tools such as Salesforce or Jira.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-3">Search</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                  Track query edits, scrolling, and result clicks as users research across Google, Bing, and other
                  engines.
                </p>
              </div>
            </div>
            <div className="rounded-lg overflow-hidden border-2 border-orange-400">
              <Image src="/Database.png" alt="Use Our Data" width={1000} height={1000} />
            </div>
          </div>
        </div>
      </section>

      {/* Use Our Data */}
      <section className="py-52 px-4 md:px-6">
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-5xl font-thin text-gray-900 text-center mb-16 drop-shadow-lg">Use Our Data</h2>
          <div className="w-[50vw]">
            <div className="space-y-8">
              <div className="pb-8 border-b border-border">
                <h3 className="text-2xl font-light text-gray-900 mb-3">Fine-tune Models</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                Refine models with Reinforcement Learning from Human Feedback (RLHF) using curated interaction data, helping them adapt smoothly to real behavior and uncommon edge cases.
                </p>
              </div>
              <div className="pb-8 border-b border-border">
                <h3 className="text-2xl font-light text-gray-900 mb-3">Train</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                Teach agents to navigate apps, forms, and websites through authentic workflows, learning clicks, scrolls, and shortcuts for natural, reliable performance.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-light text-gray-900 mb-3">Benchmark</h3>
                <p className="text-gray-600 font-light leading-relaxed">
                Evaluate automation systems with genuine user sessions, measuring accuracy, speed, and resilience across varied tasks to ensure dependable results.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-52 px-4 md:px-6 ">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl md:text-7xl font-thin text-gray-900 mb-12 leading-tight text-balance drop-shadow-lg">
            Shape the next generation of computer-use AI
          </h2>
          <Button
            size="lg"
            className="bg-[#FF8C42] text-white hover:bg-[#FF8C42]/90 rounded-md px-8 py-4 text-lg font-normal shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/60 transition-all duration-300"
          >
            Buy our Data
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer id="founders" className="py-16 px-4 md:px-6 border-t border-gray-200 ">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
              <Image src="/Favicon.png" alt="Navi" width={25} height={25} />
              <h3 className="text-xl font-light text-gray-900 ">NAVI</h3>
              </div>
              <p className="text-gray-600 text-sm font-light leading-relaxed">
                Powering the next generation of computer-use AI with high-quality datasets.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-light text-gray-900 mb-4 uppercase tracking-wider">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors"
                  >
                    Datasets
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors"
                  >
                    API Access
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors"
                  >
                    Documentation
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors"
                  >
                    Pricing
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-light text-foreground mb-4 uppercase tracking-wider">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-light text-foreground mb-4 uppercase tracking-wider">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors"
                  >
                    Data Usage
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 text-sm font-light hover:text-gray-900 transition-colors"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-200 text-center">
            <p className="text-gray-600 text-sm font-light">© 2025 Navi. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
