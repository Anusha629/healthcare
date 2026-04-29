export default function AnalyticsPage() {
  return (
    <div className="analytics-page">
      <div className="analytics-hero">
        <div>
          <p className="eyebrow">Insights</p>
          <h1>Data that helps care teams move faster.</h1>
          <p>
            Track operational health, resource trends, and performance signals
            across your clinic or hospital network.
          </p>
        </div>
      </div>

      <div className="analytics-grid">
        <article className="chart-card">
          <div className="chart-header">
            <h2>Staff response time</h2>
            <span>11% improvement</span>
          </div>
          <div className="chart-bar chart-bar-1" />
        </article>

        <article className="chart-card">
          <div className="chart-header">
            <h2>Patient turnover</h2>
            <span>68 admitted</span>
          </div>
          <div className="chart-bar chart-bar-2" />
        </article>

        <article className="chart-card">
          <div className="chart-header">
            <h2>Alert volume</h2>
            <span>42 notifications</span>
          </div>
          <div className="chart-bar chart-bar-3" />
        </article>
      </div>

      <div className="analytics-summary">
        <div>
          <h3>Risk & capacity</h3>
          <p>
            Use analytics to reduce patient escalation by 20% and keep staffing
            aligned with demand peaks.
          </p>
        </div>
        <div className="summary-badges">
          <span>Ward coverage 84%</span>
          <span>Schedule adherence 93%</span>
          <span>Predictive readmissions 7%</span>
        </div>
      </div>
    </div>
  );
}
