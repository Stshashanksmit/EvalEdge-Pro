import { evaluationGroups, evaluationFactors } from "../data/evaluationFactors.js";
import { BookOpen, Award, Target, TrendingUp } from "lucide-react";

export default function Criteria() {
  const getGroupIcon = (groupId) => {
    switch (groupId) {
      case 'foundations':
        return <BookOpen className="w-6 h-6" />;
      case 'execution':
        return <Target className="w-6 h-6" />;
      case 'outcomes':
        return <TrendingUp className="w-6 h-6" />;
      default:
        return <Award className="w-6 h-6" />;
    }
  };

  const getGroupColor = (groupId) => {
    switch (groupId) {
      case 'foundations':
        return 'blue';
      case 'execution':
        return 'green';
      case 'outcomes':
        return 'purple';
      default:
        return 'gray';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-evaledge-text mb-2">Evaluation Criteria</h1>
          <p className="text-gray-600">
            Comprehensive framework for evaluating positions using 9 key factors across 3 groups
          </p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {evaluationGroups.map((group) => {
            const colorMap = getGroupColor(group.id);
            return (
              <div key={group.id} className="card text-center">
                <div className={`w-16 h-16 bg-${colorMap}-100 rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <div className={`text-${colorMap}-600`}>
                    {getGroupIcon(group.id)}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-evaledge-text mb-2">{group.name}</h3>
                <div className="text-3xl font-bold text-evaledge-base mb-2">{group.weight}%</div>
                <p className="text-sm text-gray-600">
                  {group.factors.length} factors • {group.weight}% total weight
                </p>
              </div>
            );
          })}
        </div>

        {/* Factors by Group */}
        {evaluationGroups.map((group) => (
          <div key={group.id} className="mb-12">
            {/* Group Header */}
            <div className="flex items-center space-x-4 mb-8">
              <div className={`w-12 h-12 bg-${getGroupColor(group.id)}-100 rounded-xl flex items-center justify-center`}>
                <div className={`text-${getGroupColor(group.id)}-600`}>
                  {getGroupIcon(group.id)}
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-evaledge-text">{group.name}</h2>
                <p className="text-evaledge-base font-semibold">Weight: {group.weight}%</p>
              </div>
            </div>

            {/* Factors in this group */}
            <div className="space-y-8">
              {group.factors.map((factorId) => {
                const factor = evaluationFactors[factorId];
                return (
                  <div key={factorId} className="card">
                    {/* Factor Header */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold text-evaledge-text">{factor.name}</h3>
                        <span className="text-sm bg-evaledge-light/20 text-evaledge-base px-3 py-1 rounded-full font-medium">
                          {factor.weight}% weight
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">{factor.definition}</p>
                    </div>

                    {/* Scale Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {factor.scale.map((scaleItem) => (
                        <div 
                          key={scaleItem.score} 
                          className="bg-gray-50 rounded-xl p-4 border-l-4 border-evaledge-base/30 hover:border-evaledge-base transition-colors"
                        >
                          {/* Score and Anchor */}
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-evaledge-base text-white rounded-lg flex items-center justify-center text-sm font-bold">
                                {scaleItem.score}
                              </div>
                              <span className="font-semibold text-evaledge-text">{scaleItem.anchor}</span>
                            </div>
                          </div>
                          
                          {/* Description */}
                          <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                            {scaleItem.description}
                          </p>
                          
                          {/* Examples */}
                          <div>
                            <p className="text-xs font-semibold text-gray-700 mb-2">Examples:</p>
                            <ul className="text-xs text-gray-500 space-y-1">
                              {scaleItem.examples.map((example, index) => (
                                <li key={index} className="italic">• {example}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Calculation Summary */}
        <div className="card mt-12">
          <h2 className="text-xl font-bold text-evaledge-text mb-6">EvalEdge Score Calculation</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Step-by-Step Process:</h3>
              <ol className="space-y-3 text-sm text-gray-600">
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-evaledge-base text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">1</span>
                  <span>Extract numerical scores from each factor dropdown (1-7 scale)</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-evaledge-base text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">2</span>
                  <span>Apply weightage to each factor score based on the percentage weights</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-evaledge-base text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">3</span>
                  <span>Calculate Total Weighted Factor Score by summing all weighted scores</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="w-6 h-6 bg-evaledge-base text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">4</span>
                  <span>Multiply by Organizational Score to get final EvalEdge Score</span>
                </li>
              </ol>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Formula:</h3>
              <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm">
                <div className="text-evaledge-base font-semibold mb-2">EvalEdge Score = </div>
                <div className="text-gray-700">
                  (Σ Factor Score × Factor Weight) × Organizational Score
                </div>
              </div>
              
              <div className="mt-6">
                <h4 className="font-semibold text-gray-800 mb-3">Factor Weights:</h4>
                <div className="space-y-2 text-sm">
                  {Object.values(evaluationFactors).map((factor) => (
                    <div key={factor.id} className="flex justify-between">
                      <span className="text-gray-600">{factor.name.split(' (')[0]}</span>
                      <span className="font-medium text-evaledge-base">{factor.weight}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Best Practices */}
        <div className="card mt-8">
          <h2 className="text-xl font-bold text-evaledge-text mb-6">Evaluation Best Practices</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">📋 Before You Start</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Review job descriptions thoroughly</li>
                <li>• Understand the role's context within the organization</li>
                <li>• Consider both current and future role requirements</li>
                <li>• Gather input from multiple stakeholders if needed</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">✅ During Evaluation</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Focus on role requirements, not individual performance</li>
                <li>• Use examples provided as reference points</li>
                <li>• Be consistent across similar roles</li>
                <li>• Document rationale in comments section</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}