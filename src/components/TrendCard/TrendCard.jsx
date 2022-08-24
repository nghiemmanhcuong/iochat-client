import './trend-card.css';

import trendsData from '../../data/trendsData.js';

const TrendCard = () => {
  return (
    <div className="trend-card">
        <h3>Xu Hướng</h3>
        {trendsData.map((trend, index) => 
            <div className="trend-card_item" key={index}>
                <span>#{trend.name}</span>
                <div><span>{trend.shares}k</span> Chia sẻ</div>
            </div>
        )}
    </div>
  )
}

export default TrendCard