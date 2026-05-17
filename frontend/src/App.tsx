import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import "./App.css";

interface Campaign {
  campaignId: string;
  campaignName: string;
  impressions: number;
  clicks: number;
  spend: number;
  ctr: number;
  cpc: number;
  reach: number;
}

function App() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [search, setSearch] = useState("");

  const fetchCampaigns = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        "https://groove-ai-platform.onrender.com/api/meta/sync"
      );

      const data = await response.json();

      if (data.success) {
        setCampaigns(data.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const askAI = async () => {
    try {
      if (!question.trim()) return;

      setAiLoading(true);

      const response = await fetch(
        "https://groove-ai-platform.onrender.com/api/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ question }),
        }
      );

      const data = await response.json();

      if (data.success) {
        setAnswer(data.answer);
      }
    } catch (error) {
      console.error(error);
      setAnswer("Server error");
    } finally {
      setAiLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const filteredCampaigns = useMemo(() => {
    return campaigns.filter((campaign) =>
      campaign.campaignName
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [campaigns, search]);

  const totalSpend = campaigns.reduce(
    (acc, item) => acc + item.spend,
    0
  );

  const totalClicks = campaigns.reduce(
    (acc, item) => acc + item.clicks,
    0
  );

  const totalImpressions = campaigns.reduce(
    (acc, item) => acc + item.impressions,
    0
  );

  return (
    <div className={darkMode ? "app" : "app light"}>
      <div className="container">
        <div className="hero-section">
          <div>
            <h1>Groove AI Dashboard</h1>
            <p>
              AI-powered Meta campaign analytics
            </p>
          </div>

          <div className="hero-actions">
            <button
              className="toggle-btn"
              onClick={() =>
                setDarkMode(!darkMode)
              }
            >
              {darkMode ? "Light" : "Dark"} Mode
            </button>

            <button
              className="sync-button"
              onClick={fetchCampaigns}
            >
              {loading ? "Syncing..." : "Sync"}
            </button>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span>Total Spend</span>
            <h2>${totalSpend.toFixed(2)}</h2>
          </div>

          <div className="stat-card">
            <span>Total Clicks</span>
            <h2>{totalClicks}</h2>
          </div>

          <div className="stat-card">
            <span>Impressions</span>
            <h2>{totalImpressions}</h2>
          </div>
        </div>

        <div className="chart-card">
          <div className="section-header">
            <h2>Campaign Spend Analytics</h2>
            <p>Visual campaign comparison</p>
          </div>

          <ResponsiveContainer
            width="100%"
            height={350}
          >
            <BarChart data={filteredCampaigns}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="campaignName" />

              <YAxis />

              <Tooltip />

              <Bar dataKey="spend" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="table-section">
          <div className="section-header">
            <h2>Campaign Performance</h2>
            <p>
              Filter and analyze campaigns
            </p>
          </div>

          <input
            className="search-input"
            placeholder="Search campaigns..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Campaign</th>
                  <th>Spend</th>
                  <th>Clicks</th>
                  <th>CTR</th>
                  <th>Reach</th>
                </tr>
              </thead>

              <tbody>
                {filteredCampaigns.map((campaign) => (
                  <tr key={campaign.campaignId}>
                    <td>{campaign.campaignName}</td>
                    <td>${campaign.spend}</td>
                    <td>{campaign.clicks}</td>
                    <td>{campaign.ctr}%</td>
                    <td>{campaign.reach}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="ai-card">
          <div className="section-header">
            <h2>AI Campaign Assistant</h2>
            <p>
              Ask questions about campaign insights
            </p>
          </div>

          <div className="ai-input-container">
            <input
              type="text"
              placeholder="How can I improve CTR?"
              value={question}
              onChange={(e) =>
                setQuestion(e.target.value)
              }
            />

            <button onClick={askAI}>
              {aiLoading ? "Thinking..." : "Ask AI"}
            </button>
          </div>

          {answer && (
            <div className="answer-box">
              <h3>AI Recommendation</h3>
              <p>{answer}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
