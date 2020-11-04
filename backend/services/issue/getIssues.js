const { issue } = require('../../sequelize/models');

/**
 * @todo 필터 검색 로직 구현
 */
const getIssues = async (req, res) => {
  try {
    const { page, count, closed } = req.query;
    const parsedPage = parseInt(page, 10);
    const parsedCount = parseInt(count, 10);
    const parsedClosed = closed === 'true' || closed === 'false' ? closed === 'true' : false;

    if (Number.isNaN(parsedPage) || parsedPage < 1) {
      return res.sendStatus(400);
    }

    if (Number.isNaN(parsedCount) || parsedCount < 1) {
      return res.sendStatus(400);
    }

    const limit = parsedCount;
    const offset = limit * (parsedPage - 1);
    const issues = await issue.findAndCountAll({
      limit,
      offset,
      where: {
        isClosed: parsedClosed,
      },
    });

    return res.json({ issues });
  } catch (e) {
    return res.sendStatus(500);
  }
};

module.exports = getIssues;
