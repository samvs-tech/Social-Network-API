import { Schema, Document, model, Types } from "mongoose";


interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Types.ObjectId[];
}


interface IReaction extends Document {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}


const reactionSchema = new Schema<IReaction> (
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now, 
        },
    },
    {
        id: false,
        toJSON: {
            getters: true,
        },
    }
);

const thoughtSchema = new Schema<IThought> (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        username: {
            type: String,
            required: true,
        },
        reactions: {
            type: [reactionSchema as any],
            default: [],
        },
    },
    {
        timestamps: false,
        toJSON: {
            getters: true,
        },
    },
);
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return Array.isArray(this.reactions) ? this.reactions.length : 0;
});

reactionSchema.virtual('fromattedCreatedAt').get(function (this: IReaction) {
    return this.createdAt.toLocaleString();
});

const Thought = model<IThought>('Thought', thoughtSchema);


export { IReaction, reactionSchema, Thought}