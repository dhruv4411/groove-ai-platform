import { useEffect, useState } from 'react';
import './App.css';

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

  const [campaigns, setCampaigns] = useState<
    Campaign[]
  >([]);

  const [loading, setLoading] =
    useState(false);

  const [question, setQuestion] =
    useState('');

  const [answer, setAnswer] =
    useState('');

  const fetchCampaigns = async () => {

    try {

      setLoading(true);

      const response = await fetch(
        'http://localhost:3000/api/meta/sync'
      );

      const data = await response.json();

      setCampaigns(data.data || []);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const totalSpend = campaigns.reduce(
    (acc, curr) => acc + curr.spend,
    0
  );

  const totalClicks = campaigns.reduce(
    (acc, curr) => acc + curr.clicks,
    0
  );

  const totalImpressions = campaigns.reduce(
    (acc, curr) => acc + curr.impressions,
    0
  );

  const askAI = () => {

    if (
      question.toLowerCase().includes('best')
    ) {

      const bestCampaign = [...campaigns].sort(
        (a, b) => b.ctr - a.ctr
      )[0];

      setAnswer(
        `The best performing campaign is ${bestCampaign?.campaignName} with a CTR of ${bestCampaign?.ctr}%.`
      );

    } else if (
      question.toLowerCase().includes('spend')
    ) {

      setAnswer(
        `Total ad spend is $${totalSpend.toFixed(
          2
        )}.`
      );

    } else {

      setAnswer(
        'AI insights currently support campaign performance and spend analysis.'
      );
    }
  };

  return (
    <div className="app">

      <div className="header">
        <div>
          <h1>Groove AI Dashboard</h1>
          <p>
            AI-powered Meta campaign analytics
          </p>
        </div>

        <button onClick={fetchCampaigns}>
          {loading
            ? 'Syncing...'
            : 'Sync Campaigns'}
        </button>
      </div>

      <div className="stats-grid">

        <div className="card">
          <h3>Total Spend</h3>
          <h2>
            ${totalSpend.toFixed(2)}
          </h2>
        </div>

        <div className="card">
          <h3>Total Clicks</h3>
          <h2>{totalClicks}</h2>
        </div>

        <div className="card">
          <h3>Impressions</h3>
          <h2>{totalImpressions}</h2>
        </div>

      </div>

      <div className="table-container">

        <h2>Campaign Performance</h2>

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

            {campaigns.map((campaign) => (

              <tr key={campaign.campaignId}>
                <td>
                  {campaign.campaignName}
                </td>

                <td>
                  ${campaign.spend}
                </td>

                <td>
                  {campaign.clicks}
                </td>

                <td>
                  {campaign.ctr}%
                </td>

                <td>
                  {campaign.reach}
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <div className="ai-box">

        <h2>AI Campaign Assistant</h2>

        <div className="ai-input">

          <input
            type="text"
            placeholder="Ask about campaign performance..."
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
          />

          <button onClick={askAI}>
            Ask AI
          </button>

        </div>

        {answer && (
          <div className="ai-response">
            {answer}
          </div>
        )}

      </div>

    </div>
  );
}

export default App;