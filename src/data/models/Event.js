import DataType from 'sequelize';
import Model from './index.js';
import { createdBy, updatedBy, slug } from './helpers';
import City from './City';
import User from './User';

/*
 * This model is wrapper for Facebook's events
 * Events can be added via facebook event id or manually (private events for example)
 * The indent is we could store locally information for attendees for later querying
 * (for example: find all users that attended given event in the past)
 * TODO: Dynamically sync facebook event data with db
 */

const Event = Model.define('Event', {
  id: {
    type: DataType.UUID,
    defaultValue: DataType.UUIDV1,
    primaryKey: true
  },
  facebookID: {
    type: DataType.BIGINT
  },
  slug,
  title: {
    type: DataType.STRING,
    allowNull: false,
    trim: true,
    clean: true,
    validate: {
      notEmpty: {
        msg: 'Моля въведете заглавие на публикацията'
      }
    }
  },
  picture: {
    type: DataType.JSON,
    allowNull: false
  },
  startTime: {
    type: DataType.DATE,
    allowNull: false,
    validate: {
      isDate: {
        msg: 'Въведената дата е невалидна'
      }
    }
  },
  endTime: {
    type: DataType.DATE,
    validate: {
      allowNull: true,
      isDate: {
        msg: 'Въведената дата е невалидна'
      }
    }
  },
  locationName: {
    type: DataType.STRING,
    allowNull: false,
    trim: true,
    clean: true
  },
  locationAddress: {
    type: DataType.STRING,
    allowNull: false,
    trim: true,
    clean: true
  },
  locationPhone: {
    type: DataType.STRING(50),
    trim: true,
    clean: true
  },
  locationEmail: {
    type: DataType.STRING,
    lowercase: true,
    validate: {
      allowNull: true,
      isEmail: {
        msg: 'Невалиден пощенски адрес'
      }
    }
  },
  locationUrl: {
    type: DataType.STRING,
    lowercase: true,
    validate: {
      allowNull: true,
      isUrl: {
        msg: 'Невалиден линк'
      }
    }
  },
  locationLatitude: {
    type: DataType.DECIMAL,
    allowNull: false,
    validate: { min: -90, max: 90 }
  },
  locationLongitude: {
    type: DataType.DECIMAL,
    allowNull: false,
    validate: { min: -180, max: 180 }
  },
  locationGoogleCID: {
    type: DataType.BIGINT,
    validate: {
      allowNull: true,
      isNumeric: {
        msg: 'GoogleCID трябва да бъде номер'
      }
    }
  },
  excerpt: {
    type: DataType.TEXT,
    trim: true,
    clean: true
  },
  content: {
    type: DataType.TEXT,
    allowNull: false,
    trim: true,
    clean: true,
    validate: {
      notEmpty: {
        msg: 'Въведете текст на събитието'
      }
    }
  },
  tags: DataType.ARRAY(DataType.STRING),
  restricted: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  published: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  comments_enabled: {
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false
  }
}, {
  hooks: {
    beforeCreate: (/* data */) => {
      /* const uuid = ''; // TODO
      User.findOne({ where: { id: uuid } })
        .then(author => {
          data.setCreatedBy(author);
          data.setUpdatedBy(author);
        }); */
    },
    beforeUpdate: (/* data */) => {
      /* const uuid = ''; // TODO
      User.findOne({ where: { id: uuid } })
        .then(author => {
          data.setUpdatedBy(author);
        }); */
    }
  }
});

Event.belongsTo(City, {
  foreignKey: 'locationCityId',
  as: 'locationCity',
  onUpdate: 'cascade',
  onDelete: 'restrict'
});

Event.belongsToMany(User, {
  as: 'tutors',
  through: 'EventATutors'
});

Event.belongsToMany(User, {
  as: 'attendees',
  through: 'EventAttendees'
});

Event.belongsTo(User, createdBy);

Event.belongsTo(User, updatedBy);

export default Event;
