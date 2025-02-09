import { Schema, Types, model, type Document } from 'mongoose';

interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Schema.Types.ObjectId[]
}
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp: string | number | Date) => new Date(timestamp).toLocaleString()
      },
})

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
          },
        username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]

    }
)
thoughtSchema.virtual('reactionCount').get(function (this: any) {
    return this.reactions.length;
  });

const Thought = model('thoughts', thoughtSchema)

export default Thought