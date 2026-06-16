import React from 'react';
import { Target, Lightbulb, Users, Cpu, ShieldAlert, Award } from 'lucide-react';

export default function About() {
  return (
    <div className="about-page">
      {/* Brand Hero */}
      <section className="about-hero">
        <h1 className="gradient-text">Our Vision & Story</h1>
        <p>
          ShopNow is built to showcase a premium shopping user experience, coupled with cloud-native deployment excellence. We believe e-commerce should be lightning-fast, visually captivating, and resilient.
        </p>
      </section>

      {/* Stats Grid */}
      <section className="stats-grid">
        <div className="stat-card glass-panel">
          <div className="stat-num accent-text">99.99%</div>
          <div className="stat-label">Uptime SLA</div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-num accent-text">100ms</div>
          <div className="stat-label">Load Time</div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-num accent-text">2+</div>
          <div className="stat-label">Pod Replicas</div>
        </div>
        <div className="stat-card glass-panel">
          <div className="stat-num accent-text">24/7</div>
          <div className="stat-label">Monitoring</div>
        </div>
      </section>

      {/* Core Values */}
      <section className="values-section">
        <h2 className="values-title gradient-text">Our Core Pillars</h2>
        <div className="values-grid">
          <div className="value-card glass-panel">
            <div className="feature-icon-wrapper" style={{ marginBottom: '16px' }}>
              <Cpu size={22} />
            </div>
            <h3>Modern UI Architecture</h3>
            <p>
              Leveraging single-page React hydration, responsive flex structures, and high-performance assets served directly from lightweight containers.
            </p>
          </div>
          <div className="value-card glass-panel">
            <div className="feature-icon-wrapper" style={{ marginBottom: '16px' }}>
              <Award size={22} />
            </div>
            <h3>DevOps Infrastructure</h3>
            <p>
              Built using Docker multi-stage layers, automated workflows, and Kubernetes self-healing clusters to handle any load demands without downtime.
            </p>
          </div>
          <div className="value-card glass-panel">
            <div className="feature-icon-wrapper" style={{ marginBottom: '16px' }}>
              <Target size={22} />
            </div>
            <h3>Absolute Quality</h3>
            <p>
              Every dummy product contains rich metadata, high-resolution imagery, and exact parameters representing production-grade standards.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
