import { Schema, model, type Document } from 'mongoose';
interface IUser extends Document {
    username: string;
    email: string;
    thoughts: Schema.Types.ObjectId[]
    friends: Schema.Types.ObjectId[]
}

const userSchema = new Schema<IUser> (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
              validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
              },
              message: 'Invalid email address format',
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends:  [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],
        
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
)
userSchema.virtual('friendCount').get(function () {
    return this.friends?.length;
  });

  const User = model('user', userSchema)

  export default User 