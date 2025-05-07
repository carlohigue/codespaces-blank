const MeetingHistory = require('../../model/schema/meeting')
const mongoose = require('mongoose');


const index = async (req, res) => {
    const query = req.query
    query.deleted = false;

    const allData = await MeetingHistory.find(query).exec();

    res.send(allData)
}

const add = async (req, res) => {
    try {
        const meeting = new MeetingHistory(req.body);
        await meeting.save();
        res.status(200).json(meeting);
    } catch (err) {
        console.error('Failed to create MeetingHistory:', err);
        res.status(400).json({ error: 'Failed to create MeetingHistory' });
    }
}

const view = async (req, res) => {
    const meeting = await MeetingHistory.findOne({ _id: req.params.id })
    if (!meeting) {
        return res.status(404).json({ message: 'Meeting not found' });
    }

    res.status(200).json(meeting);
}

const deleteMany = async (req, res) => {
    try {
        const meetings = await MeetingHistory.updateMany({ _id: { $in: req.body } }, { $set: { deleted: true } });
        res.status(200).json({ message: "done", lead })
    } catch (err) {
        res.status(404).json({ message: "error", err })
    }
}


module.exports = { add, index, view, deleteMany }