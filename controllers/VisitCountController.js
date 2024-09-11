import VisitCount from '../models/VisitCount.js';

const incrementVisitCount = async (req, res) => {
  try {
    let visitCount = await VisitCount.findOne();

    if (!visitCount) {
      visitCount = new VisitCount({ count: 0 });
  }
  
    if (!visitCount) {
      visitCount = new VisitCount();
    }

    visitCount.count += 1;
    await visitCount.save();

    res.status(200).json({
      success: true,
      count: visitCount.count,
      message: 'Website visit count incremented successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

// Function to get the current visit count
const getVisitCount = async (req, res) => {
  try {
    let visitCount = await VisitCount.findOne();

    if (!visitCount) {
      visitCount = new VisitCount();
      await visitCount.save();
    }

    res.status(200).json({
      success: true,
      count: visitCount.count,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};

export {incrementVisitCount, getVisitCount};