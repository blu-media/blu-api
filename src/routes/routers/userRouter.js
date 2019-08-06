/* NPM Installation Dependencies */
const express = require("express");

/* Utility Functions */
const { createUser,
  getAllUsers,
  getUserRSVPs
} = require("../util/userUtil");

const router = express.Router();

/**
 * @swagger
 * /users:
 *    get:
 *      description: Return all users.
 *      tags: 
 *      - Users
 *      produces: application/json
 *      responses:
 *       200:
 *         description: Success.
 *    put:
 *      description: Create a user.
 *      tags: 
 *      - Users
 *      produces: application/json
 *      parameters:
 *        - name: user
 *          in: body
 *          description: User Instance
 *          required: true
 *      responses:
 *       200:
 *         description: Success.
 */
router.route("/")
  .get(getAllUsers)
  .put(createUser)

/**
* @swagger
* /users/{userId}/rsvps:
*    get:
*      description: Return all RSVP's for a user.
*      tags: 
*      - Users
*      produces: application/json
*      responses:
*       200:
*         description: Success.
*/
router.route("/:userId/rsvps")
  .get(getUserRSVPs)


module.exports = router;
