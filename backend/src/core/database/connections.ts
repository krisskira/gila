import {
  type CreationOptional,
  DataTypes,
  Model,
  Sequelize,
  type NonAttribute,
  type InferAttributes,
  type InferCreationAttributes,
  type HasManyGetAssociationsMixin,
  type HasManyAddAssociationsMixin,
  type HasManySetAssociationsMixin,
  type Association,
  type ForeignKey,
  type HasManyAddAssociationMixin,
  type BelongsToSetAssociationMixin,
} from "sequelize"
import AppConfig from "../config"
import {
  NotificationChannels,
  Subscriptions,
  Users,
} from "../../app/data/fakeData"

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
  logging: AppConfig.enableDatabaseLogger,
})

/*
 * *** TABLE DEFINITIIONS ***
 */

export class ChannelModel extends Model<
  InferAttributes<ChannelModel>,
  InferCreationAttributes<ChannelModel>
> {
  declare id?: CreationOptional<number>
  declare code: string
  declare name: string
}

export class SubscriptionModel extends Model<
  InferAttributes<SubscriptionModel>,
  InferCreationAttributes<SubscriptionModel>
> {
  declare id?: CreationOptional<number>
  declare code: string
  declare name: string
}

export class UserMessagesModel extends Model<
  InferAttributes<UserMessagesModel>,
  InferCreationAttributes<UserMessagesModel>
> {
  declare id?: CreationOptional<number>
  declare channel: string
}

export class MessageModel extends Model<
  InferAttributes<MessageModel>,
  InferCreationAttributes<MessageModel>
> {
  declare id?: CreationOptional<number>
  declare content: string
  declare categoryId: ForeignKey<SubscriptionModel["id"]>
  declare category?: NonAttribute<SubscriptionModel>
  declare createdAt?: CreationOptional<Date>
  declare UserMessages?: NonAttribute<UserMessagesModel>

  declare setCategory: BelongsToSetAssociationMixin<
    SubscriptionModel,
    SubscriptionModel["id"]
  >

  declare static associations: {
    category: Association<MessageModel, SubscriptionModel>
    UserMessages: Association<UserModel, UserMessagesModel>
  }
}

export class UserModel extends Model<
  InferAttributes<UserModel>,
  InferCreationAttributes<UserModel>
> {
  declare id?: CreationOptional<number>
  declare name: string
  declare email: string
  declare phoneNumber: string

  declare channels?: NonAttribute<ChannelModel[]>
  declare subscribed?: NonAttribute<SubscriptionModel[]>
  declare messages?: NonAttribute<MessageModel[]>

  declare getChannels: HasManyGetAssociationsMixin<ChannelModel>
  declare getSubscribed: HasManyGetAssociationsMixin<SubscriptionModel>
  declare getMessages: HasManyGetAssociationsMixin<MessageModel>

  declare addChannels: HasManyAddAssociationsMixin<ChannelModel, number>
  declare addSubscribed: HasManyAddAssociationsMixin<SubscriptionModel, number>
  declare addMessage: HasManyAddAssociationMixin<MessageModel, number>

  declare setChannels: HasManySetAssociationsMixin<ChannelModel, number>
  declare setSubscribed: HasManySetAssociationsMixin<SubscriptionModel, number>
  declare setMessages: HasManySetAssociationsMixin<MessageModel, number>

  declare static associations: {
    channels: Association<UserModel, ChannelModel>
    subscribed: Association<UserModel, SubscriptionModel>
    messages: Association<UserModel, MessageModel>
  }
}

export class LogsModel extends Model<
  InferAttributes<LogsModel>,
  InferCreationAttributes<LogsModel>
> {
  declare id?: CreationOptional<number>
  declare channel: string
  declare category: string
  declare message: string
  declare user: string
  declare createdAt?: CreationOptional<Date>
}

/*
 * *** TABLE IMPLEMENTATIONS ***
 */

ChannelModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      unique: true,
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: DataTypes.STRING,
  },
  {
    sequelize,
    timestamps: false,
    tableName: "enum_channels",
    modelName: "Channels",
  }
)

SubscriptionModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: DataTypes.STRING,
  },
  {
    sequelize,
    timestamps: false,
    tableName: "enum_subscriptions",
    modelName: "Subscritions",
  }
)

MessageModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: DataTypes.STRING,
  },
  {
    sequelize,
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    tableName: "messages",
    modelName: "Message",
  }
)

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
  },
  {
    sequelize,
    timestamps: false,
    tableName: "users",
    modelName: "User",
  }
)

UserMessagesModel.init(
  {
    channel: DataTypes.STRING,
  },
  {
    timestamps: true,
    updatedAt: false,
    tableName: "user_messages",
    modelName: "UserMessages",
    sequelize,
  }
)

LogsModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    channel: DataTypes.STRING,
    category: DataTypes.STRING,
    message: DataTypes.STRING,
    user: DataTypes.STRING,
  },
  {
    sequelize,
    timestamps: true,
    createdAt: true,
    updatedAt: false,
    tableName: "messages_log",
    modelName: "messagesLog",
  }
)

/*
 * *** RELATED TABLE ***
 */

MessageModel.belongsTo(SubscriptionModel, {
  as: "category",
})

UserModel.belongsToMany(MessageModel, {
  through: UserMessagesModel,
  as: "messages",
})

UserModel.belongsToMany(SubscriptionModel, {
  through: "user_subscriptions",
  as: "subscribed",
})

UserModel.belongsToMany(ChannelModel, {
  through: "user_notification_channel",
  as: "channels",
})

/*
 * *** DATABASE INITIALIZATION ***
 */

export default async function databaseInit(): Promise<void> {
  await sequelize.authenticate()
  await sequelize.sync({ force: true })
  console.log("\n\n✅ Database connection established\n")
  await setupDatabaseSeed()
  process.once("SIGTERM", () => {
    sequelize
      .close()
      .then(() => {
        console.log(">> Database disconected")
      })
      .catch((e) => {
        console.log(">> Oops! error: ", e)
      })
      .finally(() => {
        console.log(">>> Date: ", new Date())
        process.exit()
      })
  })
}

async function setupDatabaseSeed(): Promise<void> {
  const iniData = await Promise.all([
    SubscriptionModel.count(),
    ChannelModel.count(),
    UserModel.count(),
  ])
  const [hasSubs, hasChannels, hasUsers] = iniData
  if (!hasChannels) await ChannelModel.bulkCreate(NotificationChannels)
  if (!hasSubs) await SubscriptionModel.bulkCreate(Subscriptions)
  if (!hasUsers) {
    const users = await UserModel.bulkCreate(
      Users.map(({ name, email, phoneNumber }) => ({
        name,
        email,
        phoneNumber,
      }))
    )

    const [channels, subscriptions] = await Promise.all([
      ChannelModel.findAll(),
      SubscriptionModel.findAll(),
    ])

    for (const [i, user] of users.entries()) {
      const channel = channels.filter(({ code }) =>
        Users[i].channels.some((channel) => channel.code === code)
      )
      const subscribedTo = subscriptions.filter(({ code }) =>
        Users[i].subscribed.some((subscrition) => subscrition.code === code)
      )
      void Promise.all([
        user.setChannels(channel),
        user.setSubscribed(subscribedTo),
      ])
    }
  }
}
