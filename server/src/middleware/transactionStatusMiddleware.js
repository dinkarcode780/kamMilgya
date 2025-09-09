
 const timeAgo =(date)=>{
  const now = new Date();
  const diffMs = now - new Date(date);

  const sec = Math.floor(diffMs / 1000);
  if (sec < 60) return `${sec} sec pehle`;

  const min = Math.floor(sec / 60);
  if (min < 60) return `${min} min pehle`;

  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr} ghante pehle`;

  const days = Math.floor(hr / 24);
  if (days < 30) return `${days} din pehle`;

  const months = Math.floor(days / 30);
  if (months < 12) return `${months} mahine pehle`;

  const years = Math.floor(months / 12);
  return `${years} saal pehle`;
}


export const transactionStatsMiddleware =
  (filter = {}) =>
  async (req, res, next) => {
    try {
      // 1) Overall totals
      const overall = await Transaction.aggregate([
        { $match: filter },
        {
          $group: {
            _id: null,
            totalCount: { $sum: 1 },
            totalAmount: { $sum: "$amount" },
            lastAt: { $max: "$createdAt" },
          },
        },
      ]);

      const totals = overall[0] || {
        totalCount: 0,
        totalAmount: 0,
        lastAt: null,
      };

      // 2) Recent transactions (latest 50)
      const recentDocs = await Transaction.find(filter, {
        amount: 1,
        status: 1,
        createdAt: 1,
        currency: 1,
      })
        .sort({ createdAt: -1 })
        .limit(50)
        .lean();

      const recent = recentDocs.map((t) => ({
        _id: t._id,
        amount: t.amount,
        currency: t.currency || "INR",
        status: t.status,
        createdAt: t.createdAt,
        timeAgo: timeAgo(t.createdAt), // <-- “kitni der pehle”
      }));

      // 3) Per-day summary (last 30 days) — IST timezone
      const perDay = await Transaction.aggregate([
        { $match: filter },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
                timezone: "Asia/Kolkata",
              },
            },
            count: { $sum: 1 },
            amount: { $sum: "$amount" },
          },
        },
        { $sort: { _id: -1 } },
        { $limit: 30 },
      ]);

      // prepare response object
      req.txnStats = {
        totals: {
          totalCount: totals.totalCount,
          totalAmount: totals.totalAmount,
          lastTransactionAt: totals.lastAt,
          lastTransactionAgo: totals.lastAt ? timeAgo(totals.lastAt) : null,
        },
        recent, // list with “timeAgo”
        perDay, // array of { _id: 'YYYY-MM-DD', count, amount } for last 30 days
        generatedAt: new Date(),
      };

      next();
    } catch (err) {
      console.error("transactionStats error:", err);
      return res.status(500).json({ message: "Stats error", error: err.message });
    }
  };
