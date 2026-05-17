import { useEffect, useState } from 'react';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface CampaignInsight {
  id: number;
  campaignName: string;
  impressions: number;
  clicks: number;
  spend: number;
  ctr: number;
}

function App() {

  const [campaigns, setCampaigns] = useState<CampaignInsight[]>([]);
  const [aiInsights, setAiInsights] = useState<any[]>([]);
  const [chatQuery, setChatQuery] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    fetch('http://localhost:3000/api/meta/insights')
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data.data);
      });

    fetch('http://localhost:3000/api/meta/ai-insights')
      .then((res) => res.json())
      .then((data) => {
        setAiInsights(data.data);
      });

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

  const topCampaign = campaigns.length
    ? campaigns.reduce(
        (prev, current) =>
          prev.ctr > current.ctr ? prev : current
      )
    : null;

  const askAI = async () => {

    if (!chatQuery.trim()) return;

    setLoading(true);

    try {

      const response = await fetch(
        'http://localhost:3000/api/chat',
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            query: chatQuery,
          }),
        }
      );

      const data = await response.json();

      setChatResponse(data.data.answer);

      setChatQuery('');

    } catch (error) {

      setChatResponse('Failed to connect to AI assistant.');

    }

    setLoading(false);
  };

  return (

    <div className="min-h-screen bg-[#020617] text-white p-10">

      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-6xl font-bold">
              Groove AI Dashboard
            </h1>

            <p className="text-gray-400 mt-4 text-lg">
              AI-powered Meta campaign intelligence platform
            </p>

          </div>

          <button
            className="px-6 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition text-lg"
            onClick={() => {

              fetch('http://localhost:3000/api/meta/sync')
                .then(() => window.location.reload());

            }}
          >
            Sync Campaigns
          </button>

        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-6 mt-14">

          <div className="p-8 rounded-3xl bg-white/5 border border-gray-800 shadow-xl">

            <h3 className="text-gray-400 text-lg">
              Total Spend
            </h3>

            <p className="text-5xl font-bold mt-5">
              ${totalSpend.toFixed(2)}
            </p>

          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-gray-800 shadow-xl">

            <h3 className="text-gray-400 text-lg">
              Total Clicks
            </h3>

            <p className="text-5xl font-bold mt-5">
              {totalClicks}
            </p>

          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-gray-800 shadow-xl">

            <h3 className="text-gray-400 text-lg">
              Impressions
            </h3>

            <p className="text-5xl font-bold mt-5">
              {totalImpressions}
            </p>

          </div>

        </div>

        {/* Advanced Analytics */}
        <div className="grid grid-cols-3 gap-6 mt-12">

          <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-2xl">

            <p className="text-sm uppercase tracking-wider text-blue-100">
              Top Performing Campaign
            </p>

            <h2 className="text-3xl font-bold mt-5">
              {topCampaign?.campaignName}
            </h2>

            <p className="mt-4 text-blue-100">
              Highest CTR detected across campaigns
            </p>

            <div className="mt-8 text-5xl font-bold">
              {topCampaign?.ctr}%
            </div>

          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-gray-800">

            <p className="text-sm uppercase tracking-wider text-gray-400">
              Optimization Score
            </p>

            <div className="mt-8 flex items-end gap-2">

              <span className="text-6xl font-bold">
                92
              </span>

              <span className="text-green-400 text-xl mb-2">
                /100
              </span>

            </div>

            <p className="mt-6 text-gray-400">
              AI indicates campaigns are performing efficiently.
            </p>

          </div>

          <div className="p-8 rounded-3xl bg-white/5 border border-gray-800">

            <p className="text-sm uppercase tracking-wider text-gray-400">
              Budget Efficiency
            </p>

            <div className="mt-8 text-5xl font-bold text-green-400">
              High
            </div>

            <p className="mt-6 text-gray-400">
              Cost-per-click metrics remain healthy.
            </p>

          </div>

        </div>

        {/* Charts + AI Insights */}
        <div className="grid grid-cols-3 gap-6 mt-12">

          {/* Chart */}
          <div className="col-span-2 p-8 rounded-3xl bg-white/5 border border-gray-800">

            <h2 className="text-2xl font-bold mb-8">
              Campaign Spend Analytics
            </h2>

            {campaigns.length === 0 ? (

              <p className="text-gray-400">
                No campaign data available.
              </p>

            ) : (

              <div className="h-[350px]">

                <ResponsiveContainer width="100%" height="100%">

                  <BarChart data={campaigns}>

                    <XAxis dataKey="campaignName" />
                    <YAxis />
                    <Tooltip />

                    <Bar
                      dataKey="spend"
                      fill="#2563eb"
                      radius={[10, 10, 0, 0]}
                    />

                  </BarChart>

                </ResponsiveContainer>

              </div>

            )}

          </div>

          {/* AI Insights */}
          <div className="p-8 rounded-3xl bg-white/5 border border-gray-800">

            <h2 className="text-2xl font-bold mb-8">
              AI Insights
            </h2>

            <div className="space-y-6">

              {aiInsights.map((item, index) => (

                <div
                  key={index}
                  className="p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20"
                >

                  <h3 className="text-xl font-bold mb-4">
                    {item.campaignName}
                  </h3>

                  <ul className="space-y-2">

                    {item.insights.map(
                      (insight: string, idx: number) => (

                        <li
                          key={idx}
                          className="text-sm text-gray-300"
                        >
                          • {insight}
                        </li>

                      )
                    )}

                  </ul>

                </div>

              ))}

            </div>

          </div>

        </div>

        {/* AI Chat */}
        <div className="mt-12 p-8 rounded-3xl bg-white/5 border border-gray-800">

          <h2 className="text-3xl font-bold mb-8">
            AI Campaign Assistant
          </h2>

          <div className="flex gap-4">

            <input
              type="text"
              placeholder="Ask about campaigns..."
              value={chatQuery}
              onChange={(e) =>
                setChatQuery(e.target.value)
              }
              className="flex-1 px-6 py-4 rounded-2xl bg-[#0f172a] border border-gray-700 outline-none"
            />

            <button
              onClick={askAI}
              className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 transition"
            >
              {loading ? 'Thinking...' : 'Ask AI'}
            </button>

          </div>

          {chatResponse && (

            <div className="mt-8 p-6 rounded-2xl bg-blue-500/10 border border-blue-500/20">

              <p className="text-lg">
                {chatResponse}
              </p>

            </div>

          )}

        </div>

        {/* Campaign Table */}
        <div className="mt-12 rounded-3xl border border-gray-800 overflow-hidden bg-white/5">

          <div className="p-6 border-b border-gray-800">

            <h2 className="text-2xl font-bold">
              Campaign Performance
            </h2>

          </div>

          {campaigns.length === 0 ? (

            <div className="p-10 text-gray-400">
              No campaigns available.
            </div>

          ) : (

            <table className="w-full">

              <thead className="bg-white/5">

                <tr>

                  <th className="text-left p-5">
                    Campaign
                  </th>

                  <th className="text-left p-5">
                    Spend
                  </th>

                  <th className="text-left p-5">
                    Clicks
                  </th>

                  <th className="text-left p-5">
                    CTR
                  </th>

                </tr>

              </thead>

              <tbody>

                {campaigns.map((campaign) => (

                  <tr
                    key={campaign.id}
                    className="border-t border-gray-800 hover:bg-white/5 transition"
                  >

                    <td className="p-5">
                      {campaign.campaignName}
                    </td>

                    <td className="p-5">
                      ${campaign.spend}
                    </td>

                    <td className="p-5">
                      {campaign.clicks}
                    </td>

                    <td className="p-5">

                      <div className="flex items-center gap-3">

                        <span>
                          {campaign.ctr}%
                        </span>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            campaign.ctr >= 3
                              ? 'bg-green-500/20 text-green-400'
                              : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {campaign.ctr >= 3 ? 'Strong' : 'Weak'}
                        </span>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          )}

        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 mt-16 mb-8">
          Built with React, TypeScript, Prisma, Supabase & AI
        </div>

      </div>

    </div>

  );
}

export default App;