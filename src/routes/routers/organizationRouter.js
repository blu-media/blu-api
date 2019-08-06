/* NPM Installation Dependencies */
const express = require("express");

/* Utility Functions */
const {
  addOrganizationMember,
  createOrganization,
  deleteOrganization,
  getAllOrganizations,
  getEventsByOrganization,
  getOrganizationEventsInTimeFrame,
  updateOrganization
} = require("../util/organizationUtil");

const router = express.Router();

/**
* @swagger
* /organizations:
*    get:
*      description: Return all organizations.
*      tags: 
*      - Organizations
*      produces: application/json
*      responses:
*       200:
*         description: Success.
*    put:
*      description: Create an organization.
*      tags: 
*      - Organizations
*      produces: application/json
*      parameters:
*        - name: Organization
*          in: body
*          description: Organization Instance
*          required: true
*      responses:
*       200:
*         description: Success.
*/
router.route("/")
  .get(getAllOrganizations)
  .put(createOrganization);

/**
* @swagger
* /organizations/{orgId}:
*    patch:
*      description: Update an organization.
*      tags: 
*      - Organizations
*      produces: application/json
*      parameters:
*        - name: Organization
*          in: body
*          description: Organization Attributes
*          required: true
*      responses:
*       200:
*         description: Success.
*    delete:
*      description: Deletes an organization.
*      tags: 
*      - Organizations
*      produces: application/json
*      responses:
*       200:
*         description: Success.
*/
router.route("/:orgId")
  .patch(updateOrganization)
  .delete(deleteOrganization)

/**
* @swagger
* /organizations/{orgId}/events:
*    get:
*      description: Return all events of an organization.
*      tags: 
*      - Organizations
*      produces: application/json
*      responses:
*       200:
*         description: Success.
*/
router.route("/:orgId/events")
  .get(getEventsByOrganization);

router.route("/:orgId/events/search")
  .get(getOrganizationEventsInTimeFrame)

/**
* @swagger
* /organizations/{orgId}/members:
*    put:
*      description: Add a user to an organization as a member.
*      tags: 
*      - Organizations
*      produces: application/json
*      parameters:
*        - name: userId
*          in: body
*          description: User ID
*          required: true
*      responses:
*       200:
*         description: Success.
*/
router.route("/:orgId/members")
  .put(addOrganizationMember);

module.exports = router;
