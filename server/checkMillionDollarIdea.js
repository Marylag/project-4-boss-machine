const checkMillionDollarIdea = (req, res, next) => {
    const { numWeeks, weeklyRevenue } = req.body;
    const totalValue = numWeeks * weeklyRevenue;

    if (totalValue >= 1000000) {
        next();
    } else {
        res.status(400).send('Idea must be worth at least one million dollars!');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
