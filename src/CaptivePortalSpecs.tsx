// This component visually documents the design and layout specifications for the Saraya Captive Portal.
// It is intended for reference by designers and developers and is not shown in the production UI.

import React from 'react';

export function CaptivePortalSpecs() {
  return (
    <div className="max-w-3xl mx-auto bg-gray-800 rounded-xl p-8">
      <h3 className="text-2xl font-bold text-white mb-6 text-center">Captive Portal Specifications</h3>
      <div className="bg-gray-700 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-bold text-[#7A49F0] mb-4">Captive Portal (One-Page)</h4>
        <ul className="space-y-2 text-sm text-gray-300">
          <li>• <strong>Hero:</strong> Full-bleed video (35% height, min 240px)</li>
          <li>• <strong>Overlay:</strong> Dark gradient (rgba(0,0,0,0.40))</li>
          <li>• <strong>Logo:</strong> Top-left Saraya (white)</li>
          <li>• <strong>Headline:</strong> "POVEŽI SE I ISTRAŽI PONUDE" (content only)</li>
          <li>• <strong>Recommended:</strong> Horizontal slider with "U blizini" badges</li>
          <li>• <strong>No Connect elements:</strong> Pure content experience</li>
          <li>• <strong>Responsive:</strong> Mobile, tablet, and desktop breakpoints</li>
        </ul>
      </div>
      <div className="pt-6 border-t border-gray-600">
        <h4 className="text-lg font-bold text-white mb-4">Saraya Brand Colors</h4>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#7A49F0] rounded"></div>
            <span className="text-sm text-gray-300">Primary Purple: #7A49F0</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#1E6CFF] rounded"></div>
            <span className="text-sm text-gray-300">Accent Blue: #1E6CFF</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#0E0F13] rounded border border-gray-500"></div>
            <span className="text-sm text-gray-300">Dark Background: #0E0F13</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#FFFFFF] rounded border border-gray-500"></div>
            <span className="text-sm text-gray-300">White: #FFFFFF</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#B3B3B3] rounded"></div>
            <span className="text-sm text-gray-300">Light Gray: #B3B3B3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
