// /api/analytics.js - 簡單的訪問統計API
export default async function handler(req, res) {
  // 只處理 POST 請求
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { event, data } = req.body;
    const timestamp = new Date().toISOString();
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userAgent = req.headers['user-agent'];
    
    // 記錄到 Vercel 日誌（可在 Vercel 儀表板查看）
    console.log(JSON.stringify({
      timestamp,
      event,
      data,
      ip: ip?.split(',')[0], // 取第一個IP
      userAgent,
      referer: req.headers.referer
    }));

    // 回傳成功
    res.status(200).json({ success: true });
    
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}