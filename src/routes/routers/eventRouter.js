/* NPM Installation Dependencies */
const express = require("express");

/* Utility Functions */
const {
  addAttendee,
  addOrganizationToEvent,
  addRSVP,
  deleteAttendee,
  deleteOrganizationFromEvent,
  deleteRSVP,
  getAllEvents,
  getAttendees,
  getEventById,
  getEventsInTimeFrame,
  getRSVP,
  updateRSVP,
  createEvent,
  updateEventById,
  deleteEventById
} = require("../util/eventUtil");

const router = express.Router();

/**
 * @swagger
 * /events:
 *    get:
 *      description: Return all events.
 *      tags: 
 *      - Events
 *      produces: application/json
 *      responses:
 *       200:
 *         description: Success.
 *    put:
 *      description: Create an event.
 *      tags: 
 *      - Events
 *      produces: application/json
 *      parameters:
 *        - name: event
 *          in: body
 *          description: Event Instance
 *          required: true
 *      responses:
 *       200:
 *         description: Success.
 */
router.route("/")
  .get(getAllEvents)
  .put(createEvent);

router.route("/search")
  .get(getEventsInTimeFrame)

/**
 * @swagger
 * /events/{eventId}:
 *    get:
 *      description: Get event by ID.
 *      tags: 
 *      - Events
 *      produces: application/json
 *      parameters:
 *        - name: eventId
 *          in: path
 *          description: Event ID.
 *          required: true
 *      responses:
 *       200:
 *         description: Success.
 *    patch:
 *      description: Updates event by ID.
 *      tags: 
 *      - Events
 *      produces: application/json
 *      parameters:
 *        - name: eventId
 *          in: path
 *          description: Event ID.
 *          required: true
 *        - name: eventBody
 *          in: body
 *          description: Event Attributes to Update
 *          required: true
 *      responses:
 *       200:
 *         description: Success.
 *    delete:
 *      description: Deletes event by ID.
 *      tags: 
 *      - Events
 *      parameters:
 *        - name: eventId
 *          in: path
 *          description: Event ID.
 *          required: true
 *      responses:
 *       200:
 *         description: Success.
 */
router.route("/:eventId")
  .get(getEventById)
  .patch(updateEventById)
  .delete(deleteEventById);

/**
 * @swagger
 * /events/{eventId}/organizations:
 *    put:
 *      description: Adds an organization to an event.
 *      tags: 
 *      - Events
 *      parameters:
 *        - name: eventId
 *          in: path
 *          description: Event ID.
 *          required: true
 *        - name: orgId
 *          in: body
 *          description: Organization ID.
 *          required: true
 *      responses:
 *       200:
 *         description: Success
 *    delete:
 *      description: Delete an organization from an event.
 *      tags: 
 *      - Events
 *      parameters:
 *        - name: eventId
 *          in: path
 *          description: Event ID.
 *          required: true
 *        - name: orgId
 *          in: body
 *          description: Organization ID.
 *          required: true
 *      responses:
 *       200:
 *         description: Success
 */
router.route("/:eventId/organizations")
  .put(addOrganizationToEvent)
  .delete(deleteOrganizationFromEvent);

/**
 * @swagger
 * /events/{eventId}/rsvps:
 *    put:
 *      description: Adds an RSVP to an event.
 *      tags: 
 *      - Events
 *      parameters:
 *        - name: eventId
 *          in: path
 *          description: Event ID.
 *          required: true
 *        - name: response
 *          in: body
 *          description: User ID and RSVP Status.
 *          required: true
 *      responses:
 *       200:
 *         description: Success
 *    patch:
 *      description: Updates an RSVP to an event.
 *      tags: 
 *      - Events
 *      parameters:
 *        - name: eventId
 *          in: path
 *          description: Event ID.
 *          required: true
 *        - name: response
 *          in: body
 *          description: User ID and RSVP Status.
 *          required: true
 *      responses:
 *       200:
 *         description: Success
 *    delete:
 *      description: Deletes an RSVP from an event.
 *      tags: 
 *      - Events
 *      parameters:
 *        - name: eventId
 *          in: path
 *          description: Event ID.
 *          required: true
 *        - name: userId
 *          in: body
 *          description: User ID.
 *          required: true
 *      responses:
 *       200:
 *         description: Success
 */
router.route("/:eventId/rsvps")
  .put(addRSVP)
  .patch(updateRSVP)
  .delete(deleteRSVP);

/**
* @swagger
* /events/{eventId}/rsvps:
*    get:
*      description: Gets an RSVP to an event.
*      tags: 
*      - Events
*      parameters:
*        - name: eventId
*          in: path
*          description: Event ID.
*          required: true
*        - name: userId
*          in: path
*          description: User ID.
*          required: true
*      responses:
*       200:
*         description: Success
*/
router.route("/:eventId/rsvps/:userId")
  .get(getRSVP)

/**
 * @swagger
 * /events/{eventId}/attendees:
 *    get:
 *      description: Gets all attendees for an event.
 *      tags: 
 *      - Events
 *      parameters:
 *        - name: eventId
 *          in: path
 *          description: Event ID.
 *          required: true
 *        - name: userId
 *          in: body
 *          description: User ID.
 *          required: true
 *      responses:
 *       200:
 *         description: Success.
 *    put:
 *      description: Adds an attendee to an event.
 *      tags: 
 *      - Events
 *      parameters:
 *        - name: eventId
 *          in: path
 *          description: Event ID.
 *          required: true
 *        - name: userId
 *          in: body
 *          description: User ID.
 *          required: true
 *      responses:
 *       200:
 *         description: Success
 *    delete:
 *      description: Deletes an attendee from an event.
 *      tags: 
 *      - Events
 *      parameters:
 *        - name: eventId
 *          in: path
 *          description: Event ID.
 *          required: true
 *        - name: userId
 *          in: body
 *          description: User ID.
 *          required: true
 *      responses:
 *       200:
 *         description: Success
 */
router.route("/:eventId/attendees")
  .get(getAttendees)
  .put(addAttendee)
  .delete(deleteAttendee);

module.exports = router;
