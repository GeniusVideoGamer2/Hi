import React, { useState } from 'react';
import { BATRewardState } from '../types';
import { Coins, Heart, CheckCircle2, Send, Sliders } from 'lucide-react';

interface BraveRewardsProps {
  onNavigateUrl: (url: string) => void;
}

export const BraveRewards: React.FC<BraveRewardsProps> = () => {
  const [rewardState, setRewardState] = useState<BATRewardState>({
    batBalance: 485.2,
    estimatedEarningsMonth: 18.5,
    adsViewed: 142,
    autoContribute: true,
    monthlyContributionBat: 10,
    payoutDate: 'August 15, 2026',
  });

  const [tipCreator, setTipCreator] = useState('Wikipedia');
  const [tipAmount, setTipAmount] = useState('5');
  const [tipSuccess, setTipSuccess] = useState(false);

  const VERIFIED_CREATORS = [
    { name: 'Wikipedia', platform: 'Web', handle: 'wikipedia.org', verified: true, category: 'Encyclopedia' },
    { name: 'Khan Academy', platform: 'YouTube', handle: 'youtube.com/@khanacademy', verified: true, category: 'Education' },
    { name: 'The Internet Archive', platform: 'Web', handle: 'archive.org', verified: true, category: 'Archive' },
    { name: 'Linus Tech Tips', platform: 'YouTube', handle: 'youtube.com/@LinusTechTips', verified: true, category: 'Tech' },
    { name: 'Electronic Frontier Foundation', platform: 'Web', handle: 'eff.org', verified: true, category: 'Digital Rights' },
  ];

  const handleSendTip = (e: React.FormEvent) => {
    e.preventDefault();
    const numTip = parseFloat(tipAmount);
    if (!numTip || numTip > rewardState.batBalance) return;

    setRewardState((prev) => ({
      ...prev,
      batBalance: prev.batBalance - numTip,
    }));
    setTipSuccess(true);
    setTimeout(() => setTipSuccess(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 max-w-6xl mx-auto space-y-8 select-none">
      {/* Rewards Banner */}
      <div className="bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700 p-8 rounded-3xl text-white shadow-2xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2">
            <Coins className="w-8 h-8 text-amber-200 fill-current" />
            <h1 className="text-2xl font-black">ISTEK Rewards & BAT Ecosystem</h1>
          </div>
          <p className="text-sm text-white/90 leading-relaxed font-medium">
            Earn Basic Attention Token (BAT) for viewing privacy-preserving notifications. Support your favorite creators automatically or send one-time tips with zero transaction fees.
          </p>
        </div>
      </div>

      {/* Rewards Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Your BAT Wallet Balance
          </div>
          <div className="text-3xl font-black text-orange-400 font-mono">
            {rewardState.batBalance.toFixed(2)} <span className="text-sm font-medium text-slate-300">BAT</span>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            ≈ ${(rewardState.batBalance * 0.38).toFixed(2)} USD
          </div>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Estimated Month Earnings
          </div>
          <div className="text-3xl font-black text-amber-400 font-mono">
            +{rewardState.estimatedEarningsMonth} <span className="text-sm font-medium text-slate-300">BAT</span>
          </div>
          <div className="text-xs text-emerald-400 font-medium">
            Next Payout Date: {rewardState.payoutDate}
          </div>
        </div>

        <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Ads Viewed This Month
          </div>
          <div className="text-3xl font-black text-emerald-400 font-mono">
            {rewardState.adsViewed}
          </div>
          <div className="text-xs text-slate-500 font-medium">100% Privacy-Preserving Notifications</div>
        </div>
      </div>

      {/* Tipping & Auto Contribute Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Creator Tipping Box */}
        <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center gap-2 font-bold text-sm text-white">
            <Heart className="w-5 h-5 text-rose-500 fill-current" />
            <span>Send a BAT Tip to Creator</span>
          </div>

          {tipSuccess && (
            <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-2xl text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Thank you! Tip sent successfully to {tipCreator}.</span>
            </div>
          )}

          <form onSubmit={handleSendTip} className="space-y-4">
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                Select Verified Creator
              </label>
              <select
                value={tipCreator}
                onChange={(e) => setTipCreator(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 text-xs text-white rounded-xl p-3 focus:outline-none focus:border-orange-500 font-medium"
              >
                {VERIFIED_CREATORS.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.name} ({c.handle})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1.5">
                Tip Amount (BAT)
              </label>
              <div className="flex gap-2">
                {['1', '5', '10', '25'].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setTipAmount(amt)}
                    className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors ${
                      tipAmount === amt
                        ? 'bg-orange-600 text-white shadow-md'
                        : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {amt} BAT
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold text-xs rounded-2xl transition-colors shadow-lg shadow-orange-600/30 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send {tipAmount} BAT Tip Now</span>
            </button>
          </form>
        </div>

        {/* Auto Contribute Settings */}
        <div className="bg-slate-900/80 p-6 rounded-3xl border border-slate-800 shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 font-bold text-sm text-white">
              <Sliders className="w-5 h-5 text-orange-400" />
              <span>Auto-Contribute Budget</span>
            </div>
            <button
              onClick={() =>
                setRewardState((prev) => ({ ...prev, autoContribute: !prev.autoContribute }))
              }
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                rewardState.autoContribute ? 'bg-orange-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  rewardState.autoContribute ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Automatically distribute BAT tokens to creators based on your attention time spent browsing their websites.
          </p>

          <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <div className="flex justify-between text-xs font-bold text-white">
              <span>Monthly Target Contribution:</span>
              <span className="text-orange-400">{rewardState.monthlyContributionBat} BAT</span>
            </div>
            <input
              type="range"
              min="1"
              max="50"
              value={rewardState.monthlyContributionBat}
              onChange={(e) =>
                setRewardState({
                  ...rewardState,
                  monthlyContributionBat: Number(e.target.value),
                })
              }
              className="w-full accent-orange-500 cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="text-xs font-bold uppercase text-slate-400">Verified Creators Directory</div>
            <div className="divide-y divide-slate-800/80">
              {VERIFIED_CREATORS.map((c) => (
                <div key={c.name} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-200 flex items-center gap-1">
                      <span>{c.name}</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                    </div>
                    <div className="text-[10px] text-slate-500">{c.handle}</div>
                  </div>
                  <span className="text-[10px] bg-slate-800 px-2 py-0.5 rounded text-slate-400">
                    {c.category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
