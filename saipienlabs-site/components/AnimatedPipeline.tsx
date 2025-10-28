'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function AnimatedPipeline() {
  const [isHovered, setIsHovered] = useState(false);
  const animationSpeed = isHovered ? 5 : 6; // Speed up on hover

  // Pipeline nodes
  const nodes = [
    { id: 'code', label: 'Code', x: 50, y: 150 },
    { id: 'build', label: 'Build', x: 200, y: 150 },
    { id: 'test', label: 'Test', x: 350, y: 150 },
    { id: 'deploy', label: 'Deploy', x: 500, y: 150 },
  ];

  // Particle animation variants
  const particleVariants = {
    animate: {
      x: [0, 150, 300, 450],
      transition: {
        duration: animationSpeed,
        repeat: Infinity,
        ease: "linear",
      }
    }
  };

  return (
    <div
      className="relative w-full h-80 bg-slate border-t-2 border-aurora rounded-xl p-8 shadow-2xl backdrop-blur-sm overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="pipeline-grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 0 L 40 0 L 40 40" stroke="rgba(199,210,224,0.3)" strokeWidth="0.5" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#pipeline-grid)" />
        </svg>
      </div>

      {/* Pipeline SVG */}
      <svg className="w-full h-full relative z-10" viewBox="0 0 550 300">
        <defs>
          {/* Aurora gradient for the pipeline */}
          <linearGradient id="pipeline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00BFA6" />
            <stop offset="50%" stopColor="#4C8DFF" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Pipeline Connections */}
        {nodes.slice(0, -1).map((node, i) => {
          const nextNode = nodes[i + 1];
          return (
            <line
              key={`line-${node.id}`}
              x1={node.x + 40}
              y1={node.y}
              x2={nextNode.x - 40}
              y2={nextNode.y}
              stroke="url(#pipeline-gradient)"
              strokeWidth="3"
              opacity="0.3"
            />
          );
        })}

        {/* Animated Particles */}
        {[0, 1, 2].map((index) => (
          <motion.circle
            key={`particle-${index}`}
            r="4"
            fill="url(#pipeline-gradient)"
            filter="url(#glow)"
            initial={{ x: 50, y: 150, opacity: 0 }}
            animate={{
              x: [50, 200, 350, 500],
              opacity: [0, 1, 1, 0],
              transition: {
                duration: animationSpeed,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * (animationSpeed / 3),
              }
            }}
          />
        ))}

        {/* Pipeline Nodes */}
        {nodes.map((node, index) => (
          <g key={node.id}>
            {/* Node Circle */}
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="30"
              fill="#1A2430"
              stroke={index === nodes.length - 1 ? "#00BFA6" : "url(#pipeline-gradient)"}
              strokeWidth="2"
              initial={{ scale: 1 }}
              animate={{
                scale: index === nodes.length - 1 ? [1, 1.1, 1] : 1,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* Node Icon/Label */}
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill="#C7D2E0"
              fontSize="12"
              fontFamily="JetBrains Mono, monospace"
              fontWeight="600"
            >
              {node.label === 'Deploy' ? '✓' : node.label.substring(0, 1)}
            </text>

            {/* Node Label Below */}
            <text
              x={node.x}
              y={node.y + 50}
              textAnchor="middle"
              fill="#C7D2E0"
              fontSize="11"
              fontFamily="JetBrains Mono, monospace"
              opacity="0.6"
            >
              {node.label}
            </text>
          </g>
        ))}

        {/* Deploy Success Indicator */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: animationSpeed - 3,
          }}
        >
          <text
            x={500}
            y={120}
            textAnchor="middle"
            fill="#00BFA6"
            fontSize="10"
            fontFamily="JetBrains Mono, monospace"
            fontWeight="600"
          >
            deployed ✓
          </text>
        </motion.g>
      </svg>

      {/* Metrics Display */}
      <motion.div
        className="absolute bottom-6 left-8 right-8 flex justify-between items-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <div className="text-xs font-mono text-mist/40">
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            // pipeline active
          </motion.span>
        </div>
        <div className="flex gap-4 text-xs font-mono">
          <span className="text-accentTeal">~{animationSpeed}s cycle</span>
          <span className="text-accentBlue">AI-accelerated</span>
        </div>
      </motion.div>
    </div>
  );
}
