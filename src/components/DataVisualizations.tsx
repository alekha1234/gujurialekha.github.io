'use client';

import React, { useState } from 'react';
import { Activity, Sliders, CheckCircle, BarChart3 } from 'lucide-react';

export default function DataVisualizations() {
  const [threshold, setThreshold] = useState(0.5);

  // Calculate dynamic demo confusion matrix numbers based on threshold
  // Simulating the Portuguese Bank deposit prediction dataset
  const totalPositives = 5289;
  const totalNegatives = 39922;

  // As threshold increases, precision goes up, recall goes down
  const truePositives = Math.round(totalPositives * (1 - threshold * 0.45));
  const falseNegatives = totalPositives - truePositives;
  const falsePositives = Math.round(totalNegatives * (1 - threshold) * 0.12);
  const trueNegatives = totalNegatives - falsePositives;

  const precision = ((truePositives / (truePositives + falsePositives)) * 100).toFixed(1);
  const recall = ((truePositives / (truePositives + falseNegatives)) * 100).toFixed(1);
  const f1 = (
    (2 * ((parseFloat(precision) * parseFloat(recall)) / (parseFloat(precision) + parseFloat(recall))))
  ).toFixed(1);

  return (
    <div className="rounded-xl border border-lab-border bg-lab-surface/70 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-lab-border gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2 h-2 rounded-full bg-lab-accent inline-block animate-pulse" />
            <h4 className="font-display font-bold text-lg text-lab-text-primary">
              Interactive Model Evaluation Sandbox
            </h4>
          </div>
          <p className="text-xs font-mono text-lab-text-muted">
            Live simulation of classification threshold calibration (e.g. Bank Lead Conversion Model)
          </p>
        </div>

        {/* Threshold Slider */}
        <div className="flex items-center space-x-3 bg-lab-bg px-3 py-1.5 rounded-lg border border-lab-border">
          <Sliders className="w-3.5 h-3.5 text-lab-accent" />
          <span className="font-mono text-xs text-lab-text-secondary">
            THRESHOLD: <span className="text-lab-accent font-bold">{threshold.toFixed(2)}</span>
          </span>
          <input
            type="range"
            min="0.1"
            max="0.9"
            step="0.05"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            className="w-24 accent-lab-accent cursor-pointer"
          />
        </div>
      </div>

      {/* Grid: Confusion Matrix + Calculated Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Confusion Matrix Visual */}
        <div className="md:col-span-7 space-y-2">
          <div className="font-mono text-[10px] text-lab-text-muted uppercase tracking-wider flex justify-between">
            <span>CONFUSION MATRIX [N=45,211]</span>
            <span>ACTUAL vs PREDICTED</span>
          </div>

          <div className="grid grid-cols-2 gap-2 font-mono text-xs">
            {/* TP */}
            <div className="p-4 rounded-lg bg-emerald-500/10 border border-lab-accent/40 space-y-1 text-center">
              <span className="text-[10px] text-lab-accent uppercase font-bold">True Positive (TP)</span>
              <div className="text-xl font-bold text-lab-text-primary">{truePositives.toLocaleString()}</div>
              <span className="text-[10px] text-lab-text-muted block">Subscribers Identified</span>
            </div>

            {/* FP */}
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 space-y-1 text-center">
              <span className="text-[10px] text-red-400 uppercase font-bold">False Positive (FP)</span>
              <div className="text-xl font-bold text-lab-text-primary">{falsePositives.toLocaleString()}</div>
              <span className="text-[10px] text-lab-text-muted block">Wasted Outreach</span>
            </div>

            {/* FN */}
            <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/30 space-y-1 text-center">
              <span className="text-[10px] text-amber-400 uppercase font-bold">False Negative (FN)</span>
              <div className="text-xl font-bold text-lab-text-primary">{falseNegatives.toLocaleString()}</div>
              <span className="text-[10px] text-lab-text-muted block">Missed Subscribers</span>
            </div>

            {/* TN */}
            <div className="p-4 rounded-lg bg-lab-elevated border border-lab-border space-y-1 text-center">
              <span className="text-[10px] text-lab-text-muted uppercase font-bold">True Negative (TN)</span>
              <div className="text-xl font-bold text-lab-text-primary">{trueNegatives.toLocaleString()}</div>
              <span className="text-[10px] text-lab-text-muted block">Filtered Correctly</span>
            </div>
          </div>
        </div>

        {/* Calculated Clinical Metrics */}
        <div className="md:col-span-5 space-y-3 font-mono">
          <div className="p-3 rounded-lg bg-lab-bg border border-lab-border flex items-center justify-between">
            <div>
              <div className="text-[10px] text-lab-text-muted uppercase">PRECISION (PPV)</div>
              <div className="text-lg font-bold text-lab-cyan">{precision}%</div>
            </div>
            <div className="text-right text-[10px] text-lab-text-secondary max-w-[140px]">
              Confidence that a targeted lead will convert.
            </div>
          </div>

          <div className="p-3 rounded-lg bg-lab-bg border border-lab-border flex items-center justify-between">
            <div>
              <div className="text-[10px] text-lab-text-muted uppercase">RECALL (SENSITIVITY)</div>
              <div className="text-lg font-bold text-lab-accent">{recall}%</div>
            </div>
            <div className="text-right text-[10px] text-lab-text-secondary max-w-[140px]">
              Percentage of total deposit prospects captured.
            </div>
          </div>

          <div className="p-3 rounded-lg bg-lab-bg border border-lab-border flex items-center justify-between">
            <div>
              <div className="text-[10px] text-lab-text-muted uppercase">HARMONIC MEAN (F1)</div>
              <div className="text-lg font-bold text-lab-amber">{f1}%</div>
            </div>
            <div className="text-right text-[10px] text-lab-text-secondary max-w-[140px]">
              Balanced score under severe class imbalance.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
