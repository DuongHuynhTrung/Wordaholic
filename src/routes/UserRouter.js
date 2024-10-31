const express = require("express");
const userRouter = express.Router();

const {
  getUsers,
  getUserById,
  updateUsers,
  deleteUsers,
  currentUser,
  changePassword,
  checkOldPassword,
  statisticsAccountByStatus,
  searchAccountByEmail,
  banAccountByAdmin,
  unBanAccountByAdmin,
  deleteUsersNoAuth,
} = require("../app/controllers/UserController");
const {
  validateToken,
  validateTokenAdmin,
} = require("../app/middleware/validateTokenHandler");

userRouter.route("/delete-no-auth/:id").delete(deleteUsersNoAuth);

userRouter.use(validateToken);

userRouter.route("/").get(getUsers).put(updateUsers);

userRouter.get("/current", currentUser);

userRouter
  .route("/statisticsAccount")
  .get(validateTokenAdmin, statisticsAccountByStatus);

userRouter
  .route("/searchAccountByEmail")
  .get(validateTokenAdmin, searchAccountByEmail);

userRouter.route("/:id").get(getUserById).delete(deleteUsers);

userRouter.route("/checkOldPassword/:id").post(checkOldPassword);

userRouter.route("/changePassword/:id").put(changePassword);

userRouter
  .route("/banAccountByAdmin/:account_id")
  .patch(validateTokenAdmin, banAccountByAdmin);

userRouter
  .route("/unBanAccountByAdmin/:account_id")
  .patch(validateTokenAdmin, unBanAccountByAdmin);

module.exports = userRouter;
