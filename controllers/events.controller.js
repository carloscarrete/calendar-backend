const { response } = require('express');
const Event = require('../models/Event');

const getEvents = async (req, res = response) => {

    /* GET SPECIFIC EVENTS FROM USER */
    /* const events = await Event.find({
        user: req.uid
    }).populate('user', 'name email'); */

    const events = await Event.find().populate('user', 'name email');

    return res.status(200).json({
        ok: true,
        events
    })
}

const createEvent = async (req, res = response) => {

    let event = new Event(req.body);
    const { uid: userId } = req;

    try {
        event.user = userId;
        const result = await event.save();
        return res.status(200).json({
            ok: true,
            message: 'Event created',
            event: result
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Error creating event'
        })
    }
}

const updateEvent = async (req, res = response) => {

    const eventId = req.params.id;

    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'Event not found'
            })
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                message: 'Not authorized'
            })
        }

        const newEvent = {
            ...req.body,
            user: req.uid
        }

        const eventUpdated = await Event.findByIdAndUpdate(eventId, newEvent, { new: true });

        return res.status(200).json({
            ok: true,
            message: 'updateEvent',
            event: eventUpdated
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            message: 'Error updating event'
        })
    }

}

const deleteEvent = async (req, res = response) => {

    const eventId = req.params.id;


    try {
        const event = await Event.findById(eventId);

        if (!event) {
            return res.status(404).json({
                ok: false,
                message: 'Event not found'
            })
        }

        if (event.user.toString() !== req.uid) {
            return res.status(401).json({
                ok: false,
                message: 'Not authorized'
            })
        }

        await Event.findByIdAndDelete(eventId);

        return res.status(200).json({
            ok: true,
            message: 'Event deleted'
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            message: 'Error deleting event'
        })
    }
}


module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
}