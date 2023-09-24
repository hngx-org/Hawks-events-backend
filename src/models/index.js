const { DataTypes } = require("sequelize");

const sequelize = require("../../db/database");

const { STRING, DATE, UUID, UUIDV4, ARRAY } = DataTypes;
const User = sequelize.define(
  "User",
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    name: {
      type: STRING,
      allowNull: false,
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
    },
    avatar: {
      type: STRING,
    },
  },

  {
    timestamps: false,
    tableName: "users",
    modelName: "users",
  }
);

const InterestedEvent = sequelize.define(
  "InterestedEvent",
  {
    user_id: {
      type: UUID,
      // references: {
      //   model: "Users",
      //   key: "id",
      // },
    },
    event_id: {
      type: UUID,
      references: {
        model: "Events",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "interested_events",
    modelName: "interested_events",
  }
);

const Group = sequelize.define(
  "Group",
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    title: {
      type: STRING,
      allowNull: false,
    }
  },
  {
    timestamps: false,
    tableName: "groups",
    modelName: "groups",
  }
);

const UserGroup = sequelize.define(
  "UserGroup",
  {
    user_id : {
      type: DataTypes.STRING,
      references: {
        model: User,
        key: "id"
      }
    },
    group_id : {
      type: DataTypes.STRING,
      references: {
        model: Group,
        key: "id"
      }
    }
  }, {
    timestamps: false,
    tableName: "user_groups",
    modelName: "user_groups",
  }
);

const GroupEvent = sequelize.define(
  "GroupEvent",
  {
    event_id: {
      type: UUID,
      references: {
        model: "Events",
        key: "id",
      },
    },
    group_id: {
      type: UUID,
      // references: {
      //   model: "Groups",
      //   key: "id",
      // },
    },
  },
  {
    timestamps: false,
    tableName: "group_events",
    modelName: "group_events",
  }
);

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    title: {
      type: STRING,
      allowNull: false,
    },
    image:{
      type:STRING,
      allowNull:true
    },
    description: {
      type: STRING,
    },
    creator: {
      type: UUID,
      // references: {
      //   model: "Users",
      //   key: "id",
      // },
    },
    location: {
      type: STRING,
    },
    start_date: {
      type: DATE,
    },
    start_time: {
      type: DATE,
    },
    end_date: {
      type: DATE,
    },
    end_time: {
      type: DATE,
    },
    thumbnail: {
      type: STRING,
      comment: "URL to the thumbnail",
    },
  },
  {
    timestamps: false,
    tableName: "events",
    modelName: "events",
  }
);

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    body: {
      type: STRING,
    },
    user_id: {
      type: UUID,
      // references: {
      //   model: "Users",
      //   key: "id",
      // },
    },
    image:{
      type:STRING,
      allowNull:true
    },
    event_id: {
      type: UUID,
      references: {
        model: "Events",
        key: "id",
      },
    },
  },
  {
    timestamps: false,
    tableName: "comments",
    modelName: "comments",
  }
);

const Image = sequelize.define(
  "Image",
  {
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    image_url: {
      type: ARRAY(STRING),
      defaultValue: []
    },
  },
  {
    timestamps: false,
    tableName: "images",
    modelName: "images",
  });


//   const Comment_images = sequelize.define("comment_images", {
//       image_id:{
//         type: UUID,
//       primaryKey: true,
//       defaultValue: UUIDV4,
//       },

//       event_id:{
//         type: UUID,
//         references: {
//           model: "Events",
//           key: "id",
//         },
//       }
// })

// const Event_thumbnail = sequelize.define("event_thumbnail", {
//   image_id:{
//     type: STRING.BINARY,
//   primaryKey: true,
//   defaultValue: UUIDV4,
//   },

//   event_id:{
//     type: STRING.BINARY,
//     references: {
//       model: "Events",
//       key: "id",
//     },
//   }
// })

// const Group_thumbnail = sequelize.define("group_thumbnail", {
//   image_id:{
//     type: UUID,
//   primaryKey: true,
//   defaultValue: UUIDV4,
//   },

//   event_id:{
//     type: UUID,
//     references: {
//       model: "Events",
//       key: "id",
//     },
//   }
// })


User.belongsToMany(Event, { through: InterestedEvent });
Event.belongsToMany(User, { through: InterestedEvent });

User.belongsToMany(Group, { through: UserGroup, foreignKey: "user_id" });
Group.belongsToMany(User, { through: UserGroup, foreignKey: "group_id" });

Group.belongsToMany(Event, { through: GroupEvent });
Event.belongsToMany(Group, { through: GroupEvent });

Event.belongsTo(User, { foreignKey: "creator" });

User.hasMany(Comment, { foreignKey: "user_id" });
Event.hasMany(Comment, { foreignKey: "event_id" });
Comment.hasMany(Image, { foreignKey: "comment_id" });

// Image.belongsToMany(Comment_images, { through: "id"})
// Image.belongsToMany(Event_thumbnail, { through: "id"})
// Image.belongsToMany(Group_thumbnail, { through: "id"})


sequelize
  .sync()
  .then(() => {
    console.log("Database synchronized successfully.");
  })
  .catch((error) => {
    console.error("Database synchronization error:", error);
  });

module.exports = {
  User,
  InterestedEvent,
  UserGroup,
  GroupEvent,
  Group,
  Event,
  Comment,
  Image,
};
